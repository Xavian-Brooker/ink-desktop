import { parseFile as abletonParseFile } from 'als-parser';
import { defaultInkFile } from './ink-file';
import { getById } from './store/project-store';
import glob from 'glob';
import path from 'path';
import { diffArrayTooSimple } from './utils/array';

const getTrackEffectiveName = (track) => track.Name[0].EffectiveName[0].$.Value;

export const projectType = {
  abletonLive: 'ableton-project',
};

export const ignoreRules = {
  [projectType.abletonLive]: ['Backup/*'],
};

const fileTypeRegex = {
  [projectType.abletonLive]: '*.als',
};

const fileExtType = {
  '.als': projectType.abletonLive,
};

export class ParserManager {
  constructor(projectId, filePath, type) {
    this.projectId = projectId;
    this.filePath = filePath;
    this.type = type;
  }

  async init() {
    if (this.type === projectType.abletonLive) {
      this.parser = await abletonParseFile(this.filePath);
    } else {
      throw new Error('Invalid Project Type');
    }
  }

  async onChange() {
    ParserManager.resetInstance(this.projectId, this.filePath);
  }

  getDiff() {
    let delta = {};
    const tracks = this.parser.getTracks()[0].AudioTrack;
    const trackNames = tracks.map(getTrackEffectiveName);
    const diffedTrackNames = !Array.isArray(defaultInkFile.tracks)
      ? trackNames
      : diffArrayTooSimple(defaultInkFile.tracks, trackNames);
    if (diffedTrackNames.length > 0) {
      delta.tracks = trackNames;
    }
    return delta;
  }

  getResources() {
    return this.parser.getResourceLocations();
  }

  changeResource(path) {
    return this.parser.changeResourceLocations(path);
  }

  static getProjectFiles(dirPath) {
    const options = {
      cwd: dirPath,
      ignore: ignoreRules[projectType.abletonLive],
      absolute: true,
    };
    const files = {};
    for (const key in fileTypeRegex) {
      files[key] = glob.sync(`**/${fileTypeRegex[key]}`, options);
    }
    return files;
  }

  static getDefaultProjectFile(dirPath) {
    const option = {
      cwd: dirPath,
      absolute: true,
    };
    let files = [];
    for (var key in fileTypeRegex) {
      // Take the first found file in the root directory as the default file
      return glob.sync(fileTypeRegex[key], option)[0];
    }
    throw Error('No Project File or Default File Found');
  }

  static getProjectType(filePath) {
    let ext = path.extname(filePath);
    if (!fileExtType[ext]) throw new Error('Invalid Project Type');
    return fileExtType[ext];
  }

  static async getInstance(projectId) {
    let project = getById(projectId);
    let projectFiles = this.getProjectFiles(project.path);
    if (!this.instances[projectId]) {
      this.instances[projectId] = {};
    }
    for (var type in projectFiles) {
      for (var index in projectFiles[type]) {
        let filePath = projectFiles[type][index];
        if (!this.instances[projectId][filePath]) {
          this.instances[projectId][filePath] = new ParserManager(
            project.id,
            filePath,
            type
          );
          await this.instances[projectId][filePath].init();
        }
      }
    }
    return this.instances[projectId];
  }

  static async resetInstance(projectId, filePath) {
    if (!this.instances[projectId]) {
      throw new Error('Project Id Not Found');
    }
    this.instances[projectId][filePath] = new ParserManager(
      projectId,
      filePath,
      this.getProjectType(filePath)
    );
    await this.instances[projectId][filePath].init();
    return this.instances[projectId];
  }
}

ParserManager.instances = {};

export type ISoundSources = Record<string, string[] | string>;

export interface ISoundInstances {
  instances: HTMLAudioElement[];
  source: string;
}

export type ISounds = Record<string, ISoundInstances | ISoundInstances[]>;

/////////////////////////////////////////////////////////////
//////////////////// A NOTE ABOUT THIS FILE /////////////////
/////////////////////////////////////////////////////////////
/// This file may ONLY contain "interface" and "type"     ///
/// definitions (the latter for strongly-typed strings)   ///
/// Moreover, they must **NOT** have the "export"         ///
/// keyword in front of them.  Putting an "export" will   ///
/// make these interfaces no longer public by default.    ///
/// Instead, each file will need to "import" them, and    ///
/// that doesn't work because some of the interfaces are  ///
/// required by both server and client, but require of    ///
/// "../../interfaces/" results in file not found         ///
/// So again: no "export" keywords anywhere in this file! ///
/// And similarly, no enums -- use "type" instead, which  ///
/// has no runtime component to it, is pure design-time.  ///
/////////////////////////////////////////////////////////////

// Note: actual defaults need to be set in "env.config.js"
interface ExperimentationFlags {
  customFunctions: {
    forceOn: boolean;
    extraLogging: boolean;
  };
}

interface ITemplate {
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // NOTE: if you add or remove any top-level fields from this list, be sure
  // to update "snippetFields" and "snippetFieldSortingOrder" and "getSnippetDefaults" in
  // "src\client\app\helpers\snippet.helper.ts"
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  id?: string;
  gist?: string;
  gistOwnerId?: string;
  name?: string;
  description?: string;
  /** author: export-only */
  author?: string;
  host: string;
  /** api_set: export-only (+ check at first level of import) */
  api_set?: {
    [index: string]: number;
  };
  platform: string;
  created_at: number;
  modified_at: number;
}

interface IContentLanguagePair {
  content: string;
  language: string;
}

// Note, this interface is copied in several places.  Search for it.
interface PerfInfoItem {
  line_no: number;
  frequency: number;
  duration: number;
}

interface IPerformanceInformation {
  data: PerfInfoItem[];
  timestamp: number;
}

interface ISnippet extends ITemplate {
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // NOTE: if you add or remove any top-level fields from this list, be sure
  // to update "snippetFields" and "snippetFieldSortingOrder" and "getSnippetDefaults" in
  // "src\client\app\helpers\snippet.helper.ts"
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  script?: IContentLanguagePair;
  template?: IContentLanguagePair;
  style?: IContentLanguagePair;
  libraries?: string;
  perfInfo?: IPerformanceInformation;
}

interface ILibraryDefinition {
  label?: string;
  typings?: string | string[];
  value?: string | string[];
  description?: string;
}

/** The request body passed to the runner during a POST */
interface IRunnerState {
  snippet: ISnippet;

  isInsideOfficeApp: boolean;
  displayLanguage: string;

  /** URL to return to in case of the gallery (or something else custom).
   * Otherwise, if null, will create a default reference back to editor domain,
   * taking host and snippet ID into account */
  returnUrl?: string;
}

interface IExportState {
  snippet: ISnippet;
  additionalFields: ISnippet;
  sanitizedFilenameBase: string;
  displayLanguage: string;
}

interface IMonacoEditorState {
  name?: string;
  displayName?: string;
  content?: string;
  language?: string;
  viewState?: monaco.editor.IEditorViewState;
  model?: monaco.editor.IModel;
}

interface IAlert {
  title: string;
  message: string;
  actions: string[];
}

interface ITab {
  name?: string;
  language?: string;
  content?: string;
}

interface IEvent<T> {
  type: string;
  action: number;
  data: T;
}

// Note: the contents of this injected variable comes from "webpack.common.js"
// (and in turn derives most of its values from "env.config.js", but
// via the "new webpack.DefinePlugin({ PLAYGROUND: ... }) definition)
declare var PLAYGROUND: ICompiledPlaygroundInfo;

interface IEnvironmentConfigsMap {
  local: ILocalHostEnvironmentConfig;
  edge: IEnvironmentConfig;
  insiders: IEnvironmentConfig;
  staging: IEnvironmentConfig;
  production: IEnvironmentConfig;
  productiondirect: IEnvironmentConfig;
}

interface ICompiledPlaygroundInfo {
  devMode: boolean;
  build: IBuildInfo;
  config: IEnvironmentConfigsMap;

  /** NOTE: when adding local storage keys here, also add them to "const localStorageKeys = {...}" in "env.config.js" */
  localStorageKeys: {
    /** A dummy key used simply for getting localStorage to refresh (see https://stackoverflow.com/a/40770399) */
    dummyUnusedKey: string;

    log: string;

    hostSnippets_parameterized: string;
    settings: string;
    originEnvironmentUrl: string;
    redirectEnvironmentUrl: string;
    wacUrl: string;
    experimentationFlags: string;
    trustedSnippets: string;

    /** Localstorage key for playground language. Will get set both on the client domain
     * (as expected), and also on the runner domain (due to its use in runner.ts) */
    language: string;

    /** The last seen custom functions heartbeat timestamp (i.e., the invisible pane's
     * once per second "I'm still alive" notice) */
    customFunctionsLastHeartbeatTimestamp: string;

    /** The last time that a custom function was asked to be registered/updated (from the dashboard) */
    customFunctionsLastUpdatedCodeTimestamp: string;

    /** The last timestamp that succeeded in registering (on runner side) and that
     * the custom functions heartbeat was aware of */
    customFunctionsCurrentlyRunningTimestamp: string;

    /** Last time that perf numbers were generated (so that the editor can know to possible refresh) */
    lastPerfNumbersTimestamp: string;

    /** A timestamp to let someone (E.g., Custom Functions dashboard) know that the snippet contents or the currently-edited snippet has changed */
    editorLastChangedTimestamp: string;
  };
  sessionStorageKeys: {
    environmentCache: string;
    intelliSenseCache: string;
  };
  safeExternalUrls: {
    playground_help: 'https://github.com/OfficeDev/script-lab/blob/master/README.md';
    ask: 'https://stackoverflow.com/questions/tagged/office-js';
    excel_api: 'https://dev.office.com/reference/add-ins/excel/excel-add-ins-reference-overview';
    word_api: 'https://dev.office.com/reference/add-ins/word/word-add-ins-reference-overview';
    onenote_api: 'https://dev.office.com/reference/add-ins/onenote/onenote-add-ins-javascript-reference';
    outlook_api: 'https://docs.microsoft.com/en-us/outlook/add-ins/reference';
    powepoint_api: 'https://dev.office.com/docs/add-ins/powerpoint/powerpoint-add-ins';
    project_api: 'https://dev.office.com/reference/add-ins/shared/projectdocument.projectdocument';
    generic_api: 'https://dev.office.com/reference/add-ins/javascript-api-for-office';
  };
  experimentationFlagsDefaults: ExperimentationFlags;
}

interface ICurrentPlaygroundInfo {
  devMode: Readonly<boolean>;
  build: Readonly<IBuildInfo>;
  config: Readonly<IEnvironmentConfig>;
  host: Readonly<string>;
  platform: Readonly<string>;

  /** A timestamp specifically for the in-memory session (i.e.,
   * even more short-term than sessionStorage, which has a lifetime-of-tab duration;
   * whereas this one will get generated anew with each reload) */
  runtimeSessionTimestamp: Readonly<string>;

  isAddinCommands: boolean;
  isTryIt: boolean;
  wacUrl: string;

  experimentationFlags: ExperimentationFlags;
}

interface IBuildInfo {
  name: string;
  version: string;
  timestamp: string;
  author: string;
  humanReadableTimestamp: string;
}

interface IEnvironmentConfig {
  name: 'LOCAL' | 'EDGE' | 'INSIDERS' | 'STAGING' | 'PRODUCTION' | 'PRODUCTIONDIRECT';
  clientId: string;
  instrumentationKey: string;
  editorUrl: string;
  tokenUrl: string;
  runnerUrl: string;
  feedbackUrl: string;
  samplesUrl: string;
  thirdPartyAADAppClientId: string;
}

interface ILocalHostEnvironmentConfig extends IEnvironmentConfig {
  clientSecretLocalHost: string;
}

interface ISettings {
  lastOpened: ISnippet;
  profile: IBasicProfile;
  theme: boolean;
  language: string;
  env: string;
}

interface HeartbeatParams {
  /** host (used for environment detection and to know which snippet store to read from) */
  host: string;

  /** snippet ID, if any */
  id: string;

  /** Snippet last modified timestamp, if relevant (comes in as a string on URL parameters)
   * If lastModified is empty or 0, the heartbeat will send the snippet back immediately;
   */
  lastModified: string;

  runnerUrl: string;
}

// NOTE:  This interface must be kept in sync with the parameters to "_generateAuthUrl" in "runtime-helpers.ts"
interface AuthRequestParamData {
  auth_action: 'login' | 'logout';
  resource: string;
  client_id: string;
  is_office_host: boolean;
  snippet_id: string;
}

interface DefaultAuthRequestParamData {
  snippet_id: string;
  auth_url: string;
}

type ConsoleLogTypes = 'log' | 'info' | 'warn' | 'error';

interface LogData {
  source: string;
  message: any;
  severity: ConsoleLogTypes;
  indent?: number;
}

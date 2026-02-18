// Auto-generated from Roblox API Dump — do not edit manually
// Run `bun run generate` to regenerate

declare namespace Enum {
	interface AccessModifierType extends EnumItem {}
	const AccessModifierType: {
		readonly Allow: Enum.AccessModifierType;
		readonly Deny: Enum.AccessModifierType;
	};

	interface AccessoryType extends EnumItem {}
	const AccessoryType: {
		readonly Unknown: Enum.AccessoryType;
		readonly Hat: Enum.AccessoryType;
		readonly Hair: Enum.AccessoryType;
		readonly Face: Enum.AccessoryType;
		readonly Neck: Enum.AccessoryType;
		readonly Shoulder: Enum.AccessoryType;
		readonly Front: Enum.AccessoryType;
		readonly Back: Enum.AccessoryType;
		readonly Waist: Enum.AccessoryType;
		readonly TShirt: Enum.AccessoryType;
		readonly Shirt: Enum.AccessoryType;
		readonly Pants: Enum.AccessoryType;
		readonly Jacket: Enum.AccessoryType;
		readonly Sweater: Enum.AccessoryType;
		readonly Shorts: Enum.AccessoryType;
		readonly LeftShoe: Enum.AccessoryType;
		readonly RightShoe: Enum.AccessoryType;
		readonly DressSkirt: Enum.AccessoryType;
		readonly Eyebrow: Enum.AccessoryType;
		readonly Eyelash: Enum.AccessoryType;
	};

	interface ActionOnAutoResumeSync extends EnumItem {}
	const ActionOnAutoResumeSync: {
		readonly DontResume: Enum.ActionOnAutoResumeSync;
		readonly KeepStudio: Enum.ActionOnAutoResumeSync;
		readonly KeepLocal: Enum.ActionOnAutoResumeSync;
	};

	interface ActionOnStopSync extends EnumItem {}
	const ActionOnStopSync: {
		readonly AlwaysAsk: Enum.ActionOnStopSync;
		readonly KeepLocalFiles: Enum.ActionOnStopSync;
		readonly DeleteLocalFiles: Enum.ActionOnStopSync;
	};

	interface ActionType extends EnumItem {}
	const ActionType: {
		readonly Nothing: Enum.ActionType;
		readonly Pause: Enum.ActionType;
		readonly Lose: Enum.ActionType;
		readonly Draw: Enum.ActionType;
		readonly Win: Enum.ActionType;
	};

	interface ActuatorRelativeTo extends EnumItem {}
	const ActuatorRelativeTo: {
		readonly Attachment0: Enum.ActuatorRelativeTo;
		readonly Attachment1: Enum.ActuatorRelativeTo;
		readonly World: Enum.ActuatorRelativeTo;
	};

	interface ActuatorType extends EnumItem {}
	const ActuatorType: {
		readonly None: Enum.ActuatorType;
		readonly Motor: Enum.ActuatorType;
		readonly Servo: Enum.ActuatorType;
	};

	interface AdAvailabilityResult extends EnumItem {}
	const AdAvailabilityResult: {
		readonly IsAvailable: Enum.AdAvailabilityResult;
		readonly DeviceIneligible: Enum.AdAvailabilityResult;
		readonly ExperienceIneligible: Enum.AdAvailabilityResult;
		readonly InternalError: Enum.AdAvailabilityResult;
		readonly NoFill: Enum.AdAvailabilityResult;
		readonly PlayerIneligible: Enum.AdAvailabilityResult;
		readonly PublisherIneligible: Enum.AdAvailabilityResult;
	};

	interface AdEventType extends EnumItem {}
	const AdEventType: {
		readonly RewardedAdLoaded: Enum.AdEventType;
		readonly RewardedAdGrant: Enum.AdEventType;
		readonly RewardedAdUnloaded: Enum.AdEventType;
		readonly VideoLoaded: Enum.AdEventType;
		readonly VideoRemoved: Enum.AdEventType;
		readonly UserCompletedVideo: Enum.AdEventType;
	};

	interface AdFormat extends EnumItem {}
	const AdFormat: {
		readonly RewardedVideo: Enum.AdFormat;
	};

	interface AdShape extends EnumItem {}
	const AdShape: {
		readonly HorizontalRectangle: Enum.AdShape;
	};

	interface AdTeleportMethod extends EnumItem {}
	const AdTeleportMethod: {
		readonly Undefined: Enum.AdTeleportMethod;
		readonly PortalForward: Enum.AdTeleportMethod;
		readonly InGameMenuBackButton: Enum.AdTeleportMethod;
		readonly UIBackButton: Enum.AdTeleportMethod;
	};

	interface AdUIEventType extends EnumItem {}
	const AdUIEventType: {
		readonly AdLabelClicked: Enum.AdUIEventType;
		readonly VolumeButtonClicked: Enum.AdUIEventType;
		readonly FullscreenButtonClicked: Enum.AdUIEventType;
		readonly PlayButtonClicked: Enum.AdUIEventType;
		readonly PauseButtonClicked: Enum.AdUIEventType;
		readonly CloseButtonClicked: Enum.AdUIEventType;
		readonly WhyThisAdClicked: Enum.AdUIEventType;
		readonly PlayEventTriggered: Enum.AdUIEventType;
		readonly PauseEventTriggered: Enum.AdUIEventType;
	};

	interface AdUIType extends EnumItem {}
	const AdUIType: {
		readonly None: Enum.AdUIType;
		readonly Image: Enum.AdUIType;
		readonly Video: Enum.AdUIType;
	};

	interface AdUnitStatus extends EnumItem {}
	const AdUnitStatus: {
		readonly Inactive: Enum.AdUnitStatus;
		readonly Active: Enum.AdUnitStatus;
	};

	interface AdornCullingMode extends EnumItem {}
	const AdornCullingMode: {
		readonly Automatic: Enum.AdornCullingMode;
		readonly Never: Enum.AdornCullingMode;
	};

	interface AdornShading extends EnumItem {}
	const AdornShading: {
		readonly Default: Enum.AdornShading;
		readonly Shaded: Enum.AdornShading;
		readonly XRay: Enum.AdornShading;
		readonly XRayShaded: Enum.AdornShading;
		readonly AlwaysOnTop: Enum.AdornShading;
	};

	interface AlignType extends EnumItem {}
	const AlignType: {
		readonly PrimaryAxisParallel: Enum.AlignType;
		readonly PrimaryAxisPerpendicular: Enum.AlignType;
		readonly PrimaryAxisLookAt: Enum.AlignType;
		readonly AllAxes: Enum.AlignType;
		readonly Parallel: Enum.AlignType;
		readonly Perpendicular: Enum.AlignType;
	};

	interface AlphaMode extends EnumItem {}
	const AlphaMode: {
		readonly Overlay: Enum.AlphaMode;
		readonly Transparency: Enum.AlphaMode;
		readonly TintMask: Enum.AlphaMode;
		readonly Opaque: Enum.AlphaMode;
	};

	interface AnalyticsCustomFieldKeys extends EnumItem {}
	const AnalyticsCustomFieldKeys: {
		readonly CustomField01: Enum.AnalyticsCustomFieldKeys;
		readonly CustomField02: Enum.AnalyticsCustomFieldKeys;
		readonly CustomField03: Enum.AnalyticsCustomFieldKeys;
	};

	interface AnalyticsEconomyAction extends EnumItem {}
	const AnalyticsEconomyAction: {
		readonly Default: Enum.AnalyticsEconomyAction;
		readonly Acquire: Enum.AnalyticsEconomyAction;
		readonly Spend: Enum.AnalyticsEconomyAction;
	};

	interface AnalyticsEconomyFlowType extends EnumItem {}
	const AnalyticsEconomyFlowType: {
		readonly Sink: Enum.AnalyticsEconomyFlowType;
		readonly Source: Enum.AnalyticsEconomyFlowType;
	};

	interface AnalyticsEconomyTransactionType extends EnumItem {}
	const AnalyticsEconomyTransactionType: {
		readonly IAP: Enum.AnalyticsEconomyTransactionType;
		readonly Shop: Enum.AnalyticsEconomyTransactionType;
		readonly Gameplay: Enum.AnalyticsEconomyTransactionType;
		readonly ContextualPurchase: Enum.AnalyticsEconomyTransactionType;
		readonly TimedReward: Enum.AnalyticsEconomyTransactionType;
		readonly Onboarding: Enum.AnalyticsEconomyTransactionType;
	};

	interface AnalyticsLogLevel extends EnumItem {}
	const AnalyticsLogLevel: {
		readonly Trace: Enum.AnalyticsLogLevel;
		readonly Debug: Enum.AnalyticsLogLevel;
		readonly Information: Enum.AnalyticsLogLevel;
		readonly Warning: Enum.AnalyticsLogLevel;
		readonly Error: Enum.AnalyticsLogLevel;
		readonly Fatal: Enum.AnalyticsLogLevel;
	};

	interface AnalyticsProgressionStatus extends EnumItem {}
	const AnalyticsProgressionStatus: {
		readonly Default: Enum.AnalyticsProgressionStatus;
		readonly Begin: Enum.AnalyticsProgressionStatus;
		readonly Complete: Enum.AnalyticsProgressionStatus;
		readonly Abandon: Enum.AnalyticsProgressionStatus;
		readonly Fail: Enum.AnalyticsProgressionStatus;
	};

	interface AnalyticsProgressionType extends EnumItem {}
	const AnalyticsProgressionType: {
		readonly Custom: Enum.AnalyticsProgressionType;
		readonly Start: Enum.AnalyticsProgressionType;
		readonly Fail: Enum.AnalyticsProgressionType;
		readonly Complete: Enum.AnalyticsProgressionType;
	};

	interface AnimationClipFromVideoStatus extends EnumItem {}
	const AnimationClipFromVideoStatus: {
		readonly Initializing: Enum.AnimationClipFromVideoStatus;
		readonly Pending: Enum.AnimationClipFromVideoStatus;
		readonly Processing: Enum.AnimationClipFromVideoStatus;
		readonly ErrorGeneric: Enum.AnimationClipFromVideoStatus;
		readonly Success: Enum.AnimationClipFromVideoStatus;
		readonly ErrorVideoTooLong: Enum.AnimationClipFromVideoStatus;
		readonly ErrorNoPersonDetected: Enum.AnimationClipFromVideoStatus;
		readonly ErrorVideoUnstable: Enum.AnimationClipFromVideoStatus;
		readonly Timeout: Enum.AnimationClipFromVideoStatus;
		readonly Cancelled: Enum.AnimationClipFromVideoStatus;
		readonly ErrorMultiplePeople: Enum.AnimationClipFromVideoStatus;
		readonly ErrorUploadingVideo: Enum.AnimationClipFromVideoStatus;
	};

	interface AnimationNodeBlend2DInputMode extends EnumItem {}
	const AnimationNodeBlend2DInputMode: {
		readonly Cartesian: Enum.AnimationNodeBlend2DInputMode;
		readonly Polar: Enum.AnimationNodeBlend2DInputMode;
	};

	interface AnimationNodeInterruptible extends EnumItem {}
	const AnimationNodeInterruptible: {
		readonly Always: Enum.AnimationNodeInterruptible;
		readonly ClipFinished: Enum.AnimationNodeInterruptible;
		readonly Expression: Enum.AnimationNodeInterruptible;
	};

	interface AnimationNodePlayMode extends EnumItem {}
	const AnimationNodePlayMode: {
		readonly Loop: Enum.AnimationNodePlayMode;
		readonly PingPong: Enum.AnimationNodePlayMode;
		readonly OnceAndHold: Enum.AnimationNodePlayMode;
		readonly OnceAndReset: Enum.AnimationNodePlayMode;
	};

	interface AnimationNodeTransitionType extends EnumItem {}
	const AnimationNodeTransitionType: {
		readonly CrossFade: Enum.AnimationNodeTransitionType;
		readonly InertialBlend: Enum.AnimationNodeTransitionType;
		readonly DeadBlend: Enum.AnimationNodeTransitionType;
	};

	interface AnimationNodeType extends EnumItem {}
	const AnimationNodeType: {
		readonly InvalidNode: Enum.AnimationNodeType;
		readonly AddNode: Enum.AnimationNodeType;
		readonly BlendNode: Enum.AnimationNodeType;
		readonly Blend1DNode: Enum.AnimationNodeType;
		readonly Blend2DNode: Enum.AnimationNodeType;
		readonly ClipNode: Enum.AnimationNodeType;
		readonly GraphOutput: Enum.AnimationNodeType;
		readonly MaskNode: Enum.AnimationNodeType;
		readonly PrioritySelectNode: Enum.AnimationNodeType;
		readonly RandomSequenceNode: Enum.AnimationNodeType;
		readonly SelectNode: Enum.AnimationNodeType;
		readonly SequenceNode: Enum.AnimationNodeType;
		readonly SpeedNode: Enum.AnimationNodeType;
		readonly SubtractNode: Enum.AnimationNodeType;
	};

	interface AnimationNodeWaitFor extends EnumItem {}
	const AnimationNodeWaitFor: {
		readonly ClipFinished: Enum.AnimationNodeWaitFor;
		readonly Expression: Enum.AnimationNodeWaitFor;
	};

	interface AnimationPriority extends EnumItem {}
	const AnimationPriority: {
		readonly Core: Enum.AnimationPriority;
		readonly Idle: Enum.AnimationPriority;
		readonly Movement: Enum.AnimationPriority;
		readonly Action: Enum.AnimationPriority;
		readonly Action2: Enum.AnimationPriority;
		readonly Action3: Enum.AnimationPriority;
		readonly Action4: Enum.AnimationPriority;
	};

	interface AnimatorRetargetingMode extends EnumItem {}
	const AnimatorRetargetingMode: {
		readonly Default: Enum.AnimatorRetargetingMode;
		readonly Disabled: Enum.AnimatorRetargetingMode;
		readonly Enabled: Enum.AnimatorRetargetingMode;
	};

	interface AnnotationChannelContentPreference extends EnumItem {}
	const AnnotationChannelContentPreference: {
		readonly None: Enum.AnnotationChannelContentPreference;
		readonly All: Enum.AnnotationChannelContentPreference;
		readonly Unknown: Enum.AnnotationChannelContentPreference;
	};

	interface AnnotationEditingMode extends EnumItem {}
	const AnnotationEditingMode: {
		readonly None: Enum.AnnotationEditingMode;
		readonly PlacingNew: Enum.AnnotationEditingMode;
		readonly WritingNew: Enum.AnnotationEditingMode;
	};

	interface AnnotationPlaceContentPreference extends EnumItem {}
	const AnnotationPlaceContentPreference: {
		readonly None: Enum.AnnotationPlaceContentPreference;
		readonly All: Enum.AnnotationPlaceContentPreference;
		readonly MentionsAndReplies: Enum.AnnotationPlaceContentPreference;
		readonly Unknown: Enum.AnnotationPlaceContentPreference;
	};

	interface AnnotationRequestStatus extends EnumItem {}
	const AnnotationRequestStatus: {
		readonly Success: Enum.AnnotationRequestStatus;
		readonly Loading: Enum.AnnotationRequestStatus;
		readonly ErrorInternalFailure: Enum.AnnotationRequestStatus;
		readonly ErrorNotFound: Enum.AnnotationRequestStatus;
		readonly ErrorModerated: Enum.AnnotationRequestStatus;
	};

	interface AnnotationRequestType extends EnumItem {}
	const AnnotationRequestType: {
		readonly Unknown: Enum.AnnotationRequestType;
		readonly Create: Enum.AnnotationRequestType;
		readonly Resolve: Enum.AnnotationRequestType;
		readonly Delete: Enum.AnnotationRequestType;
		readonly Edit: Enum.AnnotationRequestType;
	};

	interface AppLifecycleManagerState extends EnumItem {}
	const AppLifecycleManagerState: {
		readonly Detached: Enum.AppLifecycleManagerState;
		readonly Active: Enum.AppLifecycleManagerState;
		readonly Inactive: Enum.AppLifecycleManagerState;
		readonly Hidden: Enum.AppLifecycleManagerState;
	};

	interface AppShellActionType extends EnumItem {}
	const AppShellActionType: {
		readonly None: Enum.AppShellActionType;
		readonly OpenApp: Enum.AppShellActionType;
		readonly TapChatTab: Enum.AppShellActionType;
		readonly TapConversationEntry: Enum.AppShellActionType;
		readonly TapAvatarTab: Enum.AppShellActionType;
		readonly ReadConversation: Enum.AppShellActionType;
		readonly TapGamePageTab: Enum.AppShellActionType;
		readonly TapHomePageTab: Enum.AppShellActionType;
		readonly GamePageLoaded: Enum.AppShellActionType;
		readonly HomePageLoaded: Enum.AppShellActionType;
		readonly AvatarEditorPageLoaded: Enum.AppShellActionType;
	};

	interface AppShellFeature extends EnumItem {}
	const AppShellFeature: {
		readonly None: Enum.AppShellFeature;
		readonly Chat: Enum.AppShellFeature;
		readonly AvatarEditor: Enum.AppShellFeature;
		readonly GamePage: Enum.AppShellFeature;
		readonly HomePage: Enum.AppShellFeature;
		readonly More: Enum.AppShellFeature;
		readonly Landing: Enum.AppShellFeature;
	};

	interface AppUpdateStatus extends EnumItem {}
	const AppUpdateStatus: {
		readonly Unknown: Enum.AppUpdateStatus;
		readonly NotSupported: Enum.AppUpdateStatus;
		readonly Failed: Enum.AppUpdateStatus;
		readonly NotAvailable: Enum.AppUpdateStatus;
		readonly Available: Enum.AppUpdateStatus;
		readonly AvailableBoundChannel: Enum.AppUpdateStatus;
		readonly AvailableBetaProgram: Enum.AppUpdateStatus;
	};

	interface ApplyStrokeMode extends EnumItem {}
	const ApplyStrokeMode: {
		readonly Contextual: Enum.ApplyStrokeMode;
		readonly Border: Enum.ApplyStrokeMode;
	};

	interface AspectType extends EnumItem {}
	const AspectType: {
		readonly FitWithinMaxSize: Enum.AspectType;
		readonly ScaleWithParentSize: Enum.AspectType;
	};

	interface AssetCreatorType extends EnumItem {}
	const AssetCreatorType: {
		readonly User: Enum.AssetCreatorType;
		readonly Group: Enum.AssetCreatorType;
	};

	interface AssetFetchStatus extends EnumItem {}
	const AssetFetchStatus: {
		readonly Success: Enum.AssetFetchStatus;
		readonly Failure: Enum.AssetFetchStatus;
		readonly None: Enum.AssetFetchStatus;
		readonly Loading: Enum.AssetFetchStatus;
		readonly TimedOut: Enum.AssetFetchStatus;
	};

	interface AssetType extends EnumItem {}
	const AssetType: {
		readonly Image: Enum.AssetType;
		readonly TShirt: Enum.AssetType;
		readonly Audio: Enum.AssetType;
		readonly Mesh: Enum.AssetType;
		readonly Lua: Enum.AssetType;
		readonly Hat: Enum.AssetType;
		readonly Place: Enum.AssetType;
		readonly Model: Enum.AssetType;
		readonly Shirt: Enum.AssetType;
		readonly Pants: Enum.AssetType;
		readonly Decal: Enum.AssetType;
		readonly Head: Enum.AssetType;
		readonly Face: Enum.AssetType;
		readonly Gear: Enum.AssetType;
		readonly Badge: Enum.AssetType;
		readonly Animation: Enum.AssetType;
		readonly Torso: Enum.AssetType;
		readonly RightArm: Enum.AssetType;
		readonly LeftArm: Enum.AssetType;
		readonly LeftLeg: Enum.AssetType;
		readonly RightLeg: Enum.AssetType;
		readonly Package: Enum.AssetType;
		readonly GamePass: Enum.AssetType;
		readonly Plugin: Enum.AssetType;
		readonly MeshPart: Enum.AssetType;
		readonly HairAccessory: Enum.AssetType;
		readonly FaceAccessory: Enum.AssetType;
		readonly NeckAccessory: Enum.AssetType;
		readonly ShoulderAccessory: Enum.AssetType;
		readonly FrontAccessory: Enum.AssetType;
		readonly BackAccessory: Enum.AssetType;
		readonly WaistAccessory: Enum.AssetType;
		readonly ClimbAnimation: Enum.AssetType;
		readonly DeathAnimation: Enum.AssetType;
		readonly FallAnimation: Enum.AssetType;
		readonly IdleAnimation: Enum.AssetType;
		readonly JumpAnimation: Enum.AssetType;
		readonly RunAnimation: Enum.AssetType;
		readonly SwimAnimation: Enum.AssetType;
		readonly WalkAnimation: Enum.AssetType;
		readonly PoseAnimation: Enum.AssetType;
		readonly EmoteAnimation: Enum.AssetType;
		readonly Video: Enum.AssetType;
		readonly TShirtAccessory: Enum.AssetType;
		readonly ShirtAccessory: Enum.AssetType;
		readonly PantsAccessory: Enum.AssetType;
		readonly JacketAccessory: Enum.AssetType;
		readonly SweaterAccessory: Enum.AssetType;
		readonly ShortsAccessory: Enum.AssetType;
		readonly LeftShoeAccessory: Enum.AssetType;
		readonly RightShoeAccessory: Enum.AssetType;
		readonly DressSkirtAccessory: Enum.AssetType;
		readonly FontFamily: Enum.AssetType;
		readonly EyebrowAccessory: Enum.AssetType;
		readonly EyelashAccessory: Enum.AssetType;
		readonly MoodAnimation: Enum.AssetType;
		readonly DynamicHead: Enum.AssetType;
		readonly FaceMakeup: Enum.AssetType;
		readonly LipMakeup: Enum.AssetType;
		readonly EyeMakeup: Enum.AssetType;
		readonly EarAccessory: Enum.AssetType;
		readonly EyeAccessory: Enum.AssetType;
	};

	interface AssetTypeVerification extends EnumItem {}
	const AssetTypeVerification: {
		readonly Default: Enum.AssetTypeVerification;
		readonly ClientOnly: Enum.AssetTypeVerification;
		readonly Always: Enum.AssetTypeVerification;
	};

	interface AudioApiRollout extends EnumItem {}
	const AudioApiRollout: {
		readonly Disabled: Enum.AudioApiRollout;
		readonly Automatic: Enum.AudioApiRollout;
		readonly Enabled: Enum.AudioApiRollout;
	};

	interface AudioCaptureMode extends EnumItem {}
	const AudioCaptureMode: {
	};

	interface AudioChannelLayout extends EnumItem {}
	const AudioChannelLayout: {
		readonly Mono: Enum.AudioChannelLayout;
		readonly Stereo: Enum.AudioChannelLayout;
		readonly Quad: Enum.AudioChannelLayout;
		readonly Surround_5: Enum.AudioChannelLayout;
		readonly Surround_5_1: Enum.AudioChannelLayout;
		readonly Surround_7_1: Enum.AudioChannelLayout;
		readonly Surround_7_1_4: Enum.AudioChannelLayout;
	};

	interface AudioFilterType extends EnumItem {}
	const AudioFilterType: {
		readonly Peak: Enum.AudioFilterType;
		readonly LowShelf: Enum.AudioFilterType;
		readonly HighShelf: Enum.AudioFilterType;
		readonly Lowpass12dB: Enum.AudioFilterType;
		readonly Lowpass24dB: Enum.AudioFilterType;
		readonly Lowpass48dB: Enum.AudioFilterType;
		readonly Highpass12dB: Enum.AudioFilterType;
		readonly Highpass24dB: Enum.AudioFilterType;
		readonly Highpass48dB: Enum.AudioFilterType;
		readonly Bandpass: Enum.AudioFilterType;
		readonly Notch: Enum.AudioFilterType;
		readonly Lowpass6dB: Enum.AudioFilterType;
	};

	interface AudioSimulationFidelity extends EnumItem {}
	const AudioSimulationFidelity: {
		readonly None: Enum.AudioSimulationFidelity;
		readonly Automatic: Enum.AudioSimulationFidelity;
	};

	interface AudioSubType extends EnumItem {}
	const AudioSubType: {
		readonly Music: Enum.AudioSubType;
		readonly SoundEffect: Enum.AudioSubType;
	};

	interface AudioWindowSize extends EnumItem {}
	const AudioWindowSize: {
		readonly Small: Enum.AudioWindowSize;
		readonly Medium: Enum.AudioWindowSize;
		readonly Large: Enum.AudioWindowSize;
	};

	interface AuthorityMode extends EnumItem {}
	const AuthorityMode: {
		readonly Server: Enum.AuthorityMode;
		readonly Automatic: Enum.AuthorityMode;
	};

	interface AutoIndentRule extends EnumItem {}
	const AutoIndentRule: {
		readonly Off: Enum.AutoIndentRule;
		readonly Absolute: Enum.AutoIndentRule;
		readonly Relative: Enum.AutoIndentRule;
	};

	interface AutomaticSize extends EnumItem {}
	const AutomaticSize: {
		readonly None: Enum.AutomaticSize;
		readonly X: Enum.AutomaticSize;
		readonly Y: Enum.AutomaticSize;
		readonly XY: Enum.AutomaticSize;
	};

	interface AvatarAssetType extends EnumItem {}
	const AvatarAssetType: {
		readonly TShirt: Enum.AvatarAssetType;
		readonly Hat: Enum.AvatarAssetType;
		readonly Shirt: Enum.AvatarAssetType;
		readonly Pants: Enum.AvatarAssetType;
		readonly Head: Enum.AvatarAssetType;
		readonly Face: Enum.AvatarAssetType;
		readonly Gear: Enum.AvatarAssetType;
		readonly Torso: Enum.AvatarAssetType;
		readonly RightArm: Enum.AvatarAssetType;
		readonly LeftArm: Enum.AvatarAssetType;
		readonly LeftLeg: Enum.AvatarAssetType;
		readonly RightLeg: Enum.AvatarAssetType;
		readonly HairAccessory: Enum.AvatarAssetType;
		readonly FaceAccessory: Enum.AvatarAssetType;
		readonly NeckAccessory: Enum.AvatarAssetType;
		readonly ShoulderAccessory: Enum.AvatarAssetType;
		readonly FrontAccessory: Enum.AvatarAssetType;
		readonly BackAccessory: Enum.AvatarAssetType;
		readonly WaistAccessory: Enum.AvatarAssetType;
		readonly ClimbAnimation: Enum.AvatarAssetType;
		readonly FallAnimation: Enum.AvatarAssetType;
		readonly IdleAnimation: Enum.AvatarAssetType;
		readonly JumpAnimation: Enum.AvatarAssetType;
		readonly RunAnimation: Enum.AvatarAssetType;
		readonly SwimAnimation: Enum.AvatarAssetType;
		readonly WalkAnimation: Enum.AvatarAssetType;
		readonly MoodAnimation: Enum.AvatarAssetType;
		readonly EmoteAnimation: Enum.AvatarAssetType;
		readonly TShirtAccessory: Enum.AvatarAssetType;
		readonly ShirtAccessory: Enum.AvatarAssetType;
		readonly PantsAccessory: Enum.AvatarAssetType;
		readonly JacketAccessory: Enum.AvatarAssetType;
		readonly SweaterAccessory: Enum.AvatarAssetType;
		readonly ShortsAccessory: Enum.AvatarAssetType;
		readonly LeftShoeAccessory: Enum.AvatarAssetType;
		readonly RightShoeAccessory: Enum.AvatarAssetType;
		readonly DressSkirtAccessory: Enum.AvatarAssetType;
		readonly EyebrowAccessory: Enum.AvatarAssetType;
		readonly EyelashAccessory: Enum.AvatarAssetType;
		readonly DynamicHead: Enum.AvatarAssetType;
		readonly FaceMakeup: Enum.AvatarAssetType;
		readonly LipMakeup: Enum.AvatarAssetType;
		readonly EyeMakeup: Enum.AvatarAssetType;
	};

	interface AvatarChatServiceFeature extends EnumItem {}
	const AvatarChatServiceFeature: {
		readonly None: Enum.AvatarChatServiceFeature;
		readonly UniverseAudio: Enum.AvatarChatServiceFeature;
		readonly UniverseVideo: Enum.AvatarChatServiceFeature;
		readonly PlaceAudio: Enum.AvatarChatServiceFeature;
		readonly PlaceVideo: Enum.AvatarChatServiceFeature;
		readonly UserAudioEligible: Enum.AvatarChatServiceFeature;
		readonly UserAudio: Enum.AvatarChatServiceFeature;
		readonly UserVideoEligible: Enum.AvatarChatServiceFeature;
		readonly UserVideo: Enum.AvatarChatServiceFeature;
		readonly UserBanned: Enum.AvatarChatServiceFeature;
		readonly UserVerifiedForVoice: Enum.AvatarChatServiceFeature;
	};

	interface AvatarContextMenuOption extends EnumItem {}
	const AvatarContextMenuOption: {
		readonly Friend: Enum.AvatarContextMenuOption;
		readonly Chat: Enum.AvatarContextMenuOption;
		readonly Emote: Enum.AvatarContextMenuOption;
		readonly InspectMenu: Enum.AvatarContextMenuOption;
	};

	interface AvatarGenerationError extends EnumItem {}
	const AvatarGenerationError: {
		readonly None: Enum.AvatarGenerationError;
		readonly Unknown: Enum.AvatarGenerationError;
		readonly DownloadFailed: Enum.AvatarGenerationError;
		readonly Canceled: Enum.AvatarGenerationError;
		readonly Offensive: Enum.AvatarGenerationError;
		readonly Timeout: Enum.AvatarGenerationError;
		readonly JobNotFound: Enum.AvatarGenerationError;
	};

	interface AvatarItemType extends EnumItem {}
	const AvatarItemType: {
		readonly Asset: Enum.AvatarItemType;
		readonly Bundle: Enum.AvatarItemType;
	};

	interface AvatarPromptResult extends EnumItem {}
	const AvatarPromptResult: {
		readonly Success: Enum.AvatarPromptResult;
		readonly PermissionDenied: Enum.AvatarPromptResult;
		readonly Failed: Enum.AvatarPromptResult;
	};

	interface AvatarSettingsAccessoryLimitMethod extends EnumItem {}
	const AvatarSettingsAccessoryLimitMethod: {
		readonly Scale: Enum.AvatarSettingsAccessoryLimitMethod;
		readonly Remove: Enum.AvatarSettingsAccessoryLimitMethod;
		readonly PreviewScale: Enum.AvatarSettingsAccessoryLimitMethod;
		readonly PreviewRemove: Enum.AvatarSettingsAccessoryLimitMethod;
	};

	interface AvatarSettingsAccessoryMode extends EnumItem {}
	const AvatarSettingsAccessoryMode: {
		readonly PlayerChoice: Enum.AvatarSettingsAccessoryMode;
		readonly CustomLimit: Enum.AvatarSettingsAccessoryMode;
	};

	interface AvatarSettingsAnimationClipsMode extends EnumItem {}
	const AvatarSettingsAnimationClipsMode: {
		readonly PlayerChoice: Enum.AvatarSettingsAnimationClipsMode;
		readonly CustomClips: Enum.AvatarSettingsAnimationClipsMode;
	};

	interface AvatarSettingsAnimationPacksMode extends EnumItem {}
	const AvatarSettingsAnimationPacksMode: {
		readonly PlayerChoice: Enum.AvatarSettingsAnimationPacksMode;
		readonly StandardR15: Enum.AvatarSettingsAnimationPacksMode;
		readonly StandardR6: Enum.AvatarSettingsAnimationPacksMode;
	};

	interface AvatarSettingsAppearanceMode extends EnumItem {}
	const AvatarSettingsAppearanceMode: {
		readonly PlayerChoice: Enum.AvatarSettingsAppearanceMode;
		readonly CustomParts: Enum.AvatarSettingsAppearanceMode;
		readonly CustomBody: Enum.AvatarSettingsAppearanceMode;
	};

	interface AvatarSettingsBuildMode extends EnumItem {}
	const AvatarSettingsBuildMode: {
		readonly PlayerChoice: Enum.AvatarSettingsBuildMode;
		readonly CustomBuild: Enum.AvatarSettingsBuildMode;
	};

	interface AvatarSettingsClothingMode extends EnumItem {}
	const AvatarSettingsClothingMode: {
		readonly PlayerChoice: Enum.AvatarSettingsClothingMode;
		readonly CustomLimit: Enum.AvatarSettingsClothingMode;
	};

	interface AvatarSettingsCollisionMode extends EnumItem {}
	const AvatarSettingsCollisionMode: {
		readonly Default: Enum.AvatarSettingsCollisionMode;
		readonly SingleCollider: Enum.AvatarSettingsCollisionMode;
		readonly Legacy: Enum.AvatarSettingsCollisionMode;
	};

	interface AvatarSettingsCustomAccessoryMode extends EnumItem {}
	const AvatarSettingsCustomAccessoryMode: {
		readonly PlayerChoice: Enum.AvatarSettingsCustomAccessoryMode;
		readonly CustomAccessories: Enum.AvatarSettingsCustomAccessoryMode;
	};

	interface AvatarSettingsCustomBodyType extends EnumItem {}
	const AvatarSettingsCustomBodyType: {
		readonly AvatarReference: Enum.AvatarSettingsCustomBodyType;
		readonly BundleId: Enum.AvatarSettingsCustomBodyType;
	};

	interface AvatarSettingsCustomClothingMode extends EnumItem {}
	const AvatarSettingsCustomClothingMode: {
		readonly PlayerChoice: Enum.AvatarSettingsCustomClothingMode;
		readonly CustomClothing: Enum.AvatarSettingsCustomClothingMode;
	};

	interface AvatarSettingsHitAndTouchDetectionMode extends EnumItem {}
	const AvatarSettingsHitAndTouchDetectionMode: {
		readonly UseParts: Enum.AvatarSettingsHitAndTouchDetectionMode;
		readonly UseCollider: Enum.AvatarSettingsHitAndTouchDetectionMode;
	};

	interface AvatarSettingsJumpMode extends EnumItem {}
	const AvatarSettingsJumpMode: {
		readonly JumpHeight: Enum.AvatarSettingsJumpMode;
		readonly JumpPower: Enum.AvatarSettingsJumpMode;
	};

	interface AvatarSettingsLegacyCollisionMode extends EnumItem {}
	const AvatarSettingsLegacyCollisionMode: {
		readonly R6Colliders: Enum.AvatarSettingsLegacyCollisionMode;
		readonly InnerBoxColliders: Enum.AvatarSettingsLegacyCollisionMode;
	};

	interface AvatarSettingsScaleMode extends EnumItem {}
	const AvatarSettingsScaleMode: {
		readonly PlayerChoice: Enum.AvatarSettingsScaleMode;
		readonly CustomScale: Enum.AvatarSettingsScaleMode;
	};

	interface AvatarThumbnailCustomizationType extends EnumItem {}
	const AvatarThumbnailCustomizationType: {
		readonly Closeup: Enum.AvatarThumbnailCustomizationType;
		readonly FullBody: Enum.AvatarThumbnailCustomizationType;
	};

	interface AvatarUnificationMode extends EnumItem {}
	const AvatarUnificationMode: {
		readonly Default: Enum.AvatarUnificationMode;
		readonly Disabled: Enum.AvatarUnificationMode;
		readonly Enabled: Enum.AvatarUnificationMode;
	};

	interface Axis extends EnumItem {}
	const Axis: {
		readonly X: Enum.Axis;
		readonly Y: Enum.Axis;
		readonly Z: Enum.Axis;
	};

	interface BenefitType extends EnumItem {}
	const BenefitType: {
		readonly DeveloperProduct: Enum.BenefitType;
		readonly AvatarAsset: Enum.BenefitType;
		readonly AvatarBundle: Enum.BenefitType;
	};

	interface BinType extends EnumItem {}
	const BinType: {
		readonly Script: Enum.BinType;
		readonly GameTool: Enum.BinType;
		readonly Grab: Enum.BinType;
		readonly Clone: Enum.BinType;
		readonly Hammer: Enum.BinType;
	};

	interface BodyPart extends EnumItem {}
	const BodyPart: {
		readonly Head: Enum.BodyPart;
		readonly Torso: Enum.BodyPart;
		readonly LeftArm: Enum.BodyPart;
		readonly RightArm: Enum.BodyPart;
		readonly LeftLeg: Enum.BodyPart;
		readonly RightLeg: Enum.BodyPart;
	};

	interface BodyPartR15 extends EnumItem {}
	const BodyPartR15: {
		readonly Head: Enum.BodyPartR15;
		readonly UpperTorso: Enum.BodyPartR15;
		readonly LowerTorso: Enum.BodyPartR15;
		readonly LeftFoot: Enum.BodyPartR15;
		readonly LeftLowerLeg: Enum.BodyPartR15;
		readonly LeftUpperLeg: Enum.BodyPartR15;
		readonly RightFoot: Enum.BodyPartR15;
		readonly RightLowerLeg: Enum.BodyPartR15;
		readonly RightUpperLeg: Enum.BodyPartR15;
		readonly LeftHand: Enum.BodyPartR15;
		readonly LeftLowerArm: Enum.BodyPartR15;
		readonly LeftUpperArm: Enum.BodyPartR15;
		readonly RightHand: Enum.BodyPartR15;
		readonly RightLowerArm: Enum.BodyPartR15;
		readonly RightUpperArm: Enum.BodyPartR15;
		readonly RootPart: Enum.BodyPartR15;
		readonly Unknown: Enum.BodyPartR15;
	};

	interface BorderMode extends EnumItem {}
	const BorderMode: {
		readonly Outline: Enum.BorderMode;
		readonly Middle: Enum.BorderMode;
		readonly Inset: Enum.BorderMode;
	};

	interface BorderStrokePosition extends EnumItem {}
	const BorderStrokePosition: {
		readonly Outer: Enum.BorderStrokePosition;
		readonly Center: Enum.BorderStrokePosition;
		readonly Inner: Enum.BorderStrokePosition;
	};

	interface BreakReason extends EnumItem {}
	const BreakReason: {
		readonly Other: Enum.BreakReason;
		readonly Error: Enum.BreakReason;
		readonly SpecialBreakpoint: Enum.BreakReason;
		readonly UserBreakpoint: Enum.BreakReason;
	};

	interface BreakpointRemoveReason extends EnumItem {}
	const BreakpointRemoveReason: {
		readonly Requested: Enum.BreakpointRemoveReason;
		readonly ScriptChanged: Enum.BreakpointRemoveReason;
		readonly ScriptRemoved: Enum.BreakpointRemoveReason;
	};

	interface BulkMoveMode extends EnumItem {}
	const BulkMoveMode: {
		readonly FireAllEvents: Enum.BulkMoveMode;
		readonly FireCFrameChanged: Enum.BulkMoveMode;
	};

	interface BundleType extends EnumItem {}
	const BundleType: {
		readonly BodyParts: Enum.BundleType;
		readonly Animations: Enum.BundleType;
		readonly Shoes: Enum.BundleType;
		readonly DynamicHead: Enum.BundleType;
		readonly DynamicHeadAvatar: Enum.BundleType;
	};

	interface Button extends EnumItem {}
	const Button: {
		readonly Jump: Enum.Button;
		readonly Dismount: Enum.Button;
	};

	interface ButtonStyle extends EnumItem {}
	const ButtonStyle: {
		readonly Custom: Enum.ButtonStyle;
		readonly RobloxButtonDefault: Enum.ButtonStyle;
		readonly RobloxButton: Enum.ButtonStyle;
		readonly RobloxRoundButton: Enum.ButtonStyle;
		readonly RobloxRoundDefaultButton: Enum.ButtonStyle;
		readonly RobloxRoundDropdownButton: Enum.ButtonStyle;
	};

	interface CageType extends EnumItem {}
	const CageType: {
		readonly Inner: Enum.CageType;
		readonly Outer: Enum.CageType;
	};

	interface CameraMode extends EnumItem {}
	const CameraMode: {
		readonly Classic: Enum.CameraMode;
		readonly LockFirstPerson: Enum.CameraMode;
	};

	interface CameraNavigationModel extends EnumItem {}
	const CameraNavigationModel: {
		readonly Roblox: Enum.CameraNavigationModel;
		readonly IndustryCompatible: Enum.CameraNavigationModel;
	};

	interface CameraPanMode extends EnumItem {}
	const CameraPanMode: {
		readonly Classic: Enum.CameraPanMode;
		readonly EdgeBump: Enum.CameraPanMode;
	};

	interface CameraSpeedAdjustBinding extends EnumItem {}
	const CameraSpeedAdjustBinding: {
		readonly None: Enum.CameraSpeedAdjustBinding;
		readonly RmbScroll: Enum.CameraSpeedAdjustBinding;
		readonly AltScroll: Enum.CameraSpeedAdjustBinding;
	};

	interface CameraType extends EnumItem {}
	const CameraType: {
		readonly Fixed: Enum.CameraType;
		readonly Attach: Enum.CameraType;
		readonly Watch: Enum.CameraType;
		readonly Track: Enum.CameraType;
		readonly Follow: Enum.CameraType;
		readonly Custom: Enum.CameraType;
		readonly Scriptable: Enum.CameraType;
		readonly Orbital: Enum.CameraType;
	};

	interface CaptureGalleryPermission extends EnumItem {}
	const CaptureGalleryPermission: {
		readonly ReadAndUpload: Enum.CaptureGalleryPermission;
	};

	interface CaptureType extends EnumItem {}
	const CaptureType: {
		readonly Screenshot: Enum.CaptureType;
		readonly Video: Enum.CaptureType;
	};

	interface CatalogCategoryFilter extends EnumItem {}
	const CatalogCategoryFilter: {
		readonly None: Enum.CatalogCategoryFilter;
		readonly Featured: Enum.CatalogCategoryFilter;
		readonly Collectibles: Enum.CatalogCategoryFilter;
		readonly CommunityCreations: Enum.CatalogCategoryFilter;
		readonly Premium: Enum.CatalogCategoryFilter;
		readonly Recommended: Enum.CatalogCategoryFilter;
	};

	interface CatalogSortAggregation extends EnumItem {}
	const CatalogSortAggregation: {
		readonly Past12Hours: Enum.CatalogSortAggregation;
		readonly PastDay: Enum.CatalogSortAggregation;
		readonly Past3Days: Enum.CatalogSortAggregation;
		readonly PastWeek: Enum.CatalogSortAggregation;
		readonly PastMonth: Enum.CatalogSortAggregation;
		readonly AllTime: Enum.CatalogSortAggregation;
	};

	interface CatalogSortType extends EnumItem {}
	const CatalogSortType: {
		readonly Relevance: Enum.CatalogSortType;
		readonly PriceHighToLow: Enum.CatalogSortType;
		readonly PriceLowToHigh: Enum.CatalogSortType;
		readonly MostFavorited: Enum.CatalogSortType;
		readonly RecentlyCreated: Enum.CatalogSortType;
		readonly Bestselling: Enum.CatalogSortType;
	};

	interface CellBlock extends EnumItem {}
	const CellBlock: {
		readonly Solid: Enum.CellBlock;
		readonly VerticalWedge: Enum.CellBlock;
		readonly CornerWedge: Enum.CellBlock;
		readonly InverseCornerWedge: Enum.CellBlock;
		readonly HorizontalWedge: Enum.CellBlock;
	};

	interface CellMaterial extends EnumItem {}
	const CellMaterial: {
		readonly Empty: Enum.CellMaterial;
		readonly Grass: Enum.CellMaterial;
		readonly Sand: Enum.CellMaterial;
		readonly Brick: Enum.CellMaterial;
		readonly Granite: Enum.CellMaterial;
		readonly Asphalt: Enum.CellMaterial;
		readonly Iron: Enum.CellMaterial;
		readonly Aluminum: Enum.CellMaterial;
		readonly Gold: Enum.CellMaterial;
		readonly WoodPlank: Enum.CellMaterial;
		readonly WoodLog: Enum.CellMaterial;
		readonly Gravel: Enum.CellMaterial;
		readonly CinderBlock: Enum.CellMaterial;
		readonly MossyStone: Enum.CellMaterial;
		readonly Cement: Enum.CellMaterial;
		readonly RedPlastic: Enum.CellMaterial;
		readonly BluePlastic: Enum.CellMaterial;
		readonly Water: Enum.CellMaterial;
	};

	interface CellOrientation extends EnumItem {}
	const CellOrientation: {
		readonly NegZ: Enum.CellOrientation;
		readonly X: Enum.CellOrientation;
		readonly Z: Enum.CellOrientation;
		readonly NegX: Enum.CellOrientation;
	};

	interface CenterDialogType extends EnumItem {}
	const CenterDialogType: {
		readonly UnsolicitedDialog: Enum.CenterDialogType;
		readonly PlayerInitiatedDialog: Enum.CenterDialogType;
		readonly ModalDialog: Enum.CenterDialogType;
		readonly QuitDialog: Enum.CenterDialogType;
	};

	interface CharacterControlMode extends EnumItem {}
	const CharacterControlMode: {
		readonly Default: Enum.CharacterControlMode;
		readonly Legacy: Enum.CharacterControlMode;
		readonly NoCharacterController: Enum.CharacterControlMode;
		readonly LuaCharacterController: Enum.CharacterControlMode;
	};

	interface ChatCallbackType extends EnumItem {}
	const ChatCallbackType: {
		readonly OnCreatingChatWindow: Enum.ChatCallbackType;
		readonly OnClientSendingMessage: Enum.ChatCallbackType;
		readonly OnClientFormattingMessage: Enum.ChatCallbackType;
		readonly OnServerReceivingMessage: Enum.ChatCallbackType;
	};

	interface ChatColor extends EnumItem {}
	const ChatColor: {
		readonly Blue: Enum.ChatColor;
		readonly Green: Enum.ChatColor;
		readonly Red: Enum.ChatColor;
		readonly White: Enum.ChatColor;
	};

	interface ChatMode extends EnumItem {}
	const ChatMode: {
		readonly Menu: Enum.ChatMode;
		readonly TextAndMenu: Enum.ChatMode;
	};

	interface ChatPrivacyMode extends EnumItem {}
	const ChatPrivacyMode: {
		readonly AllUsers: Enum.ChatPrivacyMode;
		readonly NoOne: Enum.ChatPrivacyMode;
		readonly Friends: Enum.ChatPrivacyMode;
	};

	interface ChatRestrictionStatus extends EnumItem {}
	const ChatRestrictionStatus: {
		readonly Unknown: Enum.ChatRestrictionStatus;
		readonly NotRestricted: Enum.ChatRestrictionStatus;
		readonly Restricted: Enum.ChatRestrictionStatus;
	};

	interface ChatStyle extends EnumItem {}
	const ChatStyle: {
		readonly Classic: Enum.ChatStyle;
		readonly Bubble: Enum.ChatStyle;
		readonly ClassicAndBubble: Enum.ChatStyle;
	};

	interface ChatVersion extends EnumItem {}
	const ChatVersion: {
		readonly LegacyChatService: Enum.ChatVersion;
		readonly TextChatService: Enum.ChatVersion;
	};

	interface ClientAnimatorThrottlingMode extends EnumItem {}
	const ClientAnimatorThrottlingMode: {
		readonly Default: Enum.ClientAnimatorThrottlingMode;
		readonly Disabled: Enum.ClientAnimatorThrottlingMode;
		readonly Enabled: Enum.ClientAnimatorThrottlingMode;
	};

	interface CloseReason extends EnumItem {}
	const CloseReason: {
		readonly Unknown: Enum.CloseReason;
		readonly RobloxMaintenance: Enum.CloseReason;
		readonly DeveloperShutdown: Enum.CloseReason;
		readonly DeveloperUpdate: Enum.CloseReason;
		readonly ServerEmpty: Enum.CloseReason;
		readonly OutOfMemory: Enum.CloseReason;
	};

	interface CollaboratorStatus extends EnumItem {}
	const CollaboratorStatus: {
		readonly None: Enum.CollaboratorStatus;
		readonly Editing3D: Enum.CollaboratorStatus;
		readonly Scripting: Enum.CollaboratorStatus;
		readonly PrivateScripting: Enum.CollaboratorStatus;
	};

	interface CollisionFidelity extends EnumItem {}
	const CollisionFidelity: {
		readonly Default: Enum.CollisionFidelity;
		readonly Hull: Enum.CollisionFidelity;
		readonly Box: Enum.CollisionFidelity;
		readonly PreciseConvexDecomposition: Enum.CollisionFidelity;
	};

	interface CommandPermission extends EnumItem {}
	const CommandPermission: {
		readonly Plugin: Enum.CommandPermission;
		readonly LocalUser: Enum.CommandPermission;
	};

	interface CompileTarget extends EnumItem {}
	const CompileTarget: {
		readonly Client: Enum.CompileTarget;
		readonly CoreScript: Enum.CompileTarget;
		readonly Studio: Enum.CompileTarget;
		readonly CoreScriptRaw: Enum.CompileTarget;
	};

	interface CompletionAcceptanceBehavior extends EnumItem {}
	const CompletionAcceptanceBehavior: {
		readonly Insert: Enum.CompletionAcceptanceBehavior;
		readonly Replace: Enum.CompletionAcceptanceBehavior;
		readonly ReplaceOnEnterInsertOnTab: Enum.CompletionAcceptanceBehavior;
		readonly InsertOnEnterReplaceOnTab: Enum.CompletionAcceptanceBehavior;
	};

	interface CompletionItemKind extends EnumItem {}
	const CompletionItemKind: {
		readonly Text: Enum.CompletionItemKind;
		readonly Method: Enum.CompletionItemKind;
		readonly Function: Enum.CompletionItemKind;
		readonly Constructor: Enum.CompletionItemKind;
		readonly Field: Enum.CompletionItemKind;
		readonly Variable: Enum.CompletionItemKind;
		readonly Class: Enum.CompletionItemKind;
		readonly Interface: Enum.CompletionItemKind;
		readonly Module: Enum.CompletionItemKind;
		readonly Property: Enum.CompletionItemKind;
		readonly Unit: Enum.CompletionItemKind;
		readonly Value: Enum.CompletionItemKind;
		readonly Enum: Enum.CompletionItemKind;
		readonly Keyword: Enum.CompletionItemKind;
		readonly Snippet: Enum.CompletionItemKind;
		readonly Color: Enum.CompletionItemKind;
		readonly File: Enum.CompletionItemKind;
		readonly Reference: Enum.CompletionItemKind;
		readonly Folder: Enum.CompletionItemKind;
		readonly EnumMember: Enum.CompletionItemKind;
		readonly Constant: Enum.CompletionItemKind;
		readonly Struct: Enum.CompletionItemKind;
		readonly Event: Enum.CompletionItemKind;
		readonly Operator: Enum.CompletionItemKind;
		readonly TypeParameter: Enum.CompletionItemKind;
	};

	interface CompletionItemTag extends EnumItem {}
	const CompletionItemTag: {
		readonly Deprecated: Enum.CompletionItemTag;
		readonly IncorrectIndexType: Enum.CompletionItemTag;
		readonly PluginPermissions: Enum.CompletionItemTag;
		readonly CommandLinePermissions: Enum.CompletionItemTag;
		readonly RobloxPermissions: Enum.CompletionItemTag;
		readonly AddParens: Enum.CompletionItemTag;
		readonly PutCursorInParens: Enum.CompletionItemTag;
		readonly TypeCorrect: Enum.CompletionItemTag;
		readonly ClientServerBoundaryViolation: Enum.CompletionItemTag;
		readonly Invalidated: Enum.CompletionItemTag;
		readonly PutCursorBeforeEnd: Enum.CompletionItemTag;
	};

	interface CompletionTriggerKind extends EnumItem {}
	const CompletionTriggerKind: {
		readonly Invoked: Enum.CompletionTriggerKind;
		readonly TriggerCharacter: Enum.CompletionTriggerKind;
		readonly TriggerForIncompleteCompletions: Enum.CompletionTriggerKind;
	};

	interface CompositeValueCurveType extends EnumItem {}
	const CompositeValueCurveType: {
		readonly ColorRGB: Enum.CompositeValueCurveType;
		readonly ColorHSV: Enum.CompositeValueCurveType;
		readonly NumberRange: Enum.CompositeValueCurveType;
		readonly Rect: Enum.CompositeValueCurveType;
		readonly UDim: Enum.CompositeValueCurveType;
		readonly UDim2: Enum.CompositeValueCurveType;
		readonly Vector2: Enum.CompositeValueCurveType;
		readonly Vector3: Enum.CompositeValueCurveType;
	};

	interface CompressionAlgorithm extends EnumItem {}
	const CompressionAlgorithm: {
		readonly Zstd: Enum.CompressionAlgorithm;
	};

	interface ComputerCameraMovementMode extends EnumItem {}
	const ComputerCameraMovementMode: {
		readonly Default: Enum.ComputerCameraMovementMode;
		readonly Classic: Enum.ComputerCameraMovementMode;
		readonly Follow: Enum.ComputerCameraMovementMode;
		readonly Orbital: Enum.ComputerCameraMovementMode;
		readonly CameraToggle: Enum.ComputerCameraMovementMode;
	};

	interface ComputerMovementMode extends EnumItem {}
	const ComputerMovementMode: {
		readonly Default: Enum.ComputerMovementMode;
		readonly KeyboardMouse: Enum.ComputerMovementMode;
		readonly ClickToMove: Enum.ComputerMovementMode;
	};

	interface ConfigSnapshotErrorState extends EnumItem {}
	const ConfigSnapshotErrorState: {
		readonly None: Enum.ConfigSnapshotErrorState;
		readonly LoadFailed: Enum.ConfigSnapshotErrorState;
	};

	interface ConnectionError extends EnumItem {}
	const ConnectionError: {
		readonly OK: Enum.ConnectionError;
		readonly Unknown: Enum.ConnectionError;
		readonly ConnectErrors: Enum.ConnectionError;
		readonly AlreadyConnected: Enum.ConnectionError;
		readonly NoFreeIncomingConnections: Enum.ConnectionError;
		readonly ConnectionBanned: Enum.ConnectionError;
		readonly InvalidPassword: Enum.ConnectionError;
		readonly IncompatibleProtocolVersion: Enum.ConnectionError;
		readonly IPRecentlyConnected: Enum.ConnectionError;
		readonly OurSystemRequiresSecurity: Enum.ConnectionError;
		readonly SecurityKeyMismatch: Enum.ConnectionError;
		readonly DisconnectErrors: Enum.ConnectionError;
		readonly DisconnectBadhash: Enum.ConnectionError;
		readonly DisconnectSecurityKeyMismatch: Enum.ConnectionError;
		readonly DisconnectProtocolMismatch: Enum.ConnectionError;
		readonly DisconnectReceivePacketError: Enum.ConnectionError;
		readonly DisconnectReceivePacketStreamError: Enum.ConnectionError;
		readonly DisconnectSendPacketError: Enum.ConnectionError;
		readonly DisconnectIllegalTeleport: Enum.ConnectionError;
		readonly DisconnectDuplicatePlayer: Enum.ConnectionError;
		readonly DisconnectDuplicateTicket: Enum.ConnectionError;
		readonly DisconnectTimeout: Enum.ConnectionError;
		readonly DisconnectLuaKick: Enum.ConnectionError;
		readonly DisconnectOnRemoteSysStats: Enum.ConnectionError;
		readonly DisconnectHashTimeout: Enum.ConnectionError;
		readonly DisconnectCloudEditKick: Enum.ConnectionError;
		readonly DisconnectPlayerless: Enum.ConnectionError;
		readonly DisconnectNewSecurityKeyMismatch: Enum.ConnectionError;
		readonly DisconnectEvicted: Enum.ConnectionError;
		readonly DisconnectDevMaintenance: Enum.ConnectionError;
		readonly DisconnectRobloxMaintenance: Enum.ConnectionError;
		readonly DisconnectRejoin: Enum.ConnectionError;
		readonly DisconnectConnectionLost: Enum.ConnectionError;
		readonly DisconnectIdle: Enum.ConnectionError;
		readonly DisconnectRaknetErrors: Enum.ConnectionError;
		readonly DisconnectWrongVersion: Enum.ConnectionError;
		readonly DisconnectBySecurityPolicy: Enum.ConnectionError;
		readonly DisconnectBlockedIP: Enum.ConnectionError;
		readonly DisconnectClientFailure: Enum.ConnectionError;
		readonly DisconnectClientRequest: Enum.ConnectionError;
		readonly DisconnectPrivateServerKickout: Enum.ConnectionError;
		readonly DisconnectModeratedGame: Enum.ConnectionError;
		readonly ServerShutdown: Enum.ConnectionError;
		readonly ReplicatorTimeout: Enum.ConnectionError;
		readonly PlayerRemoved: Enum.ConnectionError;
		readonly DisconnectOutOfMemoryKeepPlayingLeave: Enum.ConnectionError;
		readonly DisconnectRomarkEndOfTest: Enum.ConnectionError;
		readonly DisconnectCollaboratorPermissionRevoked: Enum.ConnectionError;
		readonly DisconnectCollaboratorUnderage: Enum.ConnectionError;
		readonly NetworkInternal: Enum.ConnectionError;
		readonly NetworkSend: Enum.ConnectionError;
		readonly NetworkTimeout: Enum.ConnectionError;
		readonly NetworkMisbehavior: Enum.ConnectionError;
		readonly NetworkSecurity: Enum.ConnectionError;
		readonly ReplacementReady: Enum.ConnectionError;
		readonly ServerEmpty: Enum.ConnectionError;
		readonly PhantomFreeze: Enum.ConnectionError;
		readonly AndroidAnticheatKick: Enum.ConnectionError;
		readonly AndroidEmulatorKick: Enum.ConnectionError;
		readonly AndroidRootedKick: Enum.ConnectionError;
		readonly ScreentimeLockoutKick: Enum.ConnectionError;
		readonly DisconnectionNotification: Enum.ConnectionError;
		readonly DisconnectVerboselyModeratedGame: Enum.ConnectionError;
		readonly DisconnectCollaboratorNotAgeVerified: Enum.ConnectionError;
		readonly DisconnectCollaboratorTrustedConnectionsRequired: Enum.ConnectionError;
		readonly DisconnectCollaboratorOwnerActionRequired: Enum.ConnectionError;
		readonly DisconnectCollaboratorTooManyCollaborators: Enum.ConnectionError;
		readonly DisconnectCollaboratorUnknownError: Enum.ConnectionError;
		readonly PlacelaunchErrors: Enum.ConnectionError;
		readonly PlacelaunchDisabled: Enum.ConnectionError;
		readonly PlacelaunchError: Enum.ConnectionError;
		readonly PlacelaunchGameEnded: Enum.ConnectionError;
		readonly PlacelaunchGameFull: Enum.ConnectionError;
		readonly PlacelaunchUserLeft: Enum.ConnectionError;
		readonly PlacelaunchRestricted: Enum.ConnectionError;
		readonly PlacelaunchUnauthorized: Enum.ConnectionError;
		readonly PlacelaunchFlooded: Enum.ConnectionError;
		readonly PlacelaunchHashExpired: Enum.ConnectionError;
		readonly PlacelaunchHashException: Enum.ConnectionError;
		readonly PlacelaunchPartyCannotFit: Enum.ConnectionError;
		readonly PlacelaunchHttpError: Enum.ConnectionError;
		readonly PlacelaunchUserPrivacyUnauthorized: Enum.ConnectionError;
		readonly PlacelaunchCreatorBan: Enum.ConnectionError;
		readonly PlacelaunchCustomMessage: Enum.ConnectionError;
		readonly PlacelaunchOtherError: Enum.ConnectionError;
		readonly TeleportErrors: Enum.ConnectionError;
		readonly TeleportFailure: Enum.ConnectionError;
		readonly TeleportGameNotFound: Enum.ConnectionError;
		readonly TeleportGameEnded: Enum.ConnectionError;
		readonly TeleportGameFull: Enum.ConnectionError;
		readonly TeleportUnauthorized: Enum.ConnectionError;
		readonly TeleportFlooded: Enum.ConnectionError;
		readonly TeleportIsTeleporting: Enum.ConnectionError;
	};

	interface ConnectionState extends EnumItem {}
	const ConnectionState: {
		readonly Connected: Enum.ConnectionState;
		readonly Disconnected: Enum.ConnectionState;
	};

	interface ContentSourceType extends EnumItem {}
	const ContentSourceType: {
		readonly None: Enum.ContentSourceType;
		readonly Uri: Enum.ContentSourceType;
		readonly Object: Enum.ContentSourceType;
		readonly Opaque: Enum.ContentSourceType;
	};

	interface ContextActionPriority extends EnumItem {}
	const ContextActionPriority: {
		readonly Low: Enum.ContextActionPriority;
		readonly Medium: Enum.ContextActionPriority;
		readonly High: Enum.ContextActionPriority;
	};

	interface ContextActionResult extends EnumItem {}
	const ContextActionResult: {
		readonly Sink: Enum.ContextActionResult;
		readonly Pass: Enum.ContextActionResult;
	};

	interface ControlMode extends EnumItem {}
	const ControlMode: {
		readonly Classic: Enum.ControlMode;
		readonly MouseLockSwitch: Enum.ControlMode;
	};

	interface CoreGuiType extends EnumItem {}
	const CoreGuiType: {
		readonly PlayerList: Enum.CoreGuiType;
		readonly Health: Enum.CoreGuiType;
		readonly Backpack: Enum.CoreGuiType;
		readonly Chat: Enum.CoreGuiType;
		readonly All: Enum.CoreGuiType;
		readonly EmotesMenu: Enum.CoreGuiType;
		readonly SelfView: Enum.CoreGuiType;
		readonly Captures: Enum.CoreGuiType;
		readonly AvatarSwitcher: Enum.CoreGuiType;
	};

	interface CreateAssetResult extends EnumItem {}
	const CreateAssetResult: {
		readonly Success: Enum.CreateAssetResult;
		readonly PermissionDenied: Enum.CreateAssetResult;
		readonly UploadFailed: Enum.CreateAssetResult;
		readonly Unknown: Enum.CreateAssetResult;
	};

	interface CreateOutfitFailure extends EnumItem {}
	const CreateOutfitFailure: {
		readonly InvalidName: Enum.CreateOutfitFailure;
		readonly OutfitLimitReached: Enum.CreateOutfitFailure;
		readonly Other: Enum.CreateOutfitFailure;
	};

	interface CreatorType extends EnumItem {}
	const CreatorType: {
		readonly User: Enum.CreatorType;
		readonly Group: Enum.CreatorType;
	};

	interface CreatorTypeFilter extends EnumItem {}
	const CreatorTypeFilter: {
		readonly User: Enum.CreatorTypeFilter;
		readonly Group: Enum.CreatorTypeFilter;
		readonly All: Enum.CreatorTypeFilter;
	};

	interface CurrencyType extends EnumItem {}
	const CurrencyType: {
		readonly Default: Enum.CurrencyType;
		readonly Robux: Enum.CurrencyType;
		readonly Tix: Enum.CurrencyType;
	};

	interface CustomCameraMode extends EnumItem {}
	const CustomCameraMode: {
		readonly Default: Enum.CustomCameraMode;
		readonly Classic: Enum.CustomCameraMode;
		readonly Follow: Enum.CustomCameraMode;
	};

	interface DataModelExtractorFileType extends EnumItem {}
	const DataModelExtractorFileType: {
		readonly PlaceFile: Enum.DataModelExtractorFileType;
		readonly FirstSlice: Enum.DataModelExtractorFileType;
		readonly NonFirstSlice: Enum.DataModelExtractorFileType;
	};

	interface DataStoreRequestType extends EnumItem {}
	const DataStoreRequestType: {
		readonly GetAsync: Enum.DataStoreRequestType;
		readonly SetIncrementAsync: Enum.DataStoreRequestType;
		readonly UpdateAsync: Enum.DataStoreRequestType;
		readonly GetSortedAsync: Enum.DataStoreRequestType;
		readonly SetIncrementSortedAsync: Enum.DataStoreRequestType;
		readonly OnUpdate: Enum.DataStoreRequestType;
		readonly ListAsync: Enum.DataStoreRequestType;
		readonly GetVersionAsync: Enum.DataStoreRequestType;
		readonly RemoveVersionAsync: Enum.DataStoreRequestType;
		readonly StandardRead: Enum.DataStoreRequestType;
		readonly StandardWrite: Enum.DataStoreRequestType;
		readonly StandardList: Enum.DataStoreRequestType;
		readonly StandardRemove: Enum.DataStoreRequestType;
		readonly OrderedRead: Enum.DataStoreRequestType;
		readonly OrderedWrite: Enum.DataStoreRequestType;
		readonly OrderedList: Enum.DataStoreRequestType;
		readonly OrderedRemove: Enum.DataStoreRequestType;
	};

	interface DebuggerEndReason extends EnumItem {}
	const DebuggerEndReason: {
		readonly ClientRequest: Enum.DebuggerEndReason;
		readonly Timeout: Enum.DebuggerEndReason;
		readonly InvalidHost: Enum.DebuggerEndReason;
		readonly Disconnected: Enum.DebuggerEndReason;
		readonly ServerShutdown: Enum.DebuggerEndReason;
		readonly ServerProtocolMismatch: Enum.DebuggerEndReason;
		readonly ConfigurationFailed: Enum.DebuggerEndReason;
		readonly RpcError: Enum.DebuggerEndReason;
	};

	interface DebuggerExceptionBreakMode extends EnumItem {}
	const DebuggerExceptionBreakMode: {
		readonly Never: Enum.DebuggerExceptionBreakMode;
		readonly Always: Enum.DebuggerExceptionBreakMode;
		readonly Unhandled: Enum.DebuggerExceptionBreakMode;
	};

	interface DebuggerFrameType extends EnumItem {}
	const DebuggerFrameType: {
		readonly C: Enum.DebuggerFrameType;
		readonly Lua: Enum.DebuggerFrameType;
	};

	interface DebuggerPauseReason extends EnumItem {}
	const DebuggerPauseReason: {
		readonly Unknown: Enum.DebuggerPauseReason;
		readonly Requested: Enum.DebuggerPauseReason;
		readonly Breakpoint: Enum.DebuggerPauseReason;
		readonly Exception: Enum.DebuggerPauseReason;
		readonly SingleStep: Enum.DebuggerPauseReason;
		readonly Entrypoint: Enum.DebuggerPauseReason;
	};

	interface DebuggerStatus extends EnumItem {}
	const DebuggerStatus: {
		readonly Success: Enum.DebuggerStatus;
		readonly Timeout: Enum.DebuggerStatus;
		readonly ConnectionLost: Enum.DebuggerStatus;
		readonly InvalidResponse: Enum.DebuggerStatus;
		readonly InternalError: Enum.DebuggerStatus;
		readonly InvalidState: Enum.DebuggerStatus;
		readonly RpcError: Enum.DebuggerStatus;
		readonly InvalidArgument: Enum.DebuggerStatus;
		readonly ConnectionClosed: Enum.DebuggerStatus;
	};

	interface DefaultScriptSyncFileType extends EnumItem {}
	const DefaultScriptSyncFileType: {
		readonly Lua: Enum.DefaultScriptSyncFileType;
		readonly Luau: Enum.DefaultScriptSyncFileType;
	};

	interface DevCameraOcclusionMode extends EnumItem {}
	const DevCameraOcclusionMode: {
		readonly Zoom: Enum.DevCameraOcclusionMode;
		readonly Invisicam: Enum.DevCameraOcclusionMode;
	};

	interface DevComputerCameraMovementMode extends EnumItem {}
	const DevComputerCameraMovementMode: {
		readonly UserChoice: Enum.DevComputerCameraMovementMode;
		readonly Classic: Enum.DevComputerCameraMovementMode;
		readonly Follow: Enum.DevComputerCameraMovementMode;
		readonly Orbital: Enum.DevComputerCameraMovementMode;
		readonly CameraToggle: Enum.DevComputerCameraMovementMode;
	};

	interface DevComputerMovementMode extends EnumItem {}
	const DevComputerMovementMode: {
		readonly UserChoice: Enum.DevComputerMovementMode;
		readonly KeyboardMouse: Enum.DevComputerMovementMode;
		readonly ClickToMove: Enum.DevComputerMovementMode;
		readonly Scriptable: Enum.DevComputerMovementMode;
	};

	interface DevTouchCameraMovementMode extends EnumItem {}
	const DevTouchCameraMovementMode: {
		readonly UserChoice: Enum.DevTouchCameraMovementMode;
		readonly Classic: Enum.DevTouchCameraMovementMode;
		readonly Follow: Enum.DevTouchCameraMovementMode;
		readonly Orbital: Enum.DevTouchCameraMovementMode;
	};

	interface DevTouchMovementMode extends EnumItem {}
	const DevTouchMovementMode: {
		readonly UserChoice: Enum.DevTouchMovementMode;
		readonly Thumbstick: Enum.DevTouchMovementMode;
		readonly DPad: Enum.DevTouchMovementMode;
		readonly Thumbpad: Enum.DevTouchMovementMode;
		readonly ClickToMove: Enum.DevTouchMovementMode;
		readonly Scriptable: Enum.DevTouchMovementMode;
		readonly DynamicThumbstick: Enum.DevTouchMovementMode;
	};

	interface DeveloperMemoryTag extends EnumItem {}
	const DeveloperMemoryTag: {
		readonly Internal: Enum.DeveloperMemoryTag;
		readonly HttpCache: Enum.DeveloperMemoryTag;
		readonly Instances: Enum.DeveloperMemoryTag;
		readonly Signals: Enum.DeveloperMemoryTag;
		readonly LuaHeap: Enum.DeveloperMemoryTag;
		readonly Script: Enum.DeveloperMemoryTag;
		readonly PhysicsCollision: Enum.DeveloperMemoryTag;
		readonly BaseParts: Enum.DeveloperMemoryTag;
		readonly GraphicsSolidModels: Enum.DeveloperMemoryTag;
		readonly GraphicsMeshParts: Enum.DeveloperMemoryTag;
		readonly GraphicsParticles: Enum.DeveloperMemoryTag;
		readonly GraphicsParts: Enum.DeveloperMemoryTag;
		readonly GraphicsSpatialHash: Enum.DeveloperMemoryTag;
		readonly GraphicsTerrain: Enum.DeveloperMemoryTag;
		readonly GraphicsTexture: Enum.DeveloperMemoryTag;
		readonly GraphicsTextureCharacter: Enum.DeveloperMemoryTag;
		readonly Sounds: Enum.DeveloperMemoryTag;
		readonly StreamingSounds: Enum.DeveloperMemoryTag;
		readonly TerrainVoxels: Enum.DeveloperMemoryTag;
		readonly Gui: Enum.DeveloperMemoryTag;
		readonly Animation: Enum.DeveloperMemoryTag;
		readonly Navigation: Enum.DeveloperMemoryTag;
		readonly GeometryCSG: Enum.DeveloperMemoryTag;
		readonly GraphicsSlimModels: Enum.DeveloperMemoryTag;
	};

	interface DeviceFeatureType extends EnumItem {}
	const DeviceFeatureType: {
		readonly DeviceCapture: Enum.DeviceFeatureType;
		readonly InExperienceFAE: Enum.DeviceFeatureType;
	};

	interface DeviceForm extends EnumItem {}
	const DeviceForm: {
		readonly Console: Enum.DeviceForm;
		readonly Phone: Enum.DeviceForm;
		readonly Tablet: Enum.DeviceForm;
		readonly Desktop: Enum.DeviceForm;
		readonly VR: Enum.DeviceForm;
	};

	interface DeviceLevel extends EnumItem {}
	const DeviceLevel: {
		readonly Low: Enum.DeviceLevel;
		readonly Medium: Enum.DeviceLevel;
		readonly High: Enum.DeviceLevel;
	};

	interface DeviceType extends EnumItem {}
	const DeviceType: {
		readonly Unknown: Enum.DeviceType;
		readonly Desktop: Enum.DeviceType;
		readonly Tablet: Enum.DeviceType;
		readonly Phone: Enum.DeviceType;
	};

	interface DialogBehaviorType extends EnumItem {}
	const DialogBehaviorType: {
		readonly SinglePlayer: Enum.DialogBehaviorType;
		readonly MultiplePlayers: Enum.DialogBehaviorType;
	};

	interface DialogPurpose extends EnumItem {}
	const DialogPurpose: {
		readonly Quest: Enum.DialogPurpose;
		readonly Help: Enum.DialogPurpose;
		readonly Shop: Enum.DialogPurpose;
	};

	interface DialogTone extends EnumItem {}
	const DialogTone: {
		readonly Neutral: Enum.DialogTone;
		readonly Friendly: Enum.DialogTone;
		readonly Enemy: Enum.DialogTone;
	};

	interface DisplayScalingMode extends EnumItem {}
	const DisplayScalingMode: {
		readonly Default: Enum.DisplayScalingMode;
		readonly Legacy: Enum.DisplayScalingMode;
		readonly Responsive: Enum.DisplayScalingMode;
	};

	interface DisplaySize extends EnumItem {}
	const DisplaySize: {
		readonly Small: Enum.DisplaySize;
		readonly Medium: Enum.DisplaySize;
		readonly Large: Enum.DisplaySize;
	};

	interface DominantAxis extends EnumItem {}
	const DominantAxis: {
		readonly Width: Enum.DominantAxis;
		readonly Height: Enum.DominantAxis;
	};

	interface DraftStatusCode extends EnumItem {}
	const DraftStatusCode: {
		readonly OK: Enum.DraftStatusCode;
		readonly DraftOutdated: Enum.DraftStatusCode;
		readonly ScriptRemoved: Enum.DraftStatusCode;
		readonly DraftCommitted: Enum.DraftStatusCode;
	};

	interface DragDetectorDragStyle extends EnumItem {}
	const DragDetectorDragStyle: {
		readonly TranslateLine: Enum.DragDetectorDragStyle;
		readonly TranslatePlane: Enum.DragDetectorDragStyle;
		readonly TranslatePlaneOrLine: Enum.DragDetectorDragStyle;
		readonly TranslateLineOrPlane: Enum.DragDetectorDragStyle;
		readonly TranslateViewPlane: Enum.DragDetectorDragStyle;
		readonly RotateAxis: Enum.DragDetectorDragStyle;
		readonly RotateTrackball: Enum.DragDetectorDragStyle;
		readonly Scriptable: Enum.DragDetectorDragStyle;
		readonly BestForDevice: Enum.DragDetectorDragStyle;
	};

	interface DragDetectorPermissionPolicy extends EnumItem {}
	const DragDetectorPermissionPolicy: {
		readonly Nobody: Enum.DragDetectorPermissionPolicy;
		readonly Everybody: Enum.DragDetectorPermissionPolicy;
		readonly Scriptable: Enum.DragDetectorPermissionPolicy;
	};

	interface DragDetectorResponseStyle extends EnumItem {}
	const DragDetectorResponseStyle: {
		readonly Geometric: Enum.DragDetectorResponseStyle;
		readonly Physical: Enum.DragDetectorResponseStyle;
		readonly Custom: Enum.DragDetectorResponseStyle;
	};

	interface DraggerCoordinateSpace extends EnumItem {}
	const DraggerCoordinateSpace: {
		readonly Object: Enum.DraggerCoordinateSpace;
		readonly World: Enum.DraggerCoordinateSpace;
	};

	interface DraggerMovementMode extends EnumItem {}
	const DraggerMovementMode: {
		readonly Geometric: Enum.DraggerMovementMode;
		readonly Physical: Enum.DraggerMovementMode;
	};

	interface DraggingScrollBar extends EnumItem {}
	const DraggingScrollBar: {
		readonly None: Enum.DraggingScrollBar;
		readonly Horizontal: Enum.DraggingScrollBar;
		readonly Vertical: Enum.DraggingScrollBar;
	};

	interface EasingDirection extends EnumItem {}
	const EasingDirection: {
		readonly In: Enum.EasingDirection;
		readonly Out: Enum.EasingDirection;
		readonly InOut: Enum.EasingDirection;
	};

	interface EasingStyle extends EnumItem {}
	const EasingStyle: {
		readonly Linear: Enum.EasingStyle;
		readonly Sine: Enum.EasingStyle;
		readonly Back: Enum.EasingStyle;
		readonly Quad: Enum.EasingStyle;
		readonly Quart: Enum.EasingStyle;
		readonly Quint: Enum.EasingStyle;
		readonly Bounce: Enum.EasingStyle;
		readonly Elastic: Enum.EasingStyle;
		readonly Exponential: Enum.EasingStyle;
		readonly Circular: Enum.EasingStyle;
		readonly Cubic: Enum.EasingStyle;
	};

	interface EditableStatus extends EnumItem {}
	const EditableStatus: {
		readonly Unknown: Enum.EditableStatus;
		readonly Allowed: Enum.EditableStatus;
		readonly Disallowed: Enum.EditableStatus;
	};

	interface ElasticBehavior extends EnumItem {}
	const ElasticBehavior: {
		readonly WhenScrollable: Enum.ElasticBehavior;
		readonly Always: Enum.ElasticBehavior;
		readonly Never: Enum.ElasticBehavior;
	};

	interface EngineFolder extends EnumItem {}
	const EngineFolder: {
		readonly Screenshots: Enum.EngineFolder;
		readonly Videos: Enum.EngineFolder;
		readonly Logs: Enum.EngineFolder;
	};

	interface EnviromentalPhysicsThrottle extends EnumItem {}
	const EnviromentalPhysicsThrottle: {
		readonly DefaultAuto: Enum.EnviromentalPhysicsThrottle;
		readonly Disabled: Enum.EnviromentalPhysicsThrottle;
		readonly Always: Enum.EnviromentalPhysicsThrottle;
		readonly Skip2: Enum.EnviromentalPhysicsThrottle;
		readonly Skip4: Enum.EnviromentalPhysicsThrottle;
		readonly Skip8: Enum.EnviromentalPhysicsThrottle;
		readonly Skip16: Enum.EnviromentalPhysicsThrottle;
	};

	interface ExperienceAuthScope extends EnumItem {}
	const ExperienceAuthScope: {
		readonly DefaultScope: Enum.ExperienceAuthScope;
		readonly CreatorAssetsCreate: Enum.ExperienceAuthScope;
	};

	interface ExperienceEventStatus extends EnumItem {}
	const ExperienceEventStatus: {
		readonly Active: Enum.ExperienceEventStatus;
		readonly Cancelled: Enum.ExperienceEventStatus;
		readonly Moderated: Enum.ExperienceEventStatus;
		readonly Unpublished: Enum.ExperienceEventStatus;
		readonly Unknown: Enum.ExperienceEventStatus;
	};

	interface ExperienceStateCaptureSelectionMode extends EnumItem {}
	const ExperienceStateCaptureSelectionMode: {
		readonly Default: Enum.ExperienceStateCaptureSelectionMode;
		readonly SafetyHighlightMode: Enum.ExperienceStateCaptureSelectionMode;
	};

	interface ExperienceStateRecordingLoadMode extends EnumItem {}
	const ExperienceStateRecordingLoadMode: {
		readonly NewReplay: Enum.ExperienceStateRecordingLoadMode;
		readonly ContiguousSlice: Enum.ExperienceStateRecordingLoadMode;
		readonly NoncontiguousSlice: Enum.ExperienceStateRecordingLoadMode;
	};

	interface ExperienceStateRecordingLoadSourceType extends EnumItem {}
	const ExperienceStateRecordingLoadSourceType: {
		readonly S3Url: Enum.ExperienceStateRecordingLoadSourceType;
		readonly File: Enum.ExperienceStateRecordingLoadSourceType;
	};

	interface ExperienceStateRecordingPlaybackMode extends EnumItem {}
	const ExperienceStateRecordingPlaybackMode: {
		readonly Undefined: Enum.ExperienceStateRecordingPlaybackMode;
		readonly Stopped: Enum.ExperienceStateRecordingPlaybackMode;
		readonly Playing: Enum.ExperienceStateRecordingPlaybackMode;
		readonly Rewinding: Enum.ExperienceStateRecordingPlaybackMode;
	};

	interface ExplosionType extends EnumItem {}
	const ExplosionType: {
		readonly NoCraters: Enum.ExplosionType;
		readonly Craters: Enum.ExplosionType;
	};

	interface FACSDataLod extends EnumItem {}
	const FACSDataLod: {
		readonly LOD0: Enum.FACSDataLod;
		readonly LOD1: Enum.FACSDataLod;
		readonly LODCount: Enum.FACSDataLod;
	};

	interface FacialAgeEstimationResultType extends EnumItem {}
	const FacialAgeEstimationResultType: {
		readonly Complete: Enum.FacialAgeEstimationResultType;
		readonly Cancel: Enum.FacialAgeEstimationResultType;
		readonly Error: Enum.FacialAgeEstimationResultType;
	};

	interface FacialAnimationStreamingState extends EnumItem {}
	const FacialAnimationStreamingState: {
		readonly None: Enum.FacialAnimationStreamingState;
		readonly Audio: Enum.FacialAnimationStreamingState;
		readonly Video: Enum.FacialAnimationStreamingState;
		readonly Place: Enum.FacialAnimationStreamingState;
		readonly Server: Enum.FacialAnimationStreamingState;
	};

	interface FacsActionUnit extends EnumItem {}
	const FacsActionUnit: {
		readonly ChinRaiserUpperLip: Enum.FacsActionUnit;
		readonly ChinRaiser: Enum.FacsActionUnit;
		readonly FlatPucker: Enum.FacsActionUnit;
		readonly Funneler: Enum.FacsActionUnit;
		readonly LowerLipSuck: Enum.FacsActionUnit;
		readonly LipPresser: Enum.FacsActionUnit;
		readonly LipsTogether: Enum.FacsActionUnit;
		readonly MouthLeft: Enum.FacsActionUnit;
		readonly MouthRight: Enum.FacsActionUnit;
		readonly Pucker: Enum.FacsActionUnit;
		readonly UpperLipSuck: Enum.FacsActionUnit;
		readonly LeftCheekPuff: Enum.FacsActionUnit;
		readonly LeftDimpler: Enum.FacsActionUnit;
		readonly LeftLipCornerDown: Enum.FacsActionUnit;
		readonly LeftLowerLipDepressor: Enum.FacsActionUnit;
		readonly LeftLipCornerPuller: Enum.FacsActionUnit;
		readonly LeftLipStretcher: Enum.FacsActionUnit;
		readonly LeftUpperLipRaiser: Enum.FacsActionUnit;
		readonly RightCheekPuff: Enum.FacsActionUnit;
		readonly RightDimpler: Enum.FacsActionUnit;
		readonly RightLipCornerDown: Enum.FacsActionUnit;
		readonly RightLowerLipDepressor: Enum.FacsActionUnit;
		readonly RightLipCornerPuller: Enum.FacsActionUnit;
		readonly RightLipStretcher: Enum.FacsActionUnit;
		readonly RightUpperLipRaiser: Enum.FacsActionUnit;
		readonly JawDrop: Enum.FacsActionUnit;
		readonly JawLeft: Enum.FacsActionUnit;
		readonly JawRight: Enum.FacsActionUnit;
		readonly Corrugator: Enum.FacsActionUnit;
		readonly LeftBrowLowerer: Enum.FacsActionUnit;
		readonly LeftOuterBrowRaiser: Enum.FacsActionUnit;
		readonly LeftNoseWrinkler: Enum.FacsActionUnit;
		readonly LeftInnerBrowRaiser: Enum.FacsActionUnit;
		readonly RightBrowLowerer: Enum.FacsActionUnit;
		readonly RightOuterBrowRaiser: Enum.FacsActionUnit;
		readonly RightInnerBrowRaiser: Enum.FacsActionUnit;
		readonly RightNoseWrinkler: Enum.FacsActionUnit;
		readonly EyesLookDown: Enum.FacsActionUnit;
		readonly EyesLookLeft: Enum.FacsActionUnit;
		readonly EyesLookUp: Enum.FacsActionUnit;
		readonly EyesLookRight: Enum.FacsActionUnit;
		readonly LeftCheekRaiser: Enum.FacsActionUnit;
		readonly LeftEyeUpperLidRaiser: Enum.FacsActionUnit;
		readonly LeftEyeClosed: Enum.FacsActionUnit;
		readonly RightCheekRaiser: Enum.FacsActionUnit;
		readonly RightEyeUpperLidRaiser: Enum.FacsActionUnit;
		readonly RightEyeClosed: Enum.FacsActionUnit;
		readonly TongueDown: Enum.FacsActionUnit;
		readonly TongueOut: Enum.FacsActionUnit;
		readonly TongueUp: Enum.FacsActionUnit;
	};

	interface FeatureRestrictionAbuseVector extends EnumItem {}
	const FeatureRestrictionAbuseVector: {
		readonly ExperienceChat: Enum.FeatureRestrictionAbuseVector;
		readonly Communication: Enum.FeatureRestrictionAbuseVector;
	};

	interface FieldOfViewMode extends EnumItem {}
	const FieldOfViewMode: {
		readonly Vertical: Enum.FieldOfViewMode;
		readonly Diagonal: Enum.FieldOfViewMode;
		readonly MaxAxis: Enum.FieldOfViewMode;
	};

	interface FillDirection extends EnumItem {}
	const FillDirection: {
		readonly Horizontal: Enum.FillDirection;
		readonly Vertical: Enum.FillDirection;
	};

	interface FilterErrorType extends EnumItem {}
	const FilterErrorType: {
		readonly BackslashNotEscapingAnything: Enum.FilterErrorType;
		readonly BadBespokeFilter: Enum.FilterErrorType;
		readonly BadName: Enum.FilterErrorType;
		readonly IncompleteOr: Enum.FilterErrorType;
		readonly IncompleteParenthesis: Enum.FilterErrorType;
		readonly InvalidDoubleStar: Enum.FilterErrorType;
		readonly InvalidTilde: Enum.FilterErrorType;
		readonly PropertyBadOperator: Enum.FilterErrorType;
		readonly PropertyDoesNotExist: Enum.FilterErrorType;
		readonly PropertyInvalidField: Enum.FilterErrorType;
		readonly PropertyInvalidValue: Enum.FilterErrorType;
		readonly PropertyUnsupportedFields: Enum.FilterErrorType;
		readonly PropertyUnsupportedProperty: Enum.FilterErrorType;
		readonly UnexpectedNameIndex: Enum.FilterErrorType;
		readonly UnexpectedToken: Enum.FilterErrorType;
		readonly UnfinishedBinaryOperator: Enum.FilterErrorType;
		readonly UnfinishedQuote: Enum.FilterErrorType;
		readonly UnknownBespokeFilter: Enum.FilterErrorType;
		readonly WildcardInProperty: Enum.FilterErrorType;
	};

	interface FilterResult extends EnumItem {}
	const FilterResult: {
		readonly Accepted: Enum.FilterResult;
		readonly Rejected: Enum.FilterResult;
	};

	interface FilterType extends EnumItem {}
	const FilterType: {
		readonly Exclude: Enum.FilterType;
		readonly Include: Enum.FilterType;
	};

	interface FinishRecordingOperation extends EnumItem {}
	const FinishRecordingOperation: {
		readonly Cancel: Enum.FinishRecordingOperation;
		readonly Commit: Enum.FinishRecordingOperation;
		readonly Append: Enum.FinishRecordingOperation;
	};

	interface FluidFidelity extends EnumItem {}
	const FluidFidelity: {
		readonly Automatic: Enum.FluidFidelity;
		readonly UseCollisionGeometry: Enum.FluidFidelity;
		readonly UsePreciseGeometry: Enum.FluidFidelity;
	};

	interface FluidForces extends EnumItem {}
	const FluidForces: {
		readonly Default: Enum.FluidForces;
		readonly Experimental: Enum.FluidForces;
	};

	interface Font extends EnumItem {}
	const Font: {
		readonly Legacy: Enum.Font;
		readonly Arial: Enum.Font;
		readonly ArialBold: Enum.Font;
		readonly SourceSans: Enum.Font;
		readonly SourceSansBold: Enum.Font;
		readonly SourceSansLight: Enum.Font;
		readonly SourceSansItalic: Enum.Font;
		readonly Bodoni: Enum.Font;
		readonly Garamond: Enum.Font;
		readonly Cartoon: Enum.Font;
		readonly Code: Enum.Font;
		readonly Highway: Enum.Font;
		readonly SciFi: Enum.Font;
		readonly Arcade: Enum.Font;
		readonly Fantasy: Enum.Font;
		readonly Antique: Enum.Font;
		readonly SourceSansSemibold: Enum.Font;
		readonly Gotham: Enum.Font;
		readonly GothamMedium: Enum.Font;
		readonly GothamBold: Enum.Font;
		readonly GothamBlack: Enum.Font;
		readonly AmaticSC: Enum.Font;
		readonly Bangers: Enum.Font;
		readonly Creepster: Enum.Font;
		readonly DenkOne: Enum.Font;
		readonly Fondamento: Enum.Font;
		readonly FredokaOne: Enum.Font;
		readonly GrenzeGotisch: Enum.Font;
		readonly IndieFlower: Enum.Font;
		readonly JosefinSans: Enum.Font;
		readonly Jura: Enum.Font;
		readonly Kalam: Enum.Font;
		readonly LuckiestGuy: Enum.Font;
		readonly Merriweather: Enum.Font;
		readonly Michroma: Enum.Font;
		readonly Nunito: Enum.Font;
		readonly Oswald: Enum.Font;
		readonly PatrickHand: Enum.Font;
		readonly PermanentMarker: Enum.Font;
		readonly Roboto: Enum.Font;
		readonly RobotoCondensed: Enum.Font;
		readonly RobotoMono: Enum.Font;
		readonly Sarpanch: Enum.Font;
		readonly SpecialElite: Enum.Font;
		readonly TitilliumWeb: Enum.Font;
		readonly Ubuntu: Enum.Font;
		readonly BuilderSans: Enum.Font;
		readonly BuilderSansMedium: Enum.Font;
		readonly BuilderSansBold: Enum.Font;
		readonly BuilderSansExtraBold: Enum.Font;
		readonly Arimo: Enum.Font;
		readonly ArimoBold: Enum.Font;
		readonly Unknown: Enum.Font;
	};

	interface FontSize extends EnumItem {}
	const FontSize: {
		readonly Size8: Enum.FontSize;
		readonly Size9: Enum.FontSize;
		readonly Size10: Enum.FontSize;
		readonly Size11: Enum.FontSize;
		readonly Size12: Enum.FontSize;
		readonly Size14: Enum.FontSize;
		readonly Size18: Enum.FontSize;
		readonly Size24: Enum.FontSize;
		readonly Size36: Enum.FontSize;
		readonly Size48: Enum.FontSize;
		readonly Size28: Enum.FontSize;
		readonly Size32: Enum.FontSize;
		readonly Size42: Enum.FontSize;
		readonly Size60: Enum.FontSize;
		readonly Size96: Enum.FontSize;
	};

	interface FontStyle extends EnumItem {}
	const FontStyle: {
		readonly Normal: Enum.FontStyle;
		readonly Italic: Enum.FontStyle;
	};

	interface FontWeight extends EnumItem {}
	const FontWeight: {
		readonly Thin: Enum.FontWeight;
		readonly ExtraLight: Enum.FontWeight;
		readonly Light: Enum.FontWeight;
		readonly Regular: Enum.FontWeight;
		readonly Medium: Enum.FontWeight;
		readonly SemiBold: Enum.FontWeight;
		readonly Bold: Enum.FontWeight;
		readonly ExtraBold: Enum.FontWeight;
		readonly Heavy: Enum.FontWeight;
	};

	interface ForceLimitMode extends EnumItem {}
	const ForceLimitMode: {
		readonly Magnitude: Enum.ForceLimitMode;
		readonly PerAxis: Enum.ForceLimitMode;
	};

	interface FormFactor extends EnumItem {}
	const FormFactor: {
		readonly Symmetric: Enum.FormFactor;
		readonly Brick: Enum.FormFactor;
		readonly Plate: Enum.FormFactor;
		readonly Custom: Enum.FormFactor;
	};

	interface FrameStyle extends EnumItem {}
	const FrameStyle: {
		readonly Custom: Enum.FrameStyle;
		readonly ChatBlue: Enum.FrameStyle;
		readonly RobloxSquare: Enum.FrameStyle;
		readonly RobloxRound: Enum.FrameStyle;
		readonly ChatGreen: Enum.FrameStyle;
		readonly ChatRed: Enum.FrameStyle;
		readonly DropShadow: Enum.FrameStyle;
	};

	interface FramerateManagerMode extends EnumItem {}
	const FramerateManagerMode: {
		readonly Automatic: Enum.FramerateManagerMode;
		readonly On: Enum.FramerateManagerMode;
		readonly Off: Enum.FramerateManagerMode;
	};

	interface FriendRequestEvent extends EnumItem {}
	const FriendRequestEvent: {
		readonly Issue: Enum.FriendRequestEvent;
		readonly Revoke: Enum.FriendRequestEvent;
		readonly Accept: Enum.FriendRequestEvent;
		readonly Deny: Enum.FriendRequestEvent;
	};

	interface FriendStatus extends EnumItem {}
	const FriendStatus: {
		readonly Unknown: Enum.FriendStatus;
		readonly NotFriend: Enum.FriendStatus;
		readonly Friend: Enum.FriendStatus;
		readonly FriendRequestSent: Enum.FriendStatus;
		readonly FriendRequestReceived: Enum.FriendStatus;
	};

	interface FunctionalTestResult extends EnumItem {}
	const FunctionalTestResult: {
		readonly Passed: Enum.FunctionalTestResult;
		readonly Warning: Enum.FunctionalTestResult;
		readonly Error: Enum.FunctionalTestResult;
	};

	interface GameAvatarType extends EnumItem {}
	const GameAvatarType: {
		readonly R6: Enum.GameAvatarType;
		readonly R15: Enum.GameAvatarType;
		readonly PlayerChoice: Enum.GameAvatarType;
	};

	interface GamepadType extends EnumItem {}
	const GamepadType: {
		readonly Unknown: Enum.GamepadType;
		readonly PS4: Enum.GamepadType;
		readonly PS5: Enum.GamepadType;
		readonly XboxOne: Enum.GamepadType;
	};

	interface GearGenreSetting extends EnumItem {}
	const GearGenreSetting: {
		readonly AllGenres: Enum.GearGenreSetting;
		readonly MatchingGenreOnly: Enum.GearGenreSetting;
	};

	interface GearType extends EnumItem {}
	const GearType: {
		readonly MeleeWeapons: Enum.GearType;
		readonly RangedWeapons: Enum.GearType;
		readonly Explosives: Enum.GearType;
		readonly PowerUps: Enum.GearType;
		readonly NavigationEnhancers: Enum.GearType;
		readonly MusicalInstruments: Enum.GearType;
		readonly SocialItems: Enum.GearType;
		readonly BuildingTools: Enum.GearType;
		readonly Transport: Enum.GearType;
	};

	interface Genre extends EnumItem {}
	const Genre: {
		readonly All: Enum.Genre;
		readonly TownAndCity: Enum.Genre;
		readonly Fantasy: Enum.Genre;
		readonly SciFi: Enum.Genre;
		readonly Ninja: Enum.Genre;
		readonly Scary: Enum.Genre;
		readonly Pirate: Enum.Genre;
		readonly Adventure: Enum.Genre;
		readonly Sports: Enum.Genre;
		readonly Funny: Enum.Genre;
		readonly WildWest: Enum.Genre;
		readonly War: Enum.Genre;
		readonly SkatePark: Enum.Genre;
		readonly Tutorial: Enum.Genre;
	};

	interface GraphicsMode extends EnumItem {}
	const GraphicsMode: {
		readonly Automatic: Enum.GraphicsMode;
		readonly Direct3D11: Enum.GraphicsMode;
		readonly OpenGL: Enum.GraphicsMode;
		readonly Metal: Enum.GraphicsMode;
		readonly Vulkan: Enum.GraphicsMode;
		readonly NoGraphics: Enum.GraphicsMode;
	};

	interface GraphicsOptimizationMode extends EnumItem {}
	const GraphicsOptimizationMode: {
		readonly Performance: Enum.GraphicsOptimizationMode;
		readonly Balanced: Enum.GraphicsOptimizationMode;
		readonly Quality: Enum.GraphicsOptimizationMode;
	};

	interface GroupMembershipStatus extends EnumItem {}
	const GroupMembershipStatus: {
		readonly None: Enum.GroupMembershipStatus;
		readonly Joined: Enum.GroupMembershipStatus;
		readonly JoinRequestPending: Enum.GroupMembershipStatus;
		readonly AlreadyMember: Enum.GroupMembershipStatus;
	};

	interface GuiState extends EnumItem {}
	const GuiState: {
		readonly Idle: Enum.GuiState;
		readonly Hover: Enum.GuiState;
		readonly Press: Enum.GuiState;
		readonly NonInteractable: Enum.GuiState;
	};

	interface GuiType extends EnumItem {}
	const GuiType: {
		readonly Core: Enum.GuiType;
		readonly Custom: Enum.GuiType;
		readonly PlayerNameplates: Enum.GuiType;
		readonly CustomBillboards: Enum.GuiType;
		readonly CoreBillboards: Enum.GuiType;
	};

	interface HandRigDescriptionSide extends EnumItem {}
	const HandRigDescriptionSide: {
		readonly None: Enum.HandRigDescriptionSide;
		readonly Left: Enum.HandRigDescriptionSide;
		readonly Right: Enum.HandRigDescriptionSide;
	};

	interface HandlesStyle extends EnumItem {}
	const HandlesStyle: {
		readonly Resize: Enum.HandlesStyle;
		readonly Movement: Enum.HandlesStyle;
	};

	interface HapticEffectType extends EnumItem {}
	const HapticEffectType: {
		readonly Custom: Enum.HapticEffectType;
		readonly UIHover: Enum.HapticEffectType;
		readonly UIClick: Enum.HapticEffectType;
		readonly UINotification: Enum.HapticEffectType;
		readonly GameplayExplosion: Enum.HapticEffectType;
		readonly GameplayCollision: Enum.HapticEffectType;
	};

	interface HashAlgorithm extends EnumItem {}
	const HashAlgorithm: {
		readonly Blake2b: Enum.HashAlgorithm;
		readonly Blake3: Enum.HashAlgorithm;
		readonly Md5: Enum.HashAlgorithm;
		readonly Sha1: Enum.HashAlgorithm;
		readonly Sha256: Enum.HashAlgorithm;
	};

	interface HighlightDepthMode extends EnumItem {}
	const HighlightDepthMode: {
		readonly AlwaysOnTop: Enum.HighlightDepthMode;
		readonly Occluded: Enum.HighlightDepthMode;
	};

	interface HorizontalAlignment extends EnumItem {}
	const HorizontalAlignment: {
		readonly Center: Enum.HorizontalAlignment;
		readonly Left: Enum.HorizontalAlignment;
		readonly Right: Enum.HorizontalAlignment;
	};

	interface HoverAnimateSpeed extends EnumItem {}
	const HoverAnimateSpeed: {
		readonly VerySlow: Enum.HoverAnimateSpeed;
		readonly Slow: Enum.HoverAnimateSpeed;
		readonly Medium: Enum.HoverAnimateSpeed;
		readonly Fast: Enum.HoverAnimateSpeed;
		readonly VeryFast: Enum.HoverAnimateSpeed;
	};

	interface HttpCachePolicy extends EnumItem {}
	const HttpCachePolicy: {
		readonly None: Enum.HttpCachePolicy;
		readonly Full: Enum.HttpCachePolicy;
		readonly DataOnly: Enum.HttpCachePolicy;
		readonly Default: Enum.HttpCachePolicy;
		readonly InternalRedirectRefresh: Enum.HttpCachePolicy;
	};

	interface HttpCompression extends EnumItem {}
	const HttpCompression: {
		readonly None: Enum.HttpCompression;
		readonly Gzip: Enum.HttpCompression;
	};

	interface HttpContentType extends EnumItem {}
	const HttpContentType: {
		readonly ApplicationJson: Enum.HttpContentType;
		readonly ApplicationXml: Enum.HttpContentType;
		readonly ApplicationUrlEncoded: Enum.HttpContentType;
		readonly TextPlain: Enum.HttpContentType;
		readonly TextXml: Enum.HttpContentType;
	};

	interface HttpError extends EnumItem {}
	const HttpError: {
		readonly OK: Enum.HttpError;
		readonly InvalidUrl: Enum.HttpError;
		readonly DnsResolve: Enum.HttpError;
		readonly ConnectFail: Enum.HttpError;
		readonly OutOfMemory: Enum.HttpError;
		readonly TimedOut: Enum.HttpError;
		readonly TooManyRedirects: Enum.HttpError;
		readonly InvalidRedirect: Enum.HttpError;
		readonly NetFail: Enum.HttpError;
		readonly Aborted: Enum.HttpError;
		readonly SslConnectFail: Enum.HttpError;
		readonly SslVerificationFail: Enum.HttpError;
		readonly Unknown: Enum.HttpError;
		readonly ConnectionClosed: Enum.HttpError;
		readonly ServerProtocolError: Enum.HttpError;
		readonly CreatorEnvironmentsNotSupportedByService: Enum.HttpError;
		readonly InactivityTimeout: Enum.HttpError;
		readonly TooManyOutstandingRequests: Enum.HttpError;
	};

	interface HttpRequestType extends EnumItem {}
	const HttpRequestType: {
		readonly Default: Enum.HttpRequestType;
		readonly MarketplaceService: Enum.HttpRequestType;
		readonly Players: Enum.HttpRequestType;
		readonly Chat: Enum.HttpRequestType;
		readonly Avatar: Enum.HttpRequestType;
		readonly Analytics: Enum.HttpRequestType;
		readonly Localization: Enum.HttpRequestType;
	};

	interface HumanoidCollisionType extends EnumItem {}
	const HumanoidCollisionType: {
		readonly OuterBox: Enum.HumanoidCollisionType;
		readonly InnerBox: Enum.HumanoidCollisionType;
	};

	interface HumanoidDisplayDistanceType extends EnumItem {}
	const HumanoidDisplayDistanceType: {
		readonly Viewer: Enum.HumanoidDisplayDistanceType;
		readonly Subject: Enum.HumanoidDisplayDistanceType;
		readonly None: Enum.HumanoidDisplayDistanceType;
	};

	interface HumanoidHealthDisplayType extends EnumItem {}
	const HumanoidHealthDisplayType: {
		readonly DisplayWhenDamaged: Enum.HumanoidHealthDisplayType;
		readonly AlwaysOn: Enum.HumanoidHealthDisplayType;
		readonly AlwaysOff: Enum.HumanoidHealthDisplayType;
	};

	interface HumanoidRigType extends EnumItem {}
	const HumanoidRigType: {
		readonly R6: Enum.HumanoidRigType;
		readonly R15: Enum.HumanoidRigType;
	};

	interface HumanoidStateType extends EnumItem {}
	const HumanoidStateType: {
		readonly FallingDown: Enum.HumanoidStateType;
		readonly Ragdoll: Enum.HumanoidStateType;
		readonly GettingUp: Enum.HumanoidStateType;
		readonly Jumping: Enum.HumanoidStateType;
		readonly Swimming: Enum.HumanoidStateType;
		readonly Freefall: Enum.HumanoidStateType;
		readonly Flying: Enum.HumanoidStateType;
		readonly Landed: Enum.HumanoidStateType;
		readonly Running: Enum.HumanoidStateType;
		readonly RunningNoPhysics: Enum.HumanoidStateType;
		readonly StrafingNoPhysics: Enum.HumanoidStateType;
		readonly Climbing: Enum.HumanoidStateType;
		readonly Seated: Enum.HumanoidStateType;
		readonly PlatformStanding: Enum.HumanoidStateType;
		readonly Dead: Enum.HumanoidStateType;
		readonly Physics: Enum.HumanoidStateType;
		readonly None: Enum.HumanoidStateType;
	};

	interface IKCollisionsMode extends EnumItem {}
	const IKCollisionsMode: {
		readonly NoCollisions: Enum.IKCollisionsMode;
		readonly OtherMechanismsAnchored: Enum.IKCollisionsMode;
		readonly IncludeContactedMechanisms: Enum.IKCollisionsMode;
	};

	interface IKControlConstraintSupport extends EnumItem {}
	const IKControlConstraintSupport: {
		readonly Default: Enum.IKControlConstraintSupport;
		readonly Disabled: Enum.IKControlConstraintSupport;
		readonly Enabled: Enum.IKControlConstraintSupport;
	};

	interface IKControlType extends EnumItem {}
	const IKControlType: {
		readonly Transform: Enum.IKControlType;
		readonly Position: Enum.IKControlType;
		readonly Rotation: Enum.IKControlType;
		readonly LookAt: Enum.IKControlType;
	};

	interface IXPLoadingStatus extends EnumItem {}
	const IXPLoadingStatus: {
		readonly None: Enum.IXPLoadingStatus;
		readonly Pending: Enum.IXPLoadingStatus;
		readonly Initialized: Enum.IXPLoadingStatus;
		readonly ErrorInvalidUser: Enum.IXPLoadingStatus;
		readonly ErrorConnection: Enum.IXPLoadingStatus;
		readonly ErrorJsonParse: Enum.IXPLoadingStatus;
		readonly ErrorTimedOut: Enum.IXPLoadingStatus;
	};

	interface ImageAlphaType extends EnumItem {}
	const ImageAlphaType: {
		readonly Default: Enum.ImageAlphaType;
		readonly LockCanvasAlpha: Enum.ImageAlphaType;
		readonly LockCanvasColor: Enum.ImageAlphaType;
	};

	interface ImageCombineType extends EnumItem {}
	const ImageCombineType: {
		readonly BlendSourceOver: Enum.ImageCombineType;
		readonly Overwrite: Enum.ImageCombineType;
		readonly Add: Enum.ImageCombineType;
		readonly Multiply: Enum.ImageCombineType;
		readonly AlphaBlend: Enum.ImageCombineType;
	};

	interface InOut extends EnumItem {}
	const InOut: {
		readonly Edge: Enum.InOut;
		readonly Inset: Enum.InOut;
		readonly Center: Enum.InOut;
	};

	interface InfoType extends EnumItem {}
	const InfoType: {
		readonly Asset: Enum.InfoType;
		readonly Product: Enum.InfoType;
		readonly GamePass: Enum.InfoType;
		readonly Subscription: Enum.InfoType;
		readonly Bundle: Enum.InfoType;
	};

	interface InitialDockState extends EnumItem {}
	const InitialDockState: {
		readonly Top: Enum.InitialDockState;
		readonly Bottom: Enum.InitialDockState;
		readonly Left: Enum.InitialDockState;
		readonly Right: Enum.InitialDockState;
		readonly Float: Enum.InitialDockState;
	};

	interface InputActionType extends EnumItem {}
	const InputActionType: {
		readonly Bool: Enum.InputActionType;
		readonly Direction1D: Enum.InputActionType;
		readonly Direction2D: Enum.InputActionType;
		readonly Direction3D: Enum.InputActionType;
		readonly ViewportPosition: Enum.InputActionType;
	};

	interface InputType extends EnumItem {}
	const InputType: {
		readonly NoInput: Enum.InputType;
		readonly Constant: Enum.InputType;
		readonly Sin: Enum.InputType;
	};

	interface InstanceFileSyncStatus extends EnumItem {}
	const InstanceFileSyncStatus: {
		readonly NotSynced: Enum.InstanceFileSyncStatus;
		readonly Errored: Enum.InstanceFileSyncStatus;
		readonly SyncedAsRoot: Enum.InstanceFileSyncStatus;
		readonly SyncedAsDescendant: Enum.InstanceFileSyncStatus;
		readonly AncestorErrored: Enum.InstanceFileSyncStatus;
	};

	interface IntermediateMeshGenerationResult extends EnumItem {}
	const IntermediateMeshGenerationResult: {
		readonly HighQualityMesh: Enum.IntermediateMeshGenerationResult;
	};

	interface InterpolationThrottlingMode extends EnumItem {}
	const InterpolationThrottlingMode: {
		readonly Default: Enum.InterpolationThrottlingMode;
		readonly Disabled: Enum.InterpolationThrottlingMode;
		readonly Enabled: Enum.InterpolationThrottlingMode;
	};

	interface InviteState extends EnumItem {}
	const InviteState: {
		readonly Placed: Enum.InviteState;
		readonly Accepted: Enum.InviteState;
		readonly Declined: Enum.InviteState;
		readonly Missed: Enum.InviteState;
	};

	interface ItemLineAlignment extends EnumItem {}
	const ItemLineAlignment: {
		readonly Automatic: Enum.ItemLineAlignment;
		readonly Start: Enum.ItemLineAlignment;
		readonly Center: Enum.ItemLineAlignment;
		readonly End: Enum.ItemLineAlignment;
		readonly Stretch: Enum.ItemLineAlignment;
	};

	interface JoinSource extends EnumItem {}
	const JoinSource: {
		readonly CreatedItemAttribution: Enum.JoinSource;
	};

	interface JointCreationMode extends EnumItem {}
	const JointCreationMode: {
		readonly All: Enum.JointCreationMode;
		readonly Surface: Enum.JointCreationMode;
		readonly None: Enum.JointCreationMode;
	};

	interface KeyCode extends EnumItem {}
	const KeyCode: {
		readonly Unknown: Enum.KeyCode;
		readonly Backspace: Enum.KeyCode;
		readonly Tab: Enum.KeyCode;
		readonly Clear: Enum.KeyCode;
		readonly Return: Enum.KeyCode;
		readonly Pause: Enum.KeyCode;
		readonly Escape: Enum.KeyCode;
		readonly Space: Enum.KeyCode;
		readonly QuotedDouble: Enum.KeyCode;
		readonly Hash: Enum.KeyCode;
		readonly Dollar: Enum.KeyCode;
		readonly Percent: Enum.KeyCode;
		readonly Ampersand: Enum.KeyCode;
		readonly Quote: Enum.KeyCode;
		readonly LeftParenthesis: Enum.KeyCode;
		readonly RightParenthesis: Enum.KeyCode;
		readonly Asterisk: Enum.KeyCode;
		readonly Plus: Enum.KeyCode;
		readonly Comma: Enum.KeyCode;
		readonly Minus: Enum.KeyCode;
		readonly Period: Enum.KeyCode;
		readonly Slash: Enum.KeyCode;
		readonly Zero: Enum.KeyCode;
		readonly One: Enum.KeyCode;
		readonly Two: Enum.KeyCode;
		readonly Three: Enum.KeyCode;
		readonly Four: Enum.KeyCode;
		readonly Five: Enum.KeyCode;
		readonly Six: Enum.KeyCode;
		readonly Seven: Enum.KeyCode;
		readonly Eight: Enum.KeyCode;
		readonly Nine: Enum.KeyCode;
		readonly Colon: Enum.KeyCode;
		readonly Semicolon: Enum.KeyCode;
		readonly LessThan: Enum.KeyCode;
		readonly Equals: Enum.KeyCode;
		readonly GreaterThan: Enum.KeyCode;
		readonly Question: Enum.KeyCode;
		readonly At: Enum.KeyCode;
		readonly LeftBracket: Enum.KeyCode;
		readonly BackSlash: Enum.KeyCode;
		readonly RightBracket: Enum.KeyCode;
		readonly Caret: Enum.KeyCode;
		readonly Underscore: Enum.KeyCode;
		readonly Backquote: Enum.KeyCode;
		readonly A: Enum.KeyCode;
		readonly B: Enum.KeyCode;
		readonly C: Enum.KeyCode;
		readonly D: Enum.KeyCode;
		readonly E: Enum.KeyCode;
		readonly F: Enum.KeyCode;
		readonly G: Enum.KeyCode;
		readonly H: Enum.KeyCode;
		readonly I: Enum.KeyCode;
		readonly J: Enum.KeyCode;
		readonly K: Enum.KeyCode;
		readonly L: Enum.KeyCode;
		readonly M: Enum.KeyCode;
		readonly N: Enum.KeyCode;
		readonly O: Enum.KeyCode;
		readonly P: Enum.KeyCode;
		readonly Q: Enum.KeyCode;
		readonly R: Enum.KeyCode;
		readonly S: Enum.KeyCode;
		readonly T: Enum.KeyCode;
		readonly U: Enum.KeyCode;
		readonly V: Enum.KeyCode;
		readonly W: Enum.KeyCode;
		readonly X: Enum.KeyCode;
		readonly Y: Enum.KeyCode;
		readonly Z: Enum.KeyCode;
		readonly LeftCurly: Enum.KeyCode;
		readonly Pipe: Enum.KeyCode;
		readonly RightCurly: Enum.KeyCode;
		readonly Tilde: Enum.KeyCode;
		readonly Delete: Enum.KeyCode;
		readonly KeypadZero: Enum.KeyCode;
		readonly KeypadOne: Enum.KeyCode;
		readonly KeypadTwo: Enum.KeyCode;
		readonly KeypadThree: Enum.KeyCode;
		readonly KeypadFour: Enum.KeyCode;
		readonly KeypadFive: Enum.KeyCode;
		readonly KeypadSix: Enum.KeyCode;
		readonly KeypadSeven: Enum.KeyCode;
		readonly KeypadEight: Enum.KeyCode;
		readonly KeypadNine: Enum.KeyCode;
		readonly KeypadPeriod: Enum.KeyCode;
		readonly KeypadDivide: Enum.KeyCode;
		readonly KeypadMultiply: Enum.KeyCode;
		readonly KeypadMinus: Enum.KeyCode;
		readonly KeypadPlus: Enum.KeyCode;
		readonly KeypadEnter: Enum.KeyCode;
		readonly KeypadEquals: Enum.KeyCode;
		readonly Up: Enum.KeyCode;
		readonly Down: Enum.KeyCode;
		readonly Right: Enum.KeyCode;
		readonly Left: Enum.KeyCode;
		readonly Insert: Enum.KeyCode;
		readonly Home: Enum.KeyCode;
		readonly End: Enum.KeyCode;
		readonly PageUp: Enum.KeyCode;
		readonly PageDown: Enum.KeyCode;
		readonly F1: Enum.KeyCode;
		readonly F2: Enum.KeyCode;
		readonly F3: Enum.KeyCode;
		readonly F4: Enum.KeyCode;
		readonly F5: Enum.KeyCode;
		readonly F6: Enum.KeyCode;
		readonly F7: Enum.KeyCode;
		readonly F8: Enum.KeyCode;
		readonly F9: Enum.KeyCode;
		readonly F10: Enum.KeyCode;
		readonly F11: Enum.KeyCode;
		readonly F12: Enum.KeyCode;
		readonly F13: Enum.KeyCode;
		readonly F14: Enum.KeyCode;
		readonly F15: Enum.KeyCode;
		readonly NumLock: Enum.KeyCode;
		readonly CapsLock: Enum.KeyCode;
		readonly ScrollLock: Enum.KeyCode;
		readonly RightShift: Enum.KeyCode;
		readonly LeftShift: Enum.KeyCode;
		readonly RightControl: Enum.KeyCode;
		readonly LeftControl: Enum.KeyCode;
		readonly RightAlt: Enum.KeyCode;
		readonly LeftAlt: Enum.KeyCode;
		readonly RightMeta: Enum.KeyCode;
		readonly LeftMeta: Enum.KeyCode;
		readonly LeftSuper: Enum.KeyCode;
		readonly RightSuper: Enum.KeyCode;
		readonly Mode: Enum.KeyCode;
		readonly Compose: Enum.KeyCode;
		readonly Help: Enum.KeyCode;
		readonly Print: Enum.KeyCode;
		readonly SysReq: Enum.KeyCode;
		readonly Break: Enum.KeyCode;
		readonly Menu: Enum.KeyCode;
		readonly Power: Enum.KeyCode;
		readonly Euro: Enum.KeyCode;
		readonly Undo: Enum.KeyCode;
		readonly ButtonX: Enum.KeyCode;
		readonly ButtonY: Enum.KeyCode;
		readonly ButtonA: Enum.KeyCode;
		readonly ButtonB: Enum.KeyCode;
		readonly ButtonR1: Enum.KeyCode;
		readonly ButtonL1: Enum.KeyCode;
		readonly ButtonR2: Enum.KeyCode;
		readonly ButtonL2: Enum.KeyCode;
		readonly ButtonR3: Enum.KeyCode;
		readonly ButtonL3: Enum.KeyCode;
		readonly ButtonStart: Enum.KeyCode;
		readonly ButtonSelect: Enum.KeyCode;
		readonly DPadLeft: Enum.KeyCode;
		readonly DPadRight: Enum.KeyCode;
		readonly DPadUp: Enum.KeyCode;
		readonly DPadDown: Enum.KeyCode;
		readonly Thumbstick1: Enum.KeyCode;
		readonly Thumbstick2: Enum.KeyCode;
		readonly Thumbstick1Up: Enum.KeyCode;
		readonly Thumbstick1Down: Enum.KeyCode;
		readonly Thumbstick1Left: Enum.KeyCode;
		readonly Thumbstick1Right: Enum.KeyCode;
		readonly Thumbstick2Up: Enum.KeyCode;
		readonly Thumbstick2Down: Enum.KeyCode;
		readonly Thumbstick2Left: Enum.KeyCode;
		readonly Thumbstick2Right: Enum.KeyCode;
		readonly MouseLeftButton: Enum.KeyCode;
		readonly MouseRightButton: Enum.KeyCode;
		readonly MouseMiddleButton: Enum.KeyCode;
		readonly MousePosition: Enum.KeyCode;
		readonly Touch: Enum.KeyCode;
		readonly MouseWheel: Enum.KeyCode;
		readonly TrackpadPan: Enum.KeyCode;
		readonly TrackpadPinch: Enum.KeyCode;
		readonly MouseDelta: Enum.KeyCode;
		readonly World0: Enum.KeyCode;
		readonly World1: Enum.KeyCode;
		readonly World2: Enum.KeyCode;
		readonly World3: Enum.KeyCode;
		readonly World4: Enum.KeyCode;
		readonly World5: Enum.KeyCode;
		readonly World6: Enum.KeyCode;
		readonly World7: Enum.KeyCode;
		readonly World8: Enum.KeyCode;
		readonly World9: Enum.KeyCode;
		readonly World10: Enum.KeyCode;
		readonly World11: Enum.KeyCode;
		readonly World12: Enum.KeyCode;
		readonly World13: Enum.KeyCode;
		readonly World14: Enum.KeyCode;
		readonly World15: Enum.KeyCode;
		readonly World16: Enum.KeyCode;
		readonly World17: Enum.KeyCode;
		readonly World18: Enum.KeyCode;
		readonly World19: Enum.KeyCode;
		readonly World20: Enum.KeyCode;
		readonly World21: Enum.KeyCode;
		readonly World22: Enum.KeyCode;
		readonly World23: Enum.KeyCode;
		readonly World24: Enum.KeyCode;
		readonly World25: Enum.KeyCode;
		readonly World26: Enum.KeyCode;
		readonly World27: Enum.KeyCode;
		readonly World28: Enum.KeyCode;
		readonly World29: Enum.KeyCode;
		readonly World30: Enum.KeyCode;
		readonly World31: Enum.KeyCode;
		readonly World32: Enum.KeyCode;
		readonly World33: Enum.KeyCode;
		readonly World34: Enum.KeyCode;
		readonly World35: Enum.KeyCode;
		readonly World36: Enum.KeyCode;
		readonly World37: Enum.KeyCode;
		readonly World38: Enum.KeyCode;
		readonly World39: Enum.KeyCode;
		readonly World40: Enum.KeyCode;
		readonly World41: Enum.KeyCode;
		readonly World42: Enum.KeyCode;
		readonly World43: Enum.KeyCode;
		readonly World44: Enum.KeyCode;
		readonly World45: Enum.KeyCode;
		readonly World46: Enum.KeyCode;
		readonly World47: Enum.KeyCode;
		readonly World48: Enum.KeyCode;
		readonly World49: Enum.KeyCode;
		readonly World50: Enum.KeyCode;
		readonly World51: Enum.KeyCode;
		readonly World52: Enum.KeyCode;
		readonly World53: Enum.KeyCode;
		readonly World54: Enum.KeyCode;
		readonly World55: Enum.KeyCode;
		readonly World56: Enum.KeyCode;
		readonly World57: Enum.KeyCode;
		readonly World58: Enum.KeyCode;
		readonly World59: Enum.KeyCode;
		readonly World60: Enum.KeyCode;
		readonly World61: Enum.KeyCode;
		readonly World62: Enum.KeyCode;
		readonly World63: Enum.KeyCode;
		readonly World64: Enum.KeyCode;
		readonly World65: Enum.KeyCode;
		readonly World66: Enum.KeyCode;
		readonly World67: Enum.KeyCode;
		readonly World68: Enum.KeyCode;
		readonly World69: Enum.KeyCode;
		readonly World70: Enum.KeyCode;
		readonly World71: Enum.KeyCode;
		readonly World72: Enum.KeyCode;
		readonly World73: Enum.KeyCode;
		readonly World74: Enum.KeyCode;
		readonly World75: Enum.KeyCode;
		readonly World76: Enum.KeyCode;
		readonly World77: Enum.KeyCode;
		readonly World78: Enum.KeyCode;
		readonly World79: Enum.KeyCode;
		readonly World80: Enum.KeyCode;
		readonly World81: Enum.KeyCode;
		readonly World82: Enum.KeyCode;
		readonly World83: Enum.KeyCode;
		readonly World84: Enum.KeyCode;
		readonly World85: Enum.KeyCode;
		readonly World86: Enum.KeyCode;
		readonly World87: Enum.KeyCode;
		readonly World88: Enum.KeyCode;
		readonly World89: Enum.KeyCode;
		readonly World90: Enum.KeyCode;
		readonly World91: Enum.KeyCode;
		readonly World92: Enum.KeyCode;
		readonly World93: Enum.KeyCode;
		readonly World94: Enum.KeyCode;
		readonly World95: Enum.KeyCode;
		readonly MouseBackButton: Enum.KeyCode;
		readonly MouseNoButton: Enum.KeyCode;
		readonly MouseX: Enum.KeyCode;
		readonly MouseY: Enum.KeyCode;
	};

	interface KeyInterpolationMode extends EnumItem {}
	const KeyInterpolationMode: {
		readonly Constant: Enum.KeyInterpolationMode;
		readonly Linear: Enum.KeyInterpolationMode;
		readonly Cubic: Enum.KeyInterpolationMode;
	};

	interface KeywordFilterType extends EnumItem {}
	const KeywordFilterType: {
		readonly Include: Enum.KeywordFilterType;
		readonly Exclude: Enum.KeywordFilterType;
	};

	interface Language extends EnumItem {}
	const Language: {
		readonly Default: Enum.Language;
	};

	interface LeftRight extends EnumItem {}
	const LeftRight: {
		readonly Left: Enum.LeftRight;
		readonly Center: Enum.LeftRight;
		readonly Right: Enum.LeftRight;
	};

	interface LexemeType extends EnumItem {}
	const LexemeType: {
		readonly Eof: Enum.LexemeType;
		readonly Name: Enum.LexemeType;
		readonly QuotedString: Enum.LexemeType;
		readonly Number: Enum.LexemeType;
		readonly And: Enum.LexemeType;
		readonly Or: Enum.LexemeType;
		readonly Equal: Enum.LexemeType;
		readonly TildeEqual: Enum.LexemeType;
		readonly GreaterThan: Enum.LexemeType;
		readonly GreaterThanEqual: Enum.LexemeType;
		readonly LessThan: Enum.LexemeType;
		readonly LessThanEqual: Enum.LexemeType;
		readonly Colon: Enum.LexemeType;
		readonly Dot: Enum.LexemeType;
		readonly LeftParenthesis: Enum.LexemeType;
		readonly RightParenthesis: Enum.LexemeType;
		readonly Star: Enum.LexemeType;
		readonly DoubleStar: Enum.LexemeType;
		readonly ReservedSpecial: Enum.LexemeType;
	};

	interface LightingStyle extends EnumItem {}
	const LightingStyle: {
		readonly Realistic: Enum.LightingStyle;
		readonly Soft: Enum.LightingStyle;
	};

	interface Limb extends EnumItem {}
	const Limb: {
		readonly Head: Enum.Limb;
		readonly Torso: Enum.Limb;
		readonly LeftArm: Enum.Limb;
		readonly RightArm: Enum.Limb;
		readonly LeftLeg: Enum.Limb;
		readonly RightLeg: Enum.Limb;
		readonly Unknown: Enum.Limb;
	};

	interface LineJoinMode extends EnumItem {}
	const LineJoinMode: {
		readonly Round: Enum.LineJoinMode;
		readonly Bevel: Enum.LineJoinMode;
		readonly Miter: Enum.LineJoinMode;
	};

	interface ListDisplayMode extends EnumItem {}
	const ListDisplayMode: {
		readonly Horizontal: Enum.ListDisplayMode;
		readonly Vertical: Enum.ListDisplayMode;
	};

	interface ListenerLocation extends EnumItem {}
	const ListenerLocation: {
		readonly Default: Enum.ListenerLocation;
		readonly None: Enum.ListenerLocation;
		readonly Character: Enum.ListenerLocation;
		readonly Camera: Enum.ListenerLocation;
	};

	interface ListenerType extends EnumItem {}
	const ListenerType: {
		readonly Camera: Enum.ListenerType;
		readonly CFrame: Enum.ListenerType;
		readonly ObjectPosition: Enum.ListenerType;
		readonly ObjectCFrame: Enum.ListenerType;
	};

	interface LiveEditingAtomicUpdateResponse extends EnumItem {}
	const LiveEditingAtomicUpdateResponse: {
		readonly Success: Enum.LiveEditingAtomicUpdateResponse;
		readonly FailureGuidNotFound: Enum.LiveEditingAtomicUpdateResponse;
		readonly FailureHashMismatch: Enum.LiveEditingAtomicUpdateResponse;
		readonly FailureOperationIllegal: Enum.LiveEditingAtomicUpdateResponse;
	};

	interface LiveEditingBroadcastMessageType extends EnumItem {}
	const LiveEditingBroadcastMessageType: {
		readonly Normal: Enum.LiveEditingBroadcastMessageType;
		readonly Warning: Enum.LiveEditingBroadcastMessageType;
		readonly Error: Enum.LiveEditingBroadcastMessageType;
	};

	interface LoadCharacterLayeredClothing extends EnumItem {}
	const LoadCharacterLayeredClothing: {
		readonly Default: Enum.LoadCharacterLayeredClothing;
		readonly Disabled: Enum.LoadCharacterLayeredClothing;
		readonly Enabled: Enum.LoadCharacterLayeredClothing;
	};

	interface LoadDynamicHeads extends EnumItem {}
	const LoadDynamicHeads: {
		readonly Default: Enum.LoadDynamicHeads;
		readonly Disabled: Enum.LoadDynamicHeads;
		readonly Enabled: Enum.LoadDynamicHeads;
	};

	interface LocationType extends EnumItem {}
	const LocationType: {
		readonly Character: Enum.LocationType;
		readonly Camera: Enum.LocationType;
		readonly ObjectPosition: Enum.LocationType;
	};

	interface LuauTypeCheckMode extends EnumItem {}
	const LuauTypeCheckMode: {
		readonly Default: Enum.LuauTypeCheckMode;
		readonly NoCheck: Enum.LuauTypeCheckMode;
		readonly Nonstrict: Enum.LuauTypeCheckMode;
		readonly Strict: Enum.LuauTypeCheckMode;
	};

	interface MakeupType extends EnumItem {}
	const MakeupType: {
		readonly Face: Enum.MakeupType;
		readonly Lip: Enum.MakeupType;
		readonly Eye: Enum.MakeupType;
	};

	interface MarketplaceBulkPurchasePromptStatus extends EnumItem {}
	const MarketplaceBulkPurchasePromptStatus: {
		readonly Completed: Enum.MarketplaceBulkPurchasePromptStatus;
		readonly Aborted: Enum.MarketplaceBulkPurchasePromptStatus;
		readonly Error: Enum.MarketplaceBulkPurchasePromptStatus;
	};

	interface MarketplaceItemPurchaseStatus extends EnumItem {}
	const MarketplaceItemPurchaseStatus: {
		readonly Success: Enum.MarketplaceItemPurchaseStatus;
		readonly SystemError: Enum.MarketplaceItemPurchaseStatus;
		readonly AlreadyOwned: Enum.MarketplaceItemPurchaseStatus;
		readonly InsufficientRobux: Enum.MarketplaceItemPurchaseStatus;
		readonly QuantityLimitExceeded: Enum.MarketplaceItemPurchaseStatus;
		readonly QuotaExceeded: Enum.MarketplaceItemPurchaseStatus;
		readonly NotForSale: Enum.MarketplaceItemPurchaseStatus;
		readonly NotAvailableForPurchaser: Enum.MarketplaceItemPurchaseStatus;
		readonly PriceMismatch: Enum.MarketplaceItemPurchaseStatus;
		readonly SoldOut: Enum.MarketplaceItemPurchaseStatus;
		readonly PurchaserIsSeller: Enum.MarketplaceItemPurchaseStatus;
		readonly InsufficientMembership: Enum.MarketplaceItemPurchaseStatus;
		readonly PlaceInvalid: Enum.MarketplaceItemPurchaseStatus;
	};

	interface MarketplaceProductType extends EnumItem {}
	const MarketplaceProductType: {
		readonly AvatarAsset: Enum.MarketplaceProductType;
		readonly AvatarBundle: Enum.MarketplaceProductType;
	};

	interface MarkupKind extends EnumItem {}
	const MarkupKind: {
		readonly PlainText: Enum.MarkupKind;
		readonly Markdown: Enum.MarkupKind;
	};

	interface MatchmakingType extends EnumItem {}
	const MatchmakingType: {
		readonly Default: Enum.MatchmakingType;
		readonly XboxOnly: Enum.MatchmakingType;
		readonly PlayStationOnly: Enum.MatchmakingType;
	};

	interface Material extends EnumItem {}
	const Material: {
		readonly Plastic: Enum.Material;
		readonly SmoothPlastic: Enum.Material;
		readonly Neon: Enum.Material;
		readonly Wood: Enum.Material;
		readonly WoodPlanks: Enum.Material;
		readonly Marble: Enum.Material;
		readonly Slate: Enum.Material;
		readonly Concrete: Enum.Material;
		readonly Granite: Enum.Material;
		readonly Brick: Enum.Material;
		readonly Pebble: Enum.Material;
		readonly Cobblestone: Enum.Material;
		readonly Rock: Enum.Material;
		readonly Sandstone: Enum.Material;
		readonly Basalt: Enum.Material;
		readonly CrackedLava: Enum.Material;
		readonly Limestone: Enum.Material;
		readonly Pavement: Enum.Material;
		readonly CorrodedMetal: Enum.Material;
		readonly DiamondPlate: Enum.Material;
		readonly Foil: Enum.Material;
		readonly Metal: Enum.Material;
		readonly Grass: Enum.Material;
		readonly LeafyGrass: Enum.Material;
		readonly Sand: Enum.Material;
		readonly Fabric: Enum.Material;
		readonly Snow: Enum.Material;
		readonly Mud: Enum.Material;
		readonly Ground: Enum.Material;
		readonly Asphalt: Enum.Material;
		readonly Salt: Enum.Material;
		readonly Ice: Enum.Material;
		readonly Glacier: Enum.Material;
		readonly Glass: Enum.Material;
		readonly ForceField: Enum.Material;
		readonly Air: Enum.Material;
		readonly Water: Enum.Material;
		readonly Cardboard: Enum.Material;
		readonly Carpet: Enum.Material;
		readonly CeramicTiles: Enum.Material;
		readonly ClayRoofTiles: Enum.Material;
		readonly RoofShingles: Enum.Material;
		readonly Leather: Enum.Material;
		readonly Plaster: Enum.Material;
		readonly Rubber: Enum.Material;
	};

	interface MaterialPattern extends EnumItem {}
	const MaterialPattern: {
		readonly Regular: Enum.MaterialPattern;
		readonly Organic: Enum.MaterialPattern;
	};

	interface MembershipType extends EnumItem {}
	const MembershipType: {
		readonly None: Enum.MembershipType;
		readonly BuildersClub: Enum.MembershipType;
		readonly TurboBuildersClub: Enum.MembershipType;
		readonly OutrageousBuildersClub: Enum.MembershipType;
		readonly Premium: Enum.MembershipType;
	};

	interface MeshPartDetailLevel extends EnumItem {}
	const MeshPartDetailLevel: {
		readonly DistanceBased: Enum.MeshPartDetailLevel;
		readonly Level00: Enum.MeshPartDetailLevel;
		readonly Level01: Enum.MeshPartDetailLevel;
		readonly Level02: Enum.MeshPartDetailLevel;
		readonly Level03: Enum.MeshPartDetailLevel;
		readonly Level04: Enum.MeshPartDetailLevel;
	};

	interface MeshPartHeadsAndAccessories extends EnumItem {}
	const MeshPartHeadsAndAccessories: {
		readonly Default: Enum.MeshPartHeadsAndAccessories;
		readonly Disabled: Enum.MeshPartHeadsAndAccessories;
		readonly Enabled: Enum.MeshPartHeadsAndAccessories;
	};

	interface MeshScaleUnit extends EnumItem {}
	const MeshScaleUnit: {
		readonly Stud: Enum.MeshScaleUnit;
		readonly Meter: Enum.MeshScaleUnit;
		readonly CM: Enum.MeshScaleUnit;
		readonly MM: Enum.MeshScaleUnit;
		readonly Foot: Enum.MeshScaleUnit;
		readonly Inch: Enum.MeshScaleUnit;
	};

	interface MeshType extends EnumItem {}
	const MeshType: {
		readonly Head: Enum.MeshType;
		readonly Torso: Enum.MeshType;
		readonly Wedge: Enum.MeshType;
		readonly Sphere: Enum.MeshType;
		readonly Cylinder: Enum.MeshType;
		readonly FileMesh: Enum.MeshType;
		readonly Brick: Enum.MeshType;
		readonly Prism: Enum.MeshType;
		readonly Pyramid: Enum.MeshType;
		readonly ParallelRamp: Enum.MeshType;
		readonly RightAngleRamp: Enum.MeshType;
		readonly CornerWedge: Enum.MeshType;
	};

	interface MessageType extends EnumItem {}
	const MessageType: {
		readonly MessageOutput: Enum.MessageType;
		readonly MessageInfo: Enum.MessageType;
		readonly MessageWarning: Enum.MessageType;
		readonly MessageError: Enum.MessageType;
	};

	interface ModelLevelOfDetail extends EnumItem {}
	const ModelLevelOfDetail: {
		readonly Automatic: Enum.ModelLevelOfDetail;
		readonly StreamingMesh: Enum.ModelLevelOfDetail;
		readonly Disabled: Enum.ModelLevelOfDetail;
		readonly SLIM: Enum.ModelLevelOfDetail;
	};

	interface ModelStreamingBehavior extends EnumItem {}
	const ModelStreamingBehavior: {
		readonly Default: Enum.ModelStreamingBehavior;
		readonly Legacy: Enum.ModelStreamingBehavior;
		readonly Improved: Enum.ModelStreamingBehavior;
	};

	interface ModelStreamingMode extends EnumItem {}
	const ModelStreamingMode: {
		readonly Default: Enum.ModelStreamingMode;
		readonly Atomic: Enum.ModelStreamingMode;
		readonly Persistent: Enum.ModelStreamingMode;
		readonly PersistentPerPlayer: Enum.ModelStreamingMode;
		readonly Nonatomic: Enum.ModelStreamingMode;
	};

	interface ModerationResultCategory extends EnumItem {}
	const ModerationResultCategory: {
		readonly ViolationDetected: Enum.ModerationResultCategory;
		readonly Borderline: Enum.ModerationResultCategory;
		readonly NoViolationDetected: Enum.ModerationResultCategory;
	};

	interface ModerationResultLabel extends EnumItem {}
	const ModerationResultLabel: {
		readonly ChildExploitation: Enum.ModerationResultLabel;
		readonly SuicideSelfInjuryAndHarmfulBehavior: Enum.ModerationResultLabel;
		readonly ThreatsBullyingAndHarassment: Enum.ModerationResultLabel;
		readonly TerrorismAndViolentExtremism: Enum.ModerationResultLabel;
		readonly DiscriminationSlursAndHateSpeech: Enum.ModerationResultLabel;
		readonly RealWorldSensitiveEvents: Enum.ModerationResultLabel;
		readonly ViolentContentAndGore: Enum.ModerationResultLabel;
		readonly RomanticAndSexualContent: Enum.ModerationResultLabel;
		readonly IllegalAndRegulatedGoodsAndActivities: Enum.ModerationResultLabel;
		readonly Profanity: Enum.ModerationResultLabel;
		readonly Other: Enum.ModerationResultLabel;
	};

	interface ModerationStatus extends EnumItem {}
	const ModerationStatus: {
		readonly ReviewedApproved: Enum.ModerationStatus;
		readonly ReviewedRejected: Enum.ModerationStatus;
		readonly NotReviewed: Enum.ModerationStatus;
		readonly NotApplicable: Enum.ModerationStatus;
		readonly Invalid: Enum.ModerationStatus;
	};

	interface ModifierKey extends EnumItem {}
	const ModifierKey: {
		readonly Shift: Enum.ModifierKey;
		readonly Ctrl: Enum.ModifierKey;
		readonly Alt: Enum.ModifierKey;
		readonly Meta: Enum.ModifierKey;
	};

	interface MouseBehavior extends EnumItem {}
	const MouseBehavior: {
		readonly Default: Enum.MouseBehavior;
		readonly LockCenter: Enum.MouseBehavior;
		readonly LockCurrentPosition: Enum.MouseBehavior;
	};

	interface MoveState extends EnumItem {}
	const MoveState: {
		readonly Stopped: Enum.MoveState;
		readonly Coasting: Enum.MoveState;
		readonly Pushing: Enum.MoveState;
		readonly Stopping: Enum.MoveState;
		readonly AirFree: Enum.MoveState;
	};

	interface MoverConstraintRootBehaviorMode extends EnumItem {}
	const MoverConstraintRootBehaviorMode: {
		readonly Default: Enum.MoverConstraintRootBehaviorMode;
		readonly Disabled: Enum.MoverConstraintRootBehaviorMode;
		readonly Enabled: Enum.MoverConstraintRootBehaviorMode;
	};

	interface MuteState extends EnumItem {}
	const MuteState: {
		readonly Unmuted: Enum.MuteState;
		readonly Muted: Enum.MuteState;
	};

	interface NameOcclusion extends EnumItem {}
	const NameOcclusion: {
		readonly NoOcclusion: Enum.NameOcclusion;
		readonly EnemyOcclusion: Enum.NameOcclusion;
		readonly OccludeAll: Enum.NameOcclusion;
	};

	interface NegateOperationHiddenHistory extends EnumItem {}
	const NegateOperationHiddenHistory: {
		readonly None: Enum.NegateOperationHiddenHistory;
		readonly NegatedUnion: Enum.NegateOperationHiddenHistory;
		readonly NegatedIntersection: Enum.NegateOperationHiddenHistory;
	};

	interface NetworkOwnership extends EnumItem {}
	const NetworkOwnership: {
		readonly Automatic: Enum.NetworkOwnership;
		readonly Manual: Enum.NetworkOwnership;
		readonly OnContact: Enum.NetworkOwnership;
	};

	interface NetworkStatus extends EnumItem {}
	const NetworkStatus: {
		readonly Unknown: Enum.NetworkStatus;
		readonly Connected: Enum.NetworkStatus;
		readonly Disconnected: Enum.NetworkStatus;
	};

	interface NoiseType extends EnumItem {}
	const NoiseType: {
		readonly SimplexGabor: Enum.NoiseType;
	};

	interface NormalId extends EnumItem {}
	const NormalId: {
		readonly Right: Enum.NormalId;
		readonly Top: Enum.NormalId;
		readonly Back: Enum.NormalId;
		readonly Left: Enum.NormalId;
		readonly Bottom: Enum.NormalId;
		readonly Front: Enum.NormalId;
	};

	interface NotificationButtonType extends EnumItem {}
	const NotificationButtonType: {
		readonly Primary: Enum.NotificationButtonType;
		readonly Secondary: Enum.NotificationButtonType;
	};

	interface OperationType extends EnumItem {}
	const OperationType: {
		readonly Null: Enum.OperationType;
		readonly Union: Enum.OperationType;
		readonly Subtraction: Enum.OperationType;
		readonly Intersection: Enum.OperationType;
		readonly Primitive: Enum.OperationType;
	};

	interface OrientationAlignmentMode extends EnumItem {}
	const OrientationAlignmentMode: {
		readonly OneAttachment: Enum.OrientationAlignmentMode;
		readonly TwoAttachment: Enum.OrientationAlignmentMode;
	};

	interface OutfitSource extends EnumItem {}
	const OutfitSource: {
		readonly All: Enum.OutfitSource;
		readonly Created: Enum.OutfitSource;
		readonly Purchased: Enum.OutfitSource;
	};

	interface OutfitType extends EnumItem {}
	const OutfitType: {
		readonly All: Enum.OutfitType;
		readonly Avatar: Enum.OutfitType;
		readonly DynamicHead: Enum.OutfitType;
		readonly Shoes: Enum.OutfitType;
	};

	interface OutputLayoutMode extends EnumItem {}
	const OutputLayoutMode: {
		readonly Horizontal: Enum.OutputLayoutMode;
		readonly Vertical: Enum.OutputLayoutMode;
	};

	interface OverrideMouseIconBehavior extends EnumItem {}
	const OverrideMouseIconBehavior: {
		readonly None: Enum.OverrideMouseIconBehavior;
		readonly ForceShow: Enum.OverrideMouseIconBehavior;
		readonly ForceHide: Enum.OverrideMouseIconBehavior;
	};

	interface PackagePermission extends EnumItem {}
	const PackagePermission: {
		readonly None: Enum.PackagePermission;
		readonly NoAccess: Enum.PackagePermission;
		readonly Revoked: Enum.PackagePermission;
		readonly UseView: Enum.PackagePermission;
		readonly Edit: Enum.PackagePermission;
		readonly Own: Enum.PackagePermission;
	};

	interface PartType extends EnumItem {}
	const PartType: {
		readonly Ball: Enum.PartType;
		readonly Block: Enum.PartType;
		readonly Cylinder: Enum.PartType;
		readonly Wedge: Enum.PartType;
		readonly CornerWedge: Enum.PartType;
	};

	interface ParticleEmitterShape extends EnumItem {}
	const ParticleEmitterShape: {
		readonly Box: Enum.ParticleEmitterShape;
		readonly Sphere: Enum.ParticleEmitterShape;
		readonly Cylinder: Enum.ParticleEmitterShape;
		readonly Disc: Enum.ParticleEmitterShape;
	};

	interface ParticleEmitterShapeInOut extends EnumItem {}
	const ParticleEmitterShapeInOut: {
		readonly Outward: Enum.ParticleEmitterShapeInOut;
		readonly Inward: Enum.ParticleEmitterShapeInOut;
		readonly InAndOut: Enum.ParticleEmitterShapeInOut;
	};

	interface ParticleEmitterShapeStyle extends EnumItem {}
	const ParticleEmitterShapeStyle: {
		readonly Volume: Enum.ParticleEmitterShapeStyle;
		readonly Surface: Enum.ParticleEmitterShapeStyle;
	};

	interface ParticleFlipbookLayout extends EnumItem {}
	const ParticleFlipbookLayout: {
		readonly None: Enum.ParticleFlipbookLayout;
		readonly Grid2x2: Enum.ParticleFlipbookLayout;
		readonly Grid4x4: Enum.ParticleFlipbookLayout;
		readonly Grid8x8: Enum.ParticleFlipbookLayout;
		readonly Custom: Enum.ParticleFlipbookLayout;
	};

	interface ParticleFlipbookMode extends EnumItem {}
	const ParticleFlipbookMode: {
		readonly Loop: Enum.ParticleFlipbookMode;
		readonly OneShot: Enum.ParticleFlipbookMode;
		readonly PingPong: Enum.ParticleFlipbookMode;
		readonly Random: Enum.ParticleFlipbookMode;
	};

	interface ParticleFlipbookTextureCompatible extends EnumItem {}
	const ParticleFlipbookTextureCompatible: {
		readonly NotCompatible: Enum.ParticleFlipbookTextureCompatible;
		readonly Compatible: Enum.ParticleFlipbookTextureCompatible;
		readonly Unknown: Enum.ParticleFlipbookTextureCompatible;
	};

	interface ParticleOrientation extends EnumItem {}
	const ParticleOrientation: {
		readonly FacingCamera: Enum.ParticleOrientation;
		readonly FacingCameraWorldUp: Enum.ParticleOrientation;
		readonly VelocityParallel: Enum.ParticleOrientation;
		readonly VelocityPerpendicular: Enum.ParticleOrientation;
	};

	interface PathStatus extends EnumItem {}
	const PathStatus: {
		readonly Success: Enum.PathStatus;
		readonly NoPath: Enum.PathStatus;
		readonly ClosestNoPath: Enum.PathStatus;
		readonly ClosestOutOfRange: Enum.PathStatus;
		readonly FailStartNotEmpty: Enum.PathStatus;
		readonly FailFinishNotEmpty: Enum.PathStatus;
	};

	interface PathWaypointAction extends EnumItem {}
	const PathWaypointAction: {
		readonly Walk: Enum.PathWaypointAction;
		readonly Jump: Enum.PathWaypointAction;
		readonly Custom: Enum.PathWaypointAction;
	};

	interface PathfindingUseImprovedSearch extends EnumItem {}
	const PathfindingUseImprovedSearch: {
		readonly Default: Enum.PathfindingUseImprovedSearch;
		readonly Disabled: Enum.PathfindingUseImprovedSearch;
		readonly Enabled: Enum.PathfindingUseImprovedSearch;
	};

	interface PeoplePageLayout extends EnumItem {}
	const PeoplePageLayout: {
		readonly Card: Enum.PeoplePageLayout;
		readonly List: Enum.PeoplePageLayout;
	};

	interface PerformanceOverlayMode extends EnumItem {}
	const PerformanceOverlayMode: {
		readonly Overdraw: Enum.PerformanceOverlayMode;
		readonly Transparent: Enum.PerformanceOverlayMode;
		readonly Decals: Enum.PerformanceOverlayMode;
		readonly Lights: Enum.PerformanceOverlayMode;
	};

	interface PermissionLevelShown extends EnumItem {}
	const PermissionLevelShown: {
		readonly Game: Enum.PermissionLevelShown;
		readonly RobloxGame: Enum.PermissionLevelShown;
		readonly RobloxScript: Enum.PermissionLevelShown;
		readonly Studio: Enum.PermissionLevelShown;
		readonly Roblox: Enum.PermissionLevelShown;
	};

	interface PhysicsSimulationRate extends EnumItem {}
	const PhysicsSimulationRate: {
		readonly Fixed240Hz: Enum.PhysicsSimulationRate;
		readonly Fixed120Hz: Enum.PhysicsSimulationRate;
		readonly Fixed60Hz: Enum.PhysicsSimulationRate;
	};

	interface PhysicsSteppingMethod extends EnumItem {}
	const PhysicsSteppingMethod: {
		readonly Default: Enum.PhysicsSteppingMethod;
		readonly Fixed: Enum.PhysicsSteppingMethod;
		readonly Adaptive: Enum.PhysicsSteppingMethod;
	};

	interface PlaceContentPreference extends EnumItem {}
	const PlaceContentPreference: {
		readonly None: Enum.PlaceContentPreference;
		readonly All: Enum.PlaceContentPreference;
		readonly MentionsAndReplies: Enum.PlaceContentPreference;
		readonly Unknown: Enum.PlaceContentPreference;
	};

	interface PlacePublishType extends EnumItem {}
	const PlacePublishType: {
		readonly None: Enum.PlacePublishType;
		readonly Publish: Enum.PlacePublishType;
		readonly Save: Enum.PlacePublishType;
	};

	interface Platform extends EnumItem {}
	const Platform: {
		readonly Windows: Enum.Platform;
		readonly OSX: Enum.Platform;
		readonly IOS: Enum.Platform;
		readonly Android: Enum.Platform;
		readonly XBoxOne: Enum.Platform;
		readonly PS4: Enum.Platform;
		readonly PS3: Enum.Platform;
		readonly XBox360: Enum.Platform;
		readonly WiiU: Enum.Platform;
		readonly NX: Enum.Platform;
		readonly Ouya: Enum.Platform;
		readonly AndroidTV: Enum.Platform;
		readonly Chromecast: Enum.Platform;
		readonly Linux: Enum.Platform;
		readonly SteamOS: Enum.Platform;
		readonly WebOS: Enum.Platform;
		readonly DOS: Enum.Platform;
		readonly BeOS: Enum.Platform;
		readonly UWP: Enum.Platform;
		readonly PS5: Enum.Platform;
		readonly MetaOS: Enum.Platform;
		readonly Web: Enum.Platform;
		readonly None: Enum.Platform;
	};

	interface PlaybackState extends EnumItem {}
	const PlaybackState: {
		readonly Begin: Enum.PlaybackState;
		readonly Delayed: Enum.PlaybackState;
		readonly Playing: Enum.PlaybackState;
		readonly Paused: Enum.PlaybackState;
		readonly Completed: Enum.PlaybackState;
		readonly Cancelled: Enum.PlaybackState;
	};

	interface PlayerActions extends EnumItem {}
	const PlayerActions: {
		readonly CharacterForward: Enum.PlayerActions;
		readonly CharacterBackward: Enum.PlayerActions;
		readonly CharacterLeft: Enum.PlayerActions;
		readonly CharacterRight: Enum.PlayerActions;
		readonly CharacterJump: Enum.PlayerActions;
	};

	interface PlayerCharacterDestroyBehavior extends EnumItem {}
	const PlayerCharacterDestroyBehavior: {
		readonly Default: Enum.PlayerCharacterDestroyBehavior;
		readonly Disabled: Enum.PlayerCharacterDestroyBehavior;
		readonly Enabled: Enum.PlayerCharacterDestroyBehavior;
	};

	interface PlayerChatType extends EnumItem {}
	const PlayerChatType: {
		readonly All: Enum.PlayerChatType;
		readonly Team: Enum.PlayerChatType;
		readonly Whisper: Enum.PlayerChatType;
	};

	interface PlayerDataErrorState extends EnumItem {}
	const PlayerDataErrorState: {
		readonly LoadFailed: Enum.PlayerDataErrorState;
		readonly FlushFailed: Enum.PlayerDataErrorState;
		readonly ReleaseFailed: Enum.PlayerDataErrorState;
		readonly None: Enum.PlayerDataErrorState;
	};

	interface PlayerDataLoadFailureBehavior extends EnumItem {}
	const PlayerDataLoadFailureBehavior: {
		readonly Failure: Enum.PlayerDataLoadFailureBehavior;
		readonly FallbackToDefault: Enum.PlayerDataLoadFailureBehavior;
		readonly Kick: Enum.PlayerDataLoadFailureBehavior;
	};

	interface PlayerExitReason extends EnumItem {}
	const PlayerExitReason: {
		readonly Unknown: Enum.PlayerExitReason;
		readonly PlatformKick: Enum.PlayerExitReason;
		readonly CreatorKick: Enum.PlayerExitReason;
	};

	interface PoseEasingDirection extends EnumItem {}
	const PoseEasingDirection: {
		readonly In: Enum.PoseEasingDirection;
		readonly Out: Enum.PoseEasingDirection;
		readonly InOut: Enum.PoseEasingDirection;
	};

	interface PoseEasingStyle extends EnumItem {}
	const PoseEasingStyle: {
		readonly Linear: Enum.PoseEasingStyle;
		readonly Constant: Enum.PoseEasingStyle;
		readonly Elastic: Enum.PoseEasingStyle;
		readonly Cubic: Enum.PoseEasingStyle;
		readonly Bounce: Enum.PoseEasingStyle;
		readonly CubicV2: Enum.PoseEasingStyle;
	};

	interface PositionAlignmentMode extends EnumItem {}
	const PositionAlignmentMode: {
		readonly OneAttachment: Enum.PositionAlignmentMode;
		readonly TwoAttachment: Enum.PositionAlignmentMode;
	};

	interface PredictionMode extends EnumItem {}
	const PredictionMode: {
		readonly Automatic: Enum.PredictionMode;
		readonly On: Enum.PredictionMode;
		readonly Off: Enum.PredictionMode;
	};

	interface PredictionStatus extends EnumItem {}
	const PredictionStatus: {
		readonly Authoritative: Enum.PredictionStatus;
		readonly Predicted: Enum.PredictionStatus;
		readonly None: Enum.PredictionStatus;
	};

	interface PreferredInput extends EnumItem {}
	const PreferredInput: {
		readonly KeyboardAndMouse: Enum.PreferredInput;
		readonly Gamepad: Enum.PreferredInput;
		readonly Touch: Enum.PreferredInput;
	};

	interface PreferredTextSize extends EnumItem {}
	const PreferredTextSize: {
		readonly Medium: Enum.PreferredTextSize;
		readonly Large: Enum.PreferredTextSize;
		readonly Larger: Enum.PreferredTextSize;
		readonly Largest: Enum.PreferredTextSize;
	};

	interface PrimalPhysicsSolver extends EnumItem {}
	const PrimalPhysicsSolver: {
		readonly Default: Enum.PrimalPhysicsSolver;
		readonly Experimental: Enum.PrimalPhysicsSolver;
		readonly Disabled: Enum.PrimalPhysicsSolver;
	};

	interface PrimitiveType extends EnumItem {}
	const PrimitiveType: {
		readonly Null: Enum.PrimitiveType;
		readonly Ball: Enum.PrimitiveType;
		readonly Cylinder: Enum.PrimitiveType;
		readonly Block: Enum.PrimitiveType;
		readonly Wedge: Enum.PrimitiveType;
		readonly CornerWedge: Enum.PrimitiveType;
	};

	interface PrivilegeType extends EnumItem {}
	const PrivilegeType: {
		readonly Owner: Enum.PrivilegeType;
		readonly Admin: Enum.PrivilegeType;
		readonly Member: Enum.PrivilegeType;
		readonly Visitor: Enum.PrivilegeType;
		readonly Banned: Enum.PrivilegeType;
	};

	interface ProductLocationRestriction extends EnumItem {}
	const ProductLocationRestriction: {
		readonly AvatarShop: Enum.ProductLocationRestriction;
		readonly AllowedGames: Enum.ProductLocationRestriction;
		readonly AllGames: Enum.ProductLocationRestriction;
	};

	interface ProductPurchaseChannel extends EnumItem {}
	const ProductPurchaseChannel: {
		readonly InExperience: Enum.ProductPurchaseChannel;
		readonly ExperienceDetailsPage: Enum.ProductPurchaseChannel;
		readonly AdReward: Enum.ProductPurchaseChannel;
		readonly CommerceProduct: Enum.ProductPurchaseChannel;
	};

	interface ProductPurchaseDecision extends EnumItem {}
	const ProductPurchaseDecision: {
		readonly NotProcessedYet: Enum.ProductPurchaseDecision;
		readonly PurchaseGranted: Enum.ProductPurchaseDecision;
	};

	interface PromptCreateAssetResult extends EnumItem {}
	const PromptCreateAssetResult: {
		readonly Success: Enum.PromptCreateAssetResult;
		readonly PermissionDenied: Enum.PromptCreateAssetResult;
		readonly Timeout: Enum.PromptCreateAssetResult;
		readonly UploadFailed: Enum.PromptCreateAssetResult;
		readonly NoUserInput: Enum.PromptCreateAssetResult;
		readonly UnknownFailure: Enum.PromptCreateAssetResult;
		readonly UGCValidationFailed: Enum.PromptCreateAssetResult;
		readonly ModeratedName: Enum.PromptCreateAssetResult;
		readonly PurchaseFailure: Enum.PromptCreateAssetResult;
		readonly TokenInvalid: Enum.PromptCreateAssetResult;
	};

	interface PromptCreateAvatarResult extends EnumItem {}
	const PromptCreateAvatarResult: {
		readonly Success: Enum.PromptCreateAvatarResult;
		readonly PermissionDenied: Enum.PromptCreateAvatarResult;
		readonly Timeout: Enum.PromptCreateAvatarResult;
		readonly UploadFailed: Enum.PromptCreateAvatarResult;
		readonly NoUserInput: Enum.PromptCreateAvatarResult;
		readonly InvalidHumanoidDescription: Enum.PromptCreateAvatarResult;
		readonly UGCValidationFailed: Enum.PromptCreateAvatarResult;
		readonly ModeratedName: Enum.PromptCreateAvatarResult;
		readonly MaxOutfits: Enum.PromptCreateAvatarResult;
		readonly PurchaseFailure: Enum.PromptCreateAvatarResult;
		readonly UnknownFailure: Enum.PromptCreateAvatarResult;
		readonly TokenInvalid: Enum.PromptCreateAvatarResult;
	};

	interface PromptExperienceDetailsResult extends EnumItem {}
	const PromptExperienceDetailsResult: {
		readonly PromptClosed: Enum.PromptExperienceDetailsResult;
		readonly TeleportAttempted: Enum.PromptExperienceDetailsResult;
	};

	interface PromptLinkSharingResult extends EnumItem {}
	const PromptLinkSharingResult: {
		readonly Success: Enum.PromptLinkSharingResult;
		readonly PlayerLeft: Enum.PromptLinkSharingResult;
		readonly InvalidLaunchData: Enum.PromptLinkSharingResult;
	};

	interface PromptPublishAssetResult extends EnumItem {}
	const PromptPublishAssetResult: {
		readonly Success: Enum.PromptPublishAssetResult;
		readonly PermissionDenied: Enum.PromptPublishAssetResult;
		readonly Timeout: Enum.PromptPublishAssetResult;
		readonly UploadFailed: Enum.PromptPublishAssetResult;
		readonly NoUserInput: Enum.PromptPublishAssetResult;
		readonly UnknownFailure: Enum.PromptPublishAssetResult;
	};

	interface PropertyStatus extends EnumItem {}
	const PropertyStatus: {
		readonly Ok: Enum.PropertyStatus;
		readonly Warning: Enum.PropertyStatus;
		readonly Error: Enum.PropertyStatus;
	};

	interface ProximityPromptExclusivity extends EnumItem {}
	const ProximityPromptExclusivity: {
		readonly OnePerButton: Enum.ProximityPromptExclusivity;
		readonly OneGlobally: Enum.ProximityPromptExclusivity;
		readonly AlwaysShow: Enum.ProximityPromptExclusivity;
	};

	interface ProximityPromptInputType extends EnumItem {}
	const ProximityPromptInputType: {
		readonly Keyboard: Enum.ProximityPromptInputType;
		readonly Gamepad: Enum.ProximityPromptInputType;
		readonly Touch: Enum.ProximityPromptInputType;
	};

	interface ProximityPromptStyle extends EnumItem {}
	const ProximityPromptStyle: {
		readonly Default: Enum.ProximityPromptStyle;
		readonly Custom: Enum.ProximityPromptStyle;
	};

	interface QualityLevel extends EnumItem {}
	const QualityLevel: {
		readonly Automatic: Enum.QualityLevel;
		readonly Level01: Enum.QualityLevel;
		readonly Level02: Enum.QualityLevel;
		readonly Level03: Enum.QualityLevel;
		readonly Level04: Enum.QualityLevel;
		readonly Level05: Enum.QualityLevel;
		readonly Level06: Enum.QualityLevel;
		readonly Level07: Enum.QualityLevel;
		readonly Level08: Enum.QualityLevel;
		readonly Level09: Enum.QualityLevel;
		readonly Level10: Enum.QualityLevel;
		readonly Level11: Enum.QualityLevel;
		readonly Level12: Enum.QualityLevel;
		readonly Level13: Enum.QualityLevel;
		readonly Level14: Enum.QualityLevel;
		readonly Level15: Enum.QualityLevel;
		readonly Level16: Enum.QualityLevel;
		readonly Level17: Enum.QualityLevel;
		readonly Level18: Enum.QualityLevel;
		readonly Level19: Enum.QualityLevel;
		readonly Level20: Enum.QualityLevel;
		readonly Level21: Enum.QualityLevel;
	};

	interface R15CollisionType extends EnumItem {}
	const R15CollisionType: {
		readonly OuterBox: Enum.R15CollisionType;
		readonly InnerBox: Enum.R15CollisionType;
	};

	interface RaycastFilterType extends EnumItem {}
	const RaycastFilterType: {
		readonly Exclude: Enum.RaycastFilterType;
		readonly Include: Enum.RaycastFilterType;
	};

	interface ReadCapturesFromGalleryResult extends EnumItem {}
	const ReadCapturesFromGalleryResult: {
		readonly Success: Enum.ReadCapturesFromGalleryResult;
		readonly NeedPermission: Enum.ReadCapturesFromGalleryResult;
	};

	interface RecommendationActionType extends EnumItem {}
	const RecommendationActionType: {
		readonly AddReaction: Enum.RecommendationActionType;
		readonly RemoveReaction: Enum.RecommendationActionType;
		readonly Share: Enum.RecommendationActionType;
		readonly Report: Enum.RecommendationActionType;
		readonly Comment: Enum.RecommendationActionType;
		readonly Play: Enum.RecommendationActionType;
		readonly Purchase: Enum.RecommendationActionType;
	};

	interface RecommendationDepartureIntent extends EnumItem {}
	const RecommendationDepartureIntent: {
		readonly Neutral: Enum.RecommendationDepartureIntent;
		readonly Positive: Enum.RecommendationDepartureIntent;
		readonly Negative: Enum.RecommendationDepartureIntent;
	};

	interface RecommendationImpressionType extends EnumItem {}
	const RecommendationImpressionType: {
		readonly View: Enum.RecommendationImpressionType;
		readonly NotViewable: Enum.RecommendationImpressionType;
	};

	interface RecommendationItemContentType extends EnumItem {}
	const RecommendationItemContentType: {
		readonly Static: Enum.RecommendationItemContentType;
		readonly Dynamic: Enum.RecommendationItemContentType;
		readonly Interactive: Enum.RecommendationItemContentType;
	};

	interface RecommendationItemVisibility extends EnumItem {}
	const RecommendationItemVisibility: {
		readonly Private: Enum.RecommendationItemVisibility;
		readonly Public: Enum.RecommendationItemVisibility;
	};

	interface RejectCharacterDeletions extends EnumItem {}
	const RejectCharacterDeletions: {
		readonly Default: Enum.RejectCharacterDeletions;
		readonly Disabled: Enum.RejectCharacterDeletions;
		readonly Enabled: Enum.RejectCharacterDeletions;
	};

	interface RenderFidelity extends EnumItem {}
	const RenderFidelity: {
		readonly Automatic: Enum.RenderFidelity;
		readonly Precise: Enum.RenderFidelity;
		readonly Performance: Enum.RenderFidelity;
	};

	interface RenderPriority extends EnumItem {}
	const RenderPriority: {
		readonly First: Enum.RenderPriority;
		readonly Input: Enum.RenderPriority;
		readonly Camera: Enum.RenderPriority;
		readonly Character: Enum.RenderPriority;
		readonly Last: Enum.RenderPriority;
	};

	interface RenderingCacheOptimizationMode extends EnumItem {}
	const RenderingCacheOptimizationMode: {
		readonly Default: Enum.RenderingCacheOptimizationMode;
		readonly Disabled: Enum.RenderingCacheOptimizationMode;
		readonly Enabled: Enum.RenderingCacheOptimizationMode;
	};

	interface RenderingTestComparisonMethod extends EnumItem {}
	const RenderingTestComparisonMethod: {
		readonly psnr: Enum.RenderingTestComparisonMethod;
		readonly diff: Enum.RenderingTestComparisonMethod;
	};

	interface ReplicateInstanceDestroySetting extends EnumItem {}
	const ReplicateInstanceDestroySetting: {
		readonly Default: Enum.ReplicateInstanceDestroySetting;
		readonly Disabled: Enum.ReplicateInstanceDestroySetting;
		readonly Enabled: Enum.ReplicateInstanceDestroySetting;
	};

	interface ResamplerMode extends EnumItem {}
	const ResamplerMode: {
		readonly Default: Enum.ResamplerMode;
		readonly Pixelated: Enum.ResamplerMode;
	};

	interface ReservedHighlightId extends EnumItem {}
	const ReservedHighlightId: {
		readonly Standard: Enum.ReservedHighlightId;
		readonly Selection: Enum.ReservedHighlightId;
		readonly Hover: Enum.ReservedHighlightId;
		readonly Active: Enum.ReservedHighlightId;
		readonly NegatedPart: Enum.ReservedHighlightId;
	};

	interface RestPose extends EnumItem {}
	const RestPose: {
		readonly Default: Enum.RestPose;
		readonly RotationsReset: Enum.RestPose;
		readonly Custom: Enum.RestPose;
	};

	interface RestPoseModel extends EnumItem {}
	const RestPoseModel: {
		readonly FromRigInACE: Enum.RestPoseModel;
		readonly FromRigInFile: Enum.RestPoseModel;
	};

	interface ReturnKeyType extends EnumItem {}
	const ReturnKeyType: {
		readonly Default: Enum.ReturnKeyType;
		readonly Done: Enum.ReturnKeyType;
		readonly Go: Enum.ReturnKeyType;
		readonly Next: Enum.ReturnKeyType;
		readonly Search: Enum.ReturnKeyType;
		readonly Send: Enum.ReturnKeyType;
	};

	interface ReverbType extends EnumItem {}
	const ReverbType: {
		readonly NoReverb: Enum.ReverbType;
		readonly GenericReverb: Enum.ReverbType;
		readonly PaddedCell: Enum.ReverbType;
		readonly Room: Enum.ReverbType;
		readonly Bathroom: Enum.ReverbType;
		readonly LivingRoom: Enum.ReverbType;
		readonly StoneRoom: Enum.ReverbType;
		readonly Auditorium: Enum.ReverbType;
		readonly ConcertHall: Enum.ReverbType;
		readonly Cave: Enum.ReverbType;
		readonly Arena: Enum.ReverbType;
		readonly Hangar: Enum.ReverbType;
		readonly CarpettedHallway: Enum.ReverbType;
		readonly Hallway: Enum.ReverbType;
		readonly StoneCorridor: Enum.ReverbType;
		readonly Alley: Enum.ReverbType;
		readonly Forest: Enum.ReverbType;
		readonly City: Enum.ReverbType;
		readonly Mountains: Enum.ReverbType;
		readonly Quarry: Enum.ReverbType;
		readonly Plain: Enum.ReverbType;
		readonly ParkingLot: Enum.ReverbType;
		readonly SewerPipe: Enum.ReverbType;
		readonly UnderWater: Enum.ReverbType;
	};

	interface ReviewableContentState extends EnumItem {}
	const ReviewableContentState: {
		readonly Pending: Enum.ReviewableContentState;
		readonly Completed: Enum.ReviewableContentState;
		readonly Failed: Enum.ReviewableContentState;
	};

	interface RibbonTool extends EnumItem {}
	const RibbonTool: {
		readonly Select: Enum.RibbonTool;
		readonly Scale: Enum.RibbonTool;
		readonly Rotate: Enum.RibbonTool;
		readonly Move: Enum.RibbonTool;
		readonly Transform: Enum.RibbonTool;
		readonly ColorPicker: Enum.RibbonTool;
		readonly MaterialPicker: Enum.RibbonTool;
		readonly Group: Enum.RibbonTool;
		readonly Ungroup: Enum.RibbonTool;
		readonly None: Enum.RibbonTool;
		readonly PivotEditor: Enum.RibbonTool;
	};

	interface RigLabel extends EnumItem {}
	const RigLabel: {
		readonly Invalid: Enum.RigLabel;
		readonly Root: Enum.RigLabel;
		readonly Pelvis: Enum.RigLabel;
		readonly Waist: Enum.RigLabel;
		readonly Chest: Enum.RigLabel;
		readonly Neck: Enum.RigLabel;
		readonly HeadBase: Enum.RigLabel;
		readonly LeftClavicle: Enum.RigLabel;
		readonly LeftShoulder: Enum.RigLabel;
		readonly LeftElbow: Enum.RigLabel;
		readonly LeftWrist: Enum.RigLabel;
		readonly RightClavicle: Enum.RigLabel;
		readonly RightShoulder: Enum.RigLabel;
		readonly RightElbow: Enum.RigLabel;
		readonly RightWrist: Enum.RigLabel;
		readonly LeftHip: Enum.RigLabel;
		readonly LeftKnee: Enum.RigLabel;
		readonly LeftAnkle: Enum.RigLabel;
		readonly LeftToes: Enum.RigLabel;
		readonly RightHip: Enum.RigLabel;
		readonly RightKnee: Enum.RigLabel;
		readonly RightAnkle: Enum.RigLabel;
		readonly RightToes: Enum.RigLabel;
	};

	interface RigScale extends EnumItem {}
	const RigScale: {
		readonly Default: Enum.RigScale;
		readonly Rthro: Enum.RigScale;
		readonly RthroNarrow: Enum.RigScale;
	};

	interface RigType extends EnumItem {}
	const RigType: {
		readonly R15: Enum.RigType;
		readonly CustomHumanoid: Enum.RigType;
		readonly Custom: Enum.RigType;
		readonly None: Enum.RigType;
	};

	interface RollOffMode extends EnumItem {}
	const RollOffMode: {
		readonly Inverse: Enum.RollOffMode;
		readonly Linear: Enum.RollOffMode;
		readonly LinearSquare: Enum.RollOffMode;
		readonly InverseTapered: Enum.RollOffMode;
	};

	interface RolloutState extends EnumItem {}
	const RolloutState: {
		readonly Default: Enum.RolloutState;
		readonly Disabled: Enum.RolloutState;
		readonly Enabled: Enum.RolloutState;
	};

	interface RotationOrder extends EnumItem {}
	const RotationOrder: {
		readonly XYZ: Enum.RotationOrder;
		readonly XZY: Enum.RotationOrder;
		readonly YZX: Enum.RotationOrder;
		readonly YXZ: Enum.RotationOrder;
		readonly ZXY: Enum.RotationOrder;
		readonly ZYX: Enum.RotationOrder;
	};

	interface RotationType extends EnumItem {}
	const RotationType: {
		readonly MovementRelative: Enum.RotationType;
		readonly CameraRelative: Enum.RotationType;
	};

	interface RsvpStatus extends EnumItem {}
	const RsvpStatus: {
		readonly None: Enum.RsvpStatus;
		readonly Going: Enum.RsvpStatus;
		readonly NotGoing: Enum.RsvpStatus;
	};

	interface RtlTextSupport extends EnumItem {}
	const RtlTextSupport: {
		readonly Default: Enum.RtlTextSupport;
		readonly Disabled: Enum.RtlTextSupport;
		readonly Enabled: Enum.RtlTextSupport;
	};

	interface RunContext extends EnumItem {}
	const RunContext: {
		readonly Legacy: Enum.RunContext;
		readonly Server: Enum.RunContext;
		readonly Client: Enum.RunContext;
		readonly Plugin: Enum.RunContext;
	};

	interface RunState extends EnumItem {}
	const RunState: {
		readonly Stopped: Enum.RunState;
		readonly Running: Enum.RunState;
		readonly Paused: Enum.RunState;
	};

	interface RuntimeUndoBehavior extends EnumItem {}
	const RuntimeUndoBehavior: {
		readonly Aggregate: Enum.RuntimeUndoBehavior;
		readonly Snapshot: Enum.RuntimeUndoBehavior;
		readonly Hybrid: Enum.RuntimeUndoBehavior;
	};

	interface SafeAreaCompatibility extends EnumItem {}
	const SafeAreaCompatibility: {
		readonly None: Enum.SafeAreaCompatibility;
		readonly FullscreenExtension: Enum.SafeAreaCompatibility;
	};

	interface SalesTypeFilter extends EnumItem {}
	const SalesTypeFilter: {
		readonly All: Enum.SalesTypeFilter;
		readonly Collectibles: Enum.SalesTypeFilter;
		readonly Premium: Enum.SalesTypeFilter;
		readonly TimedOptions: Enum.SalesTypeFilter;
	};

	interface SandboxedInstanceMode extends EnumItem {}
	const SandboxedInstanceMode: {
		readonly Default: Enum.SandboxedInstanceMode;
		readonly Experimental: Enum.SandboxedInstanceMode;
	};

	interface SaveAvatarThumbnailCustomizationFailure extends EnumItem {}
	const SaveAvatarThumbnailCustomizationFailure: {
		readonly BadThumbnailType: Enum.SaveAvatarThumbnailCustomizationFailure;
		readonly BadYRotDeg: Enum.SaveAvatarThumbnailCustomizationFailure;
		readonly BadFieldOfViewDeg: Enum.SaveAvatarThumbnailCustomizationFailure;
		readonly BadDistanceScale: Enum.SaveAvatarThumbnailCustomizationFailure;
		readonly Other: Enum.SaveAvatarThumbnailCustomizationFailure;
		readonly Throttled: Enum.SaveAvatarThumbnailCustomizationFailure;
	};

	interface SaveFilter extends EnumItem {}
	const SaveFilter: {
		readonly SaveWorld: Enum.SaveFilter;
		readonly SaveGame: Enum.SaveFilter;
		readonly SaveAll: Enum.SaveFilter;
	};

	interface SavedQualitySetting extends EnumItem {}
	const SavedQualitySetting: {
		readonly Automatic: Enum.SavedQualitySetting;
		readonly QualityLevel1: Enum.SavedQualitySetting;
		readonly QualityLevel2: Enum.SavedQualitySetting;
		readonly QualityLevel3: Enum.SavedQualitySetting;
		readonly QualityLevel4: Enum.SavedQualitySetting;
		readonly QualityLevel5: Enum.SavedQualitySetting;
		readonly QualityLevel6: Enum.SavedQualitySetting;
		readonly QualityLevel7: Enum.SavedQualitySetting;
		readonly QualityLevel8: Enum.SavedQualitySetting;
		readonly QualityLevel9: Enum.SavedQualitySetting;
		readonly QualityLevel10: Enum.SavedQualitySetting;
	};

	interface ScaleType extends EnumItem {}
	const ScaleType: {
		readonly Stretch: Enum.ScaleType;
		readonly Slice: Enum.ScaleType;
		readonly Tile: Enum.ScaleType;
		readonly Fit: Enum.ScaleType;
		readonly Crop: Enum.ScaleType;
	};

	interface ScopeCheckResult extends EnumItem {}
	const ScopeCheckResult: {
		readonly ConsentAccepted: Enum.ScopeCheckResult;
		readonly InvalidScopes: Enum.ScopeCheckResult;
		readonly Timeout: Enum.ScopeCheckResult;
		readonly NoUserInput: Enum.ScopeCheckResult;
		readonly BackendError: Enum.ScopeCheckResult;
		readonly UnexpectedError: Enum.ScopeCheckResult;
		readonly InvalidArgument: Enum.ScopeCheckResult;
		readonly ConsentDenied: Enum.ScopeCheckResult;
	};

	interface ScreenInsets extends EnumItem {}
	const ScreenInsets: {
		readonly None: Enum.ScreenInsets;
		readonly DeviceSafeInsets: Enum.ScreenInsets;
		readonly CoreUISafeInsets: Enum.ScreenInsets;
		readonly TopbarSafeInsets: Enum.ScreenInsets;
	};

	interface ScreenOrientation extends EnumItem {}
	const ScreenOrientation: {
		readonly LandscapeLeft: Enum.ScreenOrientation;
		readonly LandscapeRight: Enum.ScreenOrientation;
		readonly LandscapeSensor: Enum.ScreenOrientation;
		readonly Portrait: Enum.ScreenOrientation;
		readonly Sensor: Enum.ScreenOrientation;
	};

	interface ScreenshotCaptureResult extends EnumItem {}
	const ScreenshotCaptureResult: {
		readonly Success: Enum.ScreenshotCaptureResult;
		readonly OtherError: Enum.ScreenshotCaptureResult;
		readonly NoDeviceSupport: Enum.ScreenshotCaptureResult;
		readonly NoSpaceOnDevice: Enum.ScreenshotCaptureResult;
	};

	interface ScrollBarInset extends EnumItem {}
	const ScrollBarInset: {
		readonly None: Enum.ScrollBarInset;
		readonly ScrollBar: Enum.ScrollBarInset;
		readonly Always: Enum.ScrollBarInset;
	};

	interface ScrollingDirection extends EnumItem {}
	const ScrollingDirection: {
		readonly X: Enum.ScrollingDirection;
		readonly Y: Enum.ScrollingDirection;
		readonly XY: Enum.ScrollingDirection;
	};

	interface SecurityCapability extends EnumItem {}
	const SecurityCapability: {
		readonly RunClientScript: Enum.SecurityCapability;
		readonly RunServerScript: Enum.SecurityCapability;
		readonly AccessOutsideWrite: Enum.SecurityCapability;
		readonly AssetRequire: Enum.SecurityCapability;
		readonly LoadString: Enum.SecurityCapability;
		readonly ScriptGlobals: Enum.SecurityCapability;
		readonly CreateInstances: Enum.SecurityCapability;
		readonly Basic: Enum.SecurityCapability;
		readonly Audio: Enum.SecurityCapability;
		readonly DataStore: Enum.SecurityCapability;
		readonly Network: Enum.SecurityCapability;
		readonly Physics: Enum.SecurityCapability;
		readonly UI: Enum.SecurityCapability;
		readonly CSG: Enum.SecurityCapability;
		readonly Chat: Enum.SecurityCapability;
		readonly Animation: Enum.SecurityCapability;
		readonly Avatar: Enum.SecurityCapability;
		readonly Input: Enum.SecurityCapability;
		readonly Environment: Enum.SecurityCapability;
		readonly RemoteEvent: Enum.SecurityCapability;
		readonly LegacySound: Enum.SecurityCapability;
		readonly Players: Enum.SecurityCapability;
		readonly CapabilityControl: Enum.SecurityCapability;
		readonly Plugin: Enum.SecurityCapability;
		readonly LocalUser: Enum.SecurityCapability;
		readonly WritePlayer: Enum.SecurityCapability;
		readonly RobloxScript: Enum.SecurityCapability;
		readonly RobloxEngine: Enum.SecurityCapability;
		readonly Unassigned: Enum.SecurityCapability;
		readonly InternalTest: Enum.SecurityCapability;
		readonly PluginOrOpenCloud: Enum.SecurityCapability;
		readonly Assistant: Enum.SecurityCapability;
		readonly RemoteCommand: Enum.SecurityCapability;
		readonly AssetRead: Enum.SecurityCapability;
		readonly AssetManagement: Enum.SecurityCapability;
		readonly DynamicGeneration: Enum.SecurityCapability;
		readonly PlatformAvatarEditing: Enum.SecurityCapability;
		readonly AssetCreateUpdate: Enum.SecurityCapability;
		readonly Capture: Enum.SecurityCapability;
		readonly SensitiveInput: Enum.SecurityCapability;
		readonly Monetization: Enum.SecurityCapability;
		readonly LoadOwnedAsset: Enum.SecurityCapability;
		readonly Social: Enum.SecurityCapability;
		readonly ServerCommunication: Enum.SecurityCapability;
		readonly Logging: Enum.SecurityCapability;
		readonly PromptExternalPurchase: Enum.SecurityCapability;
		readonly Groups: Enum.SecurityCapability;
		readonly Teleport: Enum.SecurityCapability;
		readonly Consequences: Enum.SecurityCapability;
		readonly Material: Enum.SecurityCapability;
		readonly AvatarBehavior: Enum.SecurityCapability;
	};

	interface SelectionBehavior extends EnumItem {}
	const SelectionBehavior: {
		readonly Escape: Enum.SelectionBehavior;
		readonly Stop: Enum.SelectionBehavior;
	};

	interface SelectionRenderMode extends EnumItem {}
	const SelectionRenderMode: {
		readonly Outlines: Enum.SelectionRenderMode;
		readonly BoundingBoxes: Enum.SelectionRenderMode;
		readonly Both: Enum.SelectionRenderMode;
	};

	interface SelfViewPosition extends EnumItem {}
	const SelfViewPosition: {
		readonly LastPosition: Enum.SelfViewPosition;
		readonly TopLeft: Enum.SelfViewPosition;
		readonly TopRight: Enum.SelfViewPosition;
		readonly BottomLeft: Enum.SelfViewPosition;
		readonly BottomRight: Enum.SelfViewPosition;
	};

	interface SensorMode extends EnumItem {}
	const SensorMode: {
		readonly Floor: Enum.SensorMode;
		readonly Ladder: Enum.SensorMode;
	};

	interface SensorUpdateType extends EnumItem {}
	const SensorUpdateType: {
		readonly OnRead: Enum.SensorUpdateType;
		readonly Manual: Enum.SensorUpdateType;
	};

	interface ServerLiveEditingMode extends EnumItem {}
	const ServerLiveEditingMode: {
		readonly Uninitialized: Enum.ServerLiveEditingMode;
		readonly Enabled: Enum.ServerLiveEditingMode;
		readonly Disabled: Enum.ServerLiveEditingMode;
	};

	interface ServiceVisibility extends EnumItem {}
	const ServiceVisibility: {
		readonly Always: Enum.ServiceVisibility;
		readonly Off: Enum.ServiceVisibility;
		readonly WithChildren: Enum.ServiceVisibility;
	};

	interface Severity extends EnumItem {}
	const Severity: {
		readonly Error: Enum.Severity;
		readonly Warning: Enum.Severity;
		readonly Information: Enum.Severity;
		readonly Hint: Enum.Severity;
	};

	interface ShowAdResult extends EnumItem {}
	const ShowAdResult: {
		readonly ShowCompleted: Enum.ShowAdResult;
		readonly AdNotReady: Enum.ShowAdResult;
		readonly AdAlreadyShowing: Enum.ShowAdResult;
		readonly InternalError: Enum.ShowAdResult;
		readonly ShowInterrupted: Enum.ShowAdResult;
		readonly InsufficientMemory: Enum.ShowAdResult;
	};

	interface SignalBehavior extends EnumItem {}
	const SignalBehavior: {
		readonly Default: Enum.SignalBehavior;
		readonly Immediate: Enum.SignalBehavior;
		readonly Deferred: Enum.SignalBehavior;
		readonly AncestryDeferred: Enum.SignalBehavior;
	};

	interface SizeConstraint extends EnumItem {}
	const SizeConstraint: {
		readonly RelativeXY: Enum.SizeConstraint;
		readonly RelativeXX: Enum.SizeConstraint;
		readonly RelativeYY: Enum.SizeConstraint;
	};

	interface SolverConvergenceMetricType extends EnumItem {}
	const SolverConvergenceMetricType: {
		readonly IterationBased: Enum.SolverConvergenceMetricType;
		readonly AlgorithmAgnostic: Enum.SolverConvergenceMetricType;
	};

	interface SolverConvergenceVisualizationMode extends EnumItem {}
	const SolverConvergenceVisualizationMode: {
		readonly Disabled: Enum.SolverConvergenceVisualizationMode;
		readonly PerIsland: Enum.SolverConvergenceVisualizationMode;
		readonly PerEdge: Enum.SolverConvergenceVisualizationMode;
	};

	interface SortDirection extends EnumItem {}
	const SortDirection: {
		readonly Ascending: Enum.SortDirection;
		readonly Descending: Enum.SortDirection;
	};

	interface SortOrder extends EnumItem {}
	const SortOrder: {
		readonly Name: Enum.SortOrder;
		readonly Custom: Enum.SortOrder;
		readonly LayoutOrder: Enum.SortOrder;
	};

	interface SpecialKey extends EnumItem {}
	const SpecialKey: {
		readonly Insert: Enum.SpecialKey;
		readonly Home: Enum.SpecialKey;
		readonly End: Enum.SpecialKey;
		readonly PageUp: Enum.SpecialKey;
		readonly PageDown: Enum.SpecialKey;
		readonly ChatHotkey: Enum.SpecialKey;
	};

	interface StartCorner extends EnumItem {}
	const StartCorner: {
		readonly TopLeft: Enum.StartCorner;
		readonly TopRight: Enum.StartCorner;
		readonly BottomLeft: Enum.StartCorner;
		readonly BottomRight: Enum.StartCorner;
	};

	interface StateObjectFieldType extends EnumItem {}
	const StateObjectFieldType: {
		readonly Boolean: Enum.StateObjectFieldType;
		readonly CFrame: Enum.StateObjectFieldType;
		readonly Color3: Enum.StateObjectFieldType;
		readonly Float: Enum.StateObjectFieldType;
		readonly Instance: Enum.StateObjectFieldType;
		readonly Random: Enum.StateObjectFieldType;
		readonly Vector2: Enum.StateObjectFieldType;
		readonly Vector3: Enum.StateObjectFieldType;
		readonly INVALID: Enum.StateObjectFieldType;
	};

	interface Status extends EnumItem {}
	const Status: {
		readonly Poison: Enum.Status;
		readonly Confusion: Enum.Status;
	};

	interface StepFrequency extends EnumItem {}
	const StepFrequency: {
		readonly Hz60: Enum.StepFrequency;
		readonly Hz30: Enum.StepFrequency;
		readonly Hz15: Enum.StepFrequency;
		readonly Hz10: Enum.StepFrequency;
		readonly Hz5: Enum.StepFrequency;
		readonly Hz1: Enum.StepFrequency;
	};

	interface StreamOutBehavior extends EnumItem {}
	const StreamOutBehavior: {
		readonly Default: Enum.StreamOutBehavior;
		readonly LowMemory: Enum.StreamOutBehavior;
		readonly Opportunistic: Enum.StreamOutBehavior;
	};

	interface StreamingIntegrityMode extends EnumItem {}
	const StreamingIntegrityMode: {
		readonly Default: Enum.StreamingIntegrityMode;
		readonly Disabled: Enum.StreamingIntegrityMode;
		readonly MinimumRadiusPause: Enum.StreamingIntegrityMode;
		readonly PauseOutsideLoadedArea: Enum.StreamingIntegrityMode;
	};

	interface StreamingPauseMode extends EnumItem {}
	const StreamingPauseMode: {
		readonly Default: Enum.StreamingPauseMode;
		readonly Disabled: Enum.StreamingPauseMode;
		readonly ClientPhysicsPause: Enum.StreamingPauseMode;
	};

	interface StrokeSizingMode extends EnumItem {}
	const StrokeSizingMode: {
		readonly FixedSize: Enum.StrokeSizingMode;
		readonly ScaledSize: Enum.StrokeSizingMode;
	};

	interface StudioCloseMode extends EnumItem {}
	const StudioCloseMode: {
		readonly None: Enum.StudioCloseMode;
		readonly CloseStudio: Enum.StudioCloseMode;
		readonly CloseDoc: Enum.StudioCloseMode;
		readonly LogOut: Enum.StudioCloseMode;
	};

	interface StudioDataModelType extends EnumItem {}
	const StudioDataModelType: {
		readonly Edit: Enum.StudioDataModelType;
		readonly PlayClient: Enum.StudioDataModelType;
		readonly PlayServer: Enum.StudioDataModelType;
		readonly Standalone: Enum.StudioDataModelType;
		readonly None: Enum.StudioDataModelType;
	};

	interface StudioPlaceUpdateFailureReason extends EnumItem {}
	const StudioPlaceUpdateFailureReason: {
		readonly Other: Enum.StudioPlaceUpdateFailureReason;
		readonly TeamCreateConflict: Enum.StudioPlaceUpdateFailureReason;
	};

	interface StudioScriptEditorColorCategories extends EnumItem {}
	const StudioScriptEditorColorCategories: {
		readonly Default: Enum.StudioScriptEditorColorCategories;
		readonly Operator: Enum.StudioScriptEditorColorCategories;
		readonly Number: Enum.StudioScriptEditorColorCategories;
		readonly String: Enum.StudioScriptEditorColorCategories;
		readonly Comment: Enum.StudioScriptEditorColorCategories;
		readonly Keyword: Enum.StudioScriptEditorColorCategories;
		readonly Builtin: Enum.StudioScriptEditorColorCategories;
		readonly Method: Enum.StudioScriptEditorColorCategories;
		readonly Property: Enum.StudioScriptEditorColorCategories;
		readonly Nil: Enum.StudioScriptEditorColorCategories;
		readonly Bool: Enum.StudioScriptEditorColorCategories;
		readonly Function: Enum.StudioScriptEditorColorCategories;
		readonly Local: Enum.StudioScriptEditorColorCategories;
		readonly Self: Enum.StudioScriptEditorColorCategories;
		readonly LuauKeyword: Enum.StudioScriptEditorColorCategories;
		readonly FunctionName: Enum.StudioScriptEditorColorCategories;
		readonly TODO: Enum.StudioScriptEditorColorCategories;
		readonly Background: Enum.StudioScriptEditorColorCategories;
		readonly SelectionText: Enum.StudioScriptEditorColorCategories;
		readonly SelectionBackground: Enum.StudioScriptEditorColorCategories;
		readonly FindSelectionBackground: Enum.StudioScriptEditorColorCategories;
		readonly MatchingWordBackground: Enum.StudioScriptEditorColorCategories;
		readonly Warning: Enum.StudioScriptEditorColorCategories;
		readonly Error: Enum.StudioScriptEditorColorCategories;
		readonly Info: Enum.StudioScriptEditorColorCategories;
		readonly Hint: Enum.StudioScriptEditorColorCategories;
		readonly Whitespace: Enum.StudioScriptEditorColorCategories;
		readonly ActiveLine: Enum.StudioScriptEditorColorCategories;
		readonly DebuggerCurrentLine: Enum.StudioScriptEditorColorCategories;
		readonly DebuggerErrorLine: Enum.StudioScriptEditorColorCategories;
		readonly Ruler: Enum.StudioScriptEditorColorCategories;
		readonly Bracket: Enum.StudioScriptEditorColorCategories;
		readonly Type: Enum.StudioScriptEditorColorCategories;
		readonly MenuPrimaryText: Enum.StudioScriptEditorColorCategories;
		readonly MenuSecondaryText: Enum.StudioScriptEditorColorCategories;
		readonly MenuSelectedText: Enum.StudioScriptEditorColorCategories;
		readonly MenuBackground: Enum.StudioScriptEditorColorCategories;
		readonly MenuSelectedBackground: Enum.StudioScriptEditorColorCategories;
		readonly MenuScrollbarBackground: Enum.StudioScriptEditorColorCategories;
		readonly MenuScrollbarHandle: Enum.StudioScriptEditorColorCategories;
		readonly MenuBorder: Enum.StudioScriptEditorColorCategories;
		readonly DocViewCodeBackground: Enum.StudioScriptEditorColorCategories;
		readonly AICOOverlayText: Enum.StudioScriptEditorColorCategories;
		readonly AICOOverlayButtonBackground: Enum.StudioScriptEditorColorCategories;
		readonly AICOOverlayButtonBackgroundHover: Enum.StudioScriptEditorColorCategories;
		readonly AICOOverlayButtonBackgroundPressed: Enum.StudioScriptEditorColorCategories;
		readonly IndentationRuler: Enum.StudioScriptEditorColorCategories;
	};

	interface StudioScriptEditorColorPresets extends EnumItem {}
	const StudioScriptEditorColorPresets: {
		readonly RobloxDefault: Enum.StudioScriptEditorColorPresets;
		readonly Extra1: Enum.StudioScriptEditorColorPresets;
		readonly Extra2: Enum.StudioScriptEditorColorPresets;
		readonly Custom: Enum.StudioScriptEditorColorPresets;
	};

	interface StudioStyleGuideColor extends EnumItem {}
	const StudioStyleGuideColor: {
		readonly MainBackground: Enum.StudioStyleGuideColor;
		readonly Titlebar: Enum.StudioStyleGuideColor;
		readonly Dropdown: Enum.StudioStyleGuideColor;
		readonly Tooltip: Enum.StudioStyleGuideColor;
		readonly Notification: Enum.StudioStyleGuideColor;
		readonly ScrollBar: Enum.StudioStyleGuideColor;
		readonly ScrollBarBackground: Enum.StudioStyleGuideColor;
		readonly TabBar: Enum.StudioStyleGuideColor;
		readonly Tab: Enum.StudioStyleGuideColor;
		readonly FilterButtonDefault: Enum.StudioStyleGuideColor;
		readonly FilterButtonHover: Enum.StudioStyleGuideColor;
		readonly FilterButtonChecked: Enum.StudioStyleGuideColor;
		readonly FilterButtonAccent: Enum.StudioStyleGuideColor;
		readonly FilterButtonBorder: Enum.StudioStyleGuideColor;
		readonly FilterButtonBorderAlt: Enum.StudioStyleGuideColor;
		readonly RibbonTab: Enum.StudioStyleGuideColor;
		readonly RibbonTabTopBar: Enum.StudioStyleGuideColor;
		readonly Button: Enum.StudioStyleGuideColor;
		readonly MainButton: Enum.StudioStyleGuideColor;
		readonly RibbonButton: Enum.StudioStyleGuideColor;
		readonly ViewPortBackground: Enum.StudioStyleGuideColor;
		readonly InputFieldBackground: Enum.StudioStyleGuideColor;
		readonly Item: Enum.StudioStyleGuideColor;
		readonly TableItem: Enum.StudioStyleGuideColor;
		readonly CategoryItem: Enum.StudioStyleGuideColor;
		readonly GameSettingsTableItem: Enum.StudioStyleGuideColor;
		readonly GameSettingsTooltip: Enum.StudioStyleGuideColor;
		readonly EmulatorBar: Enum.StudioStyleGuideColor;
		readonly EmulatorDropDown: Enum.StudioStyleGuideColor;
		readonly ColorPickerFrame: Enum.StudioStyleGuideColor;
		readonly CurrentMarker: Enum.StudioStyleGuideColor;
		readonly Border: Enum.StudioStyleGuideColor;
		readonly DropShadow: Enum.StudioStyleGuideColor;
		readonly Shadow: Enum.StudioStyleGuideColor;
		readonly Light: Enum.StudioStyleGuideColor;
		readonly Dark: Enum.StudioStyleGuideColor;
		readonly Mid: Enum.StudioStyleGuideColor;
		readonly MainText: Enum.StudioStyleGuideColor;
		readonly SubText: Enum.StudioStyleGuideColor;
		readonly TitlebarText: Enum.StudioStyleGuideColor;
		readonly BrightText: Enum.StudioStyleGuideColor;
		readonly DimmedText: Enum.StudioStyleGuideColor;
		readonly LinkText: Enum.StudioStyleGuideColor;
		readonly WarningText: Enum.StudioStyleGuideColor;
		readonly ErrorText: Enum.StudioStyleGuideColor;
		readonly InfoText: Enum.StudioStyleGuideColor;
		readonly SensitiveText: Enum.StudioStyleGuideColor;
		readonly ScriptSideWidget: Enum.StudioStyleGuideColor;
		readonly ScriptBackground: Enum.StudioStyleGuideColor;
		readonly ScriptText: Enum.StudioStyleGuideColor;
		readonly ScriptSelectionText: Enum.StudioStyleGuideColor;
		readonly ScriptSelectionBackground: Enum.StudioStyleGuideColor;
		readonly ScriptFindSelectionBackground: Enum.StudioStyleGuideColor;
		readonly ScriptMatchingWordSelectionBackground: Enum.StudioStyleGuideColor;
		readonly ScriptOperator: Enum.StudioStyleGuideColor;
		readonly ScriptNumber: Enum.StudioStyleGuideColor;
		readonly ScriptString: Enum.StudioStyleGuideColor;
		readonly ScriptComment: Enum.StudioStyleGuideColor;
		readonly ScriptKeyword: Enum.StudioStyleGuideColor;
		readonly ScriptBuiltInFunction: Enum.StudioStyleGuideColor;
		readonly ScriptWarning: Enum.StudioStyleGuideColor;
		readonly ScriptError: Enum.StudioStyleGuideColor;
		readonly ScriptInformation: Enum.StudioStyleGuideColor;
		readonly ScriptHint: Enum.StudioStyleGuideColor;
		readonly ScriptWhitespace: Enum.StudioStyleGuideColor;
		readonly ScriptRuler: Enum.StudioStyleGuideColor;
		readonly DocViewCodeBackground: Enum.StudioStyleGuideColor;
		readonly DebuggerCurrentLine: Enum.StudioStyleGuideColor;
		readonly DebuggerErrorLine: Enum.StudioStyleGuideColor;
		readonly DiffFilePathText: Enum.StudioStyleGuideColor;
		readonly DiffTextHunkInfo: Enum.StudioStyleGuideColor;
		readonly DiffTextNoChange: Enum.StudioStyleGuideColor;
		readonly DiffTextAddition: Enum.StudioStyleGuideColor;
		readonly DiffTextDeletion: Enum.StudioStyleGuideColor;
		readonly DiffTextSeparatorBackground: Enum.StudioStyleGuideColor;
		readonly DiffTextNoChangeBackground: Enum.StudioStyleGuideColor;
		readonly DiffTextAdditionBackground: Enum.StudioStyleGuideColor;
		readonly DiffTextDeletionBackground: Enum.StudioStyleGuideColor;
		readonly DiffLineNum: Enum.StudioStyleGuideColor;
		readonly DiffLineNumSeparatorBackground: Enum.StudioStyleGuideColor;
		readonly DiffLineNumNoChangeBackground: Enum.StudioStyleGuideColor;
		readonly DiffLineNumAdditionBackground: Enum.StudioStyleGuideColor;
		readonly DiffLineNumDeletionBackground: Enum.StudioStyleGuideColor;
		readonly DiffFilePathBackground: Enum.StudioStyleGuideColor;
		readonly DiffFilePathBorder: Enum.StudioStyleGuideColor;
		readonly ChatIncomingBgColor: Enum.StudioStyleGuideColor;
		readonly ChatIncomingTextColor: Enum.StudioStyleGuideColor;
		readonly ChatOutgoingBgColor: Enum.StudioStyleGuideColor;
		readonly ChatOutgoingTextColor: Enum.StudioStyleGuideColor;
		readonly ChatModeratedMessageColor: Enum.StudioStyleGuideColor;
		readonly Separator: Enum.StudioStyleGuideColor;
		readonly ButtonBorder: Enum.StudioStyleGuideColor;
		readonly ButtonText: Enum.StudioStyleGuideColor;
		readonly InputFieldBorder: Enum.StudioStyleGuideColor;
		readonly CheckedFieldBackground: Enum.StudioStyleGuideColor;
		readonly CheckedFieldBorder: Enum.StudioStyleGuideColor;
		readonly CheckedFieldIndicator: Enum.StudioStyleGuideColor;
		readonly HeaderSection: Enum.StudioStyleGuideColor;
		readonly Midlight: Enum.StudioStyleGuideColor;
		readonly StatusBar: Enum.StudioStyleGuideColor;
		readonly DialogButton: Enum.StudioStyleGuideColor;
		readonly DialogButtonText: Enum.StudioStyleGuideColor;
		readonly DialogButtonBorder: Enum.StudioStyleGuideColor;
		readonly DialogMainButton: Enum.StudioStyleGuideColor;
		readonly DialogMainButtonText: Enum.StudioStyleGuideColor;
		readonly InfoBarWarningBackground: Enum.StudioStyleGuideColor;
		readonly InfoBarWarningText: Enum.StudioStyleGuideColor;
		readonly ScriptEditorCurrentLine: Enum.StudioStyleGuideColor;
		readonly ScriptMethod: Enum.StudioStyleGuideColor;
		readonly ScriptProperty: Enum.StudioStyleGuideColor;
		readonly ScriptNil: Enum.StudioStyleGuideColor;
		readonly ScriptBool: Enum.StudioStyleGuideColor;
		readonly ScriptFunction: Enum.StudioStyleGuideColor;
		readonly ScriptLocal: Enum.StudioStyleGuideColor;
		readonly ScriptSelf: Enum.StudioStyleGuideColor;
		readonly ScriptLuauKeyword: Enum.StudioStyleGuideColor;
		readonly ScriptFunctionName: Enum.StudioStyleGuideColor;
		readonly ScriptTodo: Enum.StudioStyleGuideColor;
		readonly ScriptBracket: Enum.StudioStyleGuideColor;
		readonly AttributeCog: Enum.StudioStyleGuideColor;
		readonly AICOOverlayText: Enum.StudioStyleGuideColor;
		readonly AICOOverlayButtonBackground: Enum.StudioStyleGuideColor;
		readonly AICOOverlayButtonBackgroundHover: Enum.StudioStyleGuideColor;
		readonly AICOOverlayButtonBackgroundPressed: Enum.StudioStyleGuideColor;
		readonly OnboardingCover: Enum.StudioStyleGuideColor;
		readonly OnboardingHighlight: Enum.StudioStyleGuideColor;
		readonly OnboardingShadow: Enum.StudioStyleGuideColor;
		readonly BreakpointMarker: Enum.StudioStyleGuideColor;
		readonly DiffLineNumHover: Enum.StudioStyleGuideColor;
		readonly DiffLineNumSeparatorBackgroundHover: Enum.StudioStyleGuideColor;
	};

	interface StudioStyleGuideModifier extends EnumItem {}
	const StudioStyleGuideModifier: {
		readonly Default: Enum.StudioStyleGuideModifier;
		readonly Selected: Enum.StudioStyleGuideModifier;
		readonly Pressed: Enum.StudioStyleGuideModifier;
		readonly Disabled: Enum.StudioStyleGuideModifier;
		readonly Hover: Enum.StudioStyleGuideModifier;
	};

	interface Style extends EnumItem {}
	const Style: {
		readonly AlternatingSupports: Enum.Style;
		readonly BridgeStyleSupports: Enum.Style;
		readonly NoSupports: Enum.Style;
	};

	interface SubscriptionExpirationReason extends EnumItem {}
	const SubscriptionExpirationReason: {
		readonly ProductInactive: Enum.SubscriptionExpirationReason;
		readonly ProductDeleted: Enum.SubscriptionExpirationReason;
		readonly SubscriberCancelled: Enum.SubscriptionExpirationReason;
		readonly SubscriberRefunded: Enum.SubscriptionExpirationReason;
		readonly Lapsed: Enum.SubscriptionExpirationReason;
	};

	interface SubscriptionPaymentStatus extends EnumItem {}
	const SubscriptionPaymentStatus: {
		readonly Paid: Enum.SubscriptionPaymentStatus;
		readonly Refunded: Enum.SubscriptionPaymentStatus;
	};

	interface SubscriptionPeriod extends EnumItem {}
	const SubscriptionPeriod: {
		readonly Month: Enum.SubscriptionPeriod;
	};

	interface SubscriptionState extends EnumItem {}
	const SubscriptionState: {
		readonly NeverSubscribed: Enum.SubscriptionState;
		readonly SubscribedWillRenew: Enum.SubscriptionState;
		readonly SubscribedWillNotRenew: Enum.SubscriptionState;
		readonly SubscribedRenewalPaymentPending: Enum.SubscriptionState;
		readonly Expired: Enum.SubscriptionState;
	};

	interface SurfaceConstraint extends EnumItem {}
	const SurfaceConstraint: {
		readonly None: Enum.SurfaceConstraint;
		readonly Hinge: Enum.SurfaceConstraint;
		readonly SteppingMotor: Enum.SurfaceConstraint;
		readonly Motor: Enum.SurfaceConstraint;
	};

	interface SurfaceGuiShape extends EnumItem {}
	const SurfaceGuiShape: {
		readonly Flat: Enum.SurfaceGuiShape;
		readonly CurvedHorizontally: Enum.SurfaceGuiShape;
	};

	interface SurfaceGuiSizingMode extends EnumItem {}
	const SurfaceGuiSizingMode: {
		readonly FixedSize: Enum.SurfaceGuiSizingMode;
		readonly PixelsPerStud: Enum.SurfaceGuiSizingMode;
	};

	interface SurfaceType extends EnumItem {}
	const SurfaceType: {
		readonly Smooth: Enum.SurfaceType;
		readonly Glue: Enum.SurfaceType;
		readonly Weld: Enum.SurfaceType;
		readonly Studs: Enum.SurfaceType;
		readonly Inlet: Enum.SurfaceType;
		readonly Universal: Enum.SurfaceType;
		readonly Hinge: Enum.SurfaceType;
		readonly Motor: Enum.SurfaceType;
		readonly SteppingMotor: Enum.SurfaceType;
		readonly SmoothNoOutlines: Enum.SurfaceType;
	};

	interface SwipeDirection extends EnumItem {}
	const SwipeDirection: {
		readonly Right: Enum.SwipeDirection;
		readonly Left: Enum.SwipeDirection;
		readonly Up: Enum.SwipeDirection;
		readonly Down: Enum.SwipeDirection;
		readonly None: Enum.SwipeDirection;
	};

	interface SystemThemeValue extends EnumItem {}
	const SystemThemeValue: {
		readonly error: Enum.SystemThemeValue;
		readonly light: Enum.SystemThemeValue;
		readonly dark: Enum.SystemThemeValue;
		readonly systemLight: Enum.SystemThemeValue;
		readonly systemDark: Enum.SystemThemeValue;
	};

	interface TableMajorAxis extends EnumItem {}
	const TableMajorAxis: {
		readonly RowMajor: Enum.TableMajorAxis;
		readonly ColumnMajor: Enum.TableMajorAxis;
	};

	interface TeamCreateErrorState extends EnumItem {}
	const TeamCreateErrorState: {
		readonly PlaceSizeTooLarge: Enum.TeamCreateErrorState;
		readonly PlaceSizeApproachingLimit: Enum.TeamCreateErrorState;
		readonly PlaceUploadFailing: Enum.TeamCreateErrorState;
		readonly NoError: Enum.TeamCreateErrorState;
	};

	interface Technology extends EnumItem {}
	const Technology: {
		readonly Voxel: Enum.Technology;
		readonly Compatibility: Enum.Technology;
		readonly ShadowMap: Enum.Technology;
		readonly Future: Enum.Technology;
		readonly Legacy: Enum.Technology;
		readonly Unified: Enum.Technology;
	};

	interface TelemetryBackend extends EnumItem {}
	const TelemetryBackend: {
		readonly UNSPECIFIED: Enum.TelemetryBackend;
		readonly EventIngest: Enum.TelemetryBackend;
		readonly Points: Enum.TelemetryBackend;
		readonly Teletune: Enum.TelemetryBackend;
		readonly EphemeralCounter: Enum.TelemetryBackend;
		readonly EphemeralStat: Enum.TelemetryBackend;
		readonly Counter: Enum.TelemetryBackend;
		readonly Stat: Enum.TelemetryBackend;
	};

	interface TelemetryStandardizedField extends EnumItem {}
	const TelemetryStandardizedField: {
		readonly AddDatacenterId: Enum.TelemetryStandardizedField;
		readonly AddPlaceId: Enum.TelemetryStandardizedField;
		readonly AddUniverseId: Enum.TelemetryStandardizedField;
		readonly AddPlaceInstanceId: Enum.TelemetryStandardizedField;
		readonly AddPlaySessionId: Enum.TelemetryStandardizedField;
		readonly AddCurrentContextName: Enum.TelemetryStandardizedField;
		readonly AddOsInfo: Enum.TelemetryStandardizedField;
		readonly AddArchitectureInfo: Enum.TelemetryStandardizedField;
		readonly AddCpuInfo: Enum.TelemetryStandardizedField;
		readonly AddMemoryInfo: Enum.TelemetryStandardizedField;
		readonly AddSessionInfo: Enum.TelemetryStandardizedField;
	};

	interface TeleportMethod extends EnumItem {}
	const TeleportMethod: {
		readonly TeleportToSpawnByName: Enum.TeleportMethod;
		readonly TeleportToPlaceInstance: Enum.TeleportMethod;
		readonly TeleportToPrivateServer: Enum.TeleportMethod;
		readonly TeleportPartyAsync: Enum.TeleportMethod;
		readonly TeleportToVIPServer: Enum.TeleportMethod;
		readonly TeleportToInstanceBack: Enum.TeleportMethod;
		readonly TeleportUnknown: Enum.TeleportMethod;
	};

	interface TeleportResult extends EnumItem {}
	const TeleportResult: {
		readonly Success: Enum.TeleportResult;
		readonly Failure: Enum.TeleportResult;
		readonly GameNotFound: Enum.TeleportResult;
		readonly GameEnded: Enum.TeleportResult;
		readonly GameFull: Enum.TeleportResult;
		readonly Unauthorized: Enum.TeleportResult;
		readonly Flooded: Enum.TeleportResult;
		readonly IsTeleporting: Enum.TeleportResult;
	};

	interface TeleportState extends EnumItem {}
	const TeleportState: {
		readonly RequestedFromServer: Enum.TeleportState;
		readonly Started: Enum.TeleportState;
		readonly WaitingForServer: Enum.TeleportState;
		readonly Failed: Enum.TeleportState;
		readonly InProgress: Enum.TeleportState;
	};

	interface TeleportType extends EnumItem {}
	const TeleportType: {
		readonly ToPlace: Enum.TeleportType;
		readonly ToInstance: Enum.TeleportType;
		readonly ToReservedServer: Enum.TeleportType;
		readonly ToVIPServer: Enum.TeleportType;
		readonly ToInstanceBack: Enum.TeleportType;
	};

	interface TerrainAcquisitionMethod extends EnumItem {}
	const TerrainAcquisitionMethod: {
		readonly None: Enum.TerrainAcquisitionMethod;
		readonly Legacy: Enum.TerrainAcquisitionMethod;
		readonly Template: Enum.TerrainAcquisitionMethod;
		readonly Generate: Enum.TerrainAcquisitionMethod;
		readonly Import: Enum.TerrainAcquisitionMethod;
		readonly Convert: Enum.TerrainAcquisitionMethod;
		readonly EditAddTool: Enum.TerrainAcquisitionMethod;
		readonly EditSeaLevelTool: Enum.TerrainAcquisitionMethod;
		readonly EditReplaceTool: Enum.TerrainAcquisitionMethod;
		readonly RegionFillTool: Enum.TerrainAcquisitionMethod;
		readonly RegionPasteTool: Enum.TerrainAcquisitionMethod;
		readonly Other: Enum.TerrainAcquisitionMethod;
	};

	interface TerrainFace extends EnumItem {}
	const TerrainFace: {
		readonly Top: Enum.TerrainFace;
		readonly Side: Enum.TerrainFace;
		readonly Bottom: Enum.TerrainFace;
	};

	interface TextChatMessageStatus extends EnumItem {}
	const TextChatMessageStatus: {
		readonly Unknown: Enum.TextChatMessageStatus;
		readonly Success: Enum.TextChatMessageStatus;
		readonly Sending: Enum.TextChatMessageStatus;
		readonly TextFilterFailed: Enum.TextChatMessageStatus;
		readonly Floodchecked: Enum.TextChatMessageStatus;
		readonly InvalidPrivacySettings: Enum.TextChatMessageStatus;
		readonly InvalidTextChannelPermissions: Enum.TextChatMessageStatus;
		readonly MessageTooLong: Enum.TextChatMessageStatus;
		readonly ModerationTimeout: Enum.TextChatMessageStatus;
	};

	interface TextDirection extends EnumItem {}
	const TextDirection: {
		readonly Auto: Enum.TextDirection;
		readonly LeftToRight: Enum.TextDirection;
		readonly RightToLeft: Enum.TextDirection;
	};

	interface TextFilterContext extends EnumItem {}
	const TextFilterContext: {
		readonly PublicChat: Enum.TextFilterContext;
		readonly PrivateChat: Enum.TextFilterContext;
	};

	interface TextInputType extends EnumItem {}
	const TextInputType: {
		readonly Default: Enum.TextInputType;
		readonly NoSuggestions: Enum.TextInputType;
		readonly Number: Enum.TextInputType;
		readonly Email: Enum.TextInputType;
		readonly Phone: Enum.TextInputType;
		readonly Password: Enum.TextInputType;
		readonly PasswordShown: Enum.TextInputType;
		readonly Username: Enum.TextInputType;
		readonly OneTimePassword: Enum.TextInputType;
		readonly NewPassword: Enum.TextInputType;
		readonly NewPasswordShown: Enum.TextInputType;
	};

	interface TextTruncate extends EnumItem {}
	const TextTruncate: {
		readonly None: Enum.TextTruncate;
		readonly AtEnd: Enum.TextTruncate;
		readonly SplitWord: Enum.TextTruncate;
	};

	interface TextXAlignment extends EnumItem {}
	const TextXAlignment: {
		readonly Left: Enum.TextXAlignment;
		readonly Right: Enum.TextXAlignment;
		readonly Center: Enum.TextXAlignment;
	};

	interface TextYAlignment extends EnumItem {}
	const TextYAlignment: {
		readonly Top: Enum.TextYAlignment;
		readonly Center: Enum.TextYAlignment;
		readonly Bottom: Enum.TextYAlignment;
	};

	interface TextureMode extends EnumItem {}
	const TextureMode: {
		readonly Stretch: Enum.TextureMode;
		readonly Wrap: Enum.TextureMode;
		readonly Static: Enum.TextureMode;
	};

	interface TextureQueryType extends EnumItem {}
	const TextureQueryType: {
		readonly NonHumanoid: Enum.TextureQueryType;
		readonly NonHumanoidOrphaned: Enum.TextureQueryType;
		readonly Humanoid: Enum.TextureQueryType;
		readonly HumanoidOrphaned: Enum.TextureQueryType;
	};

	interface ThreadPoolConfig extends EnumItem {}
	const ThreadPoolConfig: {
		readonly PerCore4: Enum.ThreadPoolConfig;
		readonly PerCore3: Enum.ThreadPoolConfig;
		readonly PerCore2: Enum.ThreadPoolConfig;
		readonly PerCore1: Enum.ThreadPoolConfig;
		readonly Auto: Enum.ThreadPoolConfig;
		readonly Threads1: Enum.ThreadPoolConfig;
		readonly Threads2: Enum.ThreadPoolConfig;
		readonly Threads3: Enum.ThreadPoolConfig;
		readonly Threads4: Enum.ThreadPoolConfig;
		readonly Threads8: Enum.ThreadPoolConfig;
		readonly Threads16: Enum.ThreadPoolConfig;
	};

	interface ThrottlingPriority extends EnumItem {}
	const ThrottlingPriority: {
		readonly Extreme: Enum.ThrottlingPriority;
		readonly ElevatedOnServer: Enum.ThrottlingPriority;
		readonly Default: Enum.ThrottlingPriority;
	};

	interface ThumbnailSize extends EnumItem {}
	const ThumbnailSize: {
		readonly Size48x48: Enum.ThumbnailSize;
		readonly Size180x180: Enum.ThumbnailSize;
		readonly Size420x420: Enum.ThumbnailSize;
		readonly Size60x60: Enum.ThumbnailSize;
		readonly Size100x100: Enum.ThumbnailSize;
		readonly Size150x150: Enum.ThumbnailSize;
		readonly Size352x352: Enum.ThumbnailSize;
	};

	interface ThumbnailType extends EnumItem {}
	const ThumbnailType: {
		readonly HeadShot: Enum.ThumbnailType;
		readonly AvatarBust: Enum.ThumbnailType;
		readonly AvatarThumbnail: Enum.ThumbnailType;
	};

	interface TickCountSampleMethod extends EnumItem {}
	const TickCountSampleMethod: {
		readonly Fast: Enum.TickCountSampleMethod;
		readonly Benchmark: Enum.TickCountSampleMethod;
		readonly Precise: Enum.TickCountSampleMethod;
	};

	interface TonemapperPreset extends EnumItem {}
	const TonemapperPreset: {
		readonly Default: Enum.TonemapperPreset;
		readonly Retro: Enum.TonemapperPreset;
	};

	interface TopBottom extends EnumItem {}
	const TopBottom: {
		readonly Top: Enum.TopBottom;
		readonly Center: Enum.TopBottom;
		readonly Bottom: Enum.TopBottom;
	};

	interface TouchCameraMovementMode extends EnumItem {}
	const TouchCameraMovementMode: {
		readonly Default: Enum.TouchCameraMovementMode;
		readonly Classic: Enum.TouchCameraMovementMode;
		readonly Follow: Enum.TouchCameraMovementMode;
		readonly Orbital: Enum.TouchCameraMovementMode;
	};

	interface TouchMovementMode extends EnumItem {}
	const TouchMovementMode: {
		readonly Default: Enum.TouchMovementMode;
		readonly Thumbstick: Enum.TouchMovementMode;
		readonly DPad: Enum.TouchMovementMode;
		readonly Thumbpad: Enum.TouchMovementMode;
		readonly ClickToMove: Enum.TouchMovementMode;
		readonly DynamicThumbstick: Enum.TouchMovementMode;
	};

	interface TrackerError extends EnumItem {}
	const TrackerError: {
		readonly Ok: Enum.TrackerError;
		readonly NoService: Enum.TrackerError;
		readonly InitFailed: Enum.TrackerError;
		readonly NoVideo: Enum.TrackerError;
		readonly VideoError: Enum.TrackerError;
		readonly VideoNoPermission: Enum.TrackerError;
		readonly VideoUnsupported: Enum.TrackerError;
		readonly NoAudio: Enum.TrackerError;
		readonly AudioError: Enum.TrackerError;
		readonly AudioNoPermission: Enum.TrackerError;
		readonly UnsupportedDevice: Enum.TrackerError;
	};

	interface TrackerExtrapolationFlagMode extends EnumItem {}
	const TrackerExtrapolationFlagMode: {
		readonly Auto: Enum.TrackerExtrapolationFlagMode;
		readonly ForceDisabled: Enum.TrackerExtrapolationFlagMode;
		readonly ExtrapolateFacsAndPose: Enum.TrackerExtrapolationFlagMode;
		readonly ExtrapolateFacsOnly: Enum.TrackerExtrapolationFlagMode;
	};

	interface TrackerFaceTrackingStatus extends EnumItem {}
	const TrackerFaceTrackingStatus: {
		readonly FaceTrackingSuccess: Enum.TrackerFaceTrackingStatus;
		readonly FaceTrackingNoFaceFound: Enum.TrackerFaceTrackingStatus;
		readonly FaceTrackingUnknown: Enum.TrackerFaceTrackingStatus;
		readonly FaceTrackingLost: Enum.TrackerFaceTrackingStatus;
		readonly FaceTrackingHasTrackingError: Enum.TrackerFaceTrackingStatus;
		readonly FaceTrackingIsOccluded: Enum.TrackerFaceTrackingStatus;
		readonly FaceTrackingUninitialized: Enum.TrackerFaceTrackingStatus;
	};

	interface TrackerLodFlagMode extends EnumItem {}
	const TrackerLodFlagMode: {
		readonly Auto: Enum.TrackerLodFlagMode;
		readonly ForceFalse: Enum.TrackerLodFlagMode;
		readonly ForceTrue: Enum.TrackerLodFlagMode;
	};

	interface TrackerLodValueMode extends EnumItem {}
	const TrackerLodValueMode: {
		readonly Auto: Enum.TrackerLodValueMode;
		readonly Force0: Enum.TrackerLodValueMode;
		readonly Force1: Enum.TrackerLodValueMode;
	};

	interface TrackerMode extends EnumItem {}
	const TrackerMode: {
		readonly None: Enum.TrackerMode;
		readonly Audio: Enum.TrackerMode;
		readonly Video: Enum.TrackerMode;
		readonly AudioVideo: Enum.TrackerMode;
	};

	interface TrackerPromptEvent extends EnumItem {}
	const TrackerPromptEvent: {
		readonly LODCameraRecommendDisable: Enum.TrackerPromptEvent;
	};

	interface TrackerType extends EnumItem {}
	const TrackerType: {
		readonly None: Enum.TrackerType;
		readonly Face: Enum.TrackerType;
		readonly UpperBody: Enum.TrackerType;
	};

	interface TriStateBoolean extends EnumItem {}
	const TriStateBoolean: {
		readonly False: Enum.TriStateBoolean;
		readonly True: Enum.TriStateBoolean;
		readonly Unknown: Enum.TriStateBoolean;
	};

	interface TweenStatus extends EnumItem {}
	const TweenStatus: {
		readonly Canceled: Enum.TweenStatus;
		readonly Completed: Enum.TweenStatus;
	};

	interface UICaptureMode extends EnumItem {}
	const UICaptureMode: {
		readonly All: Enum.UICaptureMode;
		readonly None: Enum.UICaptureMode;
	};

	interface UIDragDetectorBoundingBehavior extends EnumItem {}
	const UIDragDetectorBoundingBehavior: {
		readonly Automatic: Enum.UIDragDetectorBoundingBehavior;
		readonly EntireObject: Enum.UIDragDetectorBoundingBehavior;
		readonly HitPoint: Enum.UIDragDetectorBoundingBehavior;
	};

	interface UIDragDetectorDragRelativity extends EnumItem {}
	const UIDragDetectorDragRelativity: {
		readonly Absolute: Enum.UIDragDetectorDragRelativity;
		readonly Relative: Enum.UIDragDetectorDragRelativity;
	};

	interface UIDragDetectorDragSpace extends EnumItem {}
	const UIDragDetectorDragSpace: {
		readonly Parent: Enum.UIDragDetectorDragSpace;
		readonly LayerCollector: Enum.UIDragDetectorDragSpace;
		readonly Reference: Enum.UIDragDetectorDragSpace;
	};

	interface UIDragDetectorDragStyle extends EnumItem {}
	const UIDragDetectorDragStyle: {
		readonly TranslatePlane: Enum.UIDragDetectorDragStyle;
		readonly TranslateLine: Enum.UIDragDetectorDragStyle;
		readonly Rotate: Enum.UIDragDetectorDragStyle;
		readonly Scriptable: Enum.UIDragDetectorDragStyle;
	};

	interface UIDragDetectorResponseStyle extends EnumItem {}
	const UIDragDetectorResponseStyle: {
		readonly Offset: Enum.UIDragDetectorResponseStyle;
		readonly Scale: Enum.UIDragDetectorResponseStyle;
		readonly CustomOffset: Enum.UIDragDetectorResponseStyle;
		readonly CustomScale: Enum.UIDragDetectorResponseStyle;
	};

	interface UIDragSpeedAxisMapping extends EnumItem {}
	const UIDragSpeedAxisMapping: {
		readonly XY: Enum.UIDragSpeedAxisMapping;
		readonly XX: Enum.UIDragSpeedAxisMapping;
		readonly YY: Enum.UIDragSpeedAxisMapping;
	};

	interface UIFlexAlignment extends EnumItem {}
	const UIFlexAlignment: {
		readonly None: Enum.UIFlexAlignment;
		readonly Fill: Enum.UIFlexAlignment;
		readonly SpaceAround: Enum.UIFlexAlignment;
		readonly SpaceBetween: Enum.UIFlexAlignment;
		readonly SpaceEvenly: Enum.UIFlexAlignment;
	};

	interface UIFlexMode extends EnumItem {}
	const UIFlexMode: {
		readonly None: Enum.UIFlexMode;
		readonly Grow: Enum.UIFlexMode;
		readonly Shrink: Enum.UIFlexMode;
		readonly Fill: Enum.UIFlexMode;
		readonly Custom: Enum.UIFlexMode;
	};

	interface UITheme extends EnumItem {}
	const UITheme: {
		readonly Light: Enum.UITheme;
		readonly Dark: Enum.UITheme;
	};

	interface UiMessageType extends EnumItem {}
	const UiMessageType: {
		readonly UiMessageError: Enum.UiMessageType;
		readonly UiMessageInfo: Enum.UiMessageType;
	};

	interface UpdateState extends EnumItem {}
	const UpdateState: {
		readonly UpdateNotAvailable: Enum.UpdateState;
		readonly UpdateAvailable: Enum.UpdateState;
		readonly UpdateInProgress: Enum.UpdateState;
		readonly UpdateReady: Enum.UpdateState;
		readonly UpdateFailed: Enum.UpdateState;
	};

	interface UploadCaptureResult extends EnumItem {}
	const UploadCaptureResult: {
		readonly Success: Enum.UploadCaptureResult;
		readonly NeedPermission: Enum.UploadCaptureResult;
		readonly CaptureModerated: Enum.UploadCaptureResult;
		readonly CaptureNotInGallery: Enum.UploadCaptureResult;
		readonly IneligibleCapture: Enum.UploadCaptureResult;
		readonly UploadQuotaReached: Enum.UploadCaptureResult;
	};

	interface UsageContext extends EnumItem {}
	const UsageContext: {
		readonly Default: Enum.UsageContext;
		readonly Preview: Enum.UsageContext;
	};

	interface UserCFrame extends EnumItem {}
	const UserCFrame: {
		readonly Head: Enum.UserCFrame;
		readonly LeftHand: Enum.UserCFrame;
		readonly RightHand: Enum.UserCFrame;
		readonly Floor: Enum.UserCFrame;
	};

	interface UserInputState extends EnumItem {}
	const UserInputState: {
		readonly Begin: Enum.UserInputState;
		readonly Change: Enum.UserInputState;
		readonly End: Enum.UserInputState;
		readonly Cancel: Enum.UserInputState;
		readonly None: Enum.UserInputState;
	};

	interface UserInputType extends EnumItem {}
	const UserInputType: {
		readonly MouseButton1: Enum.UserInputType;
		readonly MouseButton2: Enum.UserInputType;
		readonly MouseButton3: Enum.UserInputType;
		readonly MouseWheel: Enum.UserInputType;
		readonly MouseMovement: Enum.UserInputType;
		readonly Touch: Enum.UserInputType;
		readonly Keyboard: Enum.UserInputType;
		readonly Focus: Enum.UserInputType;
		readonly Accelerometer: Enum.UserInputType;
		readonly Gyro: Enum.UserInputType;
		readonly Gamepad1: Enum.UserInputType;
		readonly Gamepad2: Enum.UserInputType;
		readonly Gamepad3: Enum.UserInputType;
		readonly Gamepad4: Enum.UserInputType;
		readonly Gamepad5: Enum.UserInputType;
		readonly Gamepad6: Enum.UserInputType;
		readonly Gamepad7: Enum.UserInputType;
		readonly Gamepad8: Enum.UserInputType;
		readonly TextInput: Enum.UserInputType;
		readonly InputMethod: Enum.UserInputType;
		readonly None: Enum.UserInputType;
	};

	interface VRComfortSetting extends EnumItem {}
	const VRComfortSetting: {
		readonly Comfort: Enum.VRComfortSetting;
		readonly Normal: Enum.VRComfortSetting;
		readonly Expert: Enum.VRComfortSetting;
		readonly Custom: Enum.VRComfortSetting;
	};

	interface VRControllerModelMode extends EnumItem {}
	const VRControllerModelMode: {
		readonly Disabled: Enum.VRControllerModelMode;
		readonly Transparent: Enum.VRControllerModelMode;
	};

	interface VRDeviceType extends EnumItem {}
	const VRDeviceType: {
		readonly Unknown: Enum.VRDeviceType;
		readonly OculusRift: Enum.VRDeviceType;
		readonly HTCVive: Enum.VRDeviceType;
		readonly ValveIndex: Enum.VRDeviceType;
		readonly OculusQuest: Enum.VRDeviceType;
	};

	interface VRLaserPointerMode extends EnumItem {}
	const VRLaserPointerMode: {
		readonly Disabled: Enum.VRLaserPointerMode;
		readonly Pointer: Enum.VRLaserPointerMode;
		readonly DualPointer: Enum.VRLaserPointerMode;
	};

	interface VRSafetyBubbleMode extends EnumItem {}
	const VRSafetyBubbleMode: {
		readonly NoOne: Enum.VRSafetyBubbleMode;
		readonly OnlyFriends: Enum.VRSafetyBubbleMode;
		readonly Anyone: Enum.VRSafetyBubbleMode;
	};

	interface VRScaling extends EnumItem {}
	const VRScaling: {
		readonly World: Enum.VRScaling;
		readonly Off: Enum.VRScaling;
	};

	interface VRSessionState extends EnumItem {}
	const VRSessionState: {
		readonly Undefined: Enum.VRSessionState;
		readonly Idle: Enum.VRSessionState;
		readonly Visible: Enum.VRSessionState;
		readonly Focused: Enum.VRSessionState;
		readonly Stopping: Enum.VRSessionState;
	};

	interface VRTouchpad extends EnumItem {}
	const VRTouchpad: {
		readonly Left: Enum.VRTouchpad;
		readonly Right: Enum.VRTouchpad;
	};

	interface VRTouchpadMode extends EnumItem {}
	const VRTouchpadMode: {
		readonly Touch: Enum.VRTouchpadMode;
		readonly VirtualThumbstick: Enum.VRTouchpadMode;
		readonly ABXY: Enum.VRTouchpadMode;
	};

	interface VelocityConstraintMode extends EnumItem {}
	const VelocityConstraintMode: {
		readonly Line: Enum.VelocityConstraintMode;
		readonly Plane: Enum.VelocityConstraintMode;
		readonly Vector: Enum.VelocityConstraintMode;
	};

	interface VerticalAlignment extends EnumItem {}
	const VerticalAlignment: {
		readonly Center: Enum.VerticalAlignment;
		readonly Top: Enum.VerticalAlignment;
		readonly Bottom: Enum.VerticalAlignment;
	};

	interface VerticalScrollBarPosition extends EnumItem {}
	const VerticalScrollBarPosition: {
		readonly Right: Enum.VerticalScrollBarPosition;
		readonly Left: Enum.VerticalScrollBarPosition;
	};

	interface VibrationMotor extends EnumItem {}
	const VibrationMotor: {
		readonly Large: Enum.VibrationMotor;
		readonly Small: Enum.VibrationMotor;
		readonly LeftTrigger: Enum.VibrationMotor;
		readonly RightTrigger: Enum.VibrationMotor;
		readonly LeftHand: Enum.VibrationMotor;
		readonly RightHand: Enum.VibrationMotor;
	};

	interface VideoCaptureResult extends EnumItem {}
	const VideoCaptureResult: {
		readonly Success: Enum.VideoCaptureResult;
		readonly OtherError: Enum.VideoCaptureResult;
		readonly ScreenSizeChanged: Enum.VideoCaptureResult;
		readonly TimeLimitReached: Enum.VideoCaptureResult;
	};

	interface VideoCaptureStartedResult extends EnumItem {}
	const VideoCaptureStartedResult: {
		readonly Success: Enum.VideoCaptureStartedResult;
		readonly OtherError: Enum.VideoCaptureStartedResult;
		readonly CapturingAlready: Enum.VideoCaptureStartedResult;
		readonly NoDeviceSupport: Enum.VideoCaptureStartedResult;
		readonly NoSpaceOnDevice: Enum.VideoCaptureStartedResult;
	};

	interface VideoDeviceCaptureQuality extends EnumItem {}
	const VideoDeviceCaptureQuality: {
		readonly Default: Enum.VideoDeviceCaptureQuality;
		readonly Low: Enum.VideoDeviceCaptureQuality;
		readonly Medium: Enum.VideoDeviceCaptureQuality;
		readonly High: Enum.VideoDeviceCaptureQuality;
	};

	interface VideoError extends EnumItem {}
	const VideoError: {
		readonly Ok: Enum.VideoError;
		readonly Eof: Enum.VideoError;
		readonly EAgain: Enum.VideoError;
		readonly BadParameter: Enum.VideoError;
		readonly AllocFailed: Enum.VideoError;
		readonly CodecInitFailed: Enum.VideoError;
		readonly CodecCloseFailed: Enum.VideoError;
		readonly DecodeFailed: Enum.VideoError;
		readonly ParsingFailed: Enum.VideoError;
		readonly Unsupported: Enum.VideoError;
		readonly Generic: Enum.VideoError;
		readonly DownloadFailed: Enum.VideoError;
		readonly StreamNotFound: Enum.VideoError;
		readonly EncodeFailed: Enum.VideoError;
		readonly CreateFailed: Enum.VideoError;
		readonly NoPermission: Enum.VideoError;
		readonly NoService: Enum.VideoError;
		readonly ReleaseFailed: Enum.VideoError;
		readonly Unknown: Enum.VideoError;
	};

	interface VideoSampleSize extends EnumItem {}
	const VideoSampleSize: {
		readonly Small: Enum.VideoSampleSize;
		readonly Medium: Enum.VideoSampleSize;
		readonly Large: Enum.VideoSampleSize;
		readonly Full: Enum.VideoSampleSize;
	};

	interface ViewMode extends EnumItem {}
	const ViewMode: {
		readonly None: Enum.ViewMode;
		readonly GeometryComplexity: Enum.ViewMode;
		readonly Transparent: Enum.ViewMode;
		readonly Decal: Enum.ViewMode;
	};

	interface VirtualCursorMode extends EnumItem {}
	const VirtualCursorMode: {
		readonly Default: Enum.VirtualCursorMode;
		readonly Disabled: Enum.VirtualCursorMode;
		readonly Enabled: Enum.VirtualCursorMode;
	};

	interface VirtualInputMode extends EnumItem {}
	const VirtualInputMode: {
		readonly None: Enum.VirtualInputMode;
		readonly Recording: Enum.VirtualInputMode;
		readonly Playing: Enum.VirtualInputMode;
	};

	interface VoiceChatDistanceAttenuationType extends EnumItem {}
	const VoiceChatDistanceAttenuationType: {
		readonly Inverse: Enum.VoiceChatDistanceAttenuationType;
		readonly Legacy: Enum.VoiceChatDistanceAttenuationType;
	};

	interface VoiceChatState extends EnumItem {}
	const VoiceChatState: {
		readonly Idle: Enum.VoiceChatState;
		readonly Joining: Enum.VoiceChatState;
		readonly JoiningRetry: Enum.VoiceChatState;
		readonly Joined: Enum.VoiceChatState;
		readonly Leaving: Enum.VoiceChatState;
		readonly Ended: Enum.VoiceChatState;
		readonly Failed: Enum.VoiceChatState;
	};

	interface VoiceClientLeaveReasons extends EnumItem {}
	const VoiceClientLeaveReasons: {
		readonly Unknown: Enum.VoiceClientLeaveReasons;
		readonly ClientNetworkDisconnected: Enum.VoiceClientLeaveReasons;
		readonly PlayerLeft: Enum.VoiceClientLeaveReasons;
		readonly ClientShutdown: Enum.VoiceClientLeaveReasons;
		readonly PublishFailed: Enum.VoiceClientLeaveReasons;
		readonly RejoinReceived: Enum.VoiceClientLeaveReasons;
		readonly VoiceReboot: Enum.VoiceClientLeaveReasons;
		readonly ImguiDebugLeave: Enum.VoiceClientLeaveReasons;
		readonly LuaInitiated: Enum.VoiceClientLeaveReasons;
	};

	interface VoiceControlPath extends EnumItem {}
	const VoiceControlPath: {
		readonly Publish: Enum.VoiceControlPath;
		readonly Subscribe: Enum.VoiceControlPath;
		readonly Join: Enum.VoiceControlPath;
	};

	interface VolumetricAudio extends EnumItem {}
	const VolumetricAudio: {
		readonly Disabled: Enum.VolumetricAudio;
		readonly Automatic: Enum.VolumetricAudio;
		readonly Enabled: Enum.VolumetricAudio;
	};

	interface WaterDirection extends EnumItem {}
	const WaterDirection: {
		readonly NegX: Enum.WaterDirection;
		readonly X: Enum.WaterDirection;
		readonly NegY: Enum.WaterDirection;
		readonly Y: Enum.WaterDirection;
		readonly NegZ: Enum.WaterDirection;
		readonly Z: Enum.WaterDirection;
	};

	interface WaterForce extends EnumItem {}
	const WaterForce: {
		readonly None: Enum.WaterForce;
		readonly Small: Enum.WaterForce;
		readonly Medium: Enum.WaterForce;
		readonly Strong: Enum.WaterForce;
		readonly Max: Enum.WaterForce;
	};

	interface WebSocketState extends EnumItem {}
	const WebSocketState: {
		readonly Connecting: Enum.WebSocketState;
		readonly Open: Enum.WebSocketState;
		readonly Closing: Enum.WebSocketState;
		readonly Closed: Enum.WebSocketState;
	};

	interface WebStreamClientState extends EnumItem {}
	const WebStreamClientState: {
		readonly Connecting: Enum.WebStreamClientState;
		readonly Open: Enum.WebStreamClientState;
		readonly Error: Enum.WebStreamClientState;
		readonly Closed: Enum.WebStreamClientState;
	};

	interface WebStreamClientType extends EnumItem {}
	const WebStreamClientType: {
		readonly SSE: Enum.WebStreamClientType;
		readonly RawStream: Enum.WebStreamClientType;
		readonly WebSocket: Enum.WebStreamClientType;
	};

	interface WeldConstraintPreserve extends EnumItem {}
	const WeldConstraintPreserve: {
		readonly All: Enum.WeldConstraintPreserve;
		readonly None: Enum.WeldConstraintPreserve;
		readonly Touching: Enum.WeldConstraintPreserve;
	};

	interface WhisperChatPrivacyMode extends EnumItem {}
	const WhisperChatPrivacyMode: {
		readonly AllUsers: Enum.WhisperChatPrivacyMode;
		readonly NoOne: Enum.WhisperChatPrivacyMode;
	};

	interface WrapLayerAutoSkin extends EnumItem {}
	const WrapLayerAutoSkin: {
		readonly Disabled: Enum.WrapLayerAutoSkin;
		readonly EnabledPreserve: Enum.WrapLayerAutoSkin;
		readonly EnabledOverride: Enum.WrapLayerAutoSkin;
	};

	interface WrapLayerDebugMode extends EnumItem {}
	const WrapLayerDebugMode: {
		readonly None: Enum.WrapLayerDebugMode;
		readonly BoundCage: Enum.WrapLayerDebugMode;
		readonly LayerCage: Enum.WrapLayerDebugMode;
		readonly BoundCageAndLinks: Enum.WrapLayerDebugMode;
		readonly Reference: Enum.WrapLayerDebugMode;
		readonly Rbf: Enum.WrapLayerDebugMode;
		readonly OuterCage: Enum.WrapLayerDebugMode;
		readonly ReferenceMeshAfterMorph: Enum.WrapLayerDebugMode;
		readonly HSROuterDetail: Enum.WrapLayerDebugMode;
		readonly HSROuter: Enum.WrapLayerDebugMode;
		readonly HSRInner: Enum.WrapLayerDebugMode;
		readonly HSRInnerReverse: Enum.WrapLayerDebugMode;
		readonly LayerCageFittedToBase: Enum.WrapLayerDebugMode;
		readonly LayerCageFittedToPrev: Enum.WrapLayerDebugMode;
		readonly PreWrapDeformerOuterCage: Enum.WrapLayerDebugMode;
	};

	interface WrapTargetDebugMode extends EnumItem {}
	const WrapTargetDebugMode: {
		readonly None: Enum.WrapTargetDebugMode;
		readonly TargetCageOriginal: Enum.WrapTargetDebugMode;
		readonly TargetCageCompressed: Enum.WrapTargetDebugMode;
		readonly TargetCageInterface: Enum.WrapTargetDebugMode;
		readonly TargetLayerCageOriginal: Enum.WrapTargetDebugMode;
		readonly TargetLayerCageCompressed: Enum.WrapTargetDebugMode;
		readonly TargetLayerInterface: Enum.WrapTargetDebugMode;
		readonly Rbf: Enum.WrapTargetDebugMode;
		readonly OuterCageDetail: Enum.WrapTargetDebugMode;
		readonly PreWrapDeformerCage: Enum.WrapTargetDebugMode;
	};

	interface ZIndexBehavior extends EnumItem {}
	const ZIndexBehavior: {
		readonly Global: Enum.ZIndexBehavior;
		readonly Sibling: Enum.ZIndexBehavior;
	};

}
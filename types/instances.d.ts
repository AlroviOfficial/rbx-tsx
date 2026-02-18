// Auto-generated from Roblox API Dump — do not edit manually
// Run `bun run generate` to regenerate

interface Object {
	ClassName: string;
	/** @deprecated */
	className: string;
	GetPropertyChangedSignal(property: string): RBXScriptSignal;
	IsA(className: string): boolean;
	/** @deprecated */
	isA(className: string): boolean;
	readonly Changed: RBXScriptSignal<(property: string) => void>;
}

interface AnimationNode extends Object {
}

interface Capture extends Object {
	CaptureTime: DateTime;
	CaptureType: Enum.CaptureType;
	LocalId: string;
	SourcePlaceId: number;
	SourceUniverseId: number;
}

interface ScreenshotCapture extends Capture {
}

interface VideoCapture extends Capture {
	TimeLength: number;
}

interface ConfigSnapshot extends Object {
	Error: Enum.ConfigSnapshotErrorState;
	Outdated: boolean;
	GetValue(key: string): unknown;
	GetValueChangedSignal(key: string): RBXScriptSignal;
	Refresh(): undefined;
	readonly UpdateAvailable: RBXScriptSignal<() => void>;
}

interface EditableImage extends Object {
	Size: Vector2;
	Destroy(): undefined;
	DrawCircle(center: Vector2, radius: number, color: Color3, transparency: number, combineType: Enum.ImageCombineType): undefined;
	DrawImage(position: Vector2, image: EditableImage, combineType: Enum.ImageCombineType): undefined;
	DrawImageProjected(mesh: EditableMesh, projection: unknown, brushConfig: unknown): undefined;
	DrawImageTransformed(position: Vector2, scale: Vector2, rotation: number, image: EditableImage, options: unknown): undefined;
	DrawLine(p1: Vector2, p2: Vector2, color: Color3, transparency: number, combineType: Enum.ImageCombineType): undefined;
	DrawRectangle(position: Vector2, size: Vector2, color: Color3, transparency: number, combineType: Enum.ImageCombineType): undefined;
	ReadPixelsBuffer(position: Vector2, size: Vector2): buffer;
	WritePixelsBuffer(position: Vector2, size: Vector2, buffer: buffer): undefined;
}

interface EditableMesh extends Object {
	FixedSize: boolean;
	/** @deprecated */
	SkinningEnabled: boolean;
	AddBone(boneProperties: unknown): number;
	AddColor(color: Color3, alpha: number): number;
	AddFace(vertexIds: unknown): number;
	AddNormal(normal: Vector3?): number;
	AddTriangle(vertexId0: number, vertexId1: number, vertexId2: number): number;
	AddUV(uv: Vector2): number;
	AddVertex(p: Vector3): number;
	Destroy(): undefined;
	FindClosestPointOnSurface(point: Vector3): unknown;
	FindClosestVertex(toThisPoint: Vector3): number;
	FindVerticesWithinSphere(center: Vector3, radius: number): unknown;
	GetAdjacentFaces(faceId: number): unknown;
	GetAdjacentVertices(vertexId: number): unknown;
	GetBoneByName(boneName: string): number;
	GetBoneCFrame(boneId: number): CFrame;
	GetBoneIsVirtual(boneId: number): boolean;
	GetBoneName(boneId: number): string;
	GetBoneParent(boneId: number): number;
	GetBones(): unknown;
	GetCenter(): Vector3;
	GetColor(colorId: number): Color3?;
	GetColorAlpha(colorId: number): unknown;
	GetColors(): unknown;
	GetFaceColors(faceId: number): unknown;
	GetFaceNormals(faceId: number): unknown;
	GetFaceUVs(faceId: number): unknown;
	GetFaceVertices(faceId: number): unknown;
	GetFaces(): unknown;
	/** @deprecated */
	GetFacesWithAttribute(id: number): unknown;
	GetFacesWithColor(colorId: number): unknown;
	GetFacesWithNormal(normalId: number): unknown;
	GetFacesWithUV(uvId: number): unknown;
	GetFacsCorrectivePose(actions: unknown): unknown;
	GetFacsCorrectivePoses(): unknown;
	GetFacsPose(action: Enum.FacsActionUnit): unknown;
	GetFacsPoses(): unknown;
	GetNormal(normalId: number): Vector3?;
	GetNormals(): unknown;
	GetPosition(vertexId: number): Vector3;
	GetSize(): Vector3;
	GetUV(uvId: number): Vector2?;
	GetUVs(): unknown;
	GetVertexBoneWeights(vertexId: number): unknown;
	GetVertexBones(vertexId: number): unknown;
	GetVertexColors(vertexId: number): unknown;
	GetVertexFaceColor(vertexId: number, faceId: number): number;
	GetVertexFaceNormal(vertexId: number, faceId: number): number;
	GetVertexFaceUV(vertexId: number, faceId: number): number;
	GetVertexFaces(vertexId: number): unknown;
	GetVertexNormals(vertexId: number): unknown;
	GetVertexUVs(vertexId: number): unknown;
	GetVertices(): unknown;
	/** @deprecated */
	GetVerticesWithAttribute(id: number): unknown;
	GetVerticesWithColor(colorId: number): unknown;
	GetVerticesWithNormal(normalId: number): unknown;
	GetVerticesWithUV(uvId: number): unknown;
	IdDebugString(id: number): string;
	MergeVertices(mergeTolerance: number): unknown;
	RaycastLocal(origin: Vector3, direction: Vector3): unknown;
	RemoveBone(boneId: number): undefined;
	RemoveFace(faceId: number): undefined;
	RemoveUnused(): unknown;
	ResetNormal(normalId: number): undefined;
	SetBoneCFrame(boneId: number, cframe: CFrame): undefined;
	SetBoneIsVirtual(boneId: number, virtual: boolean): undefined;
	SetBoneName(boneId: number, name: string): undefined;
	SetBoneParent(boneId: number, parentBoneId: number): undefined;
	SetColor(colorId: number, color: Color3): undefined;
	SetColorAlpha(colorId: number, alpha: number): undefined;
	SetFaceColors(faceId: number, ids: unknown): undefined;
	SetFaceNormals(faceId: number, ids: unknown): undefined;
	SetFaceUVs(faceId: number, ids: unknown): undefined;
	SetFaceVertices(faceId: number, ids: unknown): undefined;
	SetFacsBonePose(action: Enum.FacsActionUnit, boneId: number, cframe: CFrame): undefined;
	SetFacsCorrectivePose(actions: unknown, boneIds: unknown, cframes: unknown): undefined;
	SetFacsPose(action: Enum.FacsActionUnit, boneIds: unknown, cframes: unknown): undefined;
	SetNormal(normalId: number, normal: Vector3): undefined;
	SetPosition(vertexId: number, p: Vector3): undefined;
	SetUV(uvId: number, uv: Vector2): undefined;
	SetVertexBoneWeights(vertexId: number, boneWeights: unknown): undefined;
	SetVertexBones(vertexId: number, boneIDs: unknown): undefined;
	SetVertexFaceColor(vertexId: number, faceId: number, colorId: number): undefined;
	SetVertexFaceNormal(vertexId: number, faceId: number, normalId: number): undefined;
	SetVertexFaceUV(vertexId: number, faceId: number, uvId: number): undefined;
	Triangulate(): undefined;
}

interface ExecutedRemoteCommand extends Object {
	RunMoreCode(code: string, args: unknown): undefined;
	SendUpdate(args: unknown): undefined;
	Stop(): undefined;
	readonly ReceivedUpdate: RBXScriptSignal<(args: unknown) => void>;
}

interface Instance extends Object {
	Archivable: boolean;
	Capabilities: SecurityCapabilities;
	Name: string;
	Parent: Instance;
	Sandboxed: boolean;
	AddTag(tag: string): undefined;
	ClearAllChildren(): undefined;
	Clone(): Instance;
	Destroy(): undefined;
	FindFirstAncestor(name: string): Instance;
	FindFirstAncestorOfClass(className: string): Instance;
	FindFirstAncestorWhichIsA(className: string): Instance;
	FindFirstChild(name: string, recursive?: boolean): Instance;
	FindFirstChildOfClass(className: string): Instance;
	FindFirstChildWhichIsA(className: string, recursive?: boolean): Instance;
	FindFirstDescendant(name: string): Instance;
	GetActor(): Actor;
	GetAttribute(attribute: string): unknown;
	GetAttributeChangedSignal(attribute: string): RBXScriptSignal;
	GetAttributes(): unknown;
	GetChildren(): Instances;
	GetDebugId(scopeLength?: number): string;
	GetDescendants(): Instances;
	GetFullName(): string;
	GetStyled(name: string, selector: unknown): unknown;
	GetStyledPropertyChangedSignal(property: string): RBXScriptSignal;
	GetTags(): unknown;
	HasTag(tag: string): boolean;
	IsAncestorOf(descendant: Instance): boolean;
	IsDescendantOf(ancestor: Instance): boolean;
	IsPropertyModified(property: string): boolean;
	QueryDescendants(selector: string): Instances;
	/** @deprecated */
	Remove(): undefined;
	RemoveTag(tag: string): undefined;
	ResetPropertyToDefault(property: string): undefined;
	SetAttribute(attribute: string, value: unknown): undefined;
	WaitForChild(childName: string, timeOut: number): Instance;
	/** @deprecated */
	children(): Instances;
	/** @deprecated */
	clone(): Instance;
	/** @deprecated */
	destroy(): undefined;
	/** @deprecated */
	findFirstChild(name: string, recursive?: boolean): Instance;
	/** @deprecated */
	getChildren(): Instances;
	/** @deprecated */
	isDescendantOf(ancestor: Instance): boolean;
	/** @deprecated */
	remove(): undefined;
	readonly AncestryChanged: RBXScriptSignal<(child: Instance, parent: Instance) => void>;
	readonly AttributeChanged: RBXScriptSignal<(attribute: string) => void>;
	readonly ChildAdded: RBXScriptSignal<(child: Instance) => void>;
	readonly ChildRemoved: RBXScriptSignal<(child: Instance) => void>;
	readonly DescendantAdded: RBXScriptSignal<(descendant: Instance) => void>;
	readonly DescendantRemoving: RBXScriptSignal<(descendant: Instance) => void>;
	readonly Destroying: RBXScriptSignal<() => void>;
	readonly StyledPropertiesChanged: RBXScriptSignal<() => void>;
	/** @deprecated */
	readonly childAdded: RBXScriptSignal<(child: Instance) => void>;
}

interface AccessoryDescription extends Instance {
	AccessoryType: Enum.AccessoryType;
	AssetId: number;
	Instance: Instance;
	IsLayered: boolean;
	Order: number;
	Position: Vector3;
	Puffiness: number;
	Rotation: Vector3;
	Scale: Vector3;
	GetAppliedInstance(): Instance;
}

interface AccountService extends Instance {
}

interface Accoutrement extends Instance {
	AttachmentPoint: CFrame;
}

interface Accessory extends Accoutrement {
	AccessoryType: Enum.AccessoryType;
}

/** @deprecated */
interface Hat extends Accoutrement {
}

interface AchievementService extends Instance {
}

interface ActivityHistoryEventService extends Instance {
}

interface AdPortal extends Instance {
	Status: Enum.AdUnitStatus;
}

interface AdService extends Instance {
	CreateAdRewardFromDevProductId(devProductId: number): AdReward;
	/** @deprecated */
	ShowVideoAd(): undefined;
	UnregisterAdOpportunity(instance: Instance): undefined;
	GetAdAvailabilityNowAsync(adFormat: Enum.AdFormat): unknown;
	RegisterAdOpportunityAsync(instance: Instance, placementId: unknown): undefined;
	ShowRewardedVideoAdAsync(player: Player, reward: AdReward, placementId: unknown): Enum.ShowAdResult;
	/** @deprecated */
	readonly VideoAdClosed: RBXScriptSignal<(adShown: boolean) => void>;
}

interface AdvancedDragger extends Instance {
}

interface AnalyticsService extends Instance {
	/** @deprecated */
	FireCustomEvent(player: Instance, eventCategory: string, customData: unknown): undefined;
	/** @deprecated */
	FireEvent(category: string, value: unknown): undefined;
	/** @deprecated */
	FireInGameEconomyEvent(player: Instance, itemName: string, economyAction: Enum.AnalyticsEconomyAction, itemCategory: string, amount: number, currency: string, location: unknown, customData: unknown): undefined;
	/** @deprecated */
	FireLogEvent(player: Instance, logLevel: Enum.AnalyticsLogLevel, message: string, debugInfo: unknown, customData: unknown): undefined;
	/** @deprecated */
	FirePlayerProgressionEvent(player: Instance, category: string, progressionStatus: Enum.AnalyticsProgressionStatus, location: unknown, statistics: unknown, customData: unknown): undefined;
	GetDurationLoggerTimestamp(): number;
	LogCustomEvent(player: Player, eventName: string, value?: number, customFields?: unknown): undefined;
	LogEconomyEvent(player: Player, flowType: Enum.AnalyticsEconomyFlowType, currencyType: string, amount: number, endingBalance: number, transactionType: string, itemSku?: string, customFields?: unknown): undefined;
	LogFunnelStepEvent(player: Player, funnelName: string, funnelSessionId?: string, step?: number, stepName?: string, customFields?: unknown): undefined;
	LogOnboardingFunnelStepEvent(player: Player, step: number, stepName?: string, customFields?: unknown): undefined;
	LogProgressionCompleteEvent(player: Player, progressionPathName: string, level: number, levelName?: string, customFields?: unknown): undefined;
	LogProgressionEvent(player: Player, progressionPathName: string, status: Enum.AnalyticsProgressionType, level: number, levelName?: string, customFields?: unknown): undefined;
	LogProgressionFailEvent(player: Player, progressionPathName: string, level: number, levelName?: string, customFields?: unknown): undefined;
	LogProgressionStartEvent(player: Player, progressionPathName: string, level: number, levelName?: string, customFields?: unknown): undefined;
}

interface Animation extends Instance {
	AnimationId: ContentId;
}

interface AnimationClip extends Instance {
	Loop: boolean;
	Priority: Enum.AnimationPriority;
}

interface AnimationGraphDefinition extends AnimationClip {
}

interface CurveAnimation extends AnimationClip {
}

interface KeyframeSequence extends AnimationClip {
	AddKeyframe(keyframe: Instance): undefined;
	GetKeyframes(): Instances;
	RemoveKeyframe(keyframe: Instance): undefined;
}

interface AnimationClipProvider extends Instance {
	/** @deprecated */
	GetAnimationClip(assetId: ContentId): AnimationClip;
	/** @deprecated */
	GetAnimationClipById(assetId: number, useCache: boolean): AnimationClip;
	RegisterActiveAnimationClip(animationClip: AnimationClip): ContentId;
	RegisterAnimationClip(animationClip: AnimationClip): ContentId;
	GetAnimationClipAsync(assetId: ContentId): AnimationClip;
	/** @deprecated */
	GetAnimations(userId: number): Instance;
	GetAnimationsAsync(userId: number): Instance;
	GetClipEvaluatorAsync(assetId: ContentId): ClipEvaluator;
}

interface AnimationController extends Instance {
	/** @deprecated */
	GetPlayingAnimationTracks(): unknown;
	/** @deprecated */
	LoadAnimation(animation: Animation): AnimationTrack;
	/** @deprecated */
	readonly AnimationPlayed: RBXScriptSignal<(animationTrack: AnimationTrack) => void>;
}

interface AnimationFromVideoCreatorService extends Instance {
}

interface AnimationFromVideoCreatorStudioService extends Instance {
}

interface AnimationNodeDefinition extends Instance {
	NodeType: Enum.AnimationNodeType;
}

interface AnimationRigData extends Instance {
}

interface AnimationStreamTrack extends Instance {
}

interface AnimationTrack extends Instance {
	Animation: Animation;
	IsPlaying: boolean;
	Length: number;
	Looped: boolean;
	Priority: Enum.AnimationPriority;
	Speed: number;
	TimePosition: number;
	WeightCurrent: number;
	WeightTarget: number;
	AdjustSpeed(speed?: number): undefined;
	AdjustWeight(weight?: number, fadeTime?: number): undefined;
	GetMarkerReachedSignal(name: string): RBXScriptSignal;
	GetParameter(key: string): unknown;
	GetParameterDefaults(): unknown;
	GetTargetInstance(name: string): Instance;
	GetTargetNames(): unknown;
	GetTimeOfKeyframe(keyframeName: string): number;
	Play(fadeTime?: number, weight?: number, speed?: number): undefined;
	SetParameter(key: string, value: unknown): undefined;
	SetTargetInstance(name: string, target: Instance): undefined;
	Stop(fadeTime?: number): undefined;
	readonly DidLoop: RBXScriptSignal<() => void>;
	readonly Ended: RBXScriptSignal<() => void>;
	readonly KeyframeReached: RBXScriptSignal<(keyframeName: string) => void>;
	readonly Stopped: RBXScriptSignal<() => void>;
}

interface Animator extends Instance {
	EvaluationThrottled: boolean;
	PreferLodEnabled: boolean;
	RootMotion: CFrame;
	RootMotionWeight: number;
	ApplyJointVelocities(motors: unknown): undefined;
	GetPlayingAnimationTracks(): unknown;
	LoadAnimation(animation: Animation): AnimationTrack;
	RegisterEvaluationParallelCallback(callback: Function): undefined;
	StepAnimations(deltaTime: number): undefined;
	readonly AnimationPlayed: RBXScriptSignal<(animationTrack: AnimationTrack) => void>;
}

interface Annotation extends Instance {
}

interface WorkspaceAnnotation extends Annotation {
}

interface AnnotationsService extends Instance {
}

interface AppLifecycleObserverService extends Instance {
}

interface AppRatingPromptService extends Instance {
}

interface AppUpdateService extends Instance {
}

interface AssetCounterService extends Instance {
}

interface AssetDeliveryProxy extends Instance {
	Interface: string;
	Port: number;
	StartServer: boolean;
}

interface AssetImportService extends Instance {
}

interface AssetManagerService extends Instance {
}

interface AssetPatchSettings extends Instance {
	ContentId: string;
	OutputPath: string;
	PatchId: string;
}

interface AssetQualityService extends Instance {
}

interface AssetService extends Instance {
	CreateEditableImage(editableImageOptions: unknown): EditableImage;
	CreateEditableMesh(editableMeshOptions: unknown): EditableMesh;
	ComposeDecalAsync(layers: unknown): Decal;
	CreateAssetAsync(object: Object, assetType: Enum.AssetType, requestParameters?: unknown): unknown;
	CreateAssetVersionAsync(object: Object, assetType: Enum.AssetType, assetId: number, requestParameters?: unknown): unknown;
	CreateEditableImageAsync(content: Content, editableImageOptions: unknown): EditableImage;
	CreateEditableMeshAsync(content: Content, editableMeshOptions: unknown): EditableMesh;
	CreateMeshPartAsync(meshContent: Content, options?: unknown): MeshPart;
	CreatePlaceAsync(placeName: string, templatePlaceID: number, description?: string): number;
	CreatePlaceInPlayerInventoryAsync(player: Instance, placeName: string, templatePlaceID: number, description?: string): number;
	CreateSurfaceAppearanceAsync(content: unknown): SurfaceAppearance;
	/** @deprecated */
	GetAssetIdsForPackage(packageAssetId: number): unknown;
	GetAssetIdsForPackageAsync(packageAssetId: number): unknown;
	GetAudioMetadataAsync(idList: unknown): unknown;
	GetBundleDetailsAsync(bundleId: number): unknown;
	/** @deprecated */
	GetCreatorAssetID(creationID: number): number;
	GetGamePlacesAsync(): Instance;
	LoadAssetAsync(assetId: number): Instance;
	PromptCreateAssetAsync(player: Player, instance: Instance, assetType: Enum.AssetType): unknown;
	PromptImportAnimationClipFromVideoAsync(player: Player, progressCallback: Function): unknown;
	SavePlaceAsync(requestParameters: unknown): undefined;
	/** @deprecated */
	SearchAudio(searchParameters: AudioSearchParams): AudioPages;
	SearchAudioAsync(searchParameters: AudioSearchParams): AudioPages;
}

interface Atmosphere extends Instance {
	Color: Color3;
	Decay: Color3;
	Density: number;
	Glare: number;
	Haze: number;
	Offset: number;
}

interface Attachment extends Instance {
	Axis: Vector3;
	CFrame: CFrame;
	SecondaryAxis: Vector3;
	Visible: boolean;
	WorldAxis: Vector3;
	WorldCFrame: CFrame;
	WorldSecondaryAxis: Vector3;
	/** @deprecated */
	GetAxis(): Vector3;
	GetConstraints(): Instances;
	/** @deprecated */
	GetSecondaryAxis(): Vector3;
	/** @deprecated */
	SetAxis(axis: Vector3): undefined;
	/** @deprecated */
	SetSecondaryAxis(axis: Vector3): undefined;
}

interface Bone extends Attachment {
	Transform: CFrame;
	TransformedWorldCFrame: CFrame;
}

interface AudioAnalyzer extends Instance {
	PeakLevel: number;
	RmsLevel: number;
	SpectrumEnabled: boolean;
	WindowSize: Enum.AudioWindowSize;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	GetSpectrum(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioChannelMixer extends Instance {
	Layout: Enum.AudioChannelLayout;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioChannelSplitter extends Instance {
	Layout: Enum.AudioChannelLayout;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioChorus extends Instance {
	Bypass: boolean;
	Depth: number;
	Mix: number;
	Rate: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioCompressor extends Instance {
	Attack: number;
	Bypass: boolean;
	MakeupGain: number;
	Ratio: number;
	Release: number;
	Threshold: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioDeviceInput extends Instance {
	AccessType: Enum.AccessModifierType;
	readonly Active: boolean;
	Muted: boolean;
	Player: Player;
	Volume: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	GetUserIdAccessList(): unknown;
	SetUserIdAccessList(userIds: unknown): undefined;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioDeviceOutput extends Instance {
	Player: Player;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioDistortion extends Instance {
	Bypass: boolean;
	Level: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioEcho extends Instance {
	Bypass: boolean;
	DelayTime: number;
	DryLevel: number;
	Feedback: number;
	RampTime: number;
	WetLevel: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioEmitter extends Instance {
	AcousticSimulationEnabled: boolean;
	AudioInteractionGroup: string;
	/** @deprecated */
	SimulationFidelity: Enum.AudioSimulationFidelity;
	GetAngleAttenuation(): unknown;
	GetAudibilityFor(listener: AudioListener): number;
	GetConnectedWires(pin: string): Instances;
	GetDistanceAttenuation(): unknown;
	GetInputPins(): unknown;
	GetInteractingListeners(): Instances;
	GetOutputPins(): unknown;
	SetAngleAttenuation(curve: unknown): undefined;
	SetDistanceAttenuation(curve: unknown): undefined;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioEqualizer extends Instance {
	Bypass: boolean;
	HighGain: number;
	LowGain: number;
	MidGain: number;
	MidRange: NumberRange;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioFader extends Instance {
	Bypass: boolean;
	Volume: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioFilter extends Instance {
	Bypass: boolean;
	FilterType: Enum.AudioFilterType;
	Frequency: number;
	Gain: number;
	Q: number;
	GetConnectedWires(pin: string): Instances;
	GetGainAt(frequency: number): number;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioFlanger extends Instance {
	Bypass: boolean;
	Depth: number;
	Mix: number;
	Rate: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioFocusService extends Instance {
}

interface AudioGate extends Instance {
	Attack: number;
	Bypass: boolean;
	Release: number;
	Threshold: NumberRange;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioLimiter extends Instance {
	Bypass: boolean;
	MaxLevel: number;
	Release: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioListener extends Instance {
	AcousticSimulationEnabled: boolean;
	AudioInteractionGroup: string;
	/** @deprecated */
	SimulationFidelity: Enum.AudioSimulationFidelity;
	GetAngleAttenuation(): unknown;
	GetAudibilityFor(emitter: AudioEmitter): number;
	GetConnectedWires(pin: string): Instances;
	GetDistanceAttenuation(): unknown;
	GetInputPins(): unknown;
	GetInteractingEmitters(): Instances;
	GetOutputPins(): unknown;
	SetAngleAttenuation(curve: unknown): undefined;
	SetDistanceAttenuation(curve: unknown): undefined;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioPitchShifter extends Instance {
	Bypass: boolean;
	Pitch: number;
	WindowSize: Enum.AudioWindowSize;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioPlayer extends Instance {
	Asset: ContentId;
	AutoLoad: boolean;
	AutoPlay: boolean;
	readonly IsPlaying: boolean;
	IsReady: boolean;
	LoopRegion: NumberRange;
	Looping: boolean;
	PlaybackRegion: NumberRange;
	PlaybackSpeed: number;
	TimeLength: number;
	TimePosition: number;
	Volume: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	Play(): undefined;
	Stop(): undefined;
	GetWaveformAsync(timeRange: NumberRange, samples: number): unknown;
	readonly Ended: RBXScriptSignal<() => void>;
	readonly Looped: RBXScriptSignal<() => void>;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioRecorder extends Instance {
	readonly IsRecording: boolean;
	TimeLength: number;
	Clear(): undefined;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	GetTemporaryContent(): Content;
	Stop(): undefined;
	CanRecordAsync(): boolean;
	GetUnrecordableInstancesAsync(): Instances;
	RecordAsync(): undefined;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioReverb extends Instance {
	Bypass: boolean;
	DecayRatio: number;
	DecayTime: number;
	Density: number;
	Diffusion: number;
	DryLevel: number;
	EarlyDelayTime: number;
	HighCutFrequency: number;
	LateDelayTime: number;
	LowShelfFrequency: number;
	LowShelfGain: number;
	ReferenceFrequency: number;
	WetLevel: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioSearchParams extends Instance {
	Album: string;
	Artist: string;
	AudioSubType: Enum.AudioSubType;
	/** @deprecated */
	AudioSubtype: Enum.AudioSubType;
	MaxDuration: number;
	MinDuration: number;
	SearchKeyword: string;
	Tag: string;
	Title: string;
}

interface AudioSpeechToText extends Instance {
	Enabled: boolean;
	Text: string;
	VoiceDetected: boolean;
	GetConnectedWires(pin: string): Instances;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioTextToSpeech extends Instance {
	IsLoaded: boolean;
	readonly IsPlaying: boolean;
	Looping: boolean;
	Pitch: number;
	PlaybackSpeed: number;
	Speed: number;
	Text: string;
	TimeLength: number;
	TimePosition: number;
	VoiceId: string;
	Volume: number;
	GetConnectedWires(pin: string): Instances;
	Pause(): undefined;
	Play(): undefined;
	Unload(): undefined;
	GetWaveformAsync(timeRange: NumberRange, samples: number): unknown;
	LoadAsync(): Enum.AssetFetchStatus;
	readonly Ended: RBXScriptSignal<() => void>;
	readonly Looped: RBXScriptSignal<() => void>;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioTremolo extends Instance {
	Bypass: boolean;
	Depth: number;
	Duty: number;
	Frequency: number;
	Shape: number;
	Skew: number;
	Square: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** @deprecated */
interface AuroraScriptObject extends Instance {
	FrameId: number;
	LODLevel: number;
	PriorFrameInvoked: number;
}

interface AvatarAccessoryRules extends Instance {
}

interface AvatarAnimationRules extends Instance {
}

interface AvatarBodyRules extends Instance {
}

interface AvatarChatService extends Instance {
}

interface AvatarClothingRules extends Instance {
}

interface AvatarCollisionRules extends Instance {
}

interface AvatarCreationService extends Instance {
	GetValidationRules(): unknown;
	AutoSetupAvatarAsync(player: Player, autoSetupParams: unknown, progressCallback: Function?): string;
	GenerateAvatar2DPreviewAsync(avatarGeneration2dPreviewParams: unknown): string;
	GenerateAvatarAsync(avatarGenerationParams: unknown): string;
	GetBatchTokenDetailsAsync(tokenIds: unknown): unknown;
	LoadAvatar2DPreviewAsync(previewId: string): EditableImage;
	LoadGeneratedAvatarAsync(generationId: string): HumanoidDescription;
	PrepareAvatarForPreviewAsync(humanoidModel: Model): undefined;
	PromptCreateAvatarAssetAsync(tokenId: string, player: Player, assetInstance: Instance, assetType: Enum.AvatarAssetType): unknown;
	PromptCreateAvatarAsync(tokenId: string, player: Player, humanoidDescription: HumanoidDescription): unknown;
	PromptSelectAvatarGenerationImageAsync(player: Player): string;
	RequestAvatarGenerationSessionAsync(player: Player, callback: Function): unknown;
	ValidateUGCAccessoryAsync(player: Player, accessory: Instance, accessoryType: Enum.AccessoryType): unknown;
	ValidateUGCBodyPartAsync(player: Player, instance: Instance, bodyPart: Enum.BodyPart): unknown;
	ValidateUGCFullBodyAsync(player: Player, humanoidDescription: HumanoidDescription): unknown;
	readonly AvatarAssetModerationCompleted: RBXScriptSignal<(assetId: number, moderationStatus: Enum.ModerationStatus) => void>;
	readonly AvatarModerationCompleted: RBXScriptSignal<(outfitId: number, moderationStatus: Enum.ModerationStatus) => void>;
}

interface AvatarEditorService extends Instance {
	GetAccessoryType(avatarAssetType: Enum.AvatarAssetType): Enum.AccessoryType;
	PromptAllowInventoryReadAccess(): undefined;
	PromptCreateOutfit(outfit: HumanoidDescription, rigType: Enum.HumanoidRigType): undefined;
	PromptDeleteOutfit(outfitId: number): undefined;
	PromptRenameOutfit(outfitId: number): undefined;
	PromptSaveAvatar(humanoidDescription: HumanoidDescription, rigType: Enum.HumanoidRigType): undefined;
	PromptSetFavorite(itemId: number, itemType: Enum.AvatarItemType, shouldFavorite: boolean): undefined;
	PromptUpdateOutfit(outfitId: number, updatedOutfit: HumanoidDescription, rigType: Enum.HumanoidRigType): undefined;
	/** @deprecated */
	CheckApplyDefaultClothing(humanoidDescription: HumanoidDescription): HumanoidDescription;
	CheckApplyDefaultClothingAsync(humanoidDescription: HumanoidDescription): HumanoidDescription;
	/** @deprecated */
	ConformToAvatarRules(humanoidDescription: HumanoidDescription): HumanoidDescription;
	ConformToAvatarRulesAsync(humanoidDescription: HumanoidDescription): HumanoidDescription;
	/** @deprecated */
	GetAvatarRules(): unknown;
	GetAvatarRulesAsync(): unknown;
	/** @deprecated */
	GetBatchItemDetails(itemIds: unknown, itemType: Enum.AvatarItemType): unknown;
	GetBatchItemDetailsAsync(itemIds: unknown, itemType: Enum.AvatarItemType): unknown;
	/** @deprecated */
	GetFavorite(itemId: number, itemType: Enum.AvatarItemType): boolean;
	GetFavoriteAsync(itemId: number, itemType: Enum.AvatarItemType): boolean;
	GetHeadShapesAsync(): unknown;
	/** @deprecated */
	GetInventory(assetTypes: unknown): InventoryPages;
	GetInventoryAsync(assetTypes: unknown): InventoryPages;
	/** @deprecated */
	GetItemDetails(itemId: number, itemType: Enum.AvatarItemType): unknown;
	GetItemDetailsAsync(itemId: number, itemType: Enum.AvatarItemType): unknown;
	/** @deprecated */
	GetOutfitDetails(outfitId: number): unknown;
	GetOutfitDetailsAsync(outfitId: number): unknown;
	/** @deprecated */
	GetOutfits(outfitSource?: Enum.OutfitSource, outfitType?: Enum.OutfitType): OutfitPages;
	GetOutfitsAsync(outfitSource?: Enum.OutfitSource, outfitType?: Enum.OutfitType): OutfitPages;
	/** @deprecated */
	GetRecommendedAssets(assetType: Enum.AvatarAssetType, contextAssetId?: number): unknown;
	GetRecommendedAssetsAsync(assetType: Enum.AvatarAssetType, contextAssetId?: number): unknown;
	/** @deprecated */
	GetRecommendedBundles(bundleId: number): unknown;
	GetRecommendedBundlesAsync(bundleId: number): unknown;
	/** @deprecated */
	SearchCatalog(searchParameters: CatalogSearchParams): CatalogPages;
	SearchCatalogAsync(searchParameters: CatalogSearchParams): CatalogPages;
	readonly PromptAllowInventoryReadAccessCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult) => void>;
	readonly PromptCreateOutfitCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult, failureType: unknown) => void>;
	readonly PromptDeleteOutfitCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult) => void>;
	readonly PromptRenameOutfitCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult) => void>;
	readonly PromptSaveAvatarCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult, humanoidDescription: HumanoidDescription) => void>;
	readonly PromptSetFavoriteCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult) => void>;
	readonly PromptUpdateOutfitCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult) => void>;
}

interface AvatarImportService extends Instance {
}

interface AvatarRules extends Instance {
}

interface AvatarSettings extends Instance {
}

interface Backpack extends Instance {
}

interface BadgeService extends Instance {
	/** @deprecated */
	AwardBadge(userId: number, badgeId: number): boolean;
	AwardBadgeAsync(userId: number, badgeId: number): boolean;
	CheckUserBadgesAsync(userId: number, badgeIds: unknown): unknown;
	GetBadgeInfoAsync(badgeId: number): unknown;
	/** @deprecated */
	IsDisabled(badgeId: number): boolean;
	/** @deprecated */
	IsLegal(badgeId: number): boolean;
	/** @deprecated */
	UserHasBadge(userId: number, badgeId: number): boolean;
	UserHasBadgeAsync(userId: number, badgeId: number): boolean;
}

interface BaseCoreGuiConfiguration extends Instance {
	Enabled: boolean;
}

interface CapturesViewConfiguration extends BaseCoreGuiConfiguration {
	Open: boolean;
}

interface PlayerListConfiguration extends BaseCoreGuiConfiguration {
	Open: boolean;
}

interface SelfViewConfiguration extends BaseCoreGuiConfiguration {
	Open: boolean;
}

interface BaseImportData extends Instance {
	Id: string;
	ImportName: string;
	ShouldImport: boolean;
	readonly StatusRemoved: RBXScriptSignal<(status: unknown) => void>;
	readonly StatusReported: RBXScriptSignal<(status: unknown) => void>;
}

interface AnimationImportData extends BaseImportData {
}

interface FacsImportData extends BaseImportData {
}

interface GroupImportData extends BaseImportData {
	Anchored: boolean;
	ImportAsModelAsset: boolean;
	InsertInWorkspace: boolean;
}

interface JointImportData extends BaseImportData {
}

interface MaterialImportData extends BaseImportData {
	DiffuseFilePath: string;
	EmissiveFilePath: string;
	IsPbr: boolean;
	MetalnessFilePath: string;
	NormalFilePath: string;
	RoughnessFilePath: string;
}

interface MeshImportData extends BaseImportData {
	Anchored: boolean;
	CageManifold: boolean;
	CageMeshIntersectedPreview: boolean;
	CageMeshNotIntersected: boolean;
	CageNoOverlappingVertices: boolean;
	CageNonManifoldPreview: boolean;
	CageOverlappingVerticesPreview: boolean;
	CageUVMatched: boolean;
	CageUVMisMatchedPreview: boolean;
	Dimensions: Vector3;
	DoubleSided: boolean;
	IgnoreVertexColors: boolean;
	IrrelevantCageModifiedPreview: boolean;
	MeshHoleDetectedPreview: boolean;
	MeshNoHoleDetected: boolean;
	NoIrrelevantCageModified: boolean;
	NoOuterCageFarExtendedFromMesh: boolean;
	OuterCageFarExtendedFromMeshPreview: boolean;
	PolygonCount: number;
	UseImportedPivot: boolean;
}

interface RootImportData extends BaseImportData {
	AddModelToInventory: boolean;
	Anchored: boolean;
	AnimationIdForRestPose: number;
	ExistingPackageId: string;
	FileDimensions: Vector3;
	ImportAsModelAsset: boolean;
	ImportAsPackage: boolean;
	InsertInWorkspace: boolean;
	InsertWithScenePosition: boolean;
	InvertNegativeFaces: boolean;
	KeepZeroInfluenceBones: boolean;
	MergeMeshes: boolean;
	PolygonCount: number;
	PreferredUploadId: number;
	RestPose: Enum.RestPose;
	RigScale: Enum.RigScale;
	RigType: Enum.RigType;
	RigVisualization: boolean;
	ScaleUnit: Enum.MeshScaleUnit;
	UseSceneOriginAsPivot: boolean;
	UsesCages: boolean;
	ValidateUgcBody: boolean;
	WorldForward: Enum.NormalId;
	WorldUp: Enum.NormalId;
}

interface BasePlayerGui extends Instance {
	GetGuiObjectsAtPosition(x: number, y: number): Instances;
}

interface CoreGui extends BasePlayerGui {
	Version: number;
}

interface PlayerGui extends BasePlayerGui {
	CurrentScreenOrientation: Enum.ScreenOrientation;
	ScreenOrientation: Enum.ScreenOrientation;
	SelectionImageObject: GuiObject;
	/** @deprecated */
	GetTopbarTransparency(): number;
	/** @deprecated */
	SetTopbarTransparency(transparency: number): undefined;
	/** @deprecated */
	readonly TopbarTransparencyChangedSignal: RBXScriptSignal<(transparency: number) => void>;
}

interface StarterGui extends BasePlayerGui {
	/** @deprecated */
	ResetPlayerGuiOnSpawn: boolean;
	ScreenOrientation: Enum.ScreenOrientation;
	ShowDevelopmentGui: boolean;
	GetCoreGuiEnabled(coreGuiType: Enum.CoreGuiType): boolean;
	SetCore(parameterName: string, value: unknown): undefined;
	SetCoreGuiEnabled(coreGuiType: Enum.CoreGuiType, enabled: boolean): undefined;
	GetCore(parameterName: string): unknown;
}

interface BaseRemoteEvent extends Instance {
}

interface RemoteEvent extends BaseRemoteEvent {
	FireAllClients(arguments: unknown): undefined;
	FireClient(player: Player, arguments: unknown): undefined;
	FireServer(arguments: unknown): undefined;
	readonly OnClientEvent: RBXScriptSignal<(arguments: unknown) => void>;
	readonly OnServerEvent: RBXScriptSignal<(player: Player, arguments: unknown) => void>;
}

interface UnreliableRemoteEvent extends BaseRemoteEvent {
	FireAllClients(arguments: unknown): undefined;
	FireClient(player: Player, arguments: unknown): undefined;
	FireServer(arguments: unknown): undefined;
	readonly OnClientEvent: RBXScriptSignal<(arguments: unknown) => void>;
	readonly OnServerEvent: RBXScriptSignal<(player: Player, arguments: unknown) => void>;
}

interface BaseWrap extends Instance {
	CageMeshContent: Content;
	CageMeshId: ContentId;
	CageOrigin: CFrame;
	CageOriginWorld: CFrame;
	ImportOrigin: CFrame;
	ImportOriginWorld: CFrame;
}

interface WrapDeformer extends BaseWrap {
	SetCageMeshContent(content: Content, cageOrigin: CoordinateFrame?): undefined;
	CreateEditableMeshAsync(): EditableMesh;
	GetDeformedCFrameAsync(originalCFrame: CFrame): CFrame;
}

interface WrapLayer extends BaseWrap {
	AutoSkin: Enum.WrapLayerAutoSkin;
	BindOffset: CFrame;
	Enabled: boolean;
	Order: number;
	Puffiness: number;
	ReferenceMeshContent: Content;
	ReferenceMeshId: ContentId;
	ReferenceOrigin: CFrame;
	ReferenceOriginWorld: CFrame;
	ShrinkFactor: number;
}

interface WrapTarget extends BaseWrap {
	Stiffness: number;
}

interface Beam extends Instance {
	Attachment0: Attachment;
	Attachment1: Attachment;
	Brightness: number;
	Color: ColorSequence;
	CurveSize0: number;
	CurveSize1: number;
	Enabled: boolean;
	FaceCamera: boolean;
	LightEmission: number;
	LightInfluence: number;
	Segments: number;
	Texture: ContentId;
	TextureLength: number;
	TextureMode: Enum.TextureMode;
	TextureSpeed: number;
	Transparency: NumberSequence;
	Width0: number;
	Width1: number;
	ZOffset: number;
	SetTextureOffset(offset?: number): undefined;
}

interface BindableEvent extends Instance {
	Fire(arguments: unknown): undefined;
	readonly Event: RBXScriptSignal<(arguments: unknown) => void>;
}

interface BindableFunction extends Instance {
	Invoke(arguments: unknown): unknown;
	OnInvoke?: (arguments: unknown) => unknown;
}

/** @deprecated */
interface BodyMover extends Instance {
}

/** @deprecated */
interface BodyAngularVelocity extends BodyMover {
	AngularVelocity: Vector3;
	MaxTorque: Vector3;
	P: number;
	/** @deprecated */
	angularvelocity: Vector3;
	/** @deprecated */
	maxTorque: Vector3;
}

/** @deprecated */
interface BodyForce extends BodyMover {
	Force: Vector3;
	/** @deprecated */
	force: Vector3;
}

/** @deprecated */
interface BodyGyro extends BodyMover {
	CFrame: CFrame;
	D: number;
	MaxTorque: Vector3;
	P: number;
	/** @deprecated */
	cframe: CFrame;
	/** @deprecated */
	maxTorque: Vector3;
}

/** @deprecated */
interface BodyPosition extends BodyMover {
	D: number;
	MaxForce: Vector3;
	P: number;
	Position: Vector3;
	/** @deprecated */
	maxForce: Vector3;
	/** @deprecated */
	position: Vector3;
	GetLastForce(): Vector3;
	/** @deprecated */
	lastForce(): Vector3;
	readonly ReachedTarget: RBXScriptSignal<() => void>;
}

/** @deprecated */
interface BodyThrust extends BodyMover {
	Force: Vector3;
	Location: Vector3;
	/** @deprecated */
	force: Vector3;
	/** @deprecated */
	location: Vector3;
}

/** @deprecated */
interface BodyVelocity extends BodyMover {
	MaxForce: Vector3;
	P: number;
	Velocity: Vector3;
	/** @deprecated */
	maxForce: Vector3;
	/** @deprecated */
	velocity: Vector3;
	GetLastForce(): Vector3;
	lastForce(): Vector3;
}

/** @deprecated */
interface RocketPropulsion extends BodyMover {
	CartoonFactor: number;
	MaxSpeed: number;
	MaxThrust: number;
	MaxTorque: Vector3;
	Target: BasePart;
	TargetOffset: Vector3;
	TargetRadius: number;
	ThrustD: number;
	ThrustP: number;
	TurnD: number;
	TurnP: number;
	Abort(): undefined;
	Fire(): undefined;
	/** @deprecated */
	fire(): undefined;
	readonly ReachedTarget: RBXScriptSignal<() => void>;
}

interface BodyPartDescription extends Instance {
	AssetId: number;
	BodyPart: Enum.BodyPart;
	Color: Color3;
	HeadShape: string;
	Instance: Instance;
}

interface Breakpoint extends Instance {
}

interface BrowserService extends Instance {
}

interface BugReporterService extends Instance {
}

interface BulkImportService extends Instance {
}

interface CacheableContentProvider extends Instance {
}

interface HSRDataContentProvider extends CacheableContentProvider {
}

interface MeshContentProvider extends CacheableContentProvider {
}

interface SlimContentProvider extends CacheableContentProvider {
}

interface SolidModelContentProvider extends CacheableContentProvider {
}

interface CalloutService extends Instance {
}

interface CaptureService extends Instance {
	CaptureScreenshot(onCaptureReady: Function): undefined;
	GetDeviceInfo(): unknown;
	PromptSaveCapturesToGallery(captures: unknown, resultCallback: Function): undefined;
	PromptShareCapture(captureContent: Content, launchData: string, onAcceptedCallback: Function, onDeniedCallback: Function): undefined;
	StopVideoCapture(): undefined;
	TakeScreenshotCaptureAsync(onCaptureReady: Function, captureParams?: unknown): undefined;
	InternalCheckPlayabilityAsync(universeId: number): boolean;
	InternalGetStartPlaceIdAsync(universeId: number): number;
	PromptCaptureGalleryPermissionAsync(captureGalleryPermission: Enum.CaptureGalleryPermission): boolean;
	ReadCapturesFromGalleryAsync(captureTypeFilters?: unknown, readFromAllEligibleExperiences?: boolean): unknown;
	StartVideoCaptureAsync(onCaptureReady: Function, captureParams?: unknown): Enum.VideoCaptureStartedResult;
	UploadCaptureAsync(capture: Capture): unknown;
	readonly CaptureBegan: RBXScriptSignal<(captureType: Enum.CaptureType) => void>;
	readonly CaptureEnded: RBXScriptSignal<(captureType: Enum.CaptureType) => void>;
	/** @deprecated */
	readonly CaptureSaved: RBXScriptSignal<(captureInfo: unknown) => void>;
	readonly UserCaptureSaved: RBXScriptSignal<(captureContentId: ContentId) => void>;
}

interface ChangeHistoryService extends Instance {
	FinishRecording(identifier: string, operation: Enum.FinishRecordingOperation, finalOptions: unknown): undefined;
	GetCanRedo(): unknown;
	GetCanUndo(): unknown;
	IsRecordingInProgress(identifier: unknown): boolean;
	Redo(): undefined;
	ResetWaypoints(): undefined;
	SetEnabled(state: boolean): undefined;
	SetWaypoint(name: string): undefined;
	TryBeginRecording(name: string, displayName: unknown): unknown;
	Undo(): undefined;
	readonly OnRecordingFinished: RBXScriptSignal<(name: string, displayName: unknown, identifier: unknown, operation: Enum.FinishRecordingOperation, finalOptions: unknown) => void>;
	readonly OnRecordingStarted: RBXScriptSignal<(name: string, displayName: unknown) => void>;
	readonly OnRedo: RBXScriptSignal<(waypoint: string) => void>;
	readonly OnUndo: RBXScriptSignal<(waypoint: string) => void>;
}

interface ChangeHistoryStreamingService extends Instance {
}

interface CharacterAppearance extends Instance {
}

interface BodyColors extends CharacterAppearance {
	HeadColor: BrickColor;
	HeadColor3: Color3;
	LeftArmColor: BrickColor;
	LeftArmColor3: Color3;
	LeftLegColor: BrickColor;
	LeftLegColor3: Color3;
	RightArmColor: BrickColor;
	RightArmColor3: Color3;
	RightLegColor: BrickColor;
	RightLegColor3: Color3;
	TorsoColor: BrickColor;
	TorsoColor3: Color3;
}

interface CharacterMesh extends CharacterAppearance {
	BaseTextureContent: Content;
	BaseTextureId: number;
	BodyPart: Enum.BodyPart;
	MeshContent: Content;
	MeshId: number;
	OverlayTextureContent: Content;
	OverlayTextureId: number;
}

interface Clothing extends CharacterAppearance {
	Color3: Color3;
}

interface Pants extends Clothing {
	PantsTemplate: ContentId;
}

interface Shirt extends Clothing {
	ShirtTemplate: ContentId;
}

interface ShirtGraphic extends CharacterAppearance {
	Color3: Color3;
	Graphic: ContentId;
}

/** @deprecated */
interface Skin extends CharacterAppearance {
	SkinColor: BrickColor;
}

interface Chat extends Instance {
	BubbleChatEnabled: boolean;
	readonly LoadDefaultChat: boolean;
	Chat(partOrCharacter: Instance, message: string, color?: Enum.ChatColor): undefined;
	InvokeChatCallback(callbackType: Enum.ChatCallbackType, callbackArguments: unknown): unknown;
	RegisterChatCallback(callbackType: Enum.ChatCallbackType, callbackFunction: Function): undefined;
	SetBubbleChatSettings(settings: unknown): undefined;
	CanUserChatAsync(userId: number): boolean;
	CanUsersChatAsync(userIdFrom: number, userIdTo: number): boolean;
	FilterStringAsync(stringToFilter: string, playerFrom: Player, playerTo: Player): string;
	FilterStringForBroadcast(stringToFilter: string, playerFrom: Player): string;
	/** @deprecated */
	FilterStringForPlayerAsync(stringToFilter: string, playerToFilterFor: Player): string;
	readonly Chatted: RBXScriptSignal<(part: Instance, message: string, color: Enum.ChatColor) => void>;
}

interface ChatbotUIService extends Instance {
}

interface ClickDetector extends Instance {
	CursorIcon: ContentId;
	CursorIconContent: Content;
	MaxActivationDistance: number;
	readonly MouseClick: RBXScriptSignal<(playerWhoClicked: Player) => void>;
	readonly MouseHoverEnter: RBXScriptSignal<(playerWhoHovered: Player) => void>;
	readonly MouseHoverLeave: RBXScriptSignal<(playerWhoHovered: Player) => void>;
	readonly RightMouseClick: RBXScriptSignal<(playerWhoClicked: Player) => void>;
	/** @deprecated */
	readonly mouseClick: RBXScriptSignal<(playerWhoClicked: Player) => void>;
}

interface DragDetector extends ClickDetector {
	ActivatedCursorIcon: ContentId;
	ActivatedCursorIconContent: Content;
	ApplyAtCenterOfMass: boolean;
	Axis: Vector3;
	DragFrame: CFrame;
	DragStyle: Enum.DragDetectorDragStyle;
	Enabled: boolean;
	GamepadModeSwitchKeyCode: Enum.KeyCode;
	KeyboardModeSwitchKeyCode: Enum.KeyCode;
	MaxDragAngle: number;
	MaxDragTranslation: Vector3;
	MaxForce: number;
	MaxTorque: number;
	MinDragAngle: number;
	MinDragTranslation: Vector3;
	Orientation: Vector3;
	PermissionPolicy: Enum.DragDetectorPermissionPolicy;
	ReferenceInstance: Instance;
	ResponseStyle: Enum.DragDetectorResponseStyle;
	Responsiveness: number;
	RunLocally: boolean;
	SecondaryAxis: Vector3;
	TrackballRadialPullFactor: number;
	TrackballRollFactor: number;
	VRSwitchKeyCode: Enum.KeyCode;
	WorldAxis: Vector3;
	WorldSecondaryAxis: Vector3;
	AddConstraintFunction(priority: number, _function: Function): RBXScriptConnection;
	GetReferenceFrame(): CFrame;
	RestartDrag(): undefined;
	SetDragStyleFunction(_function: Function): undefined;
	SetPermissionPolicyFunction(_function: Function): undefined;
	readonly DragContinue: RBXScriptSignal<(playerWhoDragged: Player, cursorRay: Ray, viewFrame: CFrame, vrInputFrame: OptionalCoordinateFrame, isModeSwitchKeyDown: boolean) => void>;
	readonly DragEnd: RBXScriptSignal<(playerWhoDragged: Player) => void>;
	readonly DragStart: RBXScriptSignal<(playerWhoDragged: Player, cursorRay: Ray, viewFrame: CFrame, hitFrame: CFrame, clickedPart: BasePart, vrInputFrame: OptionalCoordinateFrame, isModeSwitchKeyDown: boolean) => void>;
}

interface CloudCRUDService extends Instance {
}

interface Clouds extends Instance {
	Color: Color3;
	Cover: number;
	Density: number;
	Enabled: boolean;
}

interface ClusterPacketCache extends Instance {
}

interface Collaborator extends Instance {
}

interface CollaboratorsService extends Instance {
}

interface CollectionService extends Instance {
	AddTag(instance: Instance, tag: string): undefined;
	GetAllTags(): unknown;
	/** @deprecated */
	GetCollection(_class: string): Instances;
	GetInstanceAddedSignal(tag: string): RBXScriptSignal;
	GetInstanceRemovedSignal(tag: string): RBXScriptSignal;
	GetTagged(tag: string): Instances;
	GetTags(instance: Instance): unknown;
	HasTag(instance: Instance, tag: string): boolean;
	RemoveTag(instance: Instance, tag: string): undefined;
	/** @deprecated */
	readonly ItemAdded: RBXScriptSignal<(instance: Instance) => void>;
	/** @deprecated */
	readonly ItemRemoved: RBXScriptSignal<(instance: Instance) => void>;
	readonly TagAdded: RBXScriptSignal<(tag: string) => void>;
	readonly TagRemoved: RBXScriptSignal<(tag: string) => void>;
}

interface CommerceService extends Instance {
	PromptCommerceProductPurchase(user: Player, commerceProductId: string): undefined;
	PromptRealWorldCommerceBrowser(player: Player, url: string): undefined;
	GetCommerceProductInfoAsync(commerceProductId: string): unknown;
	UserEligibleForRealWorldCommerceAsync(): boolean;
	readonly PromptCommerceProductPurchaseFinished: RBXScriptSignal<(user: Player, productId: string) => void>;
}

interface CompositeValueCurve extends Instance {
	CurveType: Enum.CompositeValueCurveType;
	GetComponentCurves(): Instances;
	GetValueAtTime(time: number): unknown;
}

interface ConfigService extends Instance {
	ClearTestingValue(key: string): undefined;
	SetTestingValue(key: string, value: unknown): undefined;
	GetConfigAsync(): ConfigSnapshot;
	GetConfigForPlayerAsync(player: Player): ConfigSnapshot;
}

interface Configuration extends Instance {
}

interface ConfigureServerService extends Instance {
}

interface ConnectivityService extends Instance {
}

interface Constraint extends Instance {
	Active: boolean;
	Attachment0: Attachment;
	Attachment1: Attachment;
	Color: BrickColor;
	Enabled: boolean;
	Visible: boolean;
	/** @deprecated */
	GetDebugAppliedForce(bodyId: number): Vector3;
	/** @deprecated */
	GetDebugAppliedTorque(bodyId: number): Vector3;
}

interface AlignOrientation extends Constraint {
	AlignType: Enum.AlignType;
	CFrame: CFrame;
	LookAtPosition: Vector3;
	MaxAngularVelocity: number;
	MaxTorque: number;
	Mode: Enum.OrientationAlignmentMode;
	PrimaryAxis: Vector3;
	PrimaryAxisOnly: boolean;
	ReactionTorqueEnabled: boolean;
	Responsiveness: number;
	RigidityEnabled: boolean;
	SecondaryAxis: Vector3;
}

interface AlignPosition extends Constraint {
	ApplyAtCenterOfMass: boolean;
	ForceLimitMode: Enum.ForceLimitMode;
	ForceRelativeTo: Enum.ActuatorRelativeTo;
	MaxAxesForce: Vector3;
	MaxForce: number;
	MaxVelocity: number;
	Mode: Enum.PositionAlignmentMode;
	Position: Vector3;
	ReactionForceEnabled: boolean;
	Responsiveness: number;
	RigidityEnabled: boolean;
}

interface AngularVelocity extends Constraint {
	AngularVelocity: Vector3;
	MaxTorque: number;
	ReactionTorqueEnabled: boolean;
	RelativeTo: Enum.ActuatorRelativeTo;
}

interface AnimationConstraint extends Constraint {
	IsKinematic: boolean;
	MaxForce: number;
	MaxTorque: number;
	Transform: CFrame;
}

interface BallSocketConstraint extends Constraint {
	LimitsEnabled: boolean;
	MaxFrictionTorque: number;
	Radius: number;
	Restitution: number;
	TwistLimitsEnabled: boolean;
	TwistLowerAngle: number;
	TwistUpperAngle: number;
	UpperAngle: number;
}

interface HingeConstraint extends Constraint {
	ActuatorType: Enum.ActuatorType;
	AngularResponsiveness: number;
	AngularSpeed: number;
	AngularVelocity: number;
	CurrentAngle: number;
	LimitsEnabled: boolean;
	LowerAngle: number;
	MotorMaxAcceleration: number;
	MotorMaxTorque: number;
	Radius: number;
	Restitution: number;
	ServoMaxTorque: number;
	/** @deprecated */
	SoftlockServoUponReachingTarget: boolean;
	TargetAngle: number;
	UpperAngle: number;
}

interface LineForce extends Constraint {
	ApplyAtCenterOfMass: boolean;
	InverseSquareLaw: boolean;
	Magnitude: number;
	MaxForce: number;
	ReactionForceEnabled: boolean;
}

interface LinearVelocity extends Constraint {
	ForceLimitMode: Enum.ForceLimitMode;
	ForceLimitsEnabled: boolean;
	LineDirection: Vector3;
	LineVelocity: number;
	MaxAxesForce: Vector3;
	MaxForce: number;
	MaxPlanarAxesForce: Vector2;
	PlaneVelocity: Vector2;
	PrimaryTangentAxis: Vector3;
	ReactionForceEnabled: boolean;
	RelativeTo: Enum.ActuatorRelativeTo;
	SecondaryTangentAxis: Vector3;
	VectorVelocity: Vector3;
	VelocityConstraintMode: Enum.VelocityConstraintMode;
}

interface PlaneConstraint extends Constraint {
}

/** @deprecated */
interface Plane extends PlaneConstraint {
}

interface RigidConstraint extends Constraint {
}

interface RodConstraint extends Constraint {
	CurrentDistance: number;
	Length: number;
	LimitAngle0: number;
	LimitAngle1: number;
	LimitsEnabled: boolean;
	Thickness: number;
}

interface RopeConstraint extends Constraint {
	CurrentDistance: number;
	Length: number;
	Restitution: number;
	Thickness: number;
	WinchEnabled: boolean;
	WinchForce: number;
	WinchResponsiveness: number;
	WinchSpeed: number;
	WinchTarget: number;
}

interface SlidingBallConstraint extends Constraint {
	ActuatorType: Enum.ActuatorType;
	CurrentPosition: number;
	LimitsEnabled: boolean;
	LinearResponsiveness: number;
	LowerLimit: number;
	MotorMaxAcceleration: number;
	MotorMaxForce: number;
	Restitution: number;
	ServoMaxForce: number;
	Size: number;
	/** @deprecated */
	SoftlockServoUponReachingTarget: boolean;
	Speed: number;
	TargetPosition: number;
	UpperLimit: number;
	Velocity: number;
}

interface CylindricalConstraint extends SlidingBallConstraint {
	AngularActuatorType: Enum.ActuatorType;
	AngularLimitsEnabled: boolean;
	AngularResponsiveness: number;
	AngularRestitution: number;
	AngularSpeed: number;
	AngularVelocity: number;
	CurrentAngle: number;
	InclinationAngle: number;
	LowerAngle: number;
	MotorMaxAngularAcceleration: number;
	MotorMaxTorque: number;
	RotationAxisVisible: boolean;
	ServoMaxTorque: number;
	/** @deprecated */
	SoftlockAngularServoUponReachingTarget: boolean;
	TargetAngle: number;
	UpperAngle: number;
	WorldRotationAxis: Vector3;
}

interface PrismaticConstraint extends SlidingBallConstraint {
}

interface SpringConstraint extends Constraint {
	Coils: number;
	CurrentLength: number;
	Damping: number;
	FreeLength: number;
	LimitsEnabled: boolean;
	MaxForce: number;
	MaxLength: number;
	MinLength: number;
	Radius: number;
	Stiffness: number;
	Thickness: number;
}

interface Torque extends Constraint {
	RelativeTo: Enum.ActuatorRelativeTo;
	Torque: Vector3;
}

interface TorsionSpringConstraint extends Constraint {
	Coils: number;
	CurrentAngle: number;
	Damping: number;
	LimitsEnabled: boolean;
	MaxAngle: number;
	MaxTorque: number;
	Radius: number;
	Restitution: number;
	Stiffness: number;
}

interface UniversalConstraint extends Constraint {
	LimitsEnabled: boolean;
	MaxAngle: number;
	Radius: number;
	Restitution: number;
}

interface VectorForce extends Constraint {
	ApplyAtCenterOfMass: boolean;
	Force: Vector3;
	RelativeTo: Enum.ActuatorRelativeTo;
}

interface ContentProvider extends Instance {
	BaseUrl: string;
	RequestQueueSize: number;
	GetAssetFetchStatus(contentId: ContentId): Enum.AssetFetchStatus;
	GetAssetFetchStatusChangedSignal(contentId: ContentId): RBXScriptSignal;
	ListEncryptedAssets(): unknown;
	/** @deprecated */
	Preload(contentId: ContentId): undefined;
	RegisterDefaultEncryptionKey(encryptionKey: string): undefined;
	RegisterDefaultSessionKey(sessionKey: string): undefined;
	RegisterEncryptedAsset(assetId: ContentId, encryptionKey: string): undefined;
	RegisterSessionEncryptedAsset(contentId: ContentId, sessionKey: string): undefined;
	UnregisterDefaultEncryptionKey(): undefined;
	UnregisterEncryptedAsset(assetId: ContentId): undefined;
	PreloadAsync(contentIdList: unknown, callbackFunction?: Function): undefined;
	readonly AssetFetchFailed: RBXScriptSignal<(assetId: ContentId) => void>;
}

interface ContextActionService extends Instance {
	BindAction(actionName: string, functionToBind: Function, createTouchButton: boolean, inputTypes: unknown): undefined;
	BindActionAtPriority(actionName: string, functionToBind: Function, createTouchButton: boolean, priorityLevel: number, inputTypes: unknown): undefined;
	/** @deprecated */
	BindActionToInputTypes(actionName: string, functionToBind: Function, createTouchButton: boolean, inputTypes: unknown): undefined;
	BindActivate(userInputTypeForActivation: Enum.UserInputType, keyCodesForActivation: unknown): undefined;
	GetAllBoundActionInfo(): unknown;
	GetBoundActionInfo(actionName: string): unknown;
	GetCurrentLocalToolIcon(): string;
	SetDescription(actionName: string, description: string): undefined;
	SetImage(actionName: string, image: string): undefined;
	SetPosition(actionName: string, position: UDim2): undefined;
	SetTitle(actionName: string, title: string): undefined;
	UnbindAction(actionName: string): undefined;
	UnbindActivate(userInputTypeForActivation: Enum.UserInputType, keyCodeForActivation?: Enum.KeyCode): undefined;
	UnbindAllActions(): undefined;
	GetButton(actionName: string): Instance;
	readonly LocalToolEquipped: RBXScriptSignal<(toolEquipped: Instance) => void>;
	readonly LocalToolUnequipped: RBXScriptSignal<(toolUnequipped: Instance) => void>;
}

interface Controller extends Instance {
	BindButton(button: Enum.Button, caption: string): undefined;
	GetButton(button: Enum.Button): boolean;
	UnbindButton(button: Enum.Button): undefined;
	/** @deprecated */
	bindButton(button: Enum.Button, caption: string): undefined;
	/** @deprecated */
	getButton(button: Enum.Button): boolean;
	readonly ButtonChanged: RBXScriptSignal<(button: Enum.Button) => void>;
}

interface HumanoidController extends Controller {
}

interface SkateboardController extends Controller {
	Steer: number;
	Throttle: number;
	readonly AxisChanged: RBXScriptSignal<(axis: string) => void>;
}

interface VehicleController extends Controller {
}

interface ControllerBase extends Instance {
	Active: boolean;
	BalanceRigidityEnabled: boolean;
	MoveSpeedFactor: number;
}

interface AirController extends ControllerBase {
	BalanceMaxTorque: number;
	BalanceSpeed: number;
	MaintainAngularMomentum: boolean;
	MaintainLinearMomentum: boolean;
	MoveMaxForce: number;
	TurnMaxTorque: number;
	TurnSpeedFactor: number;
}

interface ClimbController extends ControllerBase {
	AccelerationTime: number;
	BalanceMaxTorque: number;
	BalanceSpeed: number;
	MoveMaxForce: number;
}

interface GroundController extends ControllerBase {
	AccelerationLean: number;
	AccelerationTime: number;
	BalanceMaxTorque: number;
	BalanceSpeed: number;
	DecelerationTime: number;
	Friction: number;
	FrictionWeight: number;
	GroundOffset: number;
	StandForce: number;
	StandSpeed: number;
	TurnSpeedFactor: number;
}

interface SwimController extends ControllerBase {
	AccelerationTime: number;
	PitchMaxTorque: number;
	PitchSpeedFactor: number;
	RollMaxTorque: number;
	RollSpeedFactor: number;
}

interface ControllerManager extends Instance {
	ActiveController: ControllerBase;
	BaseMoveSpeed: number;
	BaseTurnSpeed: number;
	ClimbSensor: ControllerSensor;
	FacingDirection: Vector3;
	GroundSensor: ControllerSensor;
	MovingDirection: Vector3;
	RootPart: BasePart;
	UpDirection: Vector3;
}

interface ControllerService extends Instance {
}

interface ConversationalAIAcceptanceService extends Instance {
}

interface CookiesService extends Instance {
}

interface CoreGuiConfiguration extends Instance {
	CapturesViewConfiguration: CapturesViewConfiguration;
	PlayerListConfiguration: PlayerListConfiguration;
	SelfViewConfiguration: SelfViewConfiguration;
}

interface CorePackages extends Instance {
}

interface CoreScriptDebuggingManagerHelper extends Instance {
}

interface CoreScriptSyncService extends Instance {
}

interface CreationDBService extends Instance {
}

interface CreatorStoreService extends Instance {
}

interface CrossDMScriptChangeListener extends Instance {
}

/** @deprecated */
interface CustomEvent extends Instance {
	GetAttachedReceivers(): Instances;
	SetValue(newValue: number): undefined;
	readonly ReceiverConnected: RBXScriptSignal<(receiver: Instance) => void>;
	readonly ReceiverDisconnected: RBXScriptSignal<(receiver: Instance) => void>;
}

/** @deprecated */
interface CustomEventReceiver extends Instance {
	Source: Instance;
	GetCurrentValue(): number;
	readonly EventConnected: RBXScriptSignal<(event: Instance) => void>;
	readonly EventDisconnected: RBXScriptSignal<(event: Instance) => void>;
	readonly SourceValueChanged: RBXScriptSignal<(newValue: number) => void>;
}

interface CustomLog extends Instance {
	Close(): undefined;
	GetLogPath(): string;
	Open(): undefined;
	WriteAppend(append: string): undefined;
}

interface DataModelMesh extends Instance {
	Offset: Vector3;
	Scale: Vector3;
	VertexColor: Vector3;
}

/** @deprecated */
interface BevelMesh extends DataModelMesh {
}

interface BlockMesh extends BevelMesh {
}

/** @deprecated */
interface CylinderMesh extends BevelMesh {
}

interface FileMesh extends DataModelMesh {
	MeshId: ContentId;
	TextureId: ContentId;
}

interface SpecialMesh extends FileMesh {
	MeshType: Enum.MeshType;
}

interface DataModelPatchService extends Instance {
}

interface DataModelSession extends Instance {
}

interface DataStoreGetOptions extends Instance {
	UseCache: boolean;
}

interface DataStoreIncrementOptions extends Instance {
	GetMetadata(): unknown;
	SetMetadata(attributes: unknown): undefined;
}

interface DataStoreInfo extends Instance {
	CreatedTime: number;
	DataStoreName: string;
	UpdatedTime: number;
}

interface DataStoreKey extends Instance {
	KeyName: string;
}

interface DataStoreKeyInfo extends Instance {
	CreatedTime: number;
	UpdatedTime: number;
	Version: string;
	GetMetadata(): unknown;
	GetUserIds(): unknown;
}

interface DataStoreObjectVersionInfo extends Instance {
	CreatedTime: number;
	IsDeleted: boolean;
	Version: string;
}

interface DataStoreOptions extends Instance {
	AllScopes: boolean;
	SetExperimentalFeatures(experimentalFeatures: unknown): undefined;
}

interface DataStoreService extends Instance {
	GetDataStore(name: string, scope?: string, options?: Instance): DataStore;
	GetGlobalDataStore(): DataStore;
	GetOrderedDataStore(name: string, scope?: string): OrderedDataStore;
	GetRequestBudgetForRequestType(requestType: Enum.DataStoreRequestType): number;
	SetRateLimitForRequestType(requestType: Enum.DataStoreRequestType, baseLimit: number, perPlayerLimit: number): undefined;
	ListDataStoresAsync(prefix?: string, pageSize?: number, cursor?: string): DataStoreListingPages;
}

interface DataStoreSetOptions extends Instance {
	GetMetadata(): unknown;
	SetMetadata(attributes: unknown): undefined;
}

interface Debris extends Instance {
	/** @deprecated */
	MaxItems: number;
	AddItem(item: Instance, lifetime?: number): undefined;
	/** @deprecated */
	addItem(item: Instance, lifetime?: number): undefined;
}

interface DebugSettings extends Instance {
	DataModel: number;
	InstanceCount: number;
	IsScriptStackTracingEnabled: boolean;
	JobCount: number;
	PlayerCount: number;
	ReportSoundWarnings: boolean;
	RobloxVersion: string;
	TickCountPreciseOverride: Enum.TickCountSampleMethod;
}

interface DebuggablePluginWatcher extends Instance {
}

interface DebuggerBreakpoint extends Instance {
	Condition: string;
	ContinueExecution: boolean;
	IsEnabled: boolean;
	Line: number;
	LogExpression: string;
	isContextDependentBreakpoint: boolean;
}

interface DebuggerConnection extends Instance {
}

interface LocalDebuggerConnection extends DebuggerConnection {
}

interface DebuggerConnectionManager extends Instance {
}

interface DebuggerLuaResponse extends Instance {
}

interface DebuggerManager extends Instance {
	DebuggingEnabled: boolean;
	AddDebugger(script: Instance): Instance;
	GetDebuggers(): Instances;
	Resume(): undefined;
	/** @deprecated */
	StepIn(): undefined;
	/** @deprecated */
	StepOut(): undefined;
	/** @deprecated */
	StepOver(): undefined;
	readonly DebuggerAdded: RBXScriptSignal<(_debugger: Instance) => void>;
	readonly DebuggerRemoved: RBXScriptSignal<(_debugger: Instance) => void>;
}

interface DebuggerUIService extends Instance {
}

interface DebuggerVariable extends Instance {
}

interface DebuggerWatch extends Instance {
	Expression: string;
}

interface DeviceIdService extends Instance {
}

interface Dialog extends Instance {
	BehaviorType: Enum.DialogBehaviorType;
	ConversationDistance: number;
	GoodbyeChoiceActive: boolean;
	GoodbyeDialog: string;
	InUse: boolean;
	InitialPrompt: string;
	Purpose: Enum.DialogPurpose;
	Tone: Enum.DialogTone;
	TriggerDistance: number;
	TriggerOffset: Vector3;
	GetCurrentPlayers(): Instances;
	readonly DialogChoiceSelected: RBXScriptSignal<(player: Instance, dialogChoice: Instance) => void>;
}

interface DialogChoice extends Instance {
	GoodbyeChoiceActive: boolean;
	GoodbyeDialog: string;
	ResponseDialog: string;
	UserDialog: string;
}

interface DraftsService extends Instance {
}

interface Dragger extends Instance {
	AxisRotate(axis?: Enum.Axis): undefined;
	MouseDown(mousePart: Instance, pointOnMousePart: Vector3, parts: Instances): undefined;
	MouseMove(mouseRay: Ray): undefined;
	MouseUp(): undefined;
}

interface DraggerService extends Instance {
	AlignDraggedObjects: boolean;
	AngleSnapEnabled: boolean;
	AngleSnapIncrement: number;
	AnimateHover: boolean;
	CollisionsEnabled: boolean;
	DraggerCoordinateSpace: Enum.DraggerCoordinateSpace;
	DraggerMovementMode: Enum.DraggerMovementMode;
	GeometrySnapColor: Color3;
	HoverAnimateFrequency: number;
	HoverThickness: number;
	JointsEnabled: boolean;
	LinearSnapEnabled: boolean;
	LinearSnapIncrement: number;
	ShowHover: boolean;
	ShowPivotIndicator: boolean;
}

interface EditableService extends Instance {
}

interface EncodingService extends Instance {
	Base64Decode(input: buffer): buffer;
	Base64Encode(input: buffer): buffer;
	CompressBuffer(input: buffer, algorithm: Enum.CompressionAlgorithm, compressionLevel?: number): buffer;
	ComputeBufferHash(input: buffer, algorithm: Enum.HashAlgorithm): buffer;
	ComputeStringHash(input: string, algorithm: Enum.HashAlgorithm): string;
	DecompressBuffer(input: buffer, algorithm: Enum.CompressionAlgorithm): buffer;
	GetDecompressedBufferSize(input: buffer, algorithm: Enum.CompressionAlgorithm): unknown;
}

interface EulerRotationCurve extends Instance {
	RotationOrder: Enum.RotationOrder;
	GetAnglesAtTime(time: number): unknown;
	GetRotationAtTime(time: number): CFrame;
	X(): FloatCurve;
	Y(): FloatCurve;
	Z(): FloatCurve;
}

interface EventIngestService extends Instance {
}

interface ExampleV2Service extends Instance {
}

interface ExperienceAuthService extends Instance {
}

interface ExperienceInviteOptions extends Instance {
	InviteMessageId: string;
	InviteUser: number;
	LaunchData: string;
	PromptMessage: string;
}

interface ExperienceNotificationService extends Instance {
	PromptOptIn(): undefined;
	CanPromptOptInAsync(): boolean;
	readonly OptInPromptClosed: RBXScriptSignal<() => void>;
}

interface ExperienceService extends Instance {
}

interface ExperienceStateCaptureService extends Instance {
}

interface ExperienceStateRecordingService extends Instance {
}

interface ExplorerFilter extends Instance {
}

interface ExplorerFilterAutocompleter extends Instance {
}

interface ExplorerServiceVisibilityService extends Instance {
	GetServiceVisibility(service: Instance): boolean;
}

interface Explosion extends Instance {
	BlastPressure: number;
	BlastRadius: number;
	DestroyJointRadiusPercent: number;
	ExplosionType: Enum.ExplosionType;
	Position: Vector3;
	TimeScale: number;
	Visible: boolean;
	readonly Hit: RBXScriptSignal<(part: BasePart, distance: number) => void>;
}

interface FaceAnimatorService extends Instance {
}

interface FaceControls extends Instance {
	ChinRaiser: number;
	ChinRaiserUpperLip: number;
	Corrugator: number;
	EyesLookDown: number;
	EyesLookLeft: number;
	EyesLookRight: number;
	EyesLookUp: number;
	FlatPucker: number;
	Funneler: number;
	JawDrop: number;
	JawLeft: number;
	JawRight: number;
	LeftBrowLowerer: number;
	LeftCheekPuff: number;
	LeftCheekRaiser: number;
	LeftDimpler: number;
	LeftEyeClosed: number;
	LeftEyeUpperLidRaiser: number;
	LeftInnerBrowRaiser: number;
	LeftLipCornerDown: number;
	LeftLipCornerPuller: number;
	LeftLipStretcher: number;
	LeftLowerLipDepressor: number;
	LeftNoseWrinkler: number;
	LeftOuterBrowRaiser: number;
	LeftUpperLipRaiser: number;
	LipPresser: number;
	LipsTogether: number;
	LowerLipSuck: number;
	MouthLeft: number;
	MouthRight: number;
	Pucker: number;
	RightBrowLowerer: number;
	RightCheekPuff: number;
	RightCheekRaiser: number;
	RightDimpler: number;
	RightEyeClosed: number;
	RightEyeUpperLidRaiser: number;
	RightInnerBrowRaiser: number;
	RightLipCornerDown: number;
	RightLipCornerPuller: number;
	RightLipStretcher: number;
	RightLowerLipDepressor: number;
	RightNoseWrinkler: number;
	RightOuterBrowRaiser: number;
	RightUpperLipRaiser: number;
	TongueDown: number;
	TongueOut: number;
	TongueUp: number;
	UpperLipSuck: number;
}

interface FaceInstance extends Instance {
	Face: Enum.NormalId;
}

interface Decal extends FaceInstance {
	Color3: Color3;
	ColorMap: ContentId;
	ColorMapContent: Content;
	MetalnessMapContent: Content;
	NormalMapContent: Content;
	RoughnessMapContent: Content;
	/** @deprecated */
	Shiny: number;
	/** @deprecated */
	Specular: number;
	Texture: ContentId;
	TextureContent: Content;
	Transparency: number;
	UVOffset: Vector2;
	UVScale: Vector2;
	ZIndex: number;
}

interface Texture extends Decal {
	OffsetStudsU: number;
	OffsetStudsV: number;
	StudsPerTileU: number;
	StudsPerTileV: number;
}

interface FacialAgeEstimationService extends Instance {
}

interface FacialAnimationRecordingService extends Instance {
}

interface FacialAnimationStreamingServiceStats extends Instance {
}

interface FacialAnimationStreamingServiceV2 extends Instance {
}

interface FacialAnimationStreamingSubsessionStats extends Instance {
}

interface Feature extends Instance {
	FaceId: Enum.NormalId;
	InOut: Enum.InOut;
	LeftRight: Enum.LeftRight;
	TopBottom: Enum.TopBottom;
}

/** @deprecated */
interface Hole extends Feature {
}

/** @deprecated */
interface MotorFeature extends Feature {
}

interface FeatureRestrictionManager extends Instance {
}

interface File extends Instance {
	GetBinaryContents(): string;
	GetTemporaryId(): ContentId;
}

interface FileManagerService extends Instance {
}

interface Fire extends Instance {
	Color: Color3;
	Enabled: boolean;
	Heat: number;
	SecondaryColor: Color3;
	Size: number;
	TimeScale: number;
	/** @deprecated */
	size: number;
}

interface FlagStandService extends Instance {
}

interface FloatCurve extends Instance {
	Length: number;
	GetKeyAtIndex(index: number): FloatCurveKey;
	GetKeyIndicesAtTime(time: number): unknown;
	GetKeys(): unknown;
	GetValueAtTime(time: number): unknown;
	InsertKey(key: FloatCurveKey): unknown;
	RemoveKeyAtIndex(startingIndex: number, count?: number): number;
	SetKeys(keys: unknown): number;
}

interface FlyweightService extends Instance {
}

interface CSGDictionaryService extends FlyweightService {
}

interface NonReplicatedCSGDictionaryService extends FlyweightService {
}

interface Folder extends Instance {
}

interface ForceField extends Instance {
	Visible: boolean;
}

interface FriendService extends Instance {
}

/** @deprecated */
interface FunctionalTest extends Instance {
	Description: string;
	Error(message?: string): undefined;
	Failed(message?: string): undefined;
	Pass(message?: string): undefined;
	Passed(message?: string): undefined;
	Warn(message?: string): undefined;
}

interface GamePassService extends Instance {
	/** @deprecated */
	PlayerHasPass(player: Player, gamePassId: number): boolean;
}

interface GameSettings extends Instance {
	/** @deprecated */
	VideoCaptureEnabled: boolean;
}

interface GamepadService extends Instance {
	readonly GamepadCursorEnabled: boolean;
	DisableGamepadCursor(): undefined;
	EnableGamepadCursor(guiObject: Instance): undefined;
}

interface GenerationService extends Instance {
	GenerateMeshAsync(inputs: unknown, player: Player, options: unknown, intermediateResultCallback: Function?): unknown;
	GenerateModelAsync(inputs: unknown, schema: unknown, options: unknown): unknown;
	LoadGeneratedMeshAsync(generationId: string): MeshPart;
}

interface GenericChallengeService extends Instance {
}

interface Geometry extends Instance {
}

interface GeometryService extends Instance {
	CalculateConstraintsToPreserve(source: Instance, destination: unknown, options?: unknown): unknown;
	FragmentAsync(part: BasePart, fragmentSites: unknown, options?: unknown, mainPartSites?: unknown): unknown;
	IntersectAsync(part: Instance, parts: unknown, options?: unknown): unknown;
	SubtractAsync(part: Instance, parts: unknown, options?: unknown): unknown;
	SweepPartAsync(part: BasePart, cframes: unknown, options?: unknown): MeshPart;
	UnionAsync(part: Instance, parts: unknown, options?: unknown): unknown;
}

interface GetTextBoundsParams extends Instance {
	Font: Font;
	RichText: boolean;
	Size: number;
	Text: string;
	Width: number;
}

interface GlobalDataStore extends Instance {
	/** @deprecated */
	OnUpdate(key: string, callback: Function): RBXScriptConnection;
	GetAsync(key: string, options?: DataStoreGetOptions): unknown;
	IncrementAsync(key: string, delta?: number, userIds?: unknown, options?: DataStoreIncrementOptions): unknown;
	RemoveAsync(key: string): unknown;
	SetAsync(key: string, value: unknown, userIds?: unknown, options?: DataStoreSetOptions): unknown;
	UpdateAsync(key: string, transformFunction: Function): unknown;
}

interface DataStore extends GlobalDataStore {
	GetVersionAsync(key: string, version: string): unknown;
	GetVersionAtTimeAsync(key: string, timestamp: number): unknown;
	ListKeysAsync(prefix?: string, pageSize?: number, cursor?: string, excludeDeleted?: boolean): DataStoreKeyPages;
	ListVersionsAsync(key: string, sortDirection?: Enum.SortDirection, minDate?: number, maxDate?: number, pageSize?: number): DataStoreVersionPages;
	RemoveVersionAsync(key: string, version: string): undefined;
}

interface OrderedDataStore extends GlobalDataStore {
	GetSortedAsync(ascending: boolean, pagesize: number, minValue: unknown, maxValue: unknown): DataStorePages;
}

interface GroupService extends Instance {
	GetAlliesAsync(groupId: number): StandardPages;
	GetEnemiesAsync(groupId: number): StandardPages;
	GetGroupInfoAsync(groupId: number): unknown;
	GetGroupsAsync(userId: number): unknown;
	PromptJoinAsync(groupId: number): Enum.GroupMembershipStatus;
}

interface GuiBase extends Instance {
}

interface GuiBase2d extends GuiBase {
	AbsolutePosition: Vector2;
	AbsoluteRotation: number;
	AbsoluteSize: Vector2;
	AutoLocalize: boolean;
	RootLocalizationTable: LocalizationTable;
	SelectionBehaviorDown: Enum.SelectionBehavior;
	SelectionBehaviorLeft: Enum.SelectionBehavior;
	SelectionBehaviorRight: Enum.SelectionBehavior;
	SelectionBehaviorUp: Enum.SelectionBehavior;
	SelectionGroup: boolean;
	readonly SelectionChanged: RBXScriptSignal<(amISelected: boolean, previousSelection: GuiObject, newSelection: GuiObject) => void>;
}

interface GuiObject extends GuiBase2d {
	Active: boolean;
	AnchorPoint: Vector2;
	AutomaticSize: Enum.AutomaticSize;
	BackgroundColor3: Color3;
	BackgroundTransparency: number;
	BorderColor3: Color3;
	BorderMode: Enum.BorderMode;
	BorderSizePixel: number;
	ClipsDescendants: boolean;
	/** @deprecated */
	Draggable: boolean;
	GuiState: Enum.GuiState;
	Interactable: boolean;
	LayoutOrder: number;
	NextSelectionDown: GuiObject;
	NextSelectionLeft: GuiObject;
	NextSelectionRight: GuiObject;
	NextSelectionUp: GuiObject;
	Position: UDim2;
	Rotation: number;
	Selectable: boolean;
	SelectionImageObject: GuiObject;
	SelectionOrder: number;
	Size: UDim2;
	SizeConstraint: Enum.SizeConstraint;
	Visible: boolean;
	ZIndex: number;
	TweenPosition(endPosition: UDim2, easingDirection?: Enum.EasingDirection, easingStyle?: Enum.EasingStyle, time?: number, override?: boolean, callback?: Function): boolean;
	TweenSize(endSize: UDim2, easingDirection?: Enum.EasingDirection, easingStyle?: Enum.EasingStyle, time?: number, override?: boolean, callback?: Function): boolean;
	TweenSizeAndPosition(endSize: UDim2, endPosition: UDim2, easingDirection?: Enum.EasingDirection, easingStyle?: Enum.EasingStyle, time?: number, override?: boolean, callback?: Function): boolean;
	/** @deprecated */
	readonly DragBegin: RBXScriptSignal<(initialPosition: UDim2) => void>;
	/** @deprecated */
	readonly DragStopped: RBXScriptSignal<(x: number, y: number) => void>;
	readonly InputBegan: RBXScriptSignal<(input: InputObject) => void>;
	readonly InputChanged: RBXScriptSignal<(input: InputObject) => void>;
	readonly InputEnded: RBXScriptSignal<(input: InputObject) => void>;
	readonly MouseEnter: RBXScriptSignal<(x: number, y: number) => void>;
	readonly MouseLeave: RBXScriptSignal<(x: number, y: number) => void>;
	readonly MouseMoved: RBXScriptSignal<(x: number, y: number) => void>;
	readonly MouseWheelBackward: RBXScriptSignal<(x: number, y: number) => void>;
	readonly MouseWheelForward: RBXScriptSignal<(x: number, y: number) => void>;
	readonly SelectionGained: RBXScriptSignal<() => void>;
	readonly SelectionLost: RBXScriptSignal<() => void>;
	readonly TouchLongPress: RBXScriptSignal<(touchPositions: unknown, state: Enum.UserInputState) => void>;
	readonly TouchPan: RBXScriptSignal<(touchPositions: unknown, totalTranslation: Vector2, velocity: Vector2, state: Enum.UserInputState) => void>;
	readonly TouchPinch: RBXScriptSignal<(touchPositions: unknown, scale: number, velocity: number, state: Enum.UserInputState) => void>;
	readonly TouchRotate: RBXScriptSignal<(touchPositions: unknown, rotation: number, velocity: number, state: Enum.UserInputState) => void>;
	readonly TouchSwipe: RBXScriptSignal<(swipeDirection: Enum.SwipeDirection, numberOfTouches: number) => void>;
	readonly TouchTap: RBXScriptSignal<(touchPositions: unknown) => void>;
}

interface CanvasGroup extends GuiObject {
	GroupColor3: Color3;
	GroupTransparency: number;
}

interface Frame extends GuiObject {
	Style: Enum.FrameStyle;
}

interface GuiButton extends GuiObject {
	AutoButtonColor: boolean;
	HoverHapticEffect: HapticEffect;
	Modal: boolean;
	PressHapticEffect: HapticEffect;
	Selected: boolean;
	Style: Enum.ButtonStyle;
	readonly Activated: RBXScriptSignal<(inputObject: InputObject, clickCount: number) => void>;
	readonly MouseButton1Click: RBXScriptSignal<() => void>;
	readonly MouseButton1Down: RBXScriptSignal<(x: number, y: number) => void>;
	readonly MouseButton1Up: RBXScriptSignal<(x: number, y: number) => void>;
	readonly MouseButton2Click: RBXScriptSignal<() => void>;
	readonly MouseButton2Down: RBXScriptSignal<(x: number, y: number) => void>;
	readonly MouseButton2Up: RBXScriptSignal<(x: number, y: number) => void>;
	readonly SecondaryActivated: RBXScriptSignal<(inputObject: InputObject) => void>;
}

interface ImageButton extends GuiButton {
	HoverImage: ContentId;
	HoverImageContent: Content;
	Image: ContentId;
	ImageColor3: Color3;
	ImageContent: Content;
	ImageRectOffset: Vector2;
	ImageRectSize: Vector2;
	ImageTransparency: number;
	IsLoaded: boolean;
	PressedImage: ContentId;
	PressedImageContent: Content;
	ResampleMode: Enum.ResamplerMode;
	ScaleType: Enum.ScaleType;
	SliceCenter: Rect;
	SliceScale: number;
	TileSize: UDim2;
}

interface TextButton extends GuiButton {
	ContentText: string;
	FontFace: Font;
	/** @deprecated */
	FontSize: Enum.FontSize;
	LineHeight: number;
	MaxVisibleGraphemes: number;
	OpenTypeFeatures: string;
	OpenTypeFeaturesError: string;
	RichText: boolean;
	Text: string;
	TextBounds: Vector2;
	TextColor3: Color3;
	TextDirection: Enum.TextDirection;
	TextFits: boolean;
	TextScaled: boolean;
	TextSize: number;
	TextStrokeColor3: Color3;
	TextStrokeTransparency: number;
	TextTransparency: number;
	TextTruncate: Enum.TextTruncate;
	/** @deprecated */
	TextWrap: boolean;
	TextWrapped: boolean;
	TextXAlignment: Enum.TextXAlignment;
	TextYAlignment: Enum.TextYAlignment;
}

interface GuiLabel extends GuiObject {
}

interface ImageLabel extends GuiLabel {
	Image: ContentId;
	ImageColor3: Color3;
	ImageContent: Content;
	ImageRectOffset: Vector2;
	ImageRectSize: Vector2;
	ImageTransparency: number;
	IsLoaded: boolean;
	ResampleMode: Enum.ResamplerMode;
	ScaleType: Enum.ScaleType;
	SliceCenter: Rect;
	SliceScale: number;
	TileSize: UDim2;
}

interface TextLabel extends GuiLabel {
	ContentText: string;
	FontFace: Font;
	/** @deprecated */
	FontSize: Enum.FontSize;
	LineHeight: number;
	MaxVisibleGraphemes: number;
	OpenTypeFeatures: string;
	OpenTypeFeaturesError: string;
	RichText: boolean;
	Text: string;
	TextBounds: Vector2;
	TextColor3: Color3;
	TextDirection: Enum.TextDirection;
	TextFits: boolean;
	TextScaled: boolean;
	TextSize: number;
	TextStrokeColor3: Color3;
	TextStrokeTransparency: number;
	TextTransparency: number;
	TextTruncate: Enum.TextTruncate;
	/** @deprecated */
	TextWrap: boolean;
	TextWrapped: boolean;
	TextXAlignment: Enum.TextXAlignment;
	TextYAlignment: Enum.TextYAlignment;
}

interface RelativeGui extends GuiObject {
}

interface ScrollingFrame extends GuiObject {
	AbsoluteCanvasSize: Vector2;
	AbsoluteWindowSize: Vector2;
	AutomaticCanvasSize: Enum.AutomaticSize;
	BottomImage: ContentId;
	BottomImageContent: Content;
	CanvasPosition: Vector2;
	CanvasSize: UDim2;
	ElasticBehavior: Enum.ElasticBehavior;
	HorizontalScrollBarInset: Enum.ScrollBarInset;
	MidImage: ContentId;
	MidImageContent: Content;
	ScrollBarImageColor3: Color3;
	ScrollBarImageTransparency: number;
	ScrollBarThickness: number;
	ScrollingDirection: Enum.ScrollingDirection;
	ScrollingEnabled: boolean;
	TopImage: ContentId;
	TopImageContent: Content;
	VerticalScrollBarInset: Enum.ScrollBarInset;
	VerticalScrollBarPosition: Enum.VerticalScrollBarPosition;
	GetScrollVelocity(): Vector2;
	ResetScrollVelocity(): undefined;
}

interface TextBox extends GuiObject {
	ClearTextOnFocus: boolean;
	ContentText: string;
	CursorPosition: number;
	FontFace: Font;
	/** @deprecated */
	FontSize: Enum.FontSize;
	LineHeight: number;
	MaxVisibleGraphemes: number;
	MultiLine: boolean;
	OpenTypeFeatures: string;
	OpenTypeFeaturesError: string;
	PlaceholderColor3: Color3;
	PlaceholderText: string;
	RichText: boolean;
	SelectionStart: number;
	ShowNativeInput: boolean;
	Text: string;
	TextBounds: Vector2;
	TextColor3: Color3;
	TextDirection: Enum.TextDirection;
	TextEditable: boolean;
	TextFits: boolean;
	TextScaled: boolean;
	TextSize: number;
	TextStrokeColor3: Color3;
	TextStrokeTransparency: number;
	TextTransparency: number;
	TextTruncate: Enum.TextTruncate;
	/** @deprecated */
	TextWrap: boolean;
	TextWrapped: boolean;
	TextXAlignment: Enum.TextXAlignment;
	TextYAlignment: Enum.TextYAlignment;
	CaptureFocus(): undefined;
	IsFocused(): boolean;
	ReleaseFocus(submitted?: boolean): undefined;
	readonly FocusLost: RBXScriptSignal<(enterPressed: boolean, inputThatCausedFocusLoss: InputObject) => void>;
	readonly Focused: RBXScriptSignal<() => void>;
	readonly ReturnPressedFromOnScreenKeyboard: RBXScriptSignal<() => void>;
}

interface VideoDisplay extends GuiObject {
	ResampleMode: Enum.ResamplerMode;
	ScaleType: Enum.ScaleType;
	TileSize: UDim2;
	VideoColor3: Color3;
	VideoRectOffset: Vector2;
	VideoRectSize: Vector2;
	VideoTransparency: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface VideoFrame extends GuiObject {
	IsLoaded: boolean;
	Looped: boolean;
	Playing: boolean;
	Resolution: Vector2;
	TimeLength: number;
	TimePosition: number;
	Video: ContentId;
	VideoContent: Content;
	Volume: number;
	Pause(): undefined;
	Play(): undefined;
	readonly DidLoop: RBXScriptSignal<(video: string) => void>;
	readonly Ended: RBXScriptSignal<(video: string) => void>;
	readonly Loaded: RBXScriptSignal<(video: string) => void>;
	readonly Paused: RBXScriptSignal<(video: string) => void>;
	readonly Played: RBXScriptSignal<(video: string) => void>;
}

interface ViewportFrame extends GuiObject {
	Ambient: Color3;
	CurrentCamera: Camera;
	ImageColor3: Color3;
	ImageTransparency: number;
	LightColor: Color3;
	LightDirection: Vector3;
}

interface LayerCollector extends GuiBase2d {
	Enabled: boolean;
	ResetOnSpawn: boolean;
	ZIndexBehavior: Enum.ZIndexBehavior;
	/** @deprecated */
	GetLayoutNodeTree(): unknown;
}

interface BillboardGui extends LayerCollector {
	Active: boolean;
	Adornee: Instance;
	AlwaysOnTop: boolean;
	Brightness: number;
	ClipsDescendants: boolean;
	CurrentDistance: number;
	/** @deprecated */
	DistanceLowerLimit: number;
	DistanceStep: number;
	/** @deprecated */
	DistanceUpperLimit: number;
	ExtentsOffset: Vector3;
	ExtentsOffsetWorldSpace: Vector3;
	LightInfluence: number;
	MaxDistance: number;
	PlayerToHideFrom: Instance;
	Size: UDim2;
	SizeOffset: Vector2;
	StudsOffset: Vector3;
	StudsOffsetWorldSpace: Vector3;
}

interface PluginGui extends LayerCollector {
	Title: string;
	BindToClose(_function?: Function): undefined;
	GetRelativeMousePosition(): Vector2;
	readonly PluginDragDropped: RBXScriptSignal<(dragData: unknown) => void>;
	readonly PluginDragEntered: RBXScriptSignal<(dragData: unknown) => void>;
	readonly PluginDragLeft: RBXScriptSignal<(dragData: unknown) => void>;
	readonly PluginDragMoved: RBXScriptSignal<(dragData: unknown) => void>;
	readonly WindowFocusReleased: RBXScriptSignal<() => void>;
	readonly WindowFocused: RBXScriptSignal<() => void>;
}

interface DockWidgetPluginGui extends PluginGui {
	HostWidgetWasRestored: boolean;
}

interface QWidgetPluginGui extends PluginGui {
}

interface ScreenGui extends LayerCollector {
	ClipToDeviceSafeArea: boolean;
	DisplayOrder: number;
	IgnoreGuiInset: boolean;
	SafeAreaCompatibility: Enum.SafeAreaCompatibility;
	ScreenInsets: Enum.ScreenInsets;
}

/** @deprecated */
interface GuiMain extends ScreenGui {
}

interface SurfaceGuiBase extends LayerCollector {
	Active: boolean;
	Adornee: Instance;
	Face: Enum.NormalId;
}

interface AdGui extends SurfaceGuiBase {
	AdShape: Enum.AdShape;
	EnableVideoAds: boolean;
	FallbackImage: ContentId;
	Status: Enum.AdUnitStatus;
	OnAdEvent?: (eventInfo: unknown) => boolean;
}

interface SurfaceGui extends SurfaceGuiBase {
	AlwaysOnTop: boolean;
	Brightness: number;
	CanvasSize: Vector2;
	ClipsDescendants: boolean;
	LightInfluence: number;
	MaxDistance: number;
	PixelsPerStud: number;
	SizingMode: Enum.SurfaceGuiSizingMode;
	ToolPunchThroughDistance: number;
	ZOffset: number;
}

interface GuiBase3d extends GuiBase {
	Color3: Color3;
	Transparency: number;
	Visible: boolean;
}

/** @deprecated */
interface FloorWire extends GuiBase3d {
	CycleOffset: number;
	From: BasePart;
	StudsBetweenTextures: number;
	Texture: ContentId;
	TextureSize: Vector2;
	To: BasePart;
	Velocity: number;
	WireRadius: number;
}

interface InstanceAdornment extends GuiBase3d {
	Adornee: Instance;
}

interface SelectionBox extends InstanceAdornment {
	LineThickness: number;
	SurfaceColor3: Color3;
	SurfaceTransparency: number;
}

interface PVAdornment extends GuiBase3d {
	Adornee: PVInstance;
}

interface HandleAdornment extends PVAdornment {
	AdornCullingMode: Enum.AdornCullingMode;
	AlwaysOnTop: boolean;
	CFrame: CFrame;
	SizeRelativeOffset: Vector3;
	ZIndex: number;
	readonly MouseButton1Down: RBXScriptSignal<() => void>;
	readonly MouseButton1Up: RBXScriptSignal<() => void>;
	readonly MouseEnter: RBXScriptSignal<() => void>;
	readonly MouseLeave: RBXScriptSignal<() => void>;
}

interface BoxHandleAdornment extends HandleAdornment {
	Shading: Enum.AdornShading;
	Size: Vector3;
}

interface ConeHandleAdornment extends HandleAdornment {
	Height: number;
	Hollow: boolean;
	Radius: number;
	Shading: Enum.AdornShading;
}

interface CylinderHandleAdornment extends HandleAdornment {
	Angle: number;
	Height: number;
	InnerRadius: number;
	Radius: number;
	Shading: Enum.AdornShading;
}

interface ImageHandleAdornment extends HandleAdornment {
	Image: ContentId;
	Size: Vector2;
}

interface LineHandleAdornment extends HandleAdornment {
	Length: number;
	Thickness: number;
}

interface PyramidHandleAdornment extends HandleAdornment {
	Height: number;
	Shading: Enum.AdornShading;
	Sides: number;
	Size: number;
}

interface SphereHandleAdornment extends HandleAdornment {
	Radius: number;
	Shading: Enum.AdornShading;
}

interface WireframeHandleAdornment extends HandleAdornment {
	Scale: Vector3;
	Thickness: number;
	AddLine(from: Vector3, to: Vector3): undefined;
	AddLines(points: unknown): undefined;
	AddPath(points: unknown, loop: boolean): undefined;
	AddText(point: Vector3, text: string, size?: number): undefined;
	Clear(): undefined;
}

interface ParabolaAdornment extends PVAdornment {
}

interface SelectionSphere extends PVAdornment {
	SurfaceColor3: Color3;
	SurfaceTransparency: number;
}

interface PartAdornment extends GuiBase3d {
	Adornee: BasePart;
}

interface HandlesBase extends PartAdornment {
}

interface ArcHandles extends HandlesBase {
	Axes: Axes;
	readonly MouseButton1Down: RBXScriptSignal<(axis: Enum.Axis) => void>;
	readonly MouseButton1Up: RBXScriptSignal<(axis: Enum.Axis) => void>;
	readonly MouseDrag: RBXScriptSignal<(axis: Enum.Axis, relativeAngle: number, deltaRadius: number) => void>;
	readonly MouseEnter: RBXScriptSignal<(axis: Enum.Axis) => void>;
	readonly MouseLeave: RBXScriptSignal<(axis: Enum.Axis) => void>;
}

interface Handles extends HandlesBase {
	Faces: Faces;
	Style: Enum.HandlesStyle;
	readonly MouseButton1Down: RBXScriptSignal<(face: Enum.NormalId) => void>;
	readonly MouseButton1Up: RBXScriptSignal<(face: Enum.NormalId) => void>;
	readonly MouseDrag: RBXScriptSignal<(face: Enum.NormalId, distance: number) => void>;
	readonly MouseEnter: RBXScriptSignal<(face: Enum.NormalId) => void>;
	readonly MouseLeave: RBXScriptSignal<(face: Enum.NormalId) => void>;
}

interface SurfaceSelection extends PartAdornment {
	TargetSurface: Enum.NormalId;
}

interface SelectionLasso extends GuiBase3d {
	Humanoid: Humanoid;
}

/** @deprecated */
interface SelectionPartLasso extends SelectionLasso {
	Part: BasePart;
}

/** @deprecated */
interface SelectionPointLasso extends SelectionLasso {
	Point: Vector3;
}

interface Path2D extends GuiBase {
	Closed: boolean;
	Color3: Color3;
	Thickness: number;
	Visible: boolean;
	ZIndex: number;
	GetBoundingRect(): Rect;
	GetControlPoint(index: number): Path2DControlPoint;
	GetControlPoints(): unknown;
	GetLength(): number;
	GetMaxControlPoints(): number;
	GetPositionOnCurve(t: number): UDim2;
	GetPositionOnCurveArcLength(t: number): UDim2;
	GetTangentOnCurve(t: number): Vector2;
	GetTangentOnCurveArcLength(t: number): Vector2;
	InsertControlPoint(index: number, point: Path2DControlPoint): undefined;
	RemoveControlPoint(index: number): undefined;
	SetControlPoints(controlPoints: unknown): undefined;
	UpdateControlPoint(index: number, point: Path2DControlPoint): undefined;
	readonly ControlPointChanged: RBXScriptSignal<() => void>;
}

interface GuiService extends Instance {
	AutoSelectGuiEnabled: boolean;
	GuiNavigationEnabled: boolean;
	/** @deprecated */
	IsModalDialog: boolean;
	/** @deprecated */
	IsWindows: boolean;
	MenuIsOpen: boolean;
	PreferredTextSize: Enum.PreferredTextSize;
	SelectedObject: GuiObject;
	TopbarInset: Rect;
	TouchControlsEnabled: boolean;
	ViewportDisplaySize: Enum.DisplaySize;
	/** @deprecated */
	AddSelectionParent(selectionName: string, selectionParent: Instance): undefined;
	/** @deprecated */
	AddSelectionTuple(selectionName: string, selections: unknown): undefined;
	CloseInspectMenu(): undefined;
	DismissNotification(notificationId: string): boolean;
	GetEmotesMenuOpen(): boolean;
	GetGameplayPausedNotificationEnabled(): boolean;
	GetGuiInset(): unknown;
	GetInsetArea(screenInsets: Enum.ScreenInsets): Rect;
	GetInspectMenuEnabled(): boolean;
	InspectPlayerFromHumanoidDescription(humanoidDescription: Instance, name: string): undefined;
	InspectPlayerFromUserId(userId: number): undefined;
	IsTenFootInterface(): boolean;
	/** @deprecated */
	RemoveSelectionGroup(selectionName: string): undefined;
	Select(selectionParent: Instance): undefined;
	SendNotification(notificationInfo: unknown): string;
	SetEmotesMenuOpen(isOpen: boolean): undefined;
	SetGameplayPausedNotificationEnabled(enabled: boolean): undefined;
	SetInspectMenuEnabled(enabled: boolean): undefined;
	readonly MenuClosed: RBXScriptSignal<() => void>;
	readonly MenuOpened: RBXScriptSignal<() => void>;
}

interface GuidRegistryService extends Instance {
}

interface HandRigDescription extends Instance {
	Index1: Instance;
	Index1TposeAdjustment: CFrame;
	Index2: Instance;
	Index2TposeAdjustment: CFrame;
	Index3: Instance;
	Index3TposeAdjustment: CFrame;
	IndexRange: Vector3;
	IndexSize: number;
	Middle1: Instance;
	Middle1TposeAdjustment: CFrame;
	Middle2: Instance;
	Middle2TposeAdjustment: CFrame;
	Middle3: Instance;
	Middle3TposeAdjustment: CFrame;
	MiddleRange: Vector3;
	MiddleSize: number;
	Pinky1: Instance;
	Pinky1TposeAdjustment: CFrame;
	Pinky2: Instance;
	Pinky2TposeAdjustment: CFrame;
	Pinky3: Instance;
	Pinky3TposeAdjustment: CFrame;
	PinkyRange: Vector3;
	PinkySize: number;
	Ring1: Instance;
	Ring1TposeAdjustment: CFrame;
	Ring2: Instance;
	Ring2TposeAdjustment: CFrame;
	Ring3: Instance;
	Ring3TposeAdjustment: CFrame;
	RingRange: Vector3;
	RingSize: number;
	Side: Enum.HandRigDescriptionSide;
	Thumb1: Instance;
	Thumb1TposeAdjustment: CFrame;
	Thumb2: Instance;
	Thumb2TposeAdjustment: CFrame;
	Thumb3: Instance;
	Thumb3TposeAdjustment: CFrame;
	ThumbRange: Vector3;
	ThumbSize: number;
	GetFingerControl(fingerIndex: number): Vector3;
	GetFingerTip(fingerIndex: number): Vector3;
	SetFingerControl(fingerIndex: number, control: Vector3): undefined;
	SetFingerTip(fingerIndex: number, point: Vector3): undefined;
}

interface HapticEffect extends Instance {
	Looped: boolean;
	Position: Vector3;
	Radius: number;
	Type: Enum.HapticEffectType;
	Play(): undefined;
	SetWaveformKeys(keys: unknown): undefined;
	Stop(): undefined;
	readonly Ended: RBXScriptSignal<() => void>;
}

interface HapticService extends Instance {
	GetMotor(inputType: Enum.UserInputType, vibrationMotor: Enum.VibrationMotor): unknown;
	IsMotorSupported(inputType: Enum.UserInputType, vibrationMotor: Enum.VibrationMotor): boolean;
	IsVibrationSupported(inputType: Enum.UserInputType): boolean;
	SetMotor(inputType: Enum.UserInputType, vibrationMotor: Enum.VibrationMotor, vibrationValues: unknown): undefined;
}

interface HarmonyService extends Instance {
}

interface HeapProfilerService extends Instance {
	ClientRequestDataAsync(player: Player): string;
	ServerRequestDataAsync(): string;
	readonly OnNewData: RBXScriptSignal<(player: Player, jsonString: buffer, id: number, compressedLength: number, uncompressedLength: number) => void>;
}

interface HeatmapService extends Instance {
}

interface HeightmapImporterService extends Instance {
}

interface HiddenSurfaceRemovalAsset extends Instance {
}

interface Highlight extends Instance {
	Adornee: Instance;
	DepthMode: Enum.HighlightDepthMode;
	Enabled: boolean;
	FillColor: Color3;
	FillTransparency: number;
	OutlineColor: Color3;
	OutlineTransparency: number;
}

/** @deprecated */
interface Hopper extends Instance {
}

interface HttpRbxApiService extends Instance {
	RequestLimitedAsync(requestOptions: unknown, priority?: Enum.ThrottlingPriority, content_type?: Enum.HttpContentType, httpRequestType?: Enum.HttpRequestType): string;
}

interface HttpRequest extends Instance {
}

interface HttpService extends Instance {
	readonly HttpEnabled: boolean;
	CreateWebStreamClient(streamClientType: Enum.WebStreamClientType, requestOptions: unknown): WebStreamClient;
	GenerateGUID(wrapInCurlyBraces?: boolean): string;
	GetSecret(key: string): Secret;
	JSONDecode(input: string): unknown;
	JSONEncode(input: unknown): string;
	UrlEncode(input: string): string;
	GetAsync(url: unknown, nocache?: boolean, headers: unknown): string;
	PostAsync(url: unknown, data: string, content_type?: Enum.HttpContentType, compress?: boolean, headers: unknown): string;
	RequestAsync(requestOptions: unknown): unknown;
}

interface Humanoid extends Instance {
	AutoJumpEnabled: boolean;
	AutoRotate: boolean;
	AutomaticScalingEnabled: boolean;
	BreakJointsOnDeath: boolean;
	CameraOffset: Vector3;
	/** @deprecated */
	CollisionType: Enum.HumanoidCollisionType;
	DisplayDistanceType: Enum.HumanoidDisplayDistanceType;
	DisplayName: string;
	EvaluateStateMachine: boolean;
	FloorMaterial: Enum.Material;
	Health: number;
	HealthDisplayDistance: number;
	HealthDisplayType: Enum.HumanoidHealthDisplayType;
	HipHeight: number;
	Jump: boolean;
	JumpHeight: number;
	JumpPower: number;
	MaxHealth: number;
	MaxSlopeAngle: number;
	MoveDirection: Vector3;
	NameDisplayDistance: number;
	NameOcclusion: Enum.NameOcclusion;
	PlatformStand: boolean;
	RequiresNeck: boolean;
	RigType: Enum.HumanoidRigType;
	RootPart: BasePart;
	SeatPart: BasePart;
	Sit: boolean;
	TargetPoint: Vector3;
	UseJumpPower: boolean;
	WalkSpeed: number;
	WalkToPart: BasePart;
	WalkToPoint: Vector3;
	/** @deprecated */
	maxHealth: number;
	AddAccessory(accessory: Instance): undefined;
	/** @deprecated */
	AddCustomStatus(status: string): boolean;
	/** @deprecated */
	AddStatus(status?: Enum.Status): boolean;
	BuildRigFromAttachments(): undefined;
	ChangeState(state?: Enum.HumanoidStateType): undefined;
	EquipTool(tool: Instance): undefined;
	GetAccessories(): unknown;
	GetAppliedDescription(): HumanoidDescription;
	GetBodyPartR15(part: Instance): Enum.BodyPartR15;
	GetLimb(part: Instance): Enum.Limb;
	GetMoveVelocity(): Vector3;
	/** @deprecated */
	GetPlayingAnimationTracks(): unknown;
	GetState(): Enum.HumanoidStateType;
	GetStateEnabled(state: Enum.HumanoidStateType): boolean;
	/** @deprecated */
	GetStatuses(): unknown;
	/** @deprecated */
	HasCustomStatus(status: string): boolean;
	/** @deprecated */
	HasStatus(status?: Enum.Status): boolean;
	/** @deprecated */
	LoadAnimation(animation: Animation): AnimationTrack;
	Move(moveDirection: Vector3, relativeToCamera?: boolean): undefined;
	MoveTo(location: Vector3, part?: Instance): undefined;
	RemoveAccessories(): undefined;
	/** @deprecated */
	RemoveCustomStatus(status: string): boolean;
	/** @deprecated */
	RemoveStatus(status?: Enum.Status): boolean;
	ReplaceBodyPartR15(bodyPart: Enum.BodyPartR15, part: BasePart): boolean;
	SetStateEnabled(state: Enum.HumanoidStateType, enabled: boolean): undefined;
	TakeDamage(amount: number): undefined;
	UnequipTools(): undefined;
	/** @deprecated */
	loadAnimation(animation: Animation): AnimationTrack;
	/** @deprecated */
	takeDamage(amount: number): undefined;
	/** @deprecated */
	ApplyDescription(humanoidDescription: HumanoidDescription, assetTypeVerification?: Enum.AssetTypeVerification): undefined;
	ApplyDescriptionAsync(humanoidDescription: HumanoidDescription, assetTypeVerification?: Enum.AssetTypeVerification): undefined;
	/** @deprecated */
	ApplyDescriptionReset(humanoidDescription: HumanoidDescription, assetTypeVerification?: Enum.AssetTypeVerification): undefined;
	ApplyDescriptionResetAsync(humanoidDescription: HumanoidDescription, assetTypeVerification?: Enum.AssetTypeVerification): undefined;
	/** @deprecated */
	PlayEmote(emoteName: string): boolean;
	PlayEmoteAsync(emoteName: string): boolean;
	/** @deprecated */
	readonly AnimationPlayed: RBXScriptSignal<(animationTrack: AnimationTrack) => void>;
	readonly ApplyDescriptionFinished: RBXScriptSignal<(description: HumanoidDescription) => void>;
	readonly Climbing: RBXScriptSignal<(speed: number) => void>;
	/** @deprecated */
	readonly CustomStatusAdded: RBXScriptSignal<(status: string) => void>;
	/** @deprecated */
	readonly CustomStatusRemoved: RBXScriptSignal<(status: string) => void>;
	readonly Died: RBXScriptSignal<() => void>;
	readonly FallingDown: RBXScriptSignal<(active: boolean) => void>;
	readonly FreeFalling: RBXScriptSignal<(active: boolean) => void>;
	readonly GettingUp: RBXScriptSignal<(active: boolean) => void>;
	readonly HealthChanged: RBXScriptSignal<(health: number) => void>;
	readonly Jumping: RBXScriptSignal<(active: boolean) => void>;
	readonly MoveToFinished: RBXScriptSignal<(reached: boolean) => void>;
	readonly PlatformStanding: RBXScriptSignal<(active: boolean) => void>;
	readonly Ragdoll: RBXScriptSignal<(active: boolean) => void>;
	readonly Running: RBXScriptSignal<(speed: number) => void>;
	readonly Seated: RBXScriptSignal<(active: boolean, currentSeatPart: BasePart) => void>;
	readonly StateChanged: RBXScriptSignal<(old: Enum.HumanoidStateType, _new: Enum.HumanoidStateType) => void>;
	readonly StateEnabledChanged: RBXScriptSignal<(state: Enum.HumanoidStateType, isEnabled: boolean) => void>;
	/** @deprecated */
	readonly StatusAdded: RBXScriptSignal<(status: Enum.Status) => void>;
	/** @deprecated */
	readonly StatusRemoved: RBXScriptSignal<(status: Enum.Status) => void>;
	readonly Strafing: RBXScriptSignal<(active: boolean) => void>;
	readonly Swimming: RBXScriptSignal<(speed: number) => void>;
	readonly Touched: RBXScriptSignal<(touchingPart: BasePart, humanoidPart: BasePart) => void>;
}

interface HumanoidDescription extends Instance {
	BackAccessory: string;
	BodyTypeScale: number;
	ClimbAnimation: number;
	DepthScale: number;
	Face: number;
	FaceAccessory: string;
	FallAnimation: number;
	FrontAccessory: string;
	GraphicTShirt: number;
	HairAccessory: string;
	HatAccessory: string;
	Head: number;
	HeadColor: Color3;
	HeadScale: number;
	HeightScale: number;
	IdleAnimation: number;
	JumpAnimation: number;
	LeftArm: number;
	LeftArmColor: Color3;
	LeftLeg: number;
	LeftLegColor: Color3;
	MoodAnimation: number;
	NeckAccessory: string;
	Pants: number;
	ProportionScale: number;
	RightArm: number;
	RightArmColor: Color3;
	RightLeg: number;
	RightLegColor: Color3;
	RunAnimation: number;
	Shirt: number;
	ShouldersAccessory: string;
	StaticFacialAnimation: boolean;
	SwimAnimation: number;
	Torso: number;
	TorsoColor: Color3;
	UseAvatarSettings: boolean;
	WaistAccessory: string;
	WalkAnimation: number;
	WidthScale: number;
	AddEmote(name: string, assetId: number): undefined;
	GetAccessories(includeRigidAccessories: boolean): unknown;
	GetEmotes(): unknown;
	GetEquippedEmotes(): unknown;
	RemoveEmote(name: string): undefined;
	SetAccessories(accessories: unknown, includeRigidAccessories: boolean): undefined;
	SetEmotes(emotes: unknown): undefined;
	SetEquippedEmotes(equippedEmotes: unknown): undefined;
	readonly EmotesChanged: RBXScriptSignal<(newEmotes: unknown) => void>;
	readonly EquippedEmotesChanged: RBXScriptSignal<(newEquippedEmotes: unknown) => void>;
}

interface HumanoidRigDescription extends Instance {
	Chest: Instance;
	ChestRangeMax: Vector3;
	ChestRangeMin: Vector3;
	ChestSize: number;
	ChestTposeAdjustment: CFrame;
	HeadBase: Instance;
	HeadBaseRangeMax: Vector3;
	HeadBaseRangeMin: Vector3;
	HeadBaseSize: number;
	HeadBaseTposeAdjustment: CFrame;
	LeftAnkle: Instance;
	LeftAnkleRangeMax: Vector3;
	LeftAnkleRangeMin: Vector3;
	LeftAnkleSize: number;
	LeftAnkleTposeAdjustment: CFrame;
	LeftClavicle: Instance;
	LeftClavicleRangeMax: Vector3;
	LeftClavicleRangeMin: Vector3;
	LeftClavicleSize: number;
	LeftClavicleTposeAdjustment: CFrame;
	LeftElbow: Instance;
	LeftElbowRangeMax: Vector3;
	LeftElbowRangeMin: Vector3;
	LeftElbowSize: number;
	LeftElbowTposeAdjustment: CFrame;
	LeftHip: Instance;
	LeftHipRangeMax: Vector3;
	LeftHipRangeMin: Vector3;
	LeftHipSize: number;
	LeftHipTposeAdjustment: CFrame;
	LeftKnee: Instance;
	LeftKneeRangeMax: Vector3;
	LeftKneeRangeMin: Vector3;
	LeftKneeSize: number;
	LeftKneeTposeAdjustment: CFrame;
	LeftShoulder: Instance;
	LeftShoulderRangeMax: Vector3;
	LeftShoulderRangeMin: Vector3;
	LeftShoulderSize: number;
	LeftShoulderTposeAdjustment: CFrame;
	LeftToes: Instance;
	LeftToesRangeMax: Vector3;
	LeftToesRangeMin: Vector3;
	LeftToesSize: number;
	LeftToesTposeAdjustment: CFrame;
	LeftWrist: Instance;
	LeftWristRangeMax: Vector3;
	LeftWristRangeMin: Vector3;
	LeftWristSize: number;
	LeftWristTposeAdjustment: CFrame;
	Neck: Instance;
	NeckRangeMax: Vector3;
	NeckRangeMin: Vector3;
	NeckSize: number;
	NeckTposeAdjustment: CFrame;
	Pelvis: Instance;
	PelvisRangeMax: Vector3;
	PelvisRangeMin: Vector3;
	PelvisSize: number;
	PelvisTposeAdjustment: CFrame;
	RightAnkle: Instance;
	RightAnkleRangeMax: Vector3;
	RightAnkleRangeMin: Vector3;
	RightAnkleSize: number;
	RightAnkleTposeAdjustment: CFrame;
	RightClavicle: Instance;
	RightClavicleRangeMax: Vector3;
	RightClavicleRangeMin: Vector3;
	RightClavicleSize: number;
	RightClavicleTposeAdjustment: CFrame;
	RightElbow: Instance;
	RightElbowRangeMax: Vector3;
	RightElbowRangeMin: Vector3;
	RightElbowSize: number;
	RightElbowTposeAdjustment: CFrame;
	RightHip: Instance;
	RightHipRangeMax: Vector3;
	RightHipRangeMin: Vector3;
	RightHipSize: number;
	RightHipTposeAdjustment: CFrame;
	RightKnee: Instance;
	RightKneeRangeMax: Vector3;
	RightKneeRangeMin: Vector3;
	RightKneeSize: number;
	RightKneeTposeAdjustment: CFrame;
	RightShoulder: Instance;
	RightShoulderRangeMax: Vector3;
	RightShoulderRangeMin: Vector3;
	RightShoulderSize: number;
	RightShoulderTposeAdjustment: CFrame;
	RightToes: Instance;
	RightToesRangeMax: Vector3;
	RightToesRangeMin: Vector3;
	RightToesSize: number;
	RightToesTposeAdjustment: CFrame;
	RightWrist: Instance;
	RightWristRangeMax: Vector3;
	RightWristRangeMin: Vector3;
	RightWristSize: number;
	RightWristTposeAdjustment: CFrame;
	Root: Instance;
	RootRangeMax: Vector3;
	RootRangeMin: Vector3;
	RootSize: number;
	RootTposeAdjustment: CFrame;
	Waist: Instance;
	WaistRangeMax: Vector3;
	WaistRangeMin: Vector3;
	WaistSize: number;
	WaistTposeAdjustment: CFrame;
	GetJointFromName(name: string): Instance;
	GetJointNames(): unknown;
	GetR15JointNames(): unknown;
	GetR6JointNames(): unknown;
}

interface IKControl extends Instance {
	ChainRoot: Instance;
	Enabled: boolean;
	EndEffector: Instance;
	EndEffectorOffset: CFrame;
	Offset: CFrame;
	Pole: Instance;
	Priority: number;
	SmoothTime: number;
	Target: Instance;
	Type: Enum.IKControlType;
	Weight: number;
	GetChainCount(): number;
	GetChainLength(): number;
	GetNodeLocalCFrame(index: number): CFrame;
	GetNodeWorldCFrame(index: number): CFrame;
	GetRawFinalTarget(): CFrame;
	GetSmoothedFinalTarget(): CFrame;
}

interface ILegacyStudioBridge extends Instance {
}

interface LegacyStudioBridge extends ILegacyStudioBridge {
}

interface IXPService extends Instance {
}

interface ImportSession extends Instance {
	readonly UploadComplete: RBXScriptSignal<(results: unknown) => void>;
	readonly UploadProgress: RBXScriptSignal<(progressRatio: number) => void>;
}

interface AssetImportSession extends ImportSession {
}

interface IncrementalPatchBuilder extends Instance {
	AddPathsToBundle: boolean;
	BuildDebouncePeriod: number;
	HighCompression: boolean;
	SerializePatch: boolean;
	UseFileLevelCompressionInsteadOfChunk: boolean;
	ZstdCompression: boolean;
}

interface InputAction extends Instance {
	Enabled: boolean;
	Type: Enum.InputActionType;
	Fire(state: unknown): undefined;
	GetState(): unknown;
	readonly Pressed: RBXScriptSignal<() => void>;
	readonly Released: RBXScriptSignal<() => void>;
	readonly StateChanged: RBXScriptSignal<(value: unknown) => void>;
}

interface InputBinding extends Instance {
	Backward: Enum.KeyCode;
	ClampMagnitudeToOne: boolean;
	Down: Enum.KeyCode;
	Forward: Enum.KeyCode;
	KeyCode: Enum.KeyCode;
	Left: Enum.KeyCode;
	PointerIndex: number;
	PressedThreshold: number;
	PrimaryModifier: Enum.KeyCode;
	ReleasedThreshold: number;
	ResponseCurve: number;
	Right: Enum.KeyCode;
	Scale: number;
	SecondaryModifier: Enum.KeyCode;
	UIButton: GuiButton;
	Up: Enum.KeyCode;
	Vector2Scale: Vector2;
	Vector3Scale: Vector3;
}

interface InputContext extends Instance {
	Enabled: boolean;
	Priority: number;
	Sink: boolean;
}

interface InputObject extends Instance {
	Delta: Vector3;
	KeyCode: Enum.KeyCode;
	Position: Vector3;
	UserInputState: Enum.UserInputState;
	UserInputType: Enum.UserInputType;
	IsModifierKeyDown(modifierKey: Enum.ModifierKey): boolean;
}

interface InsertService extends Instance {
	/** @deprecated */
	AllowInsertFreeModels: boolean;
	/** @deprecated */
	ApproveAssetId(assetId: number): undefined;
	/** @deprecated */
	ApproveAssetVersionId(assetVersionId: number): undefined;
	/** @deprecated */
	Insert(instance: Instance): undefined;
	CreateMeshPartAsync(meshId: ContentId, collisionFidelity: Enum.CollisionFidelity, renderFidelity: Enum.RenderFidelity): MeshPart;
	/** @deprecated */
	GetBaseCategories(): unknown;
	/** @deprecated */
	GetBaseSets(): unknown;
	/** @deprecated */
	GetCollection(categoryId: number): unknown;
	/** @deprecated */
	GetFreeDecals(searchText: string, pageNum: number): unknown;
	GetFreeDecalsAsync(searchText: string, pageNum: number): unknown;
	/** @deprecated */
	GetFreeModels(searchText: string, pageNum: number): unknown;
	GetFreeModelsAsync(searchText: string, pageNum: number): unknown;
	GetLatestAssetVersionAsync(assetId: number): number;
	/** @deprecated */
	GetUserCategories(userId: number): unknown;
	/** @deprecated */
	GetUserSets(userId: number): unknown;
	LoadAsset(assetId: number): Instance;
	LoadAssetVersion(assetVersionId: number): Instance;
	/** @deprecated */
	loadAsset(assetId: number): Instance;
}

interface InstanceExtensionsService extends Instance {
}

interface InstanceFileSyncService extends Instance {
	GetAllInstances(): Instances;
	GetStatus(instance: Instance): Enum.InstanceFileSyncStatus;
	GetSyncedInstance(filePath: string): Instance;
	readonly StatusChanged: RBXScriptSignal<(instance: Instance, status: Enum.InstanceFileSyncStatus) => void>;
}

interface JointInstance extends Instance {
	Active: boolean;
	C0: CFrame;
	C1: CFrame;
	Enabled: boolean;
	Part0: BasePart;
	Part1: BasePart;
}

interface DynamicRotate extends JointInstance {
	BaseAngle: number;
}

/** @deprecated */
interface RotateP extends DynamicRotate {
}

/** @deprecated */
interface RotateV extends DynamicRotate {
}

/** @deprecated */
interface Glue extends JointInstance {
	F0: Vector3;
	F1: Vector3;
	F2: Vector3;
	F3: Vector3;
}

/** @deprecated */
interface ManualSurfaceJointInstance extends JointInstance {
}

/** @deprecated */
interface ManualGlue extends ManualSurfaceJointInstance {
}

/** @deprecated */
interface ManualWeld extends ManualSurfaceJointInstance {
}

interface Motor extends JointInstance {
	CurrentAngle: number;
	DesiredAngle: number;
	MaxVelocity: number;
	SetDesiredAngle(value: number): undefined;
}

interface Motor6D extends Motor {
}

/** @deprecated */
interface Rotate extends JointInstance {
}

/** @deprecated */
interface Snap extends JointInstance {
}

interface VelocityMotor extends JointInstance {
	CurrentAngle: number;
	DesiredAngle: number;
	Hole: Hole;
	MaxVelocity: number;
}

interface Weld extends JointInstance {
}

/** @deprecated */
interface JointsService extends Instance {
	ClearJoinAfterMoveJoints(): undefined;
	CreateJoinAfterMoveJoints(): undefined;
	SetJoinAfterMoveInstance(joinInstance: Instance): undefined;
	SetJoinAfterMoveTarget(joinTarget: Instance): undefined;
	ShowPermissibleJoints(): undefined;
}

interface KeyboardService extends Instance {
}

interface Keyframe extends Instance {
	Time: number;
	AddMarker(marker: Instance): undefined;
	AddPose(pose: Instance): undefined;
	GetMarkers(): Instances;
	GetPoses(): Instances;
	RemoveMarker(marker: Instance): undefined;
	RemovePose(pose: Instance): undefined;
}

interface KeyframeMarker extends Instance {
	Value: string;
}

interface KeyframeSequenceProvider extends Instance {
	/** @deprecated */
	GetKeyframeSequence(assetId: ContentId): Instance;
	/** @deprecated */
	GetKeyframeSequenceById(assetId: number, useCache: boolean): Instance;
	RegisterActiveKeyframeSequence(keyframeSequence: Instance): ContentId;
	RegisterKeyframeSequence(keyframeSequence: Instance): ContentId;
	/** @deprecated */
	GetAnimations(userId: number): Instance;
	GetAnimationsAsync(userId: number): Instance;
	GetKeyframeSequenceAsync(assetId: ContentId): Instance;
}

interface LSPFileSyncService extends Instance {
}

interface LanguageService extends Instance {
	GetCapabilitiesUsedInPackageAsync(instances: Instances): unknown;
}

interface Light extends Instance {
	Brightness: number;
	Color: Color3;
	Enabled: boolean;
	Shadows: boolean;
}

interface PointLight extends Light {
	Range: number;
}

interface SpotLight extends Light {
	Angle: number;
	Face: Enum.NormalId;
	Range: number;
}

interface SurfaceLight extends Light {
	Angle: number;
	Face: Enum.NormalId;
	Range: number;
}

interface Lighting extends Instance {
	Ambient: Color3;
	Brightness: number;
	ClockTime: number;
	ColorShift_Bottom: Color3;
	ColorShift_Top: Color3;
	EnvironmentDiffuseScale: number;
	EnvironmentSpecularScale: number;
	ExposureCompensation: number;
	FogColor: Color3;
	FogEnd: number;
	FogStart: number;
	GeographicLatitude: number;
	GlobalShadows: boolean;
	readonly LightingStyle: Enum.LightingStyle;
	OutdoorAmbient: Color3;
	/** @deprecated */
	Outlines: boolean;
	readonly PrioritizeLightingQuality: boolean;
	/** @deprecated */
	ShadowColor: Color3;
	ShadowSoftness: number;
	TimeOfDay: string;
	GetMinutesAfterMidnight(): number;
	GetMoonDirection(): Vector3;
	GetMoonPhase(): number;
	GetSunDirection(): Vector3;
	SetMinutesAfterMidnight(minutes: number): undefined;
	/** @deprecated */
	getMinutesAfterMidnight(): number;
	/** @deprecated */
	setMinutesAfterMidnight(minutes: number): undefined;
	readonly LightingChanged: RBXScriptSignal<(skyChanged: boolean) => void>;
}

interface LinkingService extends Instance {
}

interface LiveScriptingService extends Instance {
}

interface LiveSyncService extends Instance {
	HasSyncedInstances: boolean;
	GetSyncState(instance: Instance): unknown;
	readonly SyncStatusChanged: RBXScriptSignal<(instance: Instance) => void>;
}

interface LocalStorageService extends Instance {
}

interface AppStorageService extends LocalStorageService {
}

interface UserStorageService extends LocalStorageService {
}

interface LocalizationService extends Instance {
	RobloxLocaleId: string;
	SystemLocaleId: string;
	GetCorescriptLocalizations(): Instances;
	GetTableEntries(instance?: Instance): unknown;
	GetTranslatorForPlayer(player: Instance): Instance;
	GetCountryRegionForPlayerAsync(player: Instance): string;
	GetTranslatorForLocaleAsync(locale: string): Instance;
	GetTranslatorForPlayerAsync(player: Instance): Instance;
}

interface LocalizationTable extends Instance {
	SourceLocaleId: string;
	/** @deprecated */
	GetContents(): string;
	GetEntries(): unknown;
	/** @deprecated */
	GetString(targetLocaleId: string, key: string): string;
	GetTranslator(localeId: string): Instance;
	RemoveEntry(key: string, source: string, context: string): undefined;
	RemoveEntryValue(key: string, source: string, context: string, localeId: string): undefined;
	/** @deprecated */
	RemoveKey(key: string): undefined;
	RemoveTargetLocale(localeId: string): undefined;
	/** @deprecated */
	SetContents(contents: string): undefined;
	SetEntries(entries: unknown): undefined;
	/** @deprecated */
	SetEntry(key: string, targetLocaleId: string, text: string): undefined;
	SetEntryContext(key: string, source: string, context: string, newContext: string): undefined;
	SetEntryExample(key: string, source: string, context: string, example: string): undefined;
	SetEntryKey(key: string, source: string, context: string, newKey: string): undefined;
	SetEntrySource(key: string, source: string, context: string, newSource: string): undefined;
	SetEntryValue(key: string, source: string, context: string, localeId: string, text: string): undefined;
}

interface CloudLocalizationTable extends LocalizationTable {
}

interface LodDataEntity extends Instance {
}

interface LodDataService extends Instance {
}

interface LogReporterService extends Instance {
}

interface LogService extends Instance {
	ClearOutput(): undefined;
	GetLogHistory(): unknown;
	readonly MessageOut: RBXScriptSignal<(message: string, messageType: Enum.MessageType) => void>;
}

interface LoginService extends Instance {
}

interface LuaSettings extends Instance {
}

interface LuaSourceContainer extends Instance {
}

interface BaseScript extends LuaSourceContainer {
	Disabled: boolean;
	Enabled: boolean;
	/** @deprecated */
	LinkedSource: ContentId;
	RunContext: Enum.RunContext;
}

interface CoreScript extends BaseScript {
}

interface Script extends BaseScript {
	Source: string;
}

interface LocalScript extends Script {
}

interface ModuleScript extends LuaSourceContainer {
	/** @deprecated */
	LinkedSource: ContentId;
	Source: string;
}

interface LuaWebService extends Instance {
}

interface LuauScriptAnalyzerService extends Instance {
}

interface MLModelDeliveryService extends Instance {
}

interface MLService extends Instance {
	CreateSessionAsync(assetId: string): MLSession;
}

interface MakeupDescription extends Instance {
	AssetId: number;
	Instance: Instance;
	MakeupType: Enum.MakeupType;
	Order: number;
	GetAppliedInstance(): Instance;
}

interface MarkerCurve extends Instance {
	Length: number;
	GetMarkerAtIndex(index: number): unknown;
	GetMarkers(): unknown;
	InsertMarkerAtTime(time: number, marker: string): unknown;
	RemoveMarkerAtIndex(startingIndex: number, count?: number): number;
}

interface MarketplaceService extends Instance {
	PromptBulkPurchase(player: Player, lineItems: unknown, options: unknown): undefined;
	PromptBundlePurchase(player: Instance, bundleId: number): undefined;
	PromptCancelSubscription(user: Player, subscriptionId: string): undefined;
	PromptGamePassPurchase(player: Instance, gamePassId: number): undefined;
	PromptPremiumPurchase(player: Instance): undefined;
	PromptProductPurchase(player: Instance, productId: number, equipIfPurchased?: boolean, currencyType?: Enum.CurrencyType): undefined;
	PromptPurchase(player: Instance, assetId: number, equipIfPurchased?: boolean, currencyType?: Enum.CurrencyType): undefined;
	PromptSubscriptionPurchase(user: Player, subscriptionId: string): undefined;
	GetDeveloperProductsAsync(): Instance;
	/** @deprecated */
	GetProductInfo(assetId: number, infoType?: Enum.InfoType): unknown;
	GetProductInfoAsync(assetId: number, infoType?: Enum.InfoType): unknown;
	GetSubscriptionProductInfoAsync(subscriptionId: string): unknown;
	GetUserSubscriptionDetailsAsync(user: Player, subscriptionId: string): unknown;
	GetUserSubscriptionPaymentHistoryAsync(user: Player, subscriptionId: string): unknown;
	GetUserSubscriptionStatusAsync(user: Player, subscriptionId: string): unknown;
	GetUsersPriceLevelsAsync(userIds: unknown): unknown;
	/** @deprecated */
	PlayerOwnsAsset(player: Instance, assetId: number): boolean;
	PlayerOwnsAssetAsync(player: Instance, assetId: number): boolean;
	/** @deprecated */
	PlayerOwnsBundle(player: Player, bundleId: number): boolean;
	PlayerOwnsBundleAsync(player: Player, bundleId: number): boolean;
	RankProductsAsync(productIdentifiers: unknown): unknown;
	RecommendTopProductsAsync(infoTypes: unknown): unknown;
	UserOwnsGamePassAsync(userId: number, gamePassId: number): boolean;
	readonly PromptBulkPurchaseFinished: RBXScriptSignal<(player: Instance, status: Enum.MarketplaceBulkPurchasePromptStatus, results: unknown) => void>;
	readonly PromptBundlePurchaseFinished: RBXScriptSignal<(player: Instance, bundleId: number, wasPurchased: boolean) => void>;
	readonly PromptGamePassPurchaseFinished: RBXScriptSignal<(player: Instance, gamePassId: number, wasPurchased: boolean) => void>;
	readonly PromptPremiumPurchaseFinished: RBXScriptSignal<() => void>;
	readonly PromptProductPurchaseFinished: RBXScriptSignal<(userId: number, productId: number, isPurchased: boolean) => void>;
	readonly PromptPurchaseFinished: RBXScriptSignal<(player: Instance, assetId: number, isPurchased: boolean) => void>;
	readonly PromptSubscriptionPurchaseFinished: RBXScriptSignal<(user: Player, subscriptionId: string, didTryPurchasing: boolean) => void>;
	ProcessReceipt?: (receiptInfo: unknown) => Enum.ProductPurchaseDecision;
}

interface MatchmakingService extends Instance {
	GetServerAttribute(name: string): unknown;
	InitializeServerAttributesForStudio(serverAttributes: unknown): unknown;
	SetServerAttribute(name: string, value: unknown): unknown;
}

interface MaterialGenerationService extends Instance {
}

interface MaterialService extends Instance {
	GetBaseMaterialOverride(material: Enum.Material): string;
	GetMaterialVariant(material: Enum.Material, name: string): MaterialVariant;
	SetBaseMaterialOverride(material: Enum.Material, name: string): undefined;
}

interface MaterialVariant extends Instance {
	AlphaMode: Enum.AlphaMode;
	BaseMaterial: Enum.Material;
	ColorMap: ContentId;
	ColorMapContent: Content;
	CustomPhysicalProperties: PhysicalProperties;
	EmissiveMaskContent: Content;
	EmissiveStrength: number;
	EmissiveTint: Color3;
	MaterialPattern: Enum.MaterialPattern;
	MetalnessMap: ContentId;
	MetalnessMapContent: Content;
	NormalMap: ContentId;
	NormalMapContent: Content;
	RoughnessMap: ContentId;
	RoughnessMapContent: Content;
	StudsPerTile: number;
}

interface MemStorageConnection extends Instance {
	Disconnect(): undefined;
}

interface MemStorageService extends Instance {
}

interface MemoryStoreHashMap extends Instance {
	GetAsync(key: string): unknown;
	ListItemsAsync(count: number): MemoryStoreHashMapPages;
	RemoveAsync(key: string): undefined;
	SetAsync(key: string, value: unknown, expiration: number): boolean;
	UpdateAsync(key: string, transformFunction: Function, expiration: number): unknown;
}

interface MemoryStoreQueue extends Instance {
	AddAsync(value: unknown, expiration: number, priority?: number): undefined;
	GetSizeAsync(excludeInvisible?: boolean): number;
	ReadAsync(count: number, allOrNothing?: boolean, waitTimeout?: number): unknown;
	RemoveAsync(id: string): undefined;
}

interface MemoryStoreService extends Instance {
	GetHashMap(name: string): MemoryStoreHashMap;
	GetQueue(name: string, invisibilityTimeout?: number): MemoryStoreQueue;
	GetSortedMap(name: string): MemoryStoreSortedMap;
}

interface MemoryStoreSortedMap extends Instance {
	GetAsync(key: string): unknown;
	GetRangeAsync(direction: Enum.SortDirection, count: number, exclusiveLowerBound: unknown, exclusiveUpperBound: unknown): unknown;
	GetSizeAsync(): number;
	RemoveAsync(key: string): undefined;
	SetAsync(key: string, value: unknown, expiration: number, sortKey: unknown): boolean;
	UpdateAsync(key: string, transformFunction: Function, expiration: number): unknown;
}

/** @deprecated */
interface Message extends Instance {
	Text: string;
}

/** @deprecated */
interface Hint extends Message {
}

interface MessageBusConnection extends Instance {
}

interface MessageBusService extends Instance {
}

interface MessagingService extends Instance {
	PublishAsync(topic: string, message: unknown): undefined;
	SubscribeAsync(topic: string, callback: Function): RBXScriptConnection;
}

interface MetaBreakpoint extends Instance {
}

interface MetaBreakpointContext extends Instance {
}

interface MetaBreakpointManager extends Instance {
}

interface MicroProfilerService extends Instance {
}

interface ModerationService extends Instance {
	BindReviewableContentEventProcessor(priority: number, callback: Function): RBXScriptConnection;
	CreateReviewableContentKey(content: Content): string;
	CreateReviewableContentAsync(config: unknown): string;
	InternalRequestReviewableContentReviewAsync(config: unknown): undefined;
}

interface Mouse extends Instance {
	Hit: CFrame;
	Icon: ContentId;
	IconContent: Content;
	Origin: CFrame;
	Target: BasePart;
	TargetFilter: Instance;
	TargetSurface: Enum.NormalId;
	UnitRay: Ray;
	ViewSizeX: number;
	ViewSizeY: number;
	X: number;
	Y: number;
	/** @deprecated */
	target: BasePart;
	readonly Button1Down: RBXScriptSignal<() => void>;
	readonly Button1Up: RBXScriptSignal<() => void>;
	readonly Button2Down: RBXScriptSignal<() => void>;
	readonly Button2Up: RBXScriptSignal<() => void>;
	readonly Idle: RBXScriptSignal<() => void>;
	/** @deprecated */
	readonly KeyDown: RBXScriptSignal<(key: string) => void>;
	/** @deprecated */
	readonly KeyUp: RBXScriptSignal<(key: string) => void>;
	readonly Move: RBXScriptSignal<() => void>;
	readonly WheelBackward: RBXScriptSignal<() => void>;
	readonly WheelForward: RBXScriptSignal<() => void>;
	/** @deprecated */
	readonly keyDown: RBXScriptSignal<(key: string) => void>;
}

interface PlayerMouse extends Mouse {
}

interface PluginMouse extends Mouse {
	readonly DragEnter: RBXScriptSignal<(instances: Instances) => void>;
}

interface MouseService extends Instance {
}

interface MultipleDocumentInterfaceInstance extends Instance {
}

interface NetworkMarker extends Instance {
	readonly Received: RBXScriptSignal<() => void>;
}

interface NetworkPeer extends Instance {
	SetOutgoingKBPSLimit(limit: number): undefined;
}

interface NetworkClient extends NetworkPeer {
	readonly ConnectionAccepted: RBXScriptSignal<(peer: string, replicator: Instance) => void>;
	readonly ConnectionFailed: RBXScriptSignal<(peer: string, code: number) => void>;
}

interface NetworkServer extends NetworkPeer {
	EncryptStringForPlayerId(toEncrypt: string, playerId: number): string;
}

interface NetworkReplicator extends Instance {
	GetPlayer(): Instance;
}

interface ClientReplicator extends NetworkReplicator {
}

interface ServerReplicator extends NetworkReplicator {
}

interface NetworkSettings extends Instance {
	readonly HttpProxyEnabled: boolean;
	readonly HttpProxyURL: string;
	IncomingReplicationLag: number;
	PrintJoinSizeBreakdown: boolean;
	PrintPhysicsErrors: boolean;
	PrintStreamInstanceQuota: boolean;
	RandomizeJoinInstanceOrder: boolean;
	RenderStreamedRegions: boolean;
	ShowActiveAnimationAsset: boolean;
}

interface NoCollisionConstraint extends Instance {
	Enabled: boolean;
	Part0: BasePart;
	Part1: BasePart;
}

interface Noise extends Instance {
}

interface NotificationService extends Instance {
	readonly Roblox17sConnectionChanged: RBXScriptSignal<(connectionName: string, connectionState: Enum.ConnectionState, namespaceSequenceNumbers: string) => void>;
	readonly Roblox17sEventReceived: RBXScriptSignal<(eventData: unknown) => void>;
}

interface OmniRecommendationsService extends Instance {
}

/** @deprecated */
interface OpenCloudApiV1 extends Instance {
	/** @deprecated */
	CreateModel(name: string): OpenCloudModel;
	/** @deprecated */
	CreateUserNotificationAsync(user: string, userNotification: OpenCloudModel): OpenCloudModel;
}

/** @deprecated */
interface OpenCloudService extends Instance {
	/** @deprecated */
	GetApiV1(): OpenCloudApiV1;
	/** @deprecated */
	InvokeAsync(version: string, methodName: string, arguments: unknown, headers?: unknown): unknown;
}

interface OperationGraph extends Instance {
}

interface PVInstance extends Instance {
	GetPivot(): CFrame;
	PivotTo(targetCFrame: CFrame): undefined;
}

interface BasePart extends PVInstance {
	Anchored: boolean;
	AssemblyAngularVelocity: Vector3;
	AssemblyCenterOfMass: Vector3;
	AssemblyLinearVelocity: Vector3;
	AssemblyMass: number;
	AssemblyRootPart: BasePart;
	AudioCanCollide: boolean;
	BackSurface: Enum.SurfaceType;
	BottomSurface: Enum.SurfaceType;
	BrickColor: BrickColor;
	CFrame: CFrame;
	CanCollide: boolean;
	CanQuery: boolean;
	CanTouch: boolean;
	CastShadow: boolean;
	CenterOfMass: Vector3;
	CollisionGroup: string;
	/** @deprecated */
	CollisionGroupId: number;
	Color: Color3;
	CurrentPhysicalProperties: PhysicalProperties;
	CustomPhysicalProperties: PhysicalProperties;
	EnableFluidForces: boolean;
	ExtentsCFrame: CFrame;
	ExtentsSize: Vector3;
	FrontSurface: Enum.SurfaceType;
	LeftSurface: Enum.SurfaceType;
	Locked: boolean;
	Mass: number;
	Massless: boolean;
	Material: Enum.Material;
	MaterialVariant: string;
	PivotOffset: CFrame;
	Reflectance: number;
	ResizeIncrement: number;
	ResizeableFaces: Faces;
	RightSurface: Enum.SurfaceType;
	RootPriority: number;
	Rotation: Vector3;
	Size: Vector3;
	/** @deprecated */
	SpecificGravity: number;
	TopSurface: Enum.SurfaceType;
	Transparency: number;
	/** @deprecated */
	brickColor: BrickColor;
	AngularAccelerationToTorque(angAcceleration: Vector3, angVelocity?: Vector3): Vector3;
	ApplyAngularImpulse(impulse: Vector3): undefined;
	ApplyImpulse(impulse: Vector3): undefined;
	ApplyImpulseAtPosition(impulse: Vector3, position: Vector3): undefined;
	/** @deprecated */
	BreakJoints(): undefined;
	CanCollideWith(part: BasePart): boolean;
	CanSetNetworkOwnership(): unknown;
	GetClosestPointOnSurface(position: Vector3): Vector3;
	GetConnectedParts(recursive?: boolean): Instances;
	GetJoints(): Instances;
	GetMass(): number;
	GetNetworkOwner(): Instance;
	GetNetworkOwnershipAuto(): boolean;
	GetNoCollisionConstraints(): Instances;
	/** @deprecated */
	GetRenderCFrame(): CFrame;
	/** @deprecated */
	GetRootPart(): Instance;
	GetTouchingParts(): Instances;
	GetVelocityAtPosition(position: Vector3): Vector3;
	IsGrounded(): boolean;
	/** @deprecated */
	MakeJoints(): undefined;
	Resize(normalId: Enum.NormalId, deltaAmount: number): boolean;
	SetNetworkOwner(playerInstance?: Player): undefined;
	SetNetworkOwnershipAuto(): undefined;
	TorqueToAngularAcceleration(torque: Vector3, angVelocity?: Vector3): Vector3;
	/** @deprecated */
	breakJoints(): undefined;
	/** @deprecated */
	getMass(): number;
	/** @deprecated */
	makeJoints(): undefined;
	/** @deprecated */
	resize(normalId: Enum.NormalId, deltaAmount: number): boolean;
	IntersectAsync(parts: Instances, collisionfidelity?: Enum.CollisionFidelity, renderFidelity?: Enum.RenderFidelity): Instance;
	SubtractAsync(parts: Instances, collisionfidelity?: Enum.CollisionFidelity, renderFidelity?: Enum.RenderFidelity): Instance;
	UnionAsync(parts: Instances, collisionfidelity?: Enum.CollisionFidelity, renderFidelity?: Enum.RenderFidelity): Instance;
	/** @deprecated */
	readonly LocalSimulationTouched: RBXScriptSignal<(part: BasePart) => void>;
	/** @deprecated */
	readonly OutfitChanged: RBXScriptSignal<() => void>;
	/** @deprecated */
	readonly StoppedTouching: RBXScriptSignal<(otherPart: BasePart) => void>;
	readonly TouchEnded: RBXScriptSignal<(otherPart: BasePart) => void>;
	readonly Touched: RBXScriptSignal<(otherPart: BasePart) => void>;
}

interface CornerWedgePart extends BasePart {
}

interface FormFactorPart extends BasePart {
	/** @deprecated */
	FormFactor: Enum.FormFactor;
}

interface Part extends FormFactorPart {
	Shape: Enum.PartType;
}

/** @deprecated */
interface FlagStand extends Part {
	TeamColor: BrickColor;
	readonly FlagCaptured: RBXScriptSignal<(player: Instance) => void>;
}

interface Platform extends Part {
}

interface Seat extends Part {
	Disabled: boolean;
	Occupant: Humanoid;
	Sit(humanoid: Instance): undefined;
}

/** @deprecated */
interface SkateboardPlatform extends Part {
	Controller: SkateboardController;
	ControllingHumanoid: Humanoid;
	Steer: number;
	StickyWheels: boolean;
	Throttle: number;
	ApplySpecificImpulse(impulseWorld: Vector3): undefined;
	readonly Equipped: RBXScriptSignal<(humanoid: Instance, skateboardController: Instance) => void>;
	readonly MoveStateChanged: RBXScriptSignal<(newState: Enum.MoveState, oldState: Enum.MoveState) => void>;
	readonly Unequipped: RBXScriptSignal<(humanoid: Instance) => void>;
	/** @deprecated */
	readonly equipped: RBXScriptSignal<(humanoid: Instance, skateboardController: Instance) => void>;
	/** @deprecated */
	readonly unequipped: RBXScriptSignal<(humanoid: Instance) => void>;
}

interface SpawnLocation extends Part {
	AllowTeamChangeOnTouch: boolean;
	Duration: number;
	Enabled: boolean;
	Neutral: boolean;
	TeamColor: BrickColor;
}

interface WedgePart extends FormFactorPart {
}

interface Terrain extends BasePart {
	/** @deprecated */
	IsSmooth: boolean;
	MaxExtents: Region3int16;
	WaterColor: Color3;
	WaterReflectance: number;
	WaterTransparency: number;
	WaterWaveSize: number;
	WaterWaveSpeed: number;
	/** @deprecated */
	AutowedgeCell(x: number, y: number, z: number): boolean;
	/** @deprecated */
	AutowedgeCells(region: Region3int16): undefined;
	CellCenterToWorld(x: number, y: number, z: number): Vector3;
	CellCornerToWorld(x: number, y: number, z: number): Vector3;
	Clear(): undefined;
	ClearVoxelsAsync_beta(region: Region3, channelIds: unknown): undefined;
	/** @deprecated */
	ConvertToSmooth(): undefined;
	CopyRegion(region: Region3int16): TerrainRegion;
	CountCells(): number;
	FillBall(center: Vector3, radius: number, material: Enum.Material): undefined;
	FillBlock(cframe: CFrame, size: Vector3, material: Enum.Material): undefined;
	FillCylinder(cframe: CFrame, height: number, radius: number, material: Enum.Material): undefined;
	FillRegion(region: Region3, resolution: number, material: Enum.Material): undefined;
	FillWedge(cframe: CFrame, size: Vector3, material: Enum.Material): undefined;
	/** @deprecated */
	GetCell(x: number, y: number, z: number): unknown;
	GetMaterialColor(material: Enum.Material): Color3;
	/** @deprecated */
	GetWaterCell(x: number, y: number, z: number): unknown;
	IterateVoxelsAsync_beta(region: Region3, resolution: number, channelIds: unknown): TerrainIterateOperation;
	ModifyVoxelsAsync_beta(region: Region3, resolution: number, channelIds: unknown): TerrainModifyOperation;
	PasteRegion(region: TerrainRegion, corner: Vector3int16, pasteEmptyCells: boolean): undefined;
	ReadVoxelChannels(region: Region3, resolution: number, channelIds: unknown): unknown;
	ReadVoxels(region: Region3, resolution: number): unknown;
	ReadVoxelsAsync_beta(region: Region3, resolution: number, channelIds: unknown): TerrainReadOperation;
	ReplaceMaterial(region: Region3, resolution: number, sourceMaterial: Enum.Material, targetMaterial: Enum.Material): undefined;
	/** @deprecated */
	SetCell(x: number, y: number, z: number, material: Enum.CellMaterial, block: Enum.CellBlock, orientation: Enum.CellOrientation): undefined;
	/** @deprecated */
	SetCells(region: Region3int16, material: Enum.CellMaterial, block: Enum.CellBlock, orientation: Enum.CellOrientation): undefined;
	SetMaterialColor(material: Enum.Material, value: Color3): undefined;
	/** @deprecated */
	SetWaterCell(x: number, y: number, z: number, force: Enum.WaterForce, direction: Enum.WaterDirection): undefined;
	WorldToCell(position: Vector3): Vector3;
	WorldToCellPreferEmpty(position: Vector3): Vector3;
	WorldToCellPreferSolid(position: Vector3): Vector3;
	WriteVoxelChannels(region: Region3, resolution: number, channels: unknown): undefined;
	WriteVoxels(region: Region3, resolution: number, materials: unknown, occupancy: unknown): undefined;
	WriteVoxelsAsync_beta(region: Region3, resolution: number, channelIds: unknown): TerrainWriteOperation;
}

interface TriangleMeshPart extends BasePart {
	CollisionFidelity: Enum.CollisionFidelity;
	FluidFidelity: Enum.FluidFidelity;
	MeshSize: Vector3;
}

interface MeshPart extends TriangleMeshPart {
	DoubleSided: boolean;
	readonly MeshContent: Content;
	readonly MeshId: ContentId;
	RenderFidelity: Enum.RenderFidelity;
	TextureContent: Content;
	TextureID: ContentId;
	ApplyMesh(meshPart: Instance): undefined;
}

interface PartOperation extends TriangleMeshPart {
	RenderFidelity: Enum.RenderFidelity;
	SmoothingAngle: number;
	TriangleCount: number;
	UsePartColor: boolean;
	SubstituteGeometry(source: Instance): undefined;
}

interface IntersectOperation extends PartOperation {
}

interface NegateOperation extends PartOperation {
}

interface UnionOperation extends PartOperation {
}

interface TrussPart extends BasePart {
	Style: Enum.Style;
}

interface VehicleSeat extends BasePart {
	AreHingesDetected: number;
	Disabled: boolean;
	HeadsUpDisplay: boolean;
	MaxSpeed: number;
	Occupant: Humanoid;
	Steer: number;
	SteerFloat: number;
	Throttle: number;
	ThrottleFloat: number;
	Torque: number;
	TurnSpeed: number;
	Sit(humanoid: Instance): undefined;
}

interface Camera extends PVInstance {
	CFrame: CFrame;
	CameraSubject: Instance;
	CameraType: Enum.CameraType;
	DiagonalFieldOfView: number;
	FieldOfView: number;
	FieldOfViewMode: Enum.FieldOfViewMode;
	Focus: CFrame;
	HeadLocked: boolean;
	HeadScale: number;
	MaxAxisFieldOfView: number;
	NearPlaneZ: number;
	VRTiltAndRollEnabled: boolean;
	ViewportSize: Vector2;
	/** @deprecated */
	focus: CFrame;
	/** @deprecated */
	GetLargestCutoffDistance(ignoreList: Instances): number;
	/** @deprecated */
	GetPanSpeed(): number;
	GetPartsObscuringTarget(castPoints: unknown, ignoreList: Instances): Instances;
	GetRenderCFrame(): CFrame;
	GetRoll(): number;
	/** @deprecated */
	GetTiltSpeed(): number;
	/** @deprecated */
	Interpolate(endPos: CFrame, endFocus: CFrame, duration: number): undefined;
	/** @deprecated */
	PanUnits(units: number): undefined;
	ScreenPointToRay(x: number, y: number, depth?: number): Ray;
	/** @deprecated */
	SetCameraPanMode(mode?: Enum.CameraPanMode): undefined;
	SetRoll(rollAngle: number): undefined;
	/** @deprecated */
	TiltUnits(units: number): boolean;
	ViewportPointToRay(x: number, y: number, depth?: number): Ray;
	WorldToScreenPoint(worldPoint: Vector3): unknown;
	WorldToViewportPoint(worldPoint: Vector3): unknown;
	ZoomToExtents(boundingBoxCFrame: CFrame, boundingBoxSize: Vector3): undefined;
	readonly InterpolationFinished: RBXScriptSignal<() => void>;
}

interface Model extends PVInstance {
	LevelOfDetail: Enum.ModelLevelOfDetail;
	ModelStreamingMode: Enum.ModelStreamingMode;
	PrimaryPart: BasePart;
	WorldPivot: CFrame;
	AddPersistentPlayer(playerInstance?: Player): undefined;
	/** @deprecated */
	BreakJoints(): undefined;
	GetBoundingBox(): unknown;
	GetExtentsSize(): Vector3;
	/** @deprecated */
	GetModelCFrame(): CFrame;
	/** @deprecated */
	GetModelSize(): Vector3;
	GetPersistentPlayers(): Instances;
	/** @deprecated */
	GetPrimaryPartCFrame(): CFrame;
	GetScale(): number;
	/** @deprecated */
	MakeJoints(): undefined;
	MoveTo(position: Vector3): undefined;
	RemovePersistentPlayer(playerInstance?: Player): undefined;
	/** @deprecated */
	ResetOrientationToIdentity(): undefined;
	ScaleTo(newScaleFactor: number): undefined;
	/** @deprecated */
	SetIdentityOrientation(): undefined;
	/** @deprecated */
	SetPrimaryPartCFrame(cframe: CFrame): undefined;
	TranslateBy(delta: Vector3): undefined;
	/** @deprecated */
	breakJoints(): undefined;
	/** @deprecated */
	makeJoints(): undefined;
	/** @deprecated */
	move(location: Vector3): undefined;
	/** @deprecated */
	moveTo(location: Vector3): undefined;
}

interface Actor extends Model {
	BindToMessage(topic: string, _function: Function): RBXScriptConnection;
	BindToMessageParallel(topic: string, _function: Function): RBXScriptConnection;
	SendMessage(topic: string, message: unknown): undefined;
}

interface BackpackItem extends Model {
	TextureContent: Content;
	TextureId: ContentId;
}

/** @deprecated */
interface HopperBin extends BackpackItem {
	Active: boolean;
	BinType: Enum.BinType;
	readonly Deselected: RBXScriptSignal<() => void>;
	readonly Selected: RBXScriptSignal<(mouse: Instance) => void>;
}

interface Tool extends BackpackItem {
	CanBeDropped: boolean;
	Enabled: boolean;
	Grip: CFrame;
	ManualActivationOnly: boolean;
	RequiresHandle: boolean;
	ToolTip: string;
	Activate(): undefined;
	Deactivate(): undefined;
	readonly Activated: RBXScriptSignal<() => void>;
	readonly Deactivated: RBXScriptSignal<() => void>;
	readonly Equipped: RBXScriptSignal<(mouse: Mouse) => void>;
	readonly Unequipped: RBXScriptSignal<() => void>;
}

/** @deprecated */
interface Flag extends Tool {
	TeamColor: BrickColor;
}

/** @deprecated */
interface Status extends Model {
}

interface WorldRoot extends Model {
	ArePartsTouchingOthers(partList: Instances, overlapIgnored?: number): boolean;
	Blockcast(cframe: CFrame, size: Vector3, direction: Vector3, params?: RaycastParams): RaycastResult?;
	BulkMoveTo(partList: Instances, cframeList: unknown, eventMode?: Enum.BulkMoveMode): undefined;
	/** @deprecated */
	FindPartOnRay(ray: Ray, ignoreDescendantsInstance?: Instance, terrainCellsAreCubes?: boolean, ignoreWater?: boolean): unknown;
	/** @deprecated */
	FindPartOnRayWithIgnoreList(ray: Ray, ignoreDescendantsTable: Instances, terrainCellsAreCubes?: boolean, ignoreWater?: boolean): unknown;
	/** @deprecated */
	FindPartOnRayWithWhitelist(ray: Ray, whitelistDescendantsTable: Instances, ignoreWater?: boolean): unknown;
	/** @deprecated */
	FindPartsInRegion3(region: Region3, ignoreDescendantsInstance?: Instance, maxParts?: number): Instances;
	/** @deprecated */
	FindPartsInRegion3WithIgnoreList(region: Region3, ignoreDescendantsTable: Instances, maxParts?: number): Instances;
	/** @deprecated */
	FindPartsInRegion3WithWhiteList(region: Region3, whitelistDescendantsTable: Instances, maxParts?: number): Instances;
	GetPartBoundsInBox(cframe: CFrame, size: Vector3, overlapParams?: OverlapParams): Instances;
	GetPartBoundsInRadius(position: Vector3, radius: number, overlapParams?: OverlapParams): Instances;
	GetPartsInPart(part: BasePart, overlapParams?: OverlapParams): Instances;
	IKMoveTo(part: BasePart, target: CFrame, translateStiffness?: number, rotateStiffness?: number, collisionsMode?: Enum.IKCollisionsMode): undefined;
	/** @deprecated */
	IsRegion3Empty(region: Region3, ignoreDescendentsInstance?: Instance): boolean;
	/** @deprecated */
	IsRegion3EmptyWithIgnoreList(region: Region3, ignoreDescendentsTable: Instances): boolean;
	Raycast(origin: Vector3, direction: Vector3, raycastParams?: RaycastParams): RaycastResult?;
	Shapecast(part: BasePart, direction: Vector3, params?: RaycastParams): RaycastResult?;
	Spherecast(position: Vector3, radius: number, direction: Vector3, params?: RaycastParams): RaycastResult?;
	StepPhysics(dt: number, parts?: Instances): undefined;
	/** @deprecated */
	findPartOnRay(ray: Ray, ignoreDescendantsInstance?: Instance, terrainCellsAreCubes?: boolean, ignoreWater?: boolean): unknown;
	/** @deprecated */
	findPartsInRegion3(region: Region3, ignoreDescendantsInstance?: Instance, maxParts?: number): Instances;
}

interface Workspace extends WorldRoot {
	AirDensity: number;
	AirTurbulenceIntensity: number;
	AllowThirdPartySales: boolean;
	ClientAnimatorThrottling: Enum.ClientAnimatorThrottlingMode;
	CurrentCamera: Camera;
	DistributedGameTime: number;
	FallHeightEnabled: boolean;
	FallenPartsDestroyHeight: number;
	GlobalWind: Vector3;
	Gravity: number;
	InsertPoint: Vector3;
	LuauTypeCheckMode: Enum.LuauTypeCheckMode;
	Retargeting: Enum.AnimatorRetargetingMode;
	StreamingEnabled: boolean;
	Terrain: Terrain;
	/** @deprecated */
	BreakJoints(objects: Instances): undefined;
	GetNumAwakeParts(): number;
	GetPhysicsThrottling(): number;
	GetRealPhysicsFPS(): number;
	GetServerTimeNow(): number;
	JoinToOutsiders(objects: Instances, jointType: Enum.JointCreationMode): undefined;
	/** @deprecated */
	MakeJoints(objects: Instances): undefined;
	PGSIsEnabled(): boolean;
	UnjoinFromOutsiders(objects: Instances): undefined;
	ZoomToExtents(): undefined;
	readonly PersistentLoaded: RBXScriptSignal<(player: Player) => void>;
}

interface WorldModel extends WorldRoot {
}

interface PackageLink extends Instance {
	readonly DefaultName: string;
	PackageId: ContentId;
	readonly SerializedDefaultAttributes: string;
	readonly VersionNumber: number;
}

interface PackageService extends Instance {
}

interface PackageUIService extends Instance {
}

interface Pages extends Instance {
	IsFinished: boolean;
	GetCurrentPage(): unknown;
	AdvanceToNextPageAsync(): undefined;
}

interface AudioPages extends Pages {
}

interface BanHistoryPages extends Pages {
}

interface CapturesPages extends Pages {
}

interface CatalogPages extends Pages {
}

interface DataStoreKeyPages extends Pages {
	Cursor: string;
}

interface DataStoreListingPages extends Pages {
	Cursor: string;
}

interface DataStorePages extends Pages {
}

interface DataStoreVersionPages extends Pages {
}

interface FriendPages extends Pages {
}

interface InventoryPages extends Pages {
}

interface EmotesPages extends InventoryPages {
}

interface MemoryStoreHashMapPages extends Pages {
}

interface OutfitPages extends Pages {
}

interface RecommendationPages extends Pages {
}

interface StandardPages extends Pages {
}

interface PartOperationAsset extends Instance {
}

interface ParticleEmitter extends Instance {
	Acceleration: Vector3;
	Brightness: number;
	Color: ColorSequence;
	Drag: number;
	EmissionDirection: Enum.NormalId;
	Enabled: boolean;
	FlipbookFramerate: NumberRange;
	FlipbookIncompatible: string;
	FlipbookLayout: Enum.ParticleFlipbookLayout;
	FlipbookMode: Enum.ParticleFlipbookMode;
	FlipbookSizeX: number;
	FlipbookSizeY: number;
	FlipbookStartRandom: boolean;
	Lifetime: NumberRange;
	LightEmission: number;
	LightInfluence: number;
	LockedToPart: boolean;
	Orientation: Enum.ParticleOrientation;
	Rate: number;
	RotSpeed: NumberRange;
	Rotation: NumberRange;
	Shape: Enum.ParticleEmitterShape;
	ShapeInOut: Enum.ParticleEmitterShapeInOut;
	ShapePartial: number;
	ShapeStyle: Enum.ParticleEmitterShapeStyle;
	Size: NumberSequence;
	Speed: NumberRange;
	SpreadAngle: Vector2;
	Squash: NumberSequence;
	Texture: ContentId;
	TimeScale: number;
	Transparency: NumberSequence;
	VelocityInheritance: number;
	/** @deprecated */
	VelocitySpread: number;
	WindAffectsDrag: boolean;
	ZOffset: number;
	Clear(): undefined;
	Emit(particleCount?: number): undefined;
}

interface PartyEmulatorService extends Instance {
}

interface PatchBundlerFileWatch extends Instance {
}

interface PatchMapping extends Instance {
	FlattenTree: boolean;
	PatchId: string;
	TargetPath: string;
}

interface Path extends Instance {
	Status: Enum.PathStatus;
	/** @deprecated */
	GetPointCoordinates(): unknown;
	GetWaypoints(): unknown;
	CheckOcclusionAsync(start: number): number;
	ComputeAsync(start: Vector3, finish: Vector3): undefined;
	readonly Blocked: RBXScriptSignal<(blockedWaypointIdx: number) => void>;
	readonly Unblocked: RBXScriptSignal<(unblockedWaypointIdx: number) => void>;
}

interface PathfindingLink extends Instance {
	Attachment0: Attachment;
	Attachment1: Attachment;
	IsBidirectional: boolean;
	Label: string;
}

interface PathfindingModifier extends Instance {
	Label: string;
	PassThrough: boolean;
}

interface PathfindingService extends Instance {
	/** @deprecated */
	EmptyCutoff: number;
	CreatePath(agentParameters?: unknown): Path;
	/** @deprecated */
	ComputeRawPathAsync(start: Vector3, finish: Vector3, maxDistance: number): Path;
	/** @deprecated */
	ComputeSmoothPathAsync(start: Vector3, finish: Vector3, maxDistance: number): Path;
	FindPathAsync(start: Vector3, finish: Vector3): Path;
}

interface PausedState extends Instance {
}

interface PausedStateBreakpoint extends PausedState {
}

interface PausedStateException extends PausedState {
}

interface PerformanceControlService extends Instance {
}

interface PermissionsService extends Instance {
}

interface PhysicsService extends Instance {
	/** @deprecated */
	CollisionGroupContainsPart(name: string, part: BasePart): boolean;
	CollisionGroupSetCollidable(name1: string, name2: string, collidable: boolean): undefined;
	CollisionGroupsAreCollidable(name1: string, name2: string): boolean;
	/** @deprecated */
	CreateCollisionGroup(name: string): number;
	/** @deprecated */
	GetCollisionGroupId(name: string): number;
	/** @deprecated */
	GetCollisionGroupName(name: number): string;
	/** @deprecated */
	GetCollisionGroups(): unknown;
	GetMaxCollisionGroups(): number;
	GetRegisteredCollisionGroups(): unknown;
	IsCollisionGroupRegistered(name: string): boolean;
	RegisterCollisionGroup(name: string): undefined;
	/** @deprecated */
	RemoveCollisionGroup(name: string): undefined;
	RenameCollisionGroup(from: string, to: string): undefined;
	/** @deprecated */
	SetPartCollisionGroup(part: BasePart, name: string): undefined;
	UnregisterCollisionGroup(name: string): undefined;
}

interface PhysicsSettings extends Instance {
	AllowSleep: boolean;
	AreAnchorsShown: boolean;
	AreAssembliesShown: boolean;
	AreAwakePartsHighlighted: boolean;
	AreBodyTypesShown: boolean;
	AreContactIslandsShown: boolean;
	AreContactPointsShown: boolean;
	AreJointCoordinatesShown: boolean;
	AreMechanismsShown: boolean;
	AreModelCoordsShown: boolean;
	AreNonAnchorsShown: boolean;
	AreOwnersShown: boolean;
	ArePartCoordsShown: boolean;
	AreRegionsShown: boolean;
	AreTerrainReplicationRegionsShown: boolean;
	AreUnalignedPartsShown: boolean;
	AreWorldCoordsShown: boolean;
	DisableCSGv2: boolean;
	DisableCSGv3ForPlugins: boolean;
	IsInterpolationThrottleShown: boolean;
	IsReceiveAgeShown: boolean;
	IsTreeShown: boolean;
	PhysicsEnvironmentalThrottle: Enum.EnviromentalPhysicsThrottle;
	ShowDecompositionGeometry: boolean;
	ThrottleAdjustTime: number;
	UseCSGv2: boolean;
}

interface PlaceAssetIdsService extends Instance {
}

interface PlaceStatsService extends Instance {
}

interface PlacesService extends Instance {
}

interface PlatformCloudStorageService extends Instance {
}

interface PlatformFriendsService extends Instance {
}

interface PlatformLibraries extends Instance {
}

interface Player extends Instance {
	AccountAge: number;
	AutoJumpEnabled: boolean;
	CameraMaxZoomDistance: number;
	CameraMinZoomDistance: number;
	CameraMode: Enum.CameraMode;
	CanLoadCharacterAppearance: boolean;
	Character: Model;
	/** @deprecated */
	CharacterAppearance: string;
	CharacterAppearanceId: number;
	DevCameraOcclusionMode: Enum.DevCameraOcclusionMode;
	DevComputerCameraMode: Enum.DevComputerCameraMovementMode;
	DevComputerMovementMode: Enum.DevComputerMovementMode;
	DevEnableMouseLock: boolean;
	DevTouchCameraMode: Enum.DevTouchCameraMovementMode;
	DevTouchMovementMode: Enum.DevTouchMovementMode;
	DisplayName: string;
	FollowUserId: number;
	HasVerifiedBadge: boolean;
	HealthDisplayDistance: number;
	MembershipType: Enum.MembershipType;
	NameDisplayDistance: number;
	Neutral: boolean;
	ReplicationFocus: Instance;
	RespawnLocation: SpawnLocation;
	Team: Team;
	TeamColor: BrickColor;
	UserId: number;
	/** @deprecated */
	userId: number;
	AddReplicationFocus(part: BasePart): undefined;
	ClearCharacterAppearance(): undefined;
	DistanceFromCharacter(point: Vector3): number;
	GetData(): PlayerData;
	GetJoinData(): unknown;
	GetMouse(): Mouse;
	GetNetworkPing(): number;
	HasAppearanceLoaded(): boolean;
	IsVerified(): boolean;
	Kick(message?: string): undefined;
	/** @deprecated */
	LoadBoolean(key: string): boolean;
	/** @deprecated */
	LoadCharacterAppearance(assetInstance: Instance): undefined;
	/** @deprecated */
	LoadInstance(key: string): Instance;
	/** @deprecated */
	LoadNumber(key: string): number;
	/** @deprecated */
	LoadString(key: string): string;
	Move(walkDirection: Vector3, relativeToCamera?: boolean): undefined;
	RemoveReplicationFocus(part: BasePart): undefined;
	/** @deprecated */
	SaveBoolean(key: string, value: boolean): undefined;
	/** @deprecated */
	SaveInstance(key: string, value: Instance): undefined;
	/** @deprecated */
	SaveNumber(key: string, value: number): undefined;
	/** @deprecated */
	SaveString(key: string, value: string): undefined;
	SetAccountAge(accountAge: number): undefined;
	SetSuperSafeChat(value: boolean): undefined;
	/** @deprecated */
	loadBoolean(key: string): boolean;
	/** @deprecated */
	loadInstance(key: string): Instance;
	/** @deprecated */
	loadNumber(key: string): number;
	/** @deprecated */
	loadString(key: string): string;
	/** @deprecated */
	saveBoolean(key: string, value: boolean): undefined;
	/** @deprecated */
	saveInstance(key: string, value: Instance): undefined;
	/** @deprecated */
	saveNumber(key: string, value: number): undefined;
	/** @deprecated */
	saveString(key: string, value: string): undefined;
	/** @deprecated */
	GetFriendsOnline(maxFriends?: number): unknown;
	GetFriendsOnlineAsync(maxFriends?: number): unknown;
	/** @deprecated */
	GetRankInGroup(groupId: number): number;
	GetRankInGroupAsync(groupId: number): number;
	/** @deprecated */
	GetRoleInGroup(groupId: number): string;
	GetRoleInGroupAsync(groupId: number): string;
	/** @deprecated */
	IsBestFriendsWith(userId: number): boolean;
	/** @deprecated */
	IsFriendsWith(userId: number): boolean;
	IsFriendsWithAsync(userId: number): boolean;
	/** @deprecated */
	IsInGroup(groupId: number): boolean;
	IsInGroupAsync(groupId: number): boolean;
	/** @deprecated */
	LoadCharacter(): undefined;
	LoadCharacterAsync(): undefined;
	/** @deprecated */
	LoadCharacterWithHumanoidDescription(humanoidDescription: HumanoidDescription): undefined;
	LoadCharacterWithHumanoidDescriptionAsync(humanoidDescription: HumanoidDescription): undefined;
	RequestStreamAroundAsync(position: Vector3, timeOut?: number): undefined;
	/** @deprecated */
	WaitForDataReady(): boolean;
	/** @deprecated */
	isFriendsWith(userId: number): boolean;
	/** @deprecated */
	waitForDataReady(): boolean;
	readonly CharacterAdded: RBXScriptSignal<(character: Model) => void>;
	readonly CharacterAppearanceLoaded: RBXScriptSignal<(character: Model) => void>;
	readonly CharacterRemoving: RBXScriptSignal<(character: Model) => void>;
	readonly Chatted: RBXScriptSignal<(message: string, recipient: Player) => void>;
	readonly Idled: RBXScriptSignal<(time: number) => void>;
	readonly OnTeleport: RBXScriptSignal<(teleportState: Enum.TeleportState, placeId: number, spawnName: string) => void>;
}

interface PlayerData extends Instance {
	GetPlayer(): Player;
	GetRecordAsync(recordName?: string): PlayerDataRecord;
}

interface PlayerDataRecord extends Instance {
	CreatedTime: number;
	DefaultRecordName: boolean;
	Dirty: boolean;
	Error: Enum.PlayerDataErrorState;
	FlushedTime: number;
	LoadedTime: number;
	ModifiedTime: number;
	NewRecord: boolean;
	Readable: boolean;
	RecordName: string;
	Writable: boolean;
	GetPlayer(): Player;
	GetValue(key: string): unknown;
	GetValueChangedSignal(key: string): RBXScriptSignal;
	RemoveValue(key: string): undefined;
	SetValue(key: string, value: unknown): undefined;
	ReleaseAsync(): undefined;
	RequestFlushAsync(): undefined;
	readonly Changed: RBXScriptSignal<(key: string, value: unknown) => void>;
	readonly Flushed: RBXScriptSignal<(flushState: boolean, error: unknown) => void>;
	readonly Loaded: RBXScriptSignal<(success: boolean, error: unknown) => void>;
}

interface PlayerDataRecordConfig extends Instance {
	RecordName: string;
	GetDefaultValue(key: string): unknown;
	SetDefaultValue(key: string, value: unknown): undefined;
}

interface PlayerDataService extends Instance {
	LoadFailureBehavior: Enum.PlayerDataLoadFailureBehavior;
	GetRecordConfig(recordName?: string): PlayerDataRecordConfig;
}

interface PlayerEmulatorService extends Instance {
}

interface PlayerHydrationService extends Instance {
}

interface PlayerScripts extends Instance {
	ClearComputerCameraMovementModes(): undefined;
	ClearComputerMovementModes(): undefined;
	ClearTouchCameraMovementModes(): undefined;
	ClearTouchMovementModes(): undefined;
	RegisterComputerCameraMovementMode(cameraMovementMode: Enum.ComputerCameraMovementMode): undefined;
	RegisterComputerMovementMode(movementMode: Enum.ComputerMovementMode): undefined;
	RegisterTouchCameraMovementMode(cameraMovementMode: Enum.TouchCameraMovementMode): undefined;
	RegisterTouchMovementMode(movementMode: Enum.TouchMovementMode): undefined;
}

interface PlayerViewService extends Instance {
	GetDeviceCameraCFrame(player?: Player): CFrame;
}

interface Players extends Instance {
	BubbleChat: boolean;
	CharacterAutoLoads: boolean;
	ClassicChat: boolean;
	LocalPlayer: Player;
	MaxPlayers: number;
	/** @deprecated */
	NumPlayers: number;
	PreferredPlayers: number;
	RespawnTime: number;
	Chat(message: string): undefined;
	GetPlayerByUserId(userId: number): Player;
	GetPlayerFromCharacter(character: Model): Player;
	GetPlayers(): Instances;
	SetChatStyle(style?: Enum.ChatStyle): undefined;
	TeamChat(message: string): undefined;
	/** @deprecated */
	getPlayers(): Instances;
	/** @deprecated */
	playerFromCharacter(character: Model): Player;
	/** @deprecated */
	players(): Instances;
	BanAsync(config: unknown): undefined;
	/** @deprecated */
	CreateHumanoidModelFromDescription(description: HumanoidDescription, rigType: Enum.HumanoidRigType, assetTypeVerification?: Enum.AssetTypeVerification): Model;
	CreateHumanoidModelFromDescriptionAsync(description: HumanoidDescription, rigType: Enum.HumanoidRigType, assetTypeVerification?: Enum.AssetTypeVerification): Model;
	/** @deprecated */
	CreateHumanoidModelFromUserId(userId: number): Model;
	CreateHumanoidModelFromUserIdAsync(userId: number): Model;
	GetBanHistoryAsync(userId: number): BanHistoryPages;
	/** @deprecated */
	GetCharacterAppearanceAsync(userId: number): Model;
	GetCharacterAppearanceInfoAsync(userId: number): unknown;
	GetFriendsAsync(userId: number): FriendPages;
	/** @deprecated */
	GetHumanoidDescriptionFromOutfitId(outfitId: number): HumanoidDescription;
	GetHumanoidDescriptionFromOutfitIdAsync(outfitId: number): HumanoidDescription;
	/** @deprecated */
	GetHumanoidDescriptionFromUserId(userId: number): HumanoidDescription;
	GetHumanoidDescriptionFromUserIdAsync(userId: number): HumanoidDescription;
	GetNameFromUserIdAsync(userId: number): string;
	GetUserIdFromNameAsync(userName: string): number;
	GetUserThumbnailAsync(userId: number, thumbnailType: Enum.ThumbnailType, thumbnailSize: Enum.ThumbnailSize): unknown;
	UnbanAsync(config: unknown): undefined;
	readonly PlayerAdded: RBXScriptSignal<(player: Player) => void>;
	readonly PlayerMembershipChanged: RBXScriptSignal<(player: Player) => void>;
	readonly PlayerRemoving: RBXScriptSignal<(player: Player, reason: Enum.PlayerExitReason) => void>;
	readonly UserSubscriptionStatusChanged: RBXScriptSignal<(user: Player, subscriptionId: string) => void>;
}

interface Plugin extends Instance {
	CollisionEnabled: boolean;
	GridSize: number;
	Activate(exclusiveMouse: boolean): undefined;
	CreatePluginAction(actionId: string, text: string, statusTip: string, iconName?: string, allowBinding?: boolean): PluginAction;
	CreatePluginMenu(id: string, title?: string, icon?: string): PluginMenu;
	CreateToolbar(name: string): PluginToolbar;
	Deactivate(): undefined;
	GetJoinMode(): Enum.JointCreationMode;
	GetMouse(): PluginMouse;
	GetSelectedRibbonTool(): Enum.RibbonTool;
	GetSetting(key: string): unknown;
	/** @deprecated */
	GetStudioUserId(): number;
	Intersect(objects: Instances): Instance;
	IsActivated(): boolean;
	IsActivatedWithExclusiveMouse(): boolean;
	Negate(objects: Instances): Instances;
	/** @deprecated */
	OpenScript(script: LuaSourceContainer, lineNumber?: number): undefined;
	OpenWikiPage(url: string): undefined;
	SaveSelectedToRoblox(): undefined;
	SelectRibbonTool(tool: Enum.RibbonTool, position: UDim2): undefined;
	Separate(objects: Instances): Instances;
	SetSetting(key: string, value: unknown): undefined;
	StartDrag(dragData: unknown): undefined;
	Union(objects: Instances): Instance;
	/** @deprecated */
	CreateDockWidgetPluginGui(pluginGuiId: string, dockWidgetPluginGuiInfo: DockWidgetPluginGuiInfo): DockWidgetPluginGui;
	CreateDockWidgetPluginGuiAsync(pluginGuiId: string, dockWidgetPluginGuiInfo: DockWidgetPluginGuiInfo): DockWidgetPluginGui;
	/** @deprecated */
	ImportFbxAnimation(rigModel: Instance, isR15?: boolean): Instance;
	ImportFbxAnimationAsync(rigModel: Instance, isR15?: boolean): Instance;
	/** @deprecated */
	ImportFbxRig(isR15?: boolean): Instance;
	ImportFbxRigAsync(isR15?: boolean): Instance;
	PromptForExistingAssetId(assetType: string): number;
	PromptForExistingAssetIdAsync(assetType: string): number;
	/** @deprecated */
	PromptSaveSelection(suggestedFileName?: string): boolean;
	PromptSaveSelectionAsync(suggestedFileName?: string): boolean;
	readonly Deactivation: RBXScriptSignal<() => void>;
	readonly Unloading: RBXScriptSignal<() => void>;
}

interface PluginAction extends Instance {
	ActionId: string;
	AllowBinding: boolean;
	StatusTip: string;
	readonly Text: string;
	readonly Triggered: RBXScriptSignal<() => void>;
}

interface PluginCapabilities extends Instance {
}

interface PluginDebugService extends Instance {
}

interface PluginDragEvent extends Instance {
	Data: string;
	MimeType: string;
	Position: Vector2;
	Sender: string;
}

interface PluginGuiService extends Instance {
}

interface PluginManagementService extends Instance {
}

interface PluginManager extends Instance {
	/** @deprecated */
	CreatePlugin(): Instance;
	ExportPlace(filePath?: string): undefined;
	ExportSelection(filePath?: string): undefined;
}

interface PluginManagerInterface extends Instance {
	/** @deprecated */
	CreatePlugin(): Instance;
	ExportPlace(filePath?: string): undefined;
	ExportSelection(filePath?: string): undefined;
}

interface PluginMenu extends Instance {
	Icon: string;
	Title: string;
	AddAction(action: Instance): undefined;
	AddMenu(menu: Instance): undefined;
	AddNewAction(actionId: string, text: string, icon?: string): Instance;
	AddSeparator(): undefined;
	Clear(): undefined;
	ShowAsync(): Instance;
}

interface PluginPolicyService extends Instance {
}

interface PluginToolbar extends Instance {
	CreateButton(buttonId: string, tooltip: string, iconname: string, text?: string): PluginToolbarButton;
}

interface PluginToolbarButton extends Instance {
	ClickableWhenViewportHidden: boolean;
	Enabled: boolean;
	Icon: ContentId;
	SetActive(active: boolean): undefined;
	readonly Click: RBXScriptSignal<() => void>;
}

/** @deprecated */
interface PointsService extends Instance {
	/** @deprecated */
	GetAwardablePoints(): number;
	/** @deprecated */
	AwardPoints(userId: number, amount: number): unknown;
	/** @deprecated */
	GetGamePointBalance(userId: number): number;
	/** @deprecated */
	GetPointBalance(userId: number): number;
	readonly PointsAwarded: RBXScriptSignal<(userId: number, pointsAwarded: number, userBalanceInGame: number, userTotalBalance: number) => void>;
}

interface PolicyService extends Instance {
	CanViewBrandProjectAsync(player: Player, brandProjectId: string): boolean;
	GetPolicyInfoForPlayerAsync(player: Instance): unknown;
}

interface PoseBase extends Instance {
	EasingDirection: Enum.PoseEasingDirection;
	EasingStyle: Enum.PoseEasingStyle;
	Weight: number;
}

interface NumberPose extends PoseBase {
	Value: number;
}

interface Pose extends PoseBase {
	CFrame: CFrame;
	/** @deprecated */
	MaskWeight: number;
	AddSubPose(pose: Instance): undefined;
	GetSubPoses(): Instances;
	RemoveSubPose(pose: Instance): undefined;
}

interface PostEffect extends Instance {
	Enabled: boolean;
}

interface BloomEffect extends PostEffect {
	Intensity: number;
	Size: number;
	Threshold: number;
}

interface BlurEffect extends PostEffect {
	Size: number;
}

interface ColorCorrectionEffect extends PostEffect {
	Brightness: number;
	Contrast: number;
	Saturation: number;
	TintColor: Color3;
}

interface ColorGradingEffect extends PostEffect {
	TonemapperPreset: Enum.TonemapperPreset;
}

interface DepthOfFieldEffect extends PostEffect {
	FarIntensity: number;
	FocusDistance: number;
	InFocusRadius: number;
	NearIntensity: number;
}

interface SunRaysEffect extends PostEffect {
	Intensity: number;
	Spread: number;
}

interface ProcessInstancePhysicsService extends Instance {
}

interface ProximityPrompt extends Instance {
	ActionText: string;
	AutoLocalize: boolean;
	ClickablePrompt: boolean;
	Enabled: boolean;
	Exclusivity: Enum.ProximityPromptExclusivity;
	GamepadKeyCode: Enum.KeyCode;
	HoldDuration: number;
	KeyboardKeyCode: Enum.KeyCode;
	MaxActivationDistance: number;
	MaxIndicatorDistance: number;
	ObjectText: string;
	RequiresLineOfSight: boolean;
	RootLocalizationTable: LocalizationTable;
	Style: Enum.ProximityPromptStyle;
	UIOffset: Vector2;
	InputHoldBegin(): undefined;
	InputHoldEnd(): undefined;
	readonly IndicatorHidden: RBXScriptSignal<() => void>;
	readonly IndicatorShown: RBXScriptSignal<() => void>;
	readonly PromptButtonHoldBegan: RBXScriptSignal<(playerWhoTriggered: Player) => void>;
	readonly PromptButtonHoldEnded: RBXScriptSignal<(playerWhoTriggered: Player) => void>;
	readonly PromptHidden: RBXScriptSignal<() => void>;
	readonly PromptShown: RBXScriptSignal<(inputType: Enum.ProximityPromptInputType) => void>;
	readonly TriggerEnded: RBXScriptSignal<(playerWhoTriggered: Player) => void>;
	readonly Triggered: RBXScriptSignal<(playerWhoTriggered: Player) => void>;
}

interface ProximityPromptService extends Instance {
	Enabled: boolean;
	MaxIndicatorsVisible: number;
	MaxPromptsVisible: number;
	readonly IndicatorHidden: RBXScriptSignal<(prompt: ProximityPrompt) => void>;
	readonly IndicatorShown: RBXScriptSignal<(prompt: ProximityPrompt) => void>;
	readonly PromptButtonHoldBegan: RBXScriptSignal<(prompt: ProximityPrompt, playerWhoTriggered: Player) => void>;
	readonly PromptButtonHoldEnded: RBXScriptSignal<(prompt: ProximityPrompt, playerWhoTriggered: Player) => void>;
	readonly PromptHidden: RBXScriptSignal<(prompt: ProximityPrompt) => void>;
	readonly PromptShown: RBXScriptSignal<(prompt: ProximityPrompt, inputType: Enum.ProximityPromptInputType) => void>;
	readonly PromptTriggerEnded: RBXScriptSignal<(prompt: ProximityPrompt, playerWhoTriggered: Player) => void>;
	readonly PromptTriggered: RBXScriptSignal<(prompt: ProximityPrompt, playerWhoTriggered: Player) => void>;
}

interface PublishService extends Instance {
}

interface RTAnimationTracker extends Instance {
	readonly TrackerError: RBXScriptSignal<(errorCode: Enum.TrackerError, msg: string) => void>;
	readonly TrackerPrompt: RBXScriptSignal<(prompt: Enum.TrackerPromptEvent) => void>;
}

interface RbxAnalyticsService extends Instance {
}

interface RecommendationService extends Instance {
	LogActionEvent(actionType: Enum.RecommendationActionType, itemId: string, tracingId: string, actionEventDetails?: unknown): undefined;
	LogImpressionEvent(impressionType: Enum.RecommendationImpressionType, itemId: string, tracingId: string, impressionEventDetails?: unknown): undefined;
	GenerateItemListAsync(generateRecommendationItemListRequest: unknown): RecommendationPages;
	GetRecommendationItemAsync(itemId: string): unknown;
	RegisterItemAsync(player: Player, registerRecommendationItemsRequest: unknown): unknown;
	RemoveItemAsync(itemId: string): undefined;
	UpdateItemAsync(updateRecommendationItemRequest: unknown): undefined;
}

interface ReflectionMetadata extends Instance {
}

interface ReflectionMetadataCallbacks extends Instance {
}

interface ReflectionMetadataClasses extends Instance {
}

interface ReflectionMetadataEnums extends Instance {
}

interface ReflectionMetadataEvents extends Instance {
}

interface ReflectionMetadataFunctions extends Instance {
}

interface ReflectionMetadataItem extends Instance {
	Browsable: boolean;
	ClassCategory: string;
	ClientOnly: boolean;
	Constraint: string;
	Deprecated: boolean;
	EditingDisabled: boolean;
	EditorType: string;
	FFlag: string;
	IsBackend: boolean;
	PropertyOrder: number;
	ScriptContext: string;
	ServerOnly: boolean;
	SliderScaling: string;
	UIMaximum: number;
	UIMinimum: number;
	UINumTicks: number;
}

interface ReflectionMetadataClass extends ReflectionMetadataItem {
	ExplorerImageIndex: number;
	ExplorerOrder: number;
	Insertable: boolean;
	PreferredParent: string;
}

interface ReflectionMetadataEnum extends ReflectionMetadataItem {
}

interface ReflectionMetadataEnumItem extends ReflectionMetadataItem {
}

interface ReflectionMetadataMember extends ReflectionMetadataItem {
}

interface ReflectionMetadataProperties extends Instance {
}

interface ReflectionMetadataYieldFunctions extends Instance {
}

interface ReflectionService extends Instance {
	GetClass(className: string, filter?: unknown): unknown;
	GetClasses(filter?: unknown): unknown;
	GetEventsOfClass(className: string, filter?: unknown): unknown;
	GetMethodsOfClass(className: string, filter?: unknown): unknown;
	GetPropertiesOfClass(className: string, filter?: unknown): unknown;
}

interface RemoteCommandService extends Instance {
	GetExecutingPlayer(): Player;
	GetReceivedUpdateSignal(): RBXScriptSignal;
	GetStoppingSignal(): RBXScriptSignal;
	SendUpdate(args: unknown): undefined;
}

interface RemoteCursorService extends Instance {
}

interface RemoteDebuggerServer extends Instance {
}

interface RemoteFunction extends Instance {
	InvokeClient(player: Player, arguments: unknown): unknown;
	InvokeServer(arguments: unknown): unknown;
	OnClientInvoke?: (arguments: unknown) => unknown;
	OnServerInvoke?: (player: Player, arguments: unknown) => unknown;
}

interface RenderSettings extends Instance {
	AutoFRMLevel: number;
	EagerBulkExecution: boolean;
	EditQualityLevel: Enum.QualityLevel;
	["Enable VR Mode"]: boolean;
	ExportMergeByMaterial: boolean;
	FrameRateManager: Enum.FramerateManagerMode;
	GraphicsMode: Enum.GraphicsMode;
	MeshCacheSize: number;
	MeshPartDetailLevel: Enum.MeshPartDetailLevel;
	QualityLevel: Enum.QualityLevel;
	ReloadAssets: boolean;
	RenderCSGTrianglesDebug: boolean;
	ShowBoundingBoxes: boolean;
	ViewMode: Enum.ViewMode;
	GetMaxQualityLevel(): number;
}

interface RenderingTest extends Instance {
	CFrame: CFrame;
	ComparisonDiffThreshold: number;
	ComparisonMethod: Enum.RenderingTestComparisonMethod;
	ComparisonPsnrThreshold: number;
	Description: string;
	FieldOfView: number;
	PerfTest: boolean;
	QualityAuto: boolean;
	QualityLevel: number;
	RenderingTestFrameCount: number;
	ShouldSkip: boolean;
	Ticket: string;
	Timeout: number;
	RenderdocTriggerCapture(): undefined;
}

interface ReplicatedFirst extends Instance {
	RemoveDefaultLoadingScreen(): undefined;
}

interface ReplicatedStorage extends Instance {
}

interface RibbonNotificationService extends Instance {
}

interface RobloxPluginGuiService extends Instance {
}

interface RobloxReplicatedStorage extends Instance {
}

interface RobloxSerializableInstance extends Instance {
}

interface RobloxServerStorage extends Instance {
}

interface RolloutValidation extends Instance {
}

interface RomarkRbxAnalyticsService extends Instance {
}

interface RomarkService extends Instance {
	EndRemoteRomarkTest(): undefined;
}

interface RotationCurve extends Instance {
	Length: number;
	GetKeyAtIndex(index: number): RotationCurveKey;
	GetKeyIndicesAtTime(time: number): unknown;
	GetKeys(): unknown;
	GetValueAtTime(time: number): CoordinateFrame?;
	InsertKey(key: RotationCurveKey): unknown;
	RemoveKeyAtIndex(startingIndex: number, count?: number): number;
	SetKeys(keys: unknown): number;
}

interface RtMessagingService extends Instance {
}

interface RunService extends Instance {
	FrameNumber: number;
	RunState: Enum.RunState;
	BindToRenderStep(name: string, priority: number, _function: Function): undefined;
	BindToSimulation(_function: Function, frequency?: Enum.StepFrequency): RBXScriptConnection;
	GetPredictionStatus(context: Instance): Enum.PredictionStatus;
	IsClient(): boolean;
	IsEdit(): boolean;
	IsRunMode(): boolean;
	IsRunning(): boolean;
	IsServer(): boolean;
	IsStudio(): boolean;
	Pause(): undefined;
	/** @deprecated */
	Reset(): undefined;
	Run(): undefined;
	SetPredictionMode(context: Instance, mode: Enum.PredictionMode): undefined;
	Stop(): undefined;
	UnbindFromRenderStep(name: string): undefined;
	readonly Heartbeat: RBXScriptSignal<(deltaTime: number) => void>;
	readonly Misprediction: RBXScriptSignal<(remoteWorldStepId: number, mispredictedInstances: unknown) => void>;
	readonly PostSimulation: RBXScriptSignal<(deltaTimeSim: number) => void>;
	readonly PreAnimation: RBXScriptSignal<(deltaTimeSim: number) => void>;
	readonly PreRender: RBXScriptSignal<(deltaTimeRender: number) => void>;
	readonly PreSimulation: RBXScriptSignal<(deltaTimeSim: number) => void>;
	readonly RenderStepped: RBXScriptSignal<(deltaTime: number) => void>;
	readonly Stepped: RBXScriptSignal<(time: number, deltaTime: number) => void>;
}

interface RuntimeContentService extends Instance {
	readonly RuntimeContentFail: RBXScriptSignal<(id: string) => void>;
	readonly RuntimeContentLRCleanup: RBXScriptSignal<(id: string, priorityList: string) => void>;
	readonly RuntimeContentQuery: RBXScriptSignal<(id: string, expectedType: string, priorityList: string) => void>;
	readonly RuntimeContentShare: RBXScriptSignal<(id: string, content: string, metadata: string) => void>;
}

interface RuntimeScriptService extends Instance {
}

interface SafetyService extends Instance {
}

interface ScreenshotHud extends Instance {
	CameraButtonIcon: ContentId;
	CameraButtonPosition: UDim2;
	CloseButtonPosition: UDim2;
	CloseWhenScreenshotTaken: boolean;
	HideCoreGuiForCaptures: boolean;
	HidePlayerGuiForCaptures: boolean;
	Visible: boolean;
}

interface ScriptBuilder extends Instance {
}

interface SyncScriptBuilder extends ScriptBuilder {
	CompileTarget: Enum.CompileTarget;
	CoverageInfo: boolean;
	DebugInfo: boolean;
	PackAsSource: boolean;
	/** @deprecated */
	RawBytecode: boolean;
}

interface ScriptChangeService extends Instance {
}

interface ScriptCloneWatcher extends Instance {
}

interface ScriptCloneWatcherHelper extends Instance {
}

interface ScriptCommitService extends Instance {
}

interface ScriptContext extends Instance {
	SetTimeout(seconds: number): undefined;
	readonly Error: RBXScriptSignal<(message: string, stackTrace: string, script: Instance) => void>;
}

interface ScriptDebugger extends Instance {
	CurrentLine: number;
	IsDebugging: boolean;
	IsPaused: boolean;
	Script: Instance;
	AddWatch(expression: string): Instance;
	GetBreakpoints(): Instances;
	GetGlobals(stackFrame?: number): unknown;
	GetLocals(stackFrame?: number): unknown;
	GetStack(): unknown;
	GetUpvalues(stackFrame?: number): unknown;
	GetWatchValue(watch: Instance): unknown;
	GetWatches(): Instances;
	SetBreakpoint(line: number, isContextDependentBreakpoint: boolean): Instance;
	SetGlobal(name: string, value: unknown, stackFrame: number): undefined;
	SetLocal(name: string, value: unknown, stackFrame?: number): undefined;
	SetUpvalue(name: string, value: unknown, stackFrame?: number): undefined;
	readonly BreakpointAdded: RBXScriptSignal<(breakpoint: Instance) => void>;
	readonly BreakpointRemoved: RBXScriptSignal<(breakpoint: Instance) => void>;
	readonly EncounteredBreak: RBXScriptSignal<(line: number, breakReason: Enum.BreakReason) => void>;
	readonly Resuming: RBXScriptSignal<() => void>;
	readonly WatchAdded: RBXScriptSignal<(watch: Instance) => void>;
	readonly WatchRemoved: RBXScriptSignal<(watch: Instance) => void>;
}

interface ScriptDocument extends Instance {
	GetLine(lineIndex?: unknown): string;
	GetLineCount(): number;
	GetScript(): LuaSourceContainer;
	GetSelectedText(): string;
	GetSelection(): unknown;
	GetSelectionEnd(): unknown;
	GetSelectionStart(): unknown;
	GetText(startLine?: unknown, startCharacter?: unknown, endLine?: unknown, endCharacter?: unknown): string;
	GetViewport(): unknown;
	HasSelectedText(): boolean;
	IsCommandBar(): boolean;
	CloseAsync(): unknown;
	EditTextAsync(newText: string, startLine: number, startCharacter: number, endLine: number, endCharacter: number): unknown;
	ForceSetSelectionAsync(cursorLine: number, cursorCharacter: number, anchorLine?: unknown, anchorCharacter?: unknown): unknown;
	MultiEditTextAsync(edits: unknown): unknown;
	RequestSetSelectionAsync(cursorLine: number, cursorCharacter: number, anchorLine?: unknown, anchorCharacter?: unknown): unknown;
	readonly SelectionChanged: RBXScriptSignal<(positionLine: number, positionCharacter: number, anchorLine: number, anchorCharacter: number) => void>;
	readonly ViewportChanged: RBXScriptSignal<(startLine: number, endLine: number) => void>;
}

interface ScriptEditorService extends Instance {
	DeregisterAutocompleteCallback(name: string): undefined;
	DeregisterScriptAnalysisCallback(name: string): undefined;
	FindScriptDocument(script: LuaSourceContainer): ScriptDocument;
	GetEditorSource(script: LuaSourceContainer): string;
	GetScriptDocuments(): Instances;
	RegisterAutocompleteCallback(name: string, priority: number, callbackFunction: Function): undefined;
	RegisterScriptAnalysisCallback(name: string, priority: number, callbackFunction: Function): undefined;
	OpenScriptDocumentAsync(script: LuaSourceContainer, options?: unknown): unknown;
	UpdateSourceAsync(script: LuaSourceContainer, callback: Function): undefined;
	readonly TextDocumentDidChange: RBXScriptSignal<(document: ScriptDocument, changesArray: unknown) => void>;
	readonly TextDocumentDidClose: RBXScriptSignal<(oldDocument: ScriptDocument) => void>;
	readonly TextDocumentDidOpen: RBXScriptSignal<(newDocument: ScriptDocument) => void>;
}

interface ScriptProfilerService extends Instance {
	ClientRequestData(player: Player): undefined;
	ClientStart(player: Player, frequency: unknown): undefined;
	ClientStop(player: Player): undefined;
	DeserializeJSON(jsonString: unknown): unknown;
	ServerRequestData(): undefined;
	ServerStart(frequency: unknown): undefined;
	ServerStop(): undefined;
	readonly OnNewData: RBXScriptSignal<(player: Player, jsonString: string) => void>;
}

interface ScriptRegistrationService extends Instance {
}

interface ScriptRuntime extends Instance {
}

interface ScriptService extends Instance {
}

interface Selection extends Instance {
	SelectionThickness: number;
	Add(instancesToAdd: Instances): undefined;
	Get(): Instances;
	Remove(instancesToRemove: Instances): undefined;
	Set(selection: Instances): undefined;
	readonly SelectionChanged: RBXScriptSignal<() => void>;
}

interface SelectionHighlightManager extends Instance {
}

interface SensorBase extends Instance {
	UpdateType: Enum.SensorUpdateType;
	/** @deprecated */
	Sense(): undefined;
	readonly OnSensorOutputChanged: RBXScriptSignal<() => void>;
}

interface AtmosphereSensor extends SensorBase {
	AirDensity: number;
	RelativeWindVelocity: Vector3;
}

interface BuoyancySensor extends SensorBase {
	FullySubmerged: boolean;
	TouchingSurface: boolean;
}

interface ControllerSensor extends SensorBase {
}

interface ControllerPartSensor extends ControllerSensor {
	HitFrame: CFrame;
	HitNormal: Vector3;
	SearchDistance: number;
	SensedPart: BasePart;
	SensorMode: Enum.SensorMode;
}

interface FluidForceSensor extends SensorBase {
	CenterOfPressure: Vector3;
	Force: Vector3;
	Torque: Vector3;
	EvaluateAsync(linearVelocity: Vector3, angularVelocity: Vector3, cframe: CFrame): unknown;
}

interface SerializationService extends Instance {
	DeserializeInstancesAsync(buffer: buffer): Instances;
	SerializeInstancesAsync(inputInstances: Instances): buffer;
}

interface ServerScriptService extends Instance {
}

interface ServerStorage extends Instance {
}

interface ServiceProvider extends Instance {
	FindService(className: string): Instance;
	GetService(className: string): Instance;
	/** @deprecated */
	getService(className: string): Instance;
	/** @deprecated */
	service(className: string): Instance;
	readonly Close: RBXScriptSignal<() => void>;
	readonly ServiceAdded: RBXScriptSignal<(service: Instance) => void>;
	readonly ServiceRemoving: RBXScriptSignal<(service: Instance) => void>;
}

interface DataModel extends ServiceProvider {
	CreatorId: number;
	CreatorType: Enum.CreatorType;
	GameId: number;
	/** @deprecated */
	GearGenreSetting: Enum.GearGenreSetting;
	Genre: Enum.Genre;
	JobId: string;
	MatchmakingType: Enum.MatchmakingType;
	PlaceId: number;
	PlaceVersion: number;
	PrivateServerId: string;
	PrivateServerOwnerId: number;
	RunService: Instance;
	Workspace: Workspace;
	/** @deprecated */
	lighting: Instance;
	/** @deprecated */
	workspace: Workspace;
	BindToClose(_function: Function): undefined;
	GetJobsInfo(): unknown;
	/** @deprecated */
	GetMessage(): string;
	/** @deprecated */
	GetRemoteBuildMode(): boolean;
	/** @deprecated */
	IsGearTypeAllowed(gearType: Enum.GearType): boolean;
	IsLoaded(): boolean;
	GetObjects(url: ContentId): Instances;
	SetPlaceId(placeId: number): undefined;
	SetUniverseId(universeId: number): undefined;
	/** @deprecated */
	SavePlace(saveFilter?: Enum.SaveFilter): boolean;
	/** @deprecated */
	readonly AllowedGearTypeChanged: RBXScriptSignal<() => void>;
	readonly GraphicsQualityChangeRequest: RBXScriptSignal<(betterQuality: boolean) => void>;
	/** @deprecated */
	readonly ItemChanged: RBXScriptSignal<(object: Instance, descriptor: string) => void>;
	readonly Loaded: RBXScriptSignal<() => void>;
	/** @deprecated */
	OnClose?: () => unknown;
}

interface GenericSettings extends ServiceProvider {
}

interface GlobalSettings extends GenericSettings {
	GetFFlag(name: string): boolean;
	GetFVariable(name: string): string;
}

interface UserSettings extends GenericSettings {
	IsUserFeatureEnabled(name: string): boolean;
	Reset(): undefined;
}

interface ServiceVisibilityService extends Instance {
}

interface SessionCheckService extends Instance {
}

interface SessionService extends Instance {
}

interface SharedTableRegistry extends Instance {
	GetSharedTable(name: string): SharedTable;
	SetSharedTable(name: string, st: SharedTable?): undefined;
}

interface Sky extends Instance {
	CelestialBodiesShown: boolean;
	MoonAngularSize: number;
	MoonTextureContent: Content;
	MoonTextureId: ContentId;
	SkyboxBackContent: Content;
	SkyboxBk: ContentId;
	SkyboxDn: ContentId;
	SkyboxDownContent: Content;
	SkyboxFrontContent: Content;
	SkyboxFt: ContentId;
	SkyboxLeftContent: Content;
	SkyboxLf: ContentId;
	SkyboxOrientation: Vector3;
	SkyboxRightContent: Content;
	SkyboxRt: ContentId;
	SkyboxUp: ContentId;
	SkyboxUpContent: Content;
	StarCount: number;
	SunAngularSize: number;
	SunTextureContent: Content;
	SunTextureId: ContentId;
}

interface SlimAnimationDataEntity extends Instance {
}

interface SlimAnimationReplicationService extends Instance {
}

interface SlimReplicationService extends Instance {
}

interface SlimService extends Instance {
}

interface Smoke extends Instance {
	Color: Color3;
	Enabled: boolean;
	Opacity: number;
	RiseVelocity: number;
	Size: number;
	TimeScale: number;
}

interface SmoothVoxelsUpgraderService extends Instance {
}

interface SnippetService extends Instance {
}

interface SocialService extends Instance {
	GetPlayersByPartyId(partyId: string): Instances;
	HideSelfView(): undefined;
	PromptGameInvite(player: Instance, experienceInviteOptions?: Instance): undefined;
	PromptPhoneBook(player: Instance, tag: string): undefined;
	ShowSelfView(selfViewPosition?: Enum.SelfViewPosition): undefined;
	CanSendCallInviteAsync(player: Instance): boolean;
	CanSendGameInviteAsync(player: Instance, recipientId?: number): boolean;
	GetEventRsvpStatusAsync(eventId: string): Enum.RsvpStatus;
	GetExperienceEventAsync(eventId: string): unknown;
	GetPartyAsync(partyId: string): unknown;
	GetUpcomingExperienceEventsAsync(): unknown;
	PromptFeedbackSubmissionAsync(): undefined;
	/** @deprecated */
	PromptLinkSharing(player: Player, options?: unknown): unknown;
	PromptLinkSharingAsync(player: Player, options?: unknown): unknown;
	PromptRsvpToEventAsync(eventId: string): Enum.RsvpStatus;
	readonly CallInviteStateChanged: RBXScriptSignal<(player: Instance, inviteState: Enum.InviteState) => void>;
	readonly GameInvitePromptClosed: RBXScriptSignal<(player: Instance, recipientIds: unknown) => void>;
	readonly PhoneBookPromptClosed: RBXScriptSignal<(player: Instance) => void>;
	readonly ShareSheetClosed: RBXScriptSignal<(player: Player) => void>;
	OnCallInviteInvoked?: (tag: string, callParticipantIds: unknown) => Instance;
}

interface Sound extends Instance {
	AcousticSimulationEnabled: boolean;
	/** @deprecated */
	EmitterSize: number;
	IsLoaded: boolean;
	LoopRegion: NumberRange;
	Looped: boolean;
	/** @deprecated */
	MaxDistance: number;
	/** @deprecated */
	MinDistance: number;
	/** @deprecated */
	Pitch: number;
	PlayOnRemove: boolean;
	PlaybackLoudness: number;
	PlaybackRegion: NumberRange;
	PlaybackRegionsEnabled: boolean;
	PlaybackSpeed: number;
	Playing: boolean;
	RollOffMaxDistance: number;
	RollOffMinDistance: number;
	RollOffMode: Enum.RollOffMode;
	SoundGroup: SoundGroup;
	SoundId: ContentId;
	TimeLength: number;
	TimePosition: number;
	Volume: number;
	/** @deprecated */
	isPlaying: boolean;
	Pause(): undefined;
	Play(): undefined;
	Resume(): undefined;
	Stop(): undefined;
	/** @deprecated */
	pause(): undefined;
	/** @deprecated */
	play(): undefined;
	/** @deprecated */
	stop(): undefined;
	readonly DidLoop: RBXScriptSignal<(soundId: string, numOfTimesLooped: number) => void>;
	readonly Ended: RBXScriptSignal<(soundId: string) => void>;
	readonly Loaded: RBXScriptSignal<(soundId: string) => void>;
	readonly Paused: RBXScriptSignal<(soundId: string) => void>;
	readonly Played: RBXScriptSignal<(soundId: string) => void>;
	readonly Resumed: RBXScriptSignal<(soundId: string) => void>;
	readonly Stopped: RBXScriptSignal<(soundId: string) => void>;
}

interface SoundEffect extends Instance {
	Enabled: boolean;
	Priority: number;
}

interface ChorusSoundEffect extends SoundEffect {
	Depth: number;
	Mix: number;
	Rate: number;
}

interface CompressorSoundEffect extends SoundEffect {
	Attack: number;
	GainMakeup: number;
	Ratio: number;
	Release: number;
	SideChain: Instance;
	Threshold: number;
}

interface CustomSoundEffect extends SoundEffect {
}

interface AssetSoundEffect extends CustomSoundEffect {
}

interface ChannelSelectorSoundEffect extends CustomSoundEffect {
	Channel: number;
}

interface DistortionSoundEffect extends SoundEffect {
	Level: number;
}

interface EchoSoundEffect extends SoundEffect {
	Delay: number;
	DryLevel: number;
	Feedback: number;
	WetLevel: number;
}

interface EqualizerSoundEffect extends SoundEffect {
	HighGain: number;
	LowGain: number;
	MidGain: number;
}

interface FlangeSoundEffect extends SoundEffect {
	Depth: number;
	Mix: number;
	Rate: number;
}

interface PitchShiftSoundEffect extends SoundEffect {
	Octave: number;
}

interface ReverbSoundEffect extends SoundEffect {
	DecayTime: number;
	Density: number;
	Diffusion: number;
	DryLevel: number;
	WetLevel: number;
}

interface TremoloSoundEffect extends SoundEffect {
	Depth: number;
	Duty: number;
	Frequency: number;
}

interface SoundGroup extends Instance {
	Volume: number;
}

interface SoundService extends Instance {
	AcousticSimulationEnabled: boolean;
	AmbientReverb: Enum.ReverbType;
	CharacterSoundsUseNewApi: Enum.RolloutState;
	DefaultListenerLocation: Enum.ListenerLocation;
	DistanceFactor: number;
	DopplerScale: number;
	RespectFilteringEnabled: boolean;
	RolloffScale: number;
	GetListener(): unknown;
	OpenAttenuationCurveEditor(selectedCurveObjects: Instances): undefined;
	OpenDirectionalCurveEditor(selectedCurveObjects: Instances): undefined;
	PlayLocalSound(sound: Instance): undefined;
	SetListener(listenerType: Enum.ListenerType, listener: unknown): undefined;
}

interface SoundShimService extends Instance {
}

interface Sparkles extends Instance {
	Enabled: boolean;
	SparkleColor: Color3;
	TimeScale: number;
}

interface SpawnerService extends Instance {
}

interface StackFrame extends Instance {
}

interface StandalonePluginScripts extends Instance {
}

interface StartPageService extends Instance {
}

interface StarterGear extends Instance {
}

interface StarterPack extends Instance {
}

interface StarterPlayer extends Instance {
	AutoJumpEnabled: boolean;
	CameraMaxZoomDistance: number;
	CameraMinZoomDistance: number;
	CameraMode: Enum.CameraMode;
	CharacterBreakJointsOnDeath: boolean;
	CharacterJumpHeight: number;
	CharacterJumpPower: number;
	CharacterMaxSlopeAngle: number;
	CharacterUseJumpPower: boolean;
	CharacterWalkSpeed: number;
	ClassicDeath: boolean;
	DevCameraOcclusionMode: Enum.DevCameraOcclusionMode;
	DevComputerCameraMovementMode: Enum.DevComputerCameraMovementMode;
	DevComputerMovementMode: Enum.DevComputerMovementMode;
	DevTouchCameraMovementMode: Enum.DevTouchCameraMovementMode;
	DevTouchMovementMode: Enum.DevTouchMovementMode;
	EnableMouseLockOption: boolean;
	HealthDisplayDistance: number;
	LoadCharacterAppearance: boolean;
	LuaCharacterController: Enum.CharacterControlMode;
	NameDisplayDistance: number;
	UserEmotesEnabled: boolean;
}

interface StarterPlayerScripts extends Instance {
}

interface StarterCharacterScripts extends StarterPlayerScripts {
}

interface StartupMessageService extends Instance {
}

interface Stats extends Instance {
	ContactsCount: number;
	DataReceiveKbps: number;
	DataSendKbps: number;
	FrameTime: number;
	HeartbeatTime: number;
	/** @deprecated */
	HeartbeatTimeMs: number;
	InstanceCount: number;
	MemoryTrackingEnabled: boolean;
	MovingPrimitivesCount: number;
	PhysicsReceiveKbps: number;
	PhysicsSendKbps: number;
	PhysicsStepTime: number;
	/** @deprecated */
	PhysicsStepTimeMs: number;
	PrimitivesCount: number;
	RenderCPUFrameTime: number;
	RenderGPUFrameTime: number;
	SceneDrawcallCount: number;
	SceneTriangleCount: number;
	ShadowsDrawcallCount: number;
	ShadowsTriangleCount: number;
	UI2DDrawcallCount: number;
	UI2DTriangleCount: number;
	UI3DDrawcallCount: number;
	UI3DTriangleCount: number;
	GetHarmonyQualityLevel(): number;
	GetMemoryCategoryNames(): unknown;
	GetMemoryUsageMbAllCategories(): unknown;
	GetMemoryUsageMbForTag(tag: Enum.DeveloperMemoryTag): number;
	GetTotalMemoryUsageMb(): number;
	ResetHarmonyMemoryTarget(): undefined;
	SetHarmonyMemoryTarget(targetMB: number): undefined;
}

interface StatsItem extends Instance {
	GetValue(): number;
	GetValueString(): string;
}

interface RunningAverageItemDouble extends StatsItem {
}

interface RunningAverageItemInt extends StatsItem {
}

interface RunningAverageTimeIntervalItem extends StatsItem {
}

interface TotalCountTimeIntervalItem extends StatsItem {
}

interface StopWatchReporter extends Instance {
}

interface StreamingService extends Instance {
	ExecuteCommandAsync(requestId: string, commandName: string, arg: unknown): unknown;
}

interface Studio extends Instance {
	ActionOnStopSync: Enum.ActionOnStopSync;
	["Active Color"]: Color3;
	["Active Hover Over Color"]: Color3;
	["Always Save Script Changes"]: boolean;
	["Animate Hover Over"]: boolean;
	["Auto Clean Empty Line"]: boolean;
	["Auto Closing Brackets"]: boolean;
	["Auto Closing Quotes"]: boolean;
	["Auto Delete Closing Brackets and Quotes"]: boolean;
	["Auto Indent Rule"]: Enum.AutoIndentRule;
	["Auto-Recovery Enabled"]: boolean;
	["Auto-Recovery Interval (Minutes)"]: number;
	["Background Color"]: Color3;
	["Basic Objects Display Mode"]: Enum.ListDisplayMode;
	["Bool Color"]: Color3;
	["Bracket Color"]: Color3;
	["Built-in Function Color"]: Color3;
	["Camera Mouse Wheel Speed"]: number;
	["Camera Shift Speed"]: number;
	["Camera Speed"]: number;
	["Camera Speed Adjust Binding"]: Enum.CameraSpeedAdjustBinding;
	["Camera Zoom to Mouse Position"]: boolean;
	["Clear Output On Start"]: boolean;
	CommandBarLocalState: boolean;
	["Comment Color"]: Color3;
	["Current Line Highlight Color"]: Color3;
	["Debugger Current Line Color"]: Color3;
	["Debugger Error Line Color"]: Color3;
	DeprecatedObjectsShown: boolean;
	["Enable Autocomplete"]: boolean;
	["Enable CoreScript Debugger"]: boolean;
	["Enable Http Sandboxing"]: boolean;
	["Enable Internal Beta Features"]: boolean;
	["Enable Internal Features"]: boolean;
	["Enable Temporary Tabs"]: boolean;
	["Enable Temporary Tabs In Explorer"]: boolean;
	["Error Color"]: Color3;
	["Find Selection Background Color"]: Color3;
	Font: QFont;
	["Format On Paste"]: boolean;
	["Format On Type"]: boolean;
	["Function Name Color"]: Color3;
	["Highlight Current Line"]: boolean;
	["Highlight Occurances"]: boolean;
	HintColor: Color3;
	["Hover Animate Speed"]: Enum.HoverAnimateSpeed;
	["Hover Over Color"]: Color3;
	["Indent Using Spaces"]: boolean;
	InformationColor: Color3;
	["Keyword Color"]: Color3;
	["Line Thickness"]: number;
	readonly LocalAssetsFolder: QDir;
	LuaDebuggerEnabled: boolean;
	["Luau Keyword Color"]: Color3;
	["Matching Word Background Color"]: Color3;
	["Maximum Output Lines"]: number;
	["Menu Item Background Color"]: Color3;
	["Method Color"]: Color3;
	["Number Color"]: Color3;
	["Only Play Audio from Window in Focus"]: boolean;
	["Operator Color"]: Color3;
	["Output Font"]: QFont;
	["Output Layout Mode"]: Enum.OutputLayoutMode;
	PermissionLevelShown: Enum.PermissionLevelShown;
	PluginDebuggingEnabled: boolean;
	PluginsDir: QDir;
	["Primary Text Color"]: Color3;
	["Property Color"]: Color3;
	["Respect Studio shortcuts when game has focus"]: boolean;
	["Ruler Color"]: Color3;
	Rulers: string;
	RuntimeUndoBehavior: Enum.RuntimeUndoBehavior;
	ScriptTimeoutLength: number;
	["Script Editor Color Preset"]: Enum.StudioScriptEditorColorPresets;
	["Script Editor Scrollbar Background Color"]: Color3;
	["Script Editor Scrollbar Handle Color"]: Color3;
	["Scroll Past Last Line"]: boolean;
	["Secondary Text Color"]: Color3;
	["Select Color"]: Color3;
	["Select/Hover Color"]: Color3;
	["Selected Menu Item Background Color"]: Color3;
	["Selected Text Color"]: Color3;
	["Selection Background Color"]: Color3;
	["Selection Color"]: Color3;
	["Set Pivot of Imported Parts"]: boolean;
	["Show Core GUI in Explorer while Playing"]: boolean;
	["Show Diagnostics Bar"]: boolean;
	["Show FileSyncService"]: boolean;
	["Show Hidden Objects in Explorer"]: boolean;
	["Show Hover Over"]: boolean;
	["Show Navigation Mesh"]: boolean;
	["Show Plugin GUI Service in Explorer"]: boolean;
	["Show Whitespace"]: boolean;
	["Show plus button on hover in Explorer"]: boolean;
	["Skip Closing Brackets and Quotes"]: boolean;
	["String Color"]: Color3;
	[""TODO" Color"]: Color3;
	["Tab Width"]: number;
	["Text Color"]: Color3;
	["Text Wrapping"]: boolean;
	Theme: Instance;
	["Warning Color"]: Color3;
	["Whitespace Color"]: Color3;
	[""function" Color"]: Color3;
	[""local" Color"]: Color3;
	[""nil" Color"]: Color3;
	[""self" Color"]: Color3;
	GetAvailableThemes(): unknown;
	readonly ThemeChanged: RBXScriptSignal<() => void>;
}

interface StudioAssetService extends Instance {
}

interface StudioAttachment extends Instance {
	AutoHideParent: boolean;
	IsArrowVisible: boolean;
	Offset: Vector2;
	SourceAnchorPoint: Vector2;
	TargetAnchorPoint: Vector2;
}

interface StudioCallout extends Instance {
}

interface StudioCameraService extends Instance {
}

interface StudioData extends Instance {
}

interface StudioDeviceEmulatorService extends Instance {
}

interface StudioObjectBase extends Instance {
}

interface StudioWidget extends StudioObjectBase {
}

interface StudioPublishService extends Instance {
}

interface StudioScriptDebugEventListener extends Instance {
}

interface StudioSdkService extends Instance {
}

interface StudioService extends Instance {
	ActiveScript: Instance;
	DraggerSolveConstraints: boolean;
	/** @deprecated */
	DrawConstraintsOnTop: boolean;
	GridSize: number;
	RotateIncrement: number;
	ShowConstraintDetails: boolean;
	StudioLocaleId: string;
	UseLocalSpace: boolean;
	GetClassIcon(className: string): unknown;
	GetUserId(): number;
	GizmoRaycast(origin: Vector3, direction: Vector3, raycastParams?: RaycastParams): RaycastResult?;
	/** @deprecated */
	PromptImportFile(fileTypeFilter?: unknown): Instance;
	PromptImportFileAsync(fileTypeFilter?: unknown): Instance;
	/** @deprecated */
	PromptImportFiles(fileTypeFilter?: unknown): Instances;
	PromptImportFilesAsync(fileTypeFilter?: unknown): Instances;
}

interface StudioTestService extends Instance {
	EndTest(value: unknown): undefined;
	GetTestArgs(): unknown;
	ExecutePlayModeAsync(args: unknown): unknown;
	ExecuteRunModeAsync(args: unknown): unknown;
}

interface StudioTheme extends Instance {
	GetColor(styleguideitem: Enum.StudioStyleGuideColor, modifier?: Enum.StudioStyleGuideModifier): Color3;
}

interface StudioUserService extends Instance {
}

interface StudioWidgetsService extends Instance {
}

interface StyleBase extends Instance {
	GetStyleRules(): Instances;
	InsertStyleRule(rule: StyleRule, priority: unknown): undefined;
	SetStyleRules(rules: Instances): undefined;
	readonly StyleRulesChanged: RBXScriptSignal<() => void>;
}

interface StyleRule extends StyleBase {
	Priority: number;
	Selector: string;
	SelectorError: string;
	GetProperties(): unknown;
	GetProperty(name: string): unknown;
	GetPropertyTransitions(): unknown;
	SetProperties(styleProperties: unknown): undefined;
	SetProperty(name: string, value: unknown): undefined;
	SetPropertyTransitions(properties: unknown): undefined;
}

interface StyleSheet extends StyleBase {
	GetDerives(): Instances;
	SetDerives(derives: Instances): undefined;
}

interface StyleDerive extends Instance {
	Priority: number;
	StyleSheet: StyleSheet;
}

interface StyleLink extends Instance {
	StyleSheet: StyleSheet;
}

interface StyleQuery extends Instance {
	IsActive: boolean;
	GetCondition(name: string): unknown;
	GetConditions(): unknown;
	SetCondition(name: string, value: unknown): undefined;
	SetConditions(conditions: unknown): undefined;
}

interface StylingService extends Instance {
}

interface SurfaceAppearance extends Instance {
	AlphaMode: Enum.AlphaMode;
	Color: Color3;
	ColorMap: ContentId;
	EmissiveMaskContent: Content;
	EmissiveStrength: number;
	EmissiveTint: Color3;
	MetalnessMap: ContentId;
	NormalMap: ContentId;
	RoughnessMap: ContentId;
}

interface SystemThemeService extends Instance {
}

interface TaskScheduler extends Instance {
	SchedulerDutyCycle: number;
	SchedulerRate: number;
	ThreadPoolConfig: Enum.ThreadPoolConfig;
	ThreadPoolSize: number;
}

interface Team extends Instance {
	AutoAssignable: boolean;
	/** @deprecated */
	AutoColorCharacters: boolean;
	/** @deprecated */
	Score: number;
	TeamColor: BrickColor;
	GetPlayers(): Instances;
	readonly PlayerAdded: RBXScriptSignal<(player: Player) => void>;
	readonly PlayerRemoved: RBXScriptSignal<(player: Player) => void>;
}

interface TeamCreateData extends Instance {
}

interface TeamCreatePublishService extends Instance {
}

interface TeamCreateService extends Instance {
}

interface Teams extends Instance {
	GetTeams(): Instances;
	/** @deprecated */
	RebalanceTeams(): undefined;
}

interface TelemetryService extends Instance {
}

interface TeleportAsyncResult extends Instance {
	PrivateServerId: string;
	ReservedServerAccessCode: string;
}

interface TeleportOptions extends Instance {
	ReservedServerAccessCode: string;
	ServerInstanceId: string;
	ShouldReserveServer: boolean;
	GetTeleportData(): unknown;
	SetTeleportData(teleportData: unknown): undefined;
}

interface TeleportService extends Instance {
	/** @deprecated */
	CustomizedTeleportUI: boolean;
	GetArrivingTeleportGui(): Instance;
	GetLocalPlayerTeleportData(): unknown;
	GetTeleportSetting(setting: string): unknown;
	SetTeleportGui(gui: Instance): undefined;
	SetTeleportSetting(setting: string, value: unknown): undefined;
	Teleport(placeId: number, player?: Instance, teleportData: unknown, customLoadingScreen?: Instance): undefined;
	TeleportToPlaceInstance(placeId: number, instanceId: string, player?: Instance, spawnName?: string, teleportData: unknown, customLoadingScreen?: Instance): undefined;
	TeleportToPrivateServer(placeId: number, reservedServerAccessCode: string, players: Instances, spawnName?: string, teleportData: unknown, customLoadingScreen?: Instance): undefined;
	TeleportToSpawnByName(placeId: number, spawnName: string, player?: Instance, teleportData: unknown, customLoadingScreen?: Instance): undefined;
	GetPlayerPlaceInstanceAsync(userId: number): unknown;
	PromptExperienceDetailsAsync(player: Player, universeId: number): Enum.PromptExperienceDetailsResult;
	/** @deprecated */
	ReserveServer(placeId: number): unknown;
	ReserveServerAsync(placeId: number): unknown;
	TeleportAsync(placeId: number, players: Instances, teleportOptions?: Instance): Instance;
	TeleportPartyAsync(placeId: number, players: Instances, teleportData: unknown, customLoadingScreen?: Instance): string;
	readonly LocalPlayerArrivedFromTeleport: RBXScriptSignal<(loadingGui: Instance, dataTable: unknown) => void>;
	readonly TeleportInitFailed: RBXScriptSignal<(player: Instance, teleportResult: Enum.TeleportResult, errorMessage: string, placeId: number, teleportOptions: Instance) => void>;
}

interface TemporaryCageMeshProvider extends Instance {
}

interface TemporaryScriptService extends Instance {
}

interface TerrainDetail extends Instance {
	ColorMap: ContentId;
	ColorMapContent: Content;
	EmissiveMaskContent: Content;
	EmissiveStrength: number;
	EmissiveTint: Color3;
	Face: Enum.TerrainFace;
	MaterialPattern: Enum.MaterialPattern;
	MetalnessMap: ContentId;
	MetalnessMapContent: Content;
	NormalMap: ContentId;
	NormalMapContent: Content;
	RoughnessMap: ContentId;
	RoughnessMapContent: Content;
	StudsPerTile: number;
}

interface TerrainRegion extends Instance {
	/** @deprecated */
	IsSmooth: boolean;
	SizeInCells: Vector3;
	/** @deprecated */
	ConvertToSmooth(): undefined;
}

interface TestService extends Instance {
	AutoRuns: boolean;
	Description: string;
	ErrorCount: number;
	ExecuteWithStudioRun: boolean;
	/** @deprecated */
	Is30FpsThrottleEnabled: boolean;
	IsPhysicsEnvironmentalThrottled: boolean;
	IsSleepAllowed: boolean;
	NumberOfPlayers: number;
	SimulateSecondsLag: number;
	TestCount: number;
	ThrottlePhysicsToRealtime: boolean;
	Timeout: number;
	WarnCount: number;
	Check(condition: boolean, description: string, source?: Instance, line?: number): undefined;
	Checkpoint(text: string, source?: Instance, line?: number): undefined;
	Done(): undefined;
	Error(description: string, source?: Instance, line?: number): undefined;
	Fail(description: string, source?: Instance, line?: number): undefined;
	Message(text: string, source?: Instance, line?: number): undefined;
	Require(condition: boolean, description: string, source?: Instance, line?: number): undefined;
	ScopeTime(): unknown;
	StartTestSession(): undefined;
	StopTestSession(): undefined;
	TakeSnapshot(snapshotname: string, source?: Instance): undefined;
	Warn(condition: boolean, description: string, source?: Instance, line?: number): undefined;
	getTestSessionProviderStats(providerName: string): unknown;
	isFeatureEnabled(name: string): boolean;
	/** @deprecated */
	Run(): undefined;
	RunAsync(): undefined;
	readonly ServerCollectConditionalResult: RBXScriptSignal<(condition: boolean, text: string, script: Instance, line: number) => void>;
	readonly ServerCollectResult: RBXScriptSignal<(text: string, script: Instance, line: number) => void>;
}

interface TextBoxService extends Instance {
}

interface TextChannel extends Instance {
	DirectChatRequester: Player;
	DisplaySystemMessage(systemMessage: string, metadata?: string): TextChatMessage;
	SetDirectChatRequester(requester: Player): undefined;
	AddUserAsync(userId: number): unknown;
	SendAsync(message: string, metadata?: string): TextChatMessage;
	readonly MessageReceived: RBXScriptSignal<(incomingMessage: TextChatMessage) => void>;
	OnIncomingMessage?: (message: TextChatMessage) => unknown;
	ShouldDeliverCallback?: (message: TextChatMessage, textSource: TextSource) => unknown;
}

interface TextChatCommand extends Instance {
	AutocompleteVisible: boolean;
	Enabled: boolean;
	PrimaryAlias: string;
	SecondaryAlias: string;
	readonly Triggered: RBXScriptSignal<(originTextSource: TextSource, unfilteredText: string) => void>;
}

interface TextChatConfigurations extends Instance {
}

interface BubbleChatConfiguration extends TextChatConfigurations {
	AdorneeName: string;
	BackgroundColor3: Color3;
	BackgroundTransparency: number;
	BubbleDuration: number;
	BubblesSpacing: number;
	Enabled: boolean;
	FontFace: Font;
	LocalPlayerStudsOffset: Vector3;
	MaxBubbles: number;
	MaxDistance: number;
	MinimizeDistance: number;
	TailVisible: boolean;
	TextColor3: Color3;
	TextSize: number;
	VerticalStudsOffset: number;
}

interface ChannelTabsConfiguration extends TextChatConfigurations {
	AbsolutePosition: Vector2;
	AbsoluteSize: Vector2;
	BackgroundColor3: Color3;
	BackgroundTransparency: number;
	Enabled: boolean;
	FontFace: Font;
	HoverBackgroundColor3: Color3;
	SelectedTabTextColor3: Color3;
	TextColor3: Color3;
	TextSize: number;
	TextStrokeColor3: Color3;
	TextStrokeTransparency: number;
}

interface ChatInputBarConfiguration extends TextChatConfigurations {
	AbsolutePosition: Vector2;
	AbsoluteSize: Vector2;
	AutocompleteEnabled: boolean;
	BackgroundColor3: Color3;
	BackgroundTransparency: number;
	Enabled: boolean;
	FontFace: Font;
	IsFocused: boolean;
	KeyboardKeyCode: Enum.KeyCode;
	PlaceholderColor3: Color3;
	TargetTextChannel: TextChannel;
	TextBox: TextBox;
	TextColor3: Color3;
	TextSize: number;
	TextStrokeColor3: Color3;
	TextStrokeTransparency: number;
}

interface ChatWindowConfiguration extends TextChatConfigurations {
	AbsolutePosition: Vector2;
	AbsoluteSize: Vector2;
	BackgroundColor3: Color3;
	BackgroundTransparency: number;
	Enabled: boolean;
	FontFace: Font;
	HeightScale: number;
	HorizontalAlignment: Enum.HorizontalAlignment;
	TextColor3: Color3;
	TextSize: number;
	TextStrokeColor3: Color3;
	TextStrokeTransparency: number;
	VerticalAlignment: Enum.VerticalAlignment;
	WidthScale: number;
	DeriveNewMessageProperties(): ChatWindowMessageProperties;
}

interface TextChatMessage extends Instance {
	BubbleChatMessageProperties: BubbleChatMessageProperties;
	ChatWindowMessageProperties: ChatWindowMessageProperties;
	MessageId: string;
	Metadata: string;
	PrefixText: string;
	Status: Enum.TextChatMessageStatus;
	Text: string;
	TextChannel: TextChannel;
	TextSource: TextSource;
	Timestamp: DateTime;
	Translation: string;
}

interface TextChatMessageProperties extends Instance {
	PrefixText: string;
	Text: string;
	Translation: string;
}

interface BubbleChatMessageProperties extends TextChatMessageProperties {
	BackgroundColor3: Color3;
	BackgroundTransparency: number;
	FontFace: Font;
	TailVisible: boolean;
	TextColor3: Color3;
	TextSize: number;
}

interface ChatWindowMessageProperties extends TextChatMessageProperties {
	FontFace: Font;
	PrefixTextProperties: ChatWindowMessageProperties;
	TextColor3: Color3;
	TextSize: number;
	TextStrokeColor3: Color3;
	TextStrokeTransparency: number;
}

interface TextChatService extends Instance {
	readonly ChatTranslationEnabled: boolean;
	readonly ChatVersion: Enum.ChatVersion;
	CreateDefaultCommands: boolean;
	CreateDefaultTextChannels: boolean;
	DisplayBubble(partOrCharacter: Instance, message: string): undefined;
	CanUserChatAsync(userId: number): boolean;
	CanUsersChatAsync(userIdFrom: number, userIdTo: number): boolean;
	CanUsersDirectChatAsync(requesterUserId: number, userIds: unknown): unknown;
	GetChatGroupsAsync(players: Instances): unknown;
	readonly BubbleDisplayed: RBXScriptSignal<(partOrCharacter: Instance, textChatMessage: TextChatMessage) => void>;
	readonly MessageReceived: RBXScriptSignal<(textChatMessage: TextChatMessage) => void>;
	readonly SendingMessage: RBXScriptSignal<(textChatMessage: TextChatMessage) => void>;
	OnBubbleAdded?: (message: TextChatMessage, adornee: Instance) => unknown;
	OnChatWindowAdded?: (message: TextChatMessage) => unknown;
	OnIncomingMessage?: (message: TextChatMessage) => unknown;
}

interface TextFilterResult extends Instance {
	/** @deprecated */
	GetChatForUserAsync(toUserId: number): string;
	GetNonChatStringForBroadcastAsync(): string;
	GetNonChatStringForUserAsync(toUserId: number): string;
}

interface TextFilterTranslatedResult extends Instance {
	SourceLanguage: string;
	SourceText: TextFilterResult;
	GetTranslationForLocale(locale: string): TextFilterResult;
	GetTranslations(): unknown;
}

interface TextGenerator extends Instance {
	Seed: number;
	SystemPrompt: string;
	Temperature: number;
	TopP: number;
	GenerateTextAsync(request: unknown): unknown;
}

interface TextService extends Instance {
	GetTextSize(string: string, fontSize: number, font: Enum.Font, frameSize: Vector2): Vector2;
	FilterAndTranslateStringAsync(stringToFilter: string, fromUserId: number, targetLocales: unknown, textContext?: Enum.TextFilterContext): TextFilterTranslatedResult;
	FilterStringAsync(stringToFilter: string, fromUserId: number, textContext?: Enum.TextFilterContext): TextFilterResult;
	GetFamilyInfoAsync(assetId: ContentId): unknown;
	GetTextBoundsAsync(params: GetTextBoundsParams): Vector2;
	GetTextSizeOffsetAsync(fontSize: number, font: Font): number;
}

interface TextSource extends Instance {
	CanSend: boolean;
	UserId: number;
}

interface TextureGenerationPartGroup extends Instance {
}

interface TextureGenerationService extends Instance {
}

interface TextureGenerationUnwrappingRequest extends Instance {
}

interface ThirdPartyUserService extends Instance {
}

interface ThreadState extends Instance {
}

interface TimerService extends Instance {
}

interface ToastNotificationService extends Instance {
}

interface TouchInputService extends Instance {
}

interface TouchTransmitter extends Instance {
}

interface TraceRouteService extends Instance {
}

interface TracerService extends Instance {
}

interface TrackerLodController extends Instance {
	AudioMode: Enum.TrackerLodFlagMode;
	VideoExtrapolationMode: Enum.TrackerExtrapolationFlagMode;
	VideoLodMode: Enum.TrackerLodValueMode;
	VideoMode: Enum.TrackerLodFlagMode;
}

interface TrackerStreamAnimation extends Instance {
}

interface Trail extends Instance {
	Attachment0: Attachment;
	Attachment1: Attachment;
	Brightness: number;
	Color: ColorSequence;
	Enabled: boolean;
	FaceCamera: boolean;
	Lifetime: number;
	LightEmission: number;
	LightInfluence: number;
	MaxLength: number;
	MinLength: number;
	Texture: ContentId;
	TextureLength: number;
	TextureMode: Enum.TextureMode;
	Transparency: NumberSequence;
	WidthScale: NumberSequence;
	Clear(): undefined;
}

interface Translator extends Instance {
	LocaleId: string;
	FormatByKey(key: string, args: unknown): string;
	Translate(context: Instance, text: string): string;
}

interface TutorialService extends Instance {
}

interface TweenBase extends Instance {
	PlaybackState: Enum.PlaybackState;
	Cancel(): undefined;
	Pause(): undefined;
	Play(): undefined;
	readonly Completed: RBXScriptSignal<(playbackState: Enum.PlaybackState) => void>;
}

interface Tween extends TweenBase {
	Instance: Instance;
	TweenInfo: TweenInfo;
}

interface TweenService extends Instance {
	Create(instance: Instance, tweenInfo: TweenInfo, propertyTable: unknown): Tween;
	GetValue(alpha: number, easingStyle: Enum.EasingStyle, easingDirection: Enum.EasingDirection): number;
	SmoothDamp(current: unknown, target: unknown, velocity: unknown, smoothTime: number, maxSpeed: unknown, dt: unknown): unknown;
}

interface UGCAvatarService extends Instance {
}

interface UGCValidationService extends Instance {
}

interface UIBase extends Instance {
}

interface UIComponent extends UIBase {
}

interface UIConstraint extends UIComponent {
}

interface UIAspectRatioConstraint extends UIConstraint {
	AspectRatio: number;
	AspectType: Enum.AspectType;
	DominantAxis: Enum.DominantAxis;
}

interface UISizeConstraint extends UIConstraint {
	MaxSize: Vector2;
	MinSize: Vector2;
}

interface UITextSizeConstraint extends UIConstraint {
	MaxTextSize: number;
	MinTextSize: number;
}

interface UICorner extends UIComponent {
	CornerRadius: UDim;
}

interface UIDragDetector extends UIComponent {
	ActivatedCursorIcon: ContentId;
	ActivatedCursorIconContent: Content;
	BoundingBehavior: Enum.UIDragDetectorBoundingBehavior;
	BoundingUI: GuiBase2d;
	CursorIcon: ContentId;
	CursorIconContent: Content;
	DragAxis: Vector2;
	DragRelativity: Enum.UIDragDetectorDragRelativity;
	DragRotation: number;
	DragSpace: Enum.UIDragDetectorDragSpace;
	DragStyle: Enum.UIDragDetectorDragStyle;
	DragUDim2: UDim2;
	Enabled: boolean;
	MaxDragAngle: number;
	MaxDragTranslation: UDim2;
	MinDragAngle: number;
	MinDragTranslation: UDim2;
	ReferenceUIInstance: GuiObject;
	ResponseStyle: Enum.UIDragDetectorResponseStyle;
	SelectionModeDragSpeed: UDim2;
	SelectionModeRotateSpeed: number;
	UIDragSpeedAxisMapping: Enum.UIDragSpeedAxisMapping;
	AddConstraintFunction(priority: number, _function: Function): RBXScriptConnection;
	GetReferencePosition(): UDim2;
	GetReferenceRotation(): number;
	SetDragStyleFunction(_function: Function): undefined;
	readonly DragContinue: RBXScriptSignal<(inputPosition: Vector2) => void>;
	readonly DragEnd: RBXScriptSignal<(inputPosition: Vector2) => void>;
	readonly DragStart: RBXScriptSignal<(inputPosition: Vector2) => void>;
}

interface UIFlexItem extends UIComponent {
	FlexMode: Enum.UIFlexMode;
	GrowRatio: number;
	ItemLineAlignment: Enum.ItemLineAlignment;
	ShrinkRatio: number;
}

interface UIGradient extends UIComponent {
	Color: ColorSequence;
	Enabled: boolean;
	Offset: Vector2;
	Rotation: number;
	Transparency: NumberSequence;
}

interface UILayout extends UIComponent {
}

interface UIGridStyleLayout extends UILayout {
	AbsoluteContentSize: Vector2;
	FillDirection: Enum.FillDirection;
	HorizontalAlignment: Enum.HorizontalAlignment;
	SortOrder: Enum.SortOrder;
	VerticalAlignment: Enum.VerticalAlignment;
	/** @deprecated */
	ApplyLayout(): undefined;
	/** @deprecated */
	SetCustomSortFunction(_function?: Function): undefined;
}

interface UIGridLayout extends UIGridStyleLayout {
	AbsoluteCellCount: Vector2;
	AbsoluteCellSize: Vector2;
	CellPadding: UDim2;
	CellSize: UDim2;
	FillDirectionMaxCells: number;
	StartCorner: Enum.StartCorner;
}

interface UIListLayout extends UIGridStyleLayout {
	HorizontalFlex: Enum.UIFlexAlignment;
	ItemLineAlignment: Enum.ItemLineAlignment;
	Padding: UDim;
	VerticalFlex: Enum.UIFlexAlignment;
	Wraps: boolean;
}

interface UIPageLayout extends UIGridStyleLayout {
	Animated: boolean;
	Circular: boolean;
	CurrentPage: GuiObject;
	EasingDirection: Enum.EasingDirection;
	EasingStyle: Enum.EasingStyle;
	GamepadInputEnabled: boolean;
	Padding: UDim;
	ScrollWheelInputEnabled: boolean;
	TouchInputEnabled: boolean;
	TweenTime: number;
	JumpTo(page: Instance): undefined;
	JumpToIndex(index: number): undefined;
	Next(): undefined;
	Previous(): undefined;
	readonly PageEnter: RBXScriptSignal<(page: Instance) => void>;
	readonly PageLeave: RBXScriptSignal<(page: Instance) => void>;
	readonly Stopped: RBXScriptSignal<(currentPage: Instance) => void>;
}

interface UITableLayout extends UIGridStyleLayout {
	FillEmptySpaceColumns: boolean;
	FillEmptySpaceRows: boolean;
	MajorAxis: Enum.TableMajorAxis;
	Padding: UDim2;
}

interface UIPadding extends UIComponent {
	PaddingBottom: UDim;
	PaddingLeft: UDim;
	PaddingRight: UDim;
	PaddingTop: UDim;
}

interface UIScale extends UIComponent {
	Scale: number;
}

interface UIStroke extends UIComponent {
	ApplyStrokeMode: Enum.ApplyStrokeMode;
	BorderOffset: UDim;
	BorderStrokePosition: Enum.BorderStrokePosition;
	Color: Color3;
	Enabled: boolean;
	LineJoinMode: Enum.LineJoinMode;
	StrokeSizingMode: Enum.StrokeSizingMode;
	Thickness: number;
	Transparency: number;
	ZIndex: number;
}

interface UIDragDetectorService extends Instance {
}

interface UniqueIdLookupService extends Instance {
	GetOrCreateUniqueIdRemoteCommand(instance: Instance): string;
}

interface UnvalidatedAssetService extends Instance {
}

interface UserGameSettings extends Instance {
	ComputerCameraMovementMode: Enum.ComputerCameraMovementMode;
	ComputerMovementMode: Enum.ComputerMovementMode;
	ControlMode: Enum.ControlMode;
	GamepadCameraSensitivity: number;
	MouseSensitivity: number;
	RCCProfilerRecordFrameRate: number;
	RCCProfilerRecordTimeFrame: number;
	RotationType: Enum.RotationType;
	SavedQualityLevel: Enum.SavedQualitySetting;
	TouchCameraMovementMode: Enum.TouchCameraMovementMode;
	TouchMovementMode: Enum.TouchMovementMode;
	readonly VRSmoothRotationEnabled: boolean;
	readonly VignetteEnabled: boolean;
	GetCameraYInvertValue(): number;
	GetOnboardingCompleted(onboardingId: string): boolean;
	InFullScreen(): boolean;
	InStudioMode(): boolean;
	SetCameraYInvertVisible(): undefined;
	SetGamepadCameraSensitivityVisible(): undefined;
	SetOnboardingCompleted(onboardingId: string): undefined;
	readonly FullscreenChanged: RBXScriptSignal<(isFullscreen: boolean) => void>;
	readonly StudioModeChanged: RBXScriptSignal<(isStudioMode: boolean) => void>;
}

interface UserInputService extends Instance {
	AccelerometerEnabled: boolean;
	GamepadEnabled: boolean;
	GyroscopeEnabled: boolean;
	KeyboardEnabled: boolean;
	/** @deprecated */
	ModalEnabled: boolean;
	MouseBehavior: Enum.MouseBehavior;
	MouseDeltaSensitivity: number;
	MouseEnabled: boolean;
	MouseIcon: ContentId;
	MouseIconContent: Content;
	MouseIconEnabled: boolean;
	OnScreenKeyboardPosition: Vector2;
	OnScreenKeyboardSize: Vector2;
	OnScreenKeyboardVisible: boolean;
	PreferredInput: Enum.PreferredInput;
	TouchEnabled: boolean;
	/** @deprecated */
	UserHeadCFrame: CFrame;
	VREnabled: boolean;
	GamepadSupports(gamepadNum: Enum.UserInputType, gamepadKeyCode: Enum.KeyCode): boolean;
	GetConnectedGamepads(): unknown;
	GetDeviceAcceleration(): InputObject;
	GetDeviceGravity(): InputObject;
	GetDeviceRotation(): unknown;
	GetFocusedTextBox(): TextBox;
	GetGamepadConnected(gamepadNum: Enum.UserInputType): boolean;
	GetGamepadState(gamepadNum: Enum.UserInputType): Instances;
	GetImageForKeyCode(keyCode: Enum.KeyCode): ContentId;
	GetKeysPressed(): Instances;
	GetLastInputType(): Enum.UserInputType;
	GetMouseButtonsPressed(): Instances;
	GetMouseDelta(): Vector2;
	GetMouseLocation(): Vector2;
	GetNavigationGamepads(): unknown;
	GetStringForKeyCode(keyCode: Enum.KeyCode): string;
	GetSupportedGamepadKeyCodes(gamepadNum: Enum.UserInputType): unknown;
	/** @deprecated */
	GetUserCFrame(type: Enum.UserCFrame): CFrame;
	IsGamepadButtonDown(gamepadNum: Enum.UserInputType, gamepadKeyCode: Enum.KeyCode): boolean;
	IsKeyDown(keyCode: Enum.KeyCode): boolean;
	IsMouseButtonPressed(mouseButton: Enum.UserInputType): boolean;
	IsNavigationGamepad(gamepadEnum: Enum.UserInputType): boolean;
	RecenterUserHeadCFrame(): undefined;
	SetNavigationGamepad(gamepadEnum: Enum.UserInputType, enabled: boolean): undefined;
	readonly DeviceAccelerationChanged: RBXScriptSignal<(acceleration: InputObject) => void>;
	readonly DeviceGravityChanged: RBXScriptSignal<(gravity: InputObject) => void>;
	readonly DeviceRotationChanged: RBXScriptSignal<(rotation: InputObject, cframe: CFrame) => void>;
	readonly GamepadConnected: RBXScriptSignal<(gamepadNum: Enum.UserInputType) => void>;
	readonly GamepadDisconnected: RBXScriptSignal<(gamepadNum: Enum.UserInputType) => void>;
	readonly InputBegan: RBXScriptSignal<(input: InputObject, gameProcessedEvent: boolean) => void>;
	readonly InputChanged: RBXScriptSignal<(input: InputObject, gameProcessedEvent: boolean) => void>;
	readonly InputEnded: RBXScriptSignal<(input: InputObject, gameProcessedEvent: boolean) => void>;
	readonly JumpRequest: RBXScriptSignal<() => void>;
	readonly LastInputTypeChanged: RBXScriptSignal<(lastInputType: Enum.UserInputType) => void>;
	readonly PointerAction: RBXScriptSignal<(wheel: number, pan: Vector2, pinch: number, gameProcessedEvent: boolean) => void>;
	readonly TextBoxFocusReleased: RBXScriptSignal<(textboxReleased: TextBox) => void>;
	readonly TextBoxFocused: RBXScriptSignal<(textboxFocused: TextBox) => void>;
	readonly TouchDrag: RBXScriptSignal<(dragDirection: Enum.SwipeDirection, numberOfTouches: number, gameProcessedEvent: boolean) => void>;
	readonly TouchEnded: RBXScriptSignal<(touch: InputObject, gameProcessedEvent: boolean) => void>;
	readonly TouchLongPress: RBXScriptSignal<(touchPositions: unknown, state: Enum.UserInputState, gameProcessedEvent: boolean) => void>;
	readonly TouchMoved: RBXScriptSignal<(touch: InputObject, gameProcessedEvent: boolean) => void>;
	readonly TouchPan: RBXScriptSignal<(touchPositions: unknown, totalTranslation: Vector2, velocity: Vector2, state: Enum.UserInputState, gameProcessedEvent: boolean) => void>;
	readonly TouchPinch: RBXScriptSignal<(touchPositions: unknown, scale: number, velocity: number, state: Enum.UserInputState, gameProcessedEvent: boolean) => void>;
	readonly TouchRotate: RBXScriptSignal<(touchPositions: unknown, rotation: number, velocity: number, state: Enum.UserInputState, gameProcessedEvent: boolean) => void>;
	readonly TouchStarted: RBXScriptSignal<(touch: InputObject, gameProcessedEvent: boolean) => void>;
	readonly TouchSwipe: RBXScriptSignal<(swipeDirection: Enum.SwipeDirection, numberOfTouches: number, gameProcessedEvent: boolean) => void>;
	readonly TouchTap: RBXScriptSignal<(touchPositions: unknown, gameProcessedEvent: boolean) => void>;
	readonly TouchTapInWorld: RBXScriptSignal<(position: Vector2, processedByUI: boolean) => void>;
	/** @deprecated */
	readonly UserCFrameChanged: RBXScriptSignal<(type: Enum.UserCFrame, value: CFrame) => void>;
	readonly WindowFocusReleased: RBXScriptSignal<() => void>;
	readonly WindowFocused: RBXScriptSignal<() => void>;
}

interface UserService extends Instance {
	GetUserInfosByUserIdsAsync(userIds: unknown): unknown;
}

interface VRService extends Instance {
	AutomaticScaling: Enum.VRScaling;
	AvatarGestures: boolean;
	ControllerModels: Enum.VRControllerModelMode;
	FadeOutViewOnCollision: boolean;
	GuiInputUserCFrame: Enum.UserCFrame;
	LaserPointer: Enum.VRLaserPointerMode;
	ThirdPersonFollowCamEnabled: boolean;
	VREnabled: boolean;
	GetTouchpadMode(pad: Enum.VRTouchpad): Enum.VRTouchpadMode;
	GetUserCFrame(type: Enum.UserCFrame): CFrame;
	GetUserCFrameEnabled(type: Enum.UserCFrame): boolean;
	RecenterUserHeadCFrame(): undefined;
	RequestNavigation(cframe: CFrame, inputUserCFrame: Enum.UserCFrame): undefined;
	SetTouchpadMode(pad: Enum.VRTouchpad, mode: Enum.VRTouchpadMode): undefined;
	readonly NavigationRequested: RBXScriptSignal<(cframe: CFrame, inputUserCFrame: Enum.UserCFrame) => void>;
	readonly TouchpadModeChanged: RBXScriptSignal<(pad: Enum.VRTouchpad, mode: Enum.VRTouchpadMode) => void>;
	readonly UserCFrameChanged: RBXScriptSignal<(type: Enum.UserCFrame, value: CFrame) => void>;
	readonly UserCFrameEnabled: RBXScriptSignal<(type: Enum.UserCFrame, enabled: boolean) => void>;
}

interface VRStatusService extends Instance {
}

interface ValueBase extends Instance {
}

interface BinaryStringValue extends ValueBase {
	readonly Changed: RBXScriptSignal<(value: string) => void>;
}

interface BoolValue extends ValueBase {
	Value: boolean;
	readonly Changed: RBXScriptSignal<(value: boolean) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: boolean) => void>;
}

interface BrickColorValue extends ValueBase {
	Value: BrickColor;
	readonly Changed: RBXScriptSignal<(value: BrickColor) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: BrickColor) => void>;
}

interface CFrameValue extends ValueBase {
	Value: CFrame;
	readonly Changed: RBXScriptSignal<(value: CFrame) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: CFrame) => void>;
}

interface Color3Value extends ValueBase {
	Value: Color3;
	readonly Changed: RBXScriptSignal<(value: Color3) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: Color3) => void>;
}

/** @deprecated */
interface DoubleConstrainedValue extends ValueBase {
	MaxValue: number;
	MinValue: number;
	Value: number;
	readonly Changed: RBXScriptSignal<(value: number) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: number) => void>;
}

/** @deprecated */
interface IntConstrainedValue extends ValueBase {
	MaxValue: number;
	MinValue: number;
	Value: number;
	readonly Changed: RBXScriptSignal<(value: number) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: number) => void>;
}

interface IntValue extends ValueBase {
	Value: number;
	readonly Changed: RBXScriptSignal<(value: number) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: number) => void>;
}

interface NumberValue extends ValueBase {
	Value: number;
	readonly Changed: RBXScriptSignal<(value: number) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: number) => void>;
}

interface ObjectValue extends ValueBase {
	Value: Instance;
	readonly Changed: RBXScriptSignal<(value: Instance) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: Instance) => void>;
}

interface RayValue extends ValueBase {
	Value: Ray;
	readonly Changed: RBXScriptSignal<(value: Ray) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: Ray) => void>;
}

interface StringValue extends ValueBase {
	Value: string;
	readonly Changed: RBXScriptSignal<(value: string) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: string) => void>;
}

interface Vector3Value extends ValueBase {
	Value: Vector3;
	readonly Changed: RBXScriptSignal<(value: Vector3) => void>;
	/** @deprecated */
	readonly changed: RBXScriptSignal<(value: Vector3) => void>;
}

interface ValueCurve extends Instance {
	Length: number;
	ValueType: string;
	GetKeyAtIndex(index: number): ValueCurveKey;
	GetKeyIndicesAtTime(time: number): unknown;
	GetKeys(): unknown;
	GetValueAtTime(time: number): unknown;
	InsertKey(key: ValueCurveKey): unknown;
	InsertKeyValue(time: number, value: unknown, keyInterpolationMode?: Enum.KeyInterpolationMode): unknown;
	RemoveKeyAtIndex(startingIndex: number, count?: number): number;
	SetKeys(keys: unknown): number;
}

interface Vector3Curve extends Instance {
	GetValueAtTime(time: number): unknown;
	X(): FloatCurve;
	Y(): FloatCurve;
	Z(): FloatCurve;
}

interface VersionControlService extends Instance {
}

interface VideoCaptureService extends Instance {
}

interface VideoDeviceInput extends Instance {
	Active: boolean;
	CameraId: string;
	CaptureQuality: Enum.VideoDeviceCaptureQuality;
	IsReady: boolean;
}

interface VideoPlayer extends Instance {
	IsLoaded: boolean;
	IsPlaying: boolean;
	Looping: boolean;
	PlaybackSpeed: number;
	Resolution: Vector2;
	TimeLength: number;
	TimePosition: number;
	VideoContent: Content;
	Volume: number;
	GetConnectedWires(pin: string): Instances;
	GetInputPins(): unknown;
	GetOutputPins(): unknown;
	Pause(): undefined;
	Play(): undefined;
	Unload(): undefined;
	LoadAsync(): Enum.AssetFetchStatus;
	readonly DidEnd: RBXScriptSignal<() => void>;
	readonly DidLoop: RBXScriptSignal<() => void>;
	readonly PlayFailed: RBXScriptSignal<(error: Enum.AssetFetchStatus) => void>;
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface VideoScreenCaptureService extends Instance {
}

interface VideoService extends Instance {
	CreateVideoSamplerAsync(content: Content, options: unknown): VideoSampler;
}

interface VirtualInputManager extends Instance {
}

interface VirtualUser extends Instance {
}

interface VisibilityCheckDispatcher extends Instance {
}

interface Visit extends Instance {
}

interface VisualizationMode extends Instance {
}

interface VisualizationModeCategory extends Instance {
}

interface VisualizationModeService extends Instance {
}

interface VoiceChatInternal extends Instance {
	/** @deprecated */
	GetAudioProcessingSettings(): unknown;
	/** @deprecated */
	GetMicDevices(): unknown;
	/** @deprecated */
	GetParticipants(): unknown;
	/** @deprecated */
	GetSpeakerDevices(): unknown;
	/** @deprecated */
	GetVoiceChatApiVersion(): number;
	/** @deprecated */
	GetVoiceChatAvailable(): number;
	/** @deprecated */
	IsPublishPaused(): boolean;
	/** @deprecated */
	IsSubscribePaused(userId: number): boolean;
	/** @deprecated */
	JoinByGroupId(groupId: string, isMicMuted?: boolean): boolean;
	/** @deprecated */
	JoinByGroupIdToken(groupId: string, isMicMuted: boolean, isRetry?: boolean): boolean;
	/** @deprecated */
	Leave(): undefined;
	/** @deprecated */
	PublishPause(paused: boolean): boolean;
	/** @deprecated */
	SetMicDevice(micDeviceName: string, micDeviceGuid: string): undefined;
	/** @deprecated */
	SetSpeakerDevice(speakerDeviceName: string, speakerDeviceGuid: string): undefined;
	/** @deprecated */
	SubscribePause(userId: number, paused: boolean): boolean;
	/** @deprecated */
	SubscribePauseAll(paused: boolean): boolean;
	IsVoiceEnabledForUserIdAsync(userId: number): boolean;
	/** @deprecated */
	readonly StateChanged: RBXScriptSignal<(old: Enum.VoiceChatState, _new: Enum.VoiceChatState) => void>;
}

interface VoiceChatService extends Instance {
	DefaultDistanceAttenuation: Enum.VoiceChatDistanceAttenuationType;
	EnableDefaultVoice: boolean;
	UseAudioApi: Enum.AudioApiRollout;
	GetChatGroupsAsync(players: Instances): unknown;
	IsVoiceEnabledForUserIdAsync(userId: number): boolean;
}

interface WebSocketClient extends Instance {
	ConnectionState: Enum.WebSocketState;
	Close(): undefined;
	Send(data: string): undefined;
	readonly Closed: RBXScriptSignal<() => void>;
	readonly MessageReceived: RBXScriptSignal<(data: string) => void>;
	readonly Opened: RBXScriptSignal<() => void>;
}

interface WebSocketService extends Instance {
	CreateClient(uri: string): WebSocketClient;
}

interface WebViewService extends Instance {
}

interface WeldConstraint extends Instance {
	Active: boolean;
	Enabled: boolean;
	Part0: BasePart;
	Part1: BasePart;
}

interface Wire extends Instance {
	Connected: boolean;
	SourceInstance: Instance;
	SourceName: string;
	TargetInstance: Instance;
	TargetName: string;
}

interface WrapDeformMeshProvider extends Instance {
}

interface WrapTextureTransfer extends Instance {
	ReferenceCageMeshContent: Content;
	UVMaxBound: Vector2;
	UVMinBound: Vector2;
}

interface MLSession extends Object {
	ForwardAsync(data: unknown): unknown;
}

interface TerrainIterateOperation extends Object {
	CommitBlock(block: unknown): RBXScriptSignal;
	readonly Ready: RBXScriptSignal<(block: unknown) => void>;
}

interface TerrainModifyOperation extends Object {
	CommitBlock(block: unknown): RBXScriptSignal;
	readonly Ready: RBXScriptSignal<(block: unknown) => void>;
}

interface TerrainReadOperation extends Object {
	readonly Ready: RBXScriptSignal<(block: unknown) => void>;
}

interface TerrainWriteOperation extends Object {
	CommitBlock(block: unknown): RBXScriptSignal;
	GetBlock(): unknown;
}

interface VideoSampler extends Object {
	TimeLength: number;
	VideoContent: Content;
	GetSamplesAtTimesAsync(times: unknown): unknown;
}

interface WebStreamClient extends Object {
	ConnectionState: Enum.WebStreamClientState;
	Close(): undefined;
	Send(data: string): undefined;
	readonly Closed: RBXScriptSignal<() => void>;
	readonly Error: RBXScriptSignal<(responseStatusCode: number, errorMessage: string) => void>;
	readonly MessageReceived: RBXScriptSignal<(message: string) => void>;
	readonly Opened: RBXScriptSignal<(responseStatusCode: number, headers: string) => void>;
}

// Auto-generated from Roblox API Dump + creator-docs — do not edit manually
// Run `bun run generate` to regenerate

/** `Object` is the base class for all classes in the Roblox class hierarchy. */
interface Object {
	/** A read-only string representing the class this `Object` belongs to. */
	ClassName: string;
	/** @deprecated Deprecated. */
	className: string;
	/** Get an event that fires when a given property of the object changes. */
	GetPropertyChangedSignal(property?: string): RBXScriptSignal;
	/** Returns true if an object's class matches or inherits from a given class. */
	IsA(className?: string): boolean;
	/** @deprecated Deprecated. */
	isA(className?: string): boolean;
	/**
	 * Fires immediately after a property of the object changes, with some limitations.
	 */
	readonly Changed: RBXScriptSignal<(property: string) => void>;
}

interface AnimationNode extends Object {
}

/**
 * A class which defines a piece of content, such as a screenshot or video, taken in-experience.
 */
interface Capture extends Object {
	CaptureTime: DateTime;
	CaptureType: Enum.CaptureType;
	LocalId: string;
	SourcePlaceId: number;
	SourceUniverseId: number;
}

/** A child class of `Capture` for screenshots. */
interface ScreenshotCapture extends Capture {
}

/** A child class of `Capture` for videos. */
interface VideoCapture extends Capture {
	TimeLength: number;
}

/** A snapshot of configuration values at a given version. Can be player-specific. */
interface ConfigSnapshot extends Object {
	/** Populated if snapshot was in an error state. */
	Error: Enum.ConfigSnapshotErrorState;
	/**
	 * If true, indicates the snapshot is outdated and can be refreshed to newer values.
	 */
	Outdated: boolean;
	/** Returns the value for the given key. */
	GetValue(key?: string): unknown;
	/**
	 * Returns a signal that fires when the value for the given key changes due to a refresh.
	 */
	GetValueChangedSignal(key?: string): RBXScriptSignal;
	/** Refreshes the snapshot to the latest configuration values. */
	Refresh(): undefined;
	/** Fires when a newer version of the configuration is available. */
	readonly UpdateAvailable: RBXScriptSignal<() => void>;
}

/** Instance which allows for the runtime creation and manipulation of images. */
interface EditableImage extends Object {
	/** Size of the `EditableImage` in pixels. */
	Size: Vector2;
	Destroy(): undefined;
	/** Draws a circle at the specified point. */
	DrawCircle(center?: Vector2, radius?: number, color?: Color3, transparency?: number, combineType?: Enum.ImageCombineType): undefined;
	/** Draws another `EditableImage` into this `EditableImage` at the given position. */
	DrawImage(position?: Vector2, image?: EditableImage, combineType?: Enum.ImageCombineType): undefined;
	/**
	 * Projects another `EditableImage` into an `EditableMesh` and stores the result on this `EditableImage`.
	 */
	DrawImageProjected(mesh?: EditableMesh, projection?: unknown, brushConfig?: unknown): undefined;
	/**
	 * Draws an image into this `EditableImage` with transformations including scaling and rotation, placing it at the specified position.
	 */
	DrawImageTransformed(position?: Vector2, scale?: Vector2, rotation?: number, image?: EditableImage, options?: unknown): undefined;
	/** Draws a line between two provided points. */
	DrawLine(p1?: Vector2, p2?: Vector2, color?: Color3, transparency?: number, combineType?: Enum.ImageCombineType): undefined;
	/** Draws a rectangle of the given size at the given top-left position. */
	DrawRectangle(position?: Vector2, size?: Vector2, color?: Color3, transparency?: number, combineType?: Enum.ImageCombineType): undefined;
	/** Reads a rectangular region of pixels into a buffer. */
	ReadPixelsBuffer(position?: Vector2, size?: Vector2): buffer;
	/** Writes a rectangular region of pixels into the image. */
	WritePixelsBuffer(position?: Vector2, size?: Vector2, buffer?: buffer): undefined;
}

/** Instance which allows for the runtime creation and manipulation of meshes. */
interface EditableMesh extends Object {
	/** Returns `true` if a mesh is fixed-size. */
	FixedSize: boolean;
	/** @deprecated Deprecated. */
	SkinningEnabled: boolean;
	/** Adds a new bone and returns a stable bone ID. */
	AddBone(boneProperties?: unknown): number;
	/** Adds a new color to the geometry and returns a stable color ID. */
	AddColor(color?: Color3, alpha?: number): number;
	AddFace(vertexIds: unknown): number;
	/** Adds a new normal to the geometry and returns a stable normal ID. */
	AddNormal(normal?: Vector3?): number;
	/** Adds a new triangle to the mesh and returns a stable face ID. */
	AddTriangle(vertexId0?: number, vertexId1?: number, vertexId2?: number): number;
	/** Adds a new UV to the geometry and returns a stable UV ID. */
	AddUV(uv?: Vector2): number;
	/** Adds a new vertex to the geometry and returns a stable vertex ID. */
	AddVertex(p?: Vector3): number;
	/** Destroys the mesh. */
	Destroy(): undefined;
	/** Finds the closest point on the mesh's surface. */
	FindClosestPointOnSurface(point?: Vector3): unknown;
	/** Finds the closest vertex to a specific point in space. */
	FindClosestVertex(toThisPoint?: Vector3): number;
	/** Finds all vertices within a specific sphere. */
	FindVerticesWithinSphere(center?: Vector3, radius?: number): unknown;
	/** Returns a list of faces adjacent to a given face. */
	GetAdjacentFaces(faceId?: number): unknown;
	/** Returns a list of vertices adjacent to a given vertex. */
	GetAdjacentVertices(vertexId?: number): unknown;
	/** Finds the bone ID of the bone with the given name. */
	GetBoneByName(boneName?: string): number;
	/** Returns the initial `CFrame` of the bone in the bind pose of the mesh. */
	GetBoneCFrame(boneId?: number): CFrame;
	/** Returns `true` if the bone is virtual. */
	GetBoneIsVirtual(boneId?: number): boolean;
	/** Returns the bone name. */
	GetBoneName(boneId?: number): string;
	/** Returns the parent bone ID, if any. */
	GetBoneParent(boneId?: number): number;
	/** Returns all bones of the mesh. */
	GetBones(): unknown;
	GetCenter(): Vector3;
	/** Returns the color for the given color ID. */
	GetColor(colorId?: number): Color3?;
	/** Returns the color alpha (transparency) at the given color ID. */
	GetColorAlpha(colorId?: number): unknown;
	/** Returns all colors of the mesh. */
	GetColors(): unknown;
	/** Returns the face's color IDs for the vertices on the face. */
	GetFaceColors(faceId?: number): unknown;
	/** Returns the face's normal IDs for the vertices on the face. */
	GetFaceNormals(faceId?: number): unknown;
	/** Returns the face's UV IDs for the vertices on the face. */
	GetFaceUVs(faceId?: number): unknown;
	/** Returns the face's vertex IDs. */
	GetFaceVertices(faceId?: number): unknown;
	/** Returns all faces of the mesh. */
	GetFaces(): unknown;
	/**
	 * Returns a list of faces that use a given attribute ID.
	 * @deprecated Deprecated.
	 */
	GetFacesWithAttribute(id?: number): unknown;
	/** Returns an array of face IDs that use the given color ID. */
	GetFacesWithColor(colorId?: number): unknown;
	/** Returns an array of face IDs that use the given normal ID. */
	GetFacesWithNormal(normalId?: number): unknown;
	/** Returns an array of face IDs that use the given UV ID. */
	GetFacesWithUV(uvId?: number): unknown;
	/**
	 * Returns bone IDs and bone `CFrames` for all bones in a specific FACS corrective pose.
	 */
	GetFacsCorrectivePose(actions?: unknown): unknown;
	/** Returns all FACS corrective poses that are in use. */
	GetFacsCorrectivePoses(): unknown;
	/**
	 * Returns bone IDs and bone `CFrames` for all bones in a specific FACS action unit.
	 */
	GetFacsPose(action?: Enum.FacsActionUnit): unknown;
	/** Returns all FACS action units that have poses defined. */
	GetFacsPoses(): unknown;
	/** Returns the normal vector for the given normal ID. */
	GetNormal(normalId?: number): Vector3?;
	/** Returns all normals of the mesh. */
	GetNormals(): unknown;
	/** Gets the position of a vertex. */
	GetPosition(vertexId?: number): Vector3;
	GetSize(): Vector3;
	/** Returns UV coordinates at the given UV ID. */
	GetUV(uvId?: number): Vector2?;
	/** Returns all UVs of the mesh. */
	GetUVs(): unknown;
	/**
	 * Returns skinning blend weights for each bone that is associated with the vertex.
	 */
	GetVertexBoneWeights(vertexId?: number): unknown;
	/** Returns all bone IDs that are associated with the vertex for skinning. */
	GetVertexBones(vertexId?: number): unknown;
	/** Returns the color IDs of the faces attached to the given vertex. */
	GetVertexColors(vertexId?: number): unknown;
	/** Returns the color ID of a vertex/face pair. */
	GetVertexFaceColor(vertexId?: number, faceId?: number): number;
	/** Returns the normal ID of a vertex/face pair. */
	GetVertexFaceNormal(vertexId?: number, faceId?: number): number;
	/** Returns the UV ID of a vertex/face pair. */
	GetVertexFaceUV(vertexId?: number, faceId?: number): number;
	/** Returns the face IDs of the faces attached to the given vertex. */
	GetVertexFaces(vertexId?: number): unknown;
	/** Returns the normal IDs of the faces attached to the given vertex. */
	GetVertexNormals(vertexId?: number): unknown;
	/** Returns the UV IDs of the faces attached to the given vertex. */
	GetVertexUVs(vertexId?: number): unknown;
	/** Returns all vertices as a list of stable vertex IDs. */
	GetVertices(): unknown;
	/**
	 * Returns a list of vertices that use a given attribute ID.
	 * @deprecated Deprecated.
	 */
	GetVerticesWithAttribute(id?: number): unknown;
	/** Returns an array of vertex IDs that use the given color ID. */
	GetVerticesWithColor(colorId?: number): unknown;
	/** Returns an array of vertex IDs that use the given normal ID. */
	GetVerticesWithNormal(normalId?: number): unknown;
	/** Returns an array of vertex IDs that use the given UV ID. */
	GetVerticesWithUV(uvId?: number): unknown;
	/** Returns a string describing a stable ID, useful for debugging purposes. */
	IdDebugString(id?: number): string;
	/** Merges vertices that touch together. */
	MergeVertices(mergeTolerance?: number): unknown;
	RaycastLocal(origin?: Vector3, direction?: Vector3): unknown;
	/** Removes a bone using its stable bone ID. */
	RemoveBone(boneId?: number): undefined;
	/** Removes a face using its stable face ID. */
	RemoveFace(faceId?: number): undefined;
	/**
	 * Removes all unused vertices, normals, UVs, and colors, and returns the removed IDs.
	 */
	RemoveUnused(): unknown;
	/** Reset this normal ID to be automatically calculated. */
	ResetNormal(normalId?: number): undefined;
	/** Set the initial `CFrame` for a bone in the mesh's bind pose. */
	SetBoneCFrame(boneId?: number, cframe?: CFrame): undefined;
	/** Set whether a bone is virtual. */
	SetBoneIsVirtual(boneId?: number, virtual?: boolean): undefined;
	/** Sets the name for a bone. */
	SetBoneName(boneId?: number, name?: string): undefined;
	/** Set a parent for a bone. */
	SetBoneParent(boneId?: number, parentBoneId?: number): undefined;
	/** Sets the color for a color ID. */
	SetColor(colorId?: number, color?: Color3): undefined;
	/** Sets the color alpha (transparency) for a color ID. */
	SetColorAlpha(colorId?: number, alpha?: number): undefined;
	/** Sets the face's vertex colors to new color IDs. */
	SetFaceColors(faceId?: number, ids?: unknown): undefined;
	/** Sets the face's vertex normals to new normal IDs. */
	SetFaceNormals(faceId?: number, ids?: unknown): undefined;
	/** Sets the face's vertex UVs to new UV IDs. */
	SetFaceUVs(faceId?: number, ids?: unknown): undefined;
	/** Sets the face's vertices to new vertex IDs. */
	SetFaceVertices(faceId?: number, ids?: unknown): undefined;
	/** Set `CFrame` for an individual bone in a specific FACS action unit. */
	SetFacsBonePose(action?: Enum.FacsActionUnit, boneId?: number, cframe?: CFrame): undefined;
	/** Set pose for all bones in a specific FACS corrective pose. */
	SetFacsCorrectivePose(actions?: unknown, boneIds?: unknown, cframes?: unknown): undefined;
	/** Set pose for all bones in a specific FACS action unit. */
	SetFacsPose(action?: Enum.FacsActionUnit, boneIds?: unknown, cframes?: unknown): undefined;
	/** Set the normal for a normal ID. */
	SetNormal(normalId?: number, normal?: Vector3): undefined;
	/** Sets a vertex position in the mesh's local object space. */
	SetPosition(vertexId?: number, p?: Vector3): undefined;
	/** Sets UV coordinates for a UV ID. */
	SetUV(uvId?: number, uv?: Vector2): undefined;
	/** Sets skinning blend weights for each bone associated with the vertex. */
	SetVertexBoneWeights(vertexId?: number, boneWeights?: unknown): undefined;
	/** Assign a list of bones with the vertex for skinning. */
	SetVertexBones(vertexId?: number, boneIDs?: unknown): undefined;
	/** Sets the color ID of a vertex/face pair. */
	SetVertexFaceColor(vertexId?: number, faceId?: number, colorId?: number): undefined;
	/** Sets the normal ID of a vertex/face pair. */
	SetVertexFaceNormal(vertexId?: number, faceId?: number, normalId?: number): undefined;
	/** Sets the UV ID of a vertex/face pair. */
	SetVertexFaceUV(vertexId?: number, faceId?: number, uvId?: number): undefined;
	/** Splits all faces on the mesh to be triangles. */
	Triangulate(): undefined;
}

interface ExecutedRemoteCommand extends Object {
	RunMoreCode(code: string, ...args: unknown[]): undefined;
	SendUpdate(...args: unknown[]): undefined;
	Stop(): undefined;
	readonly ReceivedUpdate: RBXScriptSignal<(...args: unknown[]) => void>;
}

/**
 * `Instance` is the base class for all classes in the Roblox class hierarchy which can be part of the `DataModel` tree.
 */
interface Instance extends Object {
	/**
	 * Determines if an `Instance` and its descendants can be cloned using `Instance:Clone()`, and can be saved/published.
	 */
	Archivable: boolean;
	/** The set of capabilities allowed to be used for scripts inside this container. */
	Capabilities: SecurityCapabilities;
	/** A non-unique identifier of the `Instance`. */
	Name: string;
	/** Determines the hierarchical parent of the `Instance`. */
	Parent: Instance;
	/** Turns the instance to be a sandboxed container. */
	Sandboxed: boolean;
	/** Applies a tag to the instance. */
	AddTag(tag?: string): undefined;
	/** This method destroys all of an instance's children. */
	ClearAllChildren(): undefined;
	/**
	 * Create a copy of an instance and all its descendants, ignoring instances that are not `Archivable`.
	 */
	Clone(): this;
	/**
	 * Sets the `Instance.Parent` property to `nil`, locks the `Instance.Parent` property, disconnects all connections, and calls `Destroy()` on all children.
	 */
	Destroy(): undefined;
	/**
	 * Returns the first ancestor of the `Instance` whose `Instance.Name` is equal to the given name.
	 */
	FindFirstAncestor(name?: string): Instance;
	/**
	 * Returns the first ancestor of the `Instance` whose `Object.ClassName` is equal to the given className.
	 */
	FindFirstAncestorOfClass(className?: string): Instance;
	/**
	 * Returns the first ancestor of the `Instance` for whom `Object:IsA()` returns true for the given className.
	 */
	FindFirstAncestorWhichIsA(className?: string): Instance;
	/** Returns the first child of the `Instance` found with the given name. */
	FindFirstChild(name?: string, recursive?: boolean): Instance;
	/**
	 * Returns the first child of the `Instance` whose `ClassName` is equal to the given class name.
	 */
	FindFirstChildOfClass(className?: string): Instance;
	/**
	 * Returns the first child of the `Instance` for whom `Object:IsA()` returns true for the given className.
	 */
	FindFirstChildWhichIsA(className?: string, recursive?: boolean): Instance;
	/** Returns the first descendant found with the given `Instance.Name`. */
	FindFirstDescendant(name?: string): Instance;
	/** Returns the `Actor` associated with the Instance, if any. */
	GetActor(): Actor;
	/** Returns the value which has been assigned to the given attribute name. */
	GetAttribute(attribute?: string): unknown;
	/** Returns an event that fires when the given attribute changes. */
	GetAttributeChangedSignal(attribute?: string): RBXScriptSignal;
	/** Returns a dictionary of the instance's attributes. */
	GetAttributes(): unknown;
	/** Returns an array containing all of the instance's children. */
	GetChildren(): Instance[];
	/** Returns a coded string of the debug ID used internally by Roblox. */
	GetDebugId(scopeLength?: number): string;
	/** Returns an array containing all of the descendants of the instance. */
	GetDescendants(): Instance[];
	/** Returns a string describing the instance's ancestry. */
	GetFullName(): string;
	/**
	 * Returns the styled or explicitly modified value of the specified property, or else the default property value if it hasn't been styled/modified.
	 */
	GetStyled(name?: string, selector?: unknown): unknown;
	GetStyledPropertyChangedSignal(property?: string): RBXScriptSignal;
	/** Gets an array of all tags applied to the instance. */
	GetTags(): unknown;
	/** Check whether the instance has a given tag. */
	HasTag(tag?: string): boolean;
	/** Returns true if an `Instance` is an ancestor of the given descendant. */
	IsAncestorOf(descendant?: Instance): boolean;
	/** Returns `true` if an `Instance` is a descendant of the given ancestor. */
	IsDescendantOf(ancestor?: Instance): boolean;
	/**
	 * Returns `true` if the value stored in the specified property is not equal to the code-instantiated default.
	 */
	IsPropertyModified(property?: string): boolean;
	QueryDescendants(selector?: string): Instance[];
	/**
	 * Sets the object's `Parent` to `nil`, and does the same for all its descendants.
	 * @deprecated Deprecated.
	 */
	Remove(): undefined;
	/** Removes a tag from the instance. */
	RemoveTag(tag?: string): undefined;
	/** Resets a property to its default value. */
	ResetPropertyToDefault(property?: string): undefined;
	/** Sets the attribute with the given name to the given value. */
	SetAttribute(attribute?: string, value?: unknown): undefined;
	/**
	 * Returns the child of the `Instance` with the given name. If the child does not exist, it will yield the current thread until it does.
	 */
	WaitForChild(childName?: string, timeOut?: number): Instance;
	/**
	 * Returns an array of the object's children.
	 * @deprecated Deprecated.
	 */
	children(): Instance[];
	/** @deprecated Deprecated. */
	clone(): Instance;
	/** @deprecated Deprecated. */
	destroy(): undefined;
	/** @deprecated Deprecated. */
	findFirstChild(name?: string, recursive?: boolean): Instance;
	/** @deprecated Deprecated. */
	getChildren(): Instance[];
	/** @deprecated Deprecated. */
	isDescendantOf(ancestor?: Instance): boolean;
	/** @deprecated Deprecated. */
	remove(): undefined;
	/**
	 * Fires when the `Instance.Parent` property of the object or one of its ancestors is changed.
	 */
	readonly AncestryChanged: RBXScriptSignal<(child: Instance, parent: Instance) => void>;
	/** Fires whenever an attribute is changed on the `Instance`. */
	readonly AttributeChanged: RBXScriptSignal<(attribute: string) => void>;
	/** Fires after an object is parented to this `Instance`. */
	readonly ChildAdded: RBXScriptSignal<(child: Instance) => void>;
	/** Fires after a child is removed from this `Instance`. */
	readonly ChildRemoved: RBXScriptSignal<(child: Instance) => void>;
	/** Fires after a descendant is added to the `Instance`. */
	readonly DescendantAdded: RBXScriptSignal<(descendant: Instance) => void>;
	/** Fires immediately before a descendant of the `Instance` is removed. */
	readonly DescendantRemoving: RBXScriptSignal<(descendant: Instance) => void>;
	/**
	 * Fires immediately before (or is deferred until after) the instance is destroyed via `Instance:Destroy()`.
	 */
	readonly Destroying: RBXScriptSignal<() => void>;
	/**
	 * Fires whenever any style property is changed on the instance, including when a property is set to `nil`.
	 */
	readonly StyledPropertiesChanged: RBXScriptSignal<() => void>;
	/** @deprecated Deprecated. */
	readonly childAdded: RBXScriptSignal<(child: Instance) => void>;
}

/** Describes the appearance of an `Accessory` for the `HumanoidDescription`. */
interface AccessoryDescription extends Instance {
	/** The `Enum.AccessoryType` of the `Accessory` referred to by this description. */
	AccessoryType: Enum.AccessoryType;
	/** The asset ID that should be applied when applying this `AccessoryDescription`. */
	AssetId: number;
	/**
	 * A reference to the `Instance` that should be applied when applying this `AccessoryDescription`.
	 */
	Instance: Instance;
	/** Whether the `Accessory` is layered or rigid. */
	IsLayered: boolean;
	/** The layered clothing sort order, if the `Accessory` is layered. */
	Order: number;
	/** The accessory adjustment position offset, if the `Accessory` is rigid. */
	Position: Vector3;
	/** The layered clothing puffiness, if the `Accessory` is layered. */
	Puffiness: number;
	/** The accessory adjustment rotation offset, if the `Accessory` is rigid. */
	Rotation: Vector3;
	/** The accessory adjustment scale, if the `Accessory` is rigid. */
	Scale: Vector3;
	/** Returns the applied `Accessory`. */
	GetAppliedInstance(): Instance;
}

interface AccountService extends Instance {
}

/** An object that can attach to a player's character. */
interface Accoutrement extends Instance {
	/** The exact CFrame of the Accoutrement. */
	AttachmentPoint: CFrame;
}

/** An item that a Character can wear. */
interface Accessory extends Accoutrement {
	/** Specifies the AccessoryType of the Accessory (eg. Hat, Tshirt, Waist). */
	AccessoryType: Enum.AccessoryType;
}

/** @deprecated This class is deprecated. */
interface Hat extends Accoutrement {
}

interface AchievementService extends Instance {
}

interface ActivityHistoryEventService extends Instance {
}

interface AdPortal extends Instance {
	Status: Enum.AdUnitStatus;
}

/** A class that allows the display of mobile video ads. */
interface AdService extends Instance {
	/** Creates a reward to give users who watch an entire video ad. */
	CreateAdRewardFromDevProductId(devProductId?: number): AdReward;
	/**
	 * Show mobile video advertisements.
	 * @deprecated Deprecated.
	 */
	ShowVideoAd(): undefined;
	UnregisterAdOpportunity(instance?: Instance): undefined;
	/**
	 * Checks if a video ad is available to be played to the current user inside the experience.
	 */
	GetAdAvailabilityNowAsync(adFormat?: Enum.AdFormat): unknown;
	/**
	 * Tracks how many times a user had the chance to watch a video ad and the rate at which they actually watched the ad.
	 */
	RegisterAdOpportunityAsync(instance?: Instance, placementId?: unknown): undefined;
	/** Plays the video ad to the current user inside the experience. */
	ShowRewardedVideoAdAsync(player?: Player, reward?: AdReward, placementId?: unknown): Enum.ShowAdResult;
	/**
	 * Fires when an `AdService` video closes.
	 * @deprecated Deprecated.
	 */
	readonly VideoAdClosed: RBXScriptSignal<(adShown: boolean) => void>;
}

/** An unfinished advanced variant of the `Dragger` class. */
interface AdvancedDragger extends Instance {
}

/**
 * Collection of methods that allows developers to track how users interact with their experiences.
 */
interface AnalyticsService extends Instance {
	/**
	 * Fires a custom event with a custom event name and data.
	 * @deprecated Deprecated.
	 */
	FireCustomEvent(player?: Instance, eventCategory?: string, customData?: unknown): undefined;
	/**
	 * Report a custom event to PlayFab.
	 * @deprecated Deprecated.
	 */
	FireEvent(category?: string, value?: unknown): undefined;
	/**
	 * Fire an event used to track player actions pertaining to the in-game economy.
	 * @deprecated Deprecated.
	 */
	FireInGameEconomyEvent(player?: Instance, itemName?: string, economyAction?: Enum.AnalyticsEconomyAction, itemCategory?: string, amount?: number, currency?: string, location?: unknown, customData?: unknown): undefined;
	/**
	 * Fire a log event used to track errors and warnings experienced by players.
	 * @deprecated Deprecated.
	 */
	FireLogEvent(player?: Instance, logLevel?: Enum.AnalyticsLogLevel, message?: string, debugInfo?: unknown, customData?: unknown): undefined;
	/**
	 * Fire an event used to track player progression through the game.
	 * @deprecated Deprecated.
	 */
	FirePlayerProgressionEvent(player?: Instance, category?: string, progressionStatus?: Enum.AnalyticsProgressionStatus, location?: unknown, statistics?: unknown, customData?: unknown): undefined;
	GetDurationLoggerTimestamp(): number;
	/** Logs an event used to track custom metrics of a user in experience. */
	LogCustomEvent(player?: Player, eventName?: string, value?: number, customFields?: unknown): undefined;
	/** Logs an event used to track player actions related in experience. */
	LogEconomyEvent(player?: Player, flowType?: Enum.AnalyticsEconomyFlowType, currencyType?: string, amount?: number, endingBalance?: number, transactionType?: string, itemSku?: string, customFields?: unknown): undefined;
	/** Logs an event used to track user actions stepping through a pre-planned funnel. */
	LogFunnelStepEvent(player?: Player, funnelName?: string, funnelSessionId?: string, step?: number, stepName?: string, customFields?: unknown): undefined;
	/** Logs an event used to track user actions stepping through an onboarding funnel. */
	LogOnboardingFunnelStepEvent(player?: Player, step?: number, stepName?: string, customFields?: unknown): undefined;
	/** Logs an event for when a user has completed a level attempt. */
	LogProgressionCompleteEvent(player?: Player, progressionPathName?: string, level?: number, levelName?: string, customFields?: unknown): undefined;
	/**
	 * Logs an event for when a user has started, completed, or failed a level attempt.
	 */
	LogProgressionEvent(player?: Player, progressionPathName?: string, status?: Enum.AnalyticsProgressionType, level?: number, levelName?: string, customFields?: unknown): undefined;
	/** Logs an event for when a user has failed a level attempt. */
	LogProgressionFailEvent(player?: Player, progressionPathName?: string, level?: number, levelName?: string, customFields?: unknown): undefined;
	/** Logs an event for when a user has started a level attempt. */
	LogProgressionStartEvent(player?: Player, progressionPathName?: string, level?: number, levelName?: string, customFields?: unknown): undefined;
}

/** References an animation asset which can be loaded by an `AnimationController`. */
interface Animation extends Instance {
	/** Asset ID of the animation an `Animation` object is referencing. */
	AnimationId: ContentId;
}

/**
 * Represents all types of animation data that the Roblox animation system can consume.
 */
interface AnimationClip extends Instance {
	/**
	 * Determines whether the animation stored in this `AnimationClip` is intended to loop.
	 */
	Loop: boolean;
	/**
	 * Determines which clip takes priority when multiple animations are playing simultaneously.
	 */
	Priority: Enum.AnimationPriority;
}

interface AnimationGraphDefinition extends AnimationClip {
}

/**
 * Stores animation data in the form of curves for each individual channel to animate.
 */
interface CurveAnimation extends AnimationClip {
}

/** This object stores all of the `Keyframes` and other data for the animation. */
interface KeyframeSequence extends AnimationClip {
	/**
	 * Adds a `Keyframe` to the `KeyframeSequence` by parenting it to the `KeyframeSequence`.
	 */
	AddKeyframe(keyframe?: Instance): undefined;
	/**
	 * Returns an array that contains all `Keyframes` contained in a `KeyframeSequence`.
	 */
	GetKeyframes(): Instance[];
	/**
	 * This method removes a `Keyframe` from the `KeyframeSequence` by setting its parent to `nil`.
	 */
	RemoveKeyframe(keyframe?: Instance): undefined;
}

/** Provides functions to load and preview `AnimationClips`. */
interface AnimationClipProvider extends Instance {
	/**
	 * Returns a `AnimationClip` from a given asset URL.
	 * @deprecated Deprecated.
	 */
	GetAnimationClip(assetId?: ContentId): AnimationClip;
	/**
	 * Returns a `AnimationClip` from the supplied assetId.
	 * @deprecated Deprecated.
	 */
	GetAnimationClipById(assetId?: number, useCache?: boolean): AnimationClip;
	/**
	 * Generates a temporary asset ID from a `AnimationClip` that can be used for localized testing of an animation.
	 */
	RegisterActiveAnimationClip(animationClip?: AnimationClip): ContentId;
	/**
	 * Generates a temporary asset ID from a `AnimationClip` that can be used for localized testing of an animation. Generates a hash.
	 */
	RegisterAnimationClip(animationClip?: AnimationClip): ContentId;
	/** Returns a `AnimationClip` based on the specified assetId asynchronously. */
	GetAnimationClipAsync(assetId?: ContentId): AnimationClip;
	/**
	 * This function returns an `InventoryPages` object which can be used to iterate over animations owned by a specific user.
	 * @deprecated Deprecated.
	 */
	GetAnimations(userId?: number): Instance;
	/**
	 * This function returns an `InventoryPages` object which can be used to iterate over animations owned by a specific user.
	 */
	GetAnimationsAsync(userId?: number): Instance;
	GetClipEvaluatorAsync(assetId?: ContentId): ClipEvaluator;
}

/**
 * Allows animations to be loaded and applied to a character or model in place of a `Humanoid`.
 */
interface AnimationController extends Instance {
	/**
	 * Returns an array of all `AnimationTracks` that are currently being played by the `AnimationController`.
	 * @deprecated Deprecated.
	 */
	GetPlayingAnimationTracks(): unknown;
	/**
	 * Loads an `Animation` onto an `AnimationController`, returning an `AnimationTrack` that can be used for playback.
	 * @deprecated Deprecated.
	 */
	LoadAnimation(animation?: Animation): AnimationTrack;
	/**
	 * Fires whenever the `AnimationController` begins playing an animation. It returns the `AnimationTrack` playing.
	 * @deprecated Deprecated.
	 */
	readonly AnimationPlayed: RBXScriptSignal<(animationTrack: AnimationTrack) => void>;
}

interface AnimationFromVideoCreatorService extends Instance {
}

interface AnimationFromVideoCreatorStudioService extends Instance {
}

interface AnimationNodeDefinition extends Instance {
	NodeType: Enum.AnimationNodeType;
}

/** Used to store information regarding the model an animation was authored for. */
interface AnimationRigData extends Instance {
}

interface AnimationStreamTrack extends Instance {
}

/** Controls the playback of an animation on an `Animator`. */
interface AnimationTrack extends Instance {
	/** The `Animation` object that was used to create this `AnimationTrack`. */
	Animation: Animation;
	/** A read-only property that returns true when the `AnimationTrack` is playing. */
	IsPlaying: boolean;
	/**
	 * A read-only property that returns the length (in seconds) of an `AnimationTrack`. This will return `0` until the animation has fully loaded and thus may not be immediately available.
	 */
	Length: number;
	/**
	 * Sets whether the animation will repeat after finishing. If it is changed while playing the result will take effect after the animation finishes.
	 */
	Looped: boolean;
	/**
	 * Sets the priority of an `AnimationTrack`. Depending on what this is set to, playing multiple animations at once will look to this property to figure out which `Keyframe` `Poses` should be played over one another.
	 */
	Priority: Enum.AnimationPriority;
	/**
	 * Read-only property that gives the current playback speed of the `AnimationTrack`.
	 */
	Speed: number;
	/**
	 * Returns the position in time in seconds that an `AnimationTrack` is through playing its source animation. Can be set to make the track jump to a specific moment in the animation.
	 */
	TimePosition: number;
	/** Read-only property that gives the current weight of the `AnimationTrack`. */
	WeightCurrent: number;
	/** Read-only property that gives the current weight of the `AnimationTrack`. */
	WeightTarget: number;
	/**
	 * Changes the `AnimationTrack.Speed` of an animation. A positive value for speed plays the animation forward, a negative one plays it backwards, and `0` pauses it.
	 */
	AdjustSpeed(speed?: number): undefined;
	/**
	 * Changes the weight of an animation, with the optional `fadeTime` parameter determining how long it takes for `AnimationTrack.WeightCurrent` to reach `AnimationTrack.WeightTarget`.
	 */
	AdjustWeight(weight?: number, fadeTime?: number): undefined;
	/**
	 * Returns an `RBXScriptSignal` (event) that fires when a specified `KeyframeMarker` has been hit in an `animation`.
	 */
	GetMarkerReachedSignal(name?: string): RBXScriptSignal;
	GetParameter(key?: string): unknown;
	GetParameterDefaults(): unknown;
	GetTargetInstance(name?: string): Instance;
	GetTargetNames(): unknown;
	/**
	 * Returns the time position of the first `Keyframe` of the given name in an `AnimationTrack`.
	 */
	GetTimeOfKeyframe(keyframeName?: string): number;
	/**
	 * Plays the `AnimationTrack`. Once called an `AnimationTrack` will play with the specified `fadeTime`, weight and speed.
	 */
	Play(fadeTime?: number, weight?: number, speed?: number): undefined;
	SetParameter(key?: string, value?: unknown): undefined;
	SetTargetInstance(name?: string, target?: Instance): undefined;
	/** Stops the `AnimationTrack`. */
	Stop(fadeTime?: number): undefined;
	/**
	 * Fires when an `AnimationTrack` loops on the next update following the end of the previous animation loop.
	 */
	readonly DidLoop: RBXScriptSignal<() => void>;
	/**
	 * Fires when the `AnimationTrack` is completely done moving anything in the world.
	 */
	readonly Ended: RBXScriptSignal<() => void>;
	/**
	 * Fires every time playback of an `AnimationTrack` reaches a `Keyframe` that does not have the default name of `Keyframe`.
	 */
	readonly KeyframeReached: RBXScriptSignal<(keyframeName: string) => void>;
	/**
	 * Fires when the `AnimationTrack` finishes playing. The AnimationTrack might still animate the subject while the animation "fades out". To catch when the AnimationTrack is completely done moving anything in the world, use the `AnimationTrack.Ended` event.
	 */
	readonly Stopped: RBXScriptSignal<() => void>;
}

/** Responsible for the playback and replication of `Animations`. */
interface Animator extends Instance {
	EvaluationThrottled: boolean;
	PreferLodEnabled: boolean;
	RootMotion: CFrame;
	RootMotionWeight: number;
	/**
	 * Computes relative velocities between parts and apply them to `Motor6D.Part1`. These relative velocity calculations and assignments happen in the order provided.
	 */
	ApplyJointVelocities(motors?: unknown): undefined;
	/** Returns the list of currently playing `AnimationTracks`. */
	GetPlayingAnimationTracks(): unknown;
	/** Loads an `Animation` onto an `Animator`, returning an `AnimationTrack`. */
	LoadAnimation(animation?: Animation): AnimationTrack;
	RegisterEvaluationParallelCallback(callback?: Function): undefined;
	/**
	 * Increments the `AnimationTrack.TimePosition` of all playing `AnimationTracks` that are loaded onto the `Animator`, applying the offsets to the model associated with the `Animator`. For use in the command bar or by plugins only.
	 */
	StepAnimations(deltaTime?: number): undefined;
	/** Fires when the Animator starts playing an AnimationTrack. */
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

/**
 * A non-replicated service that handles asset-related queries to the Roblox web API.
 */
interface AssetService extends Instance {
	/** Creates a new `EditableImage`. */
	CreateEditableImage(editableImageOptions?: unknown): EditableImage;
	/** Creates a new, empty `EditableMesh`. */
	CreateEditableMesh(editableMeshOptions?: unknown): EditableMesh;
	/**
	 * Modifies an existing `Decal` to contain a composite PBR textures created by layering the provided textures in the order they are provided in the `layers` array. Textures layer based on the alpha value of the color map.
	 */
	ComposeDecalAsync(decal?: Decal, layers?: unknown): undefined;
	/** Uploads a new asset to Roblox from the given object. */
	CreateAssetAsync(object?: Object, assetType?: Enum.AssetType, requestParameters?: unknown): unknown;
	/** Uploads a new version for an existing asset from the given object. */
	CreateAssetVersionAsync(object?: Object, assetType?: Enum.AssetType, assetId?: number, requestParameters?: unknown): unknown;
	/** Creates a new `EditableImage` object populated with the given image. */
	CreateEditableImageAsync(content?: Content, editableImageOptions?: unknown): EditableImage;
	/** Returns a new `EditableMesh` object created from an existing mesh content ID. */
	CreateEditableMeshAsync(content?: Content, editableMeshOptions?: unknown): EditableMesh;
	/**
	 * Creates a new `MeshPart` with a specified mesh ID and an optional table of fidelity values.
	 */
	CreateMeshPartAsync(meshContent?: Content, options?: unknown): MeshPart;
	/** Clones a place through the given `templatePlaceID`. */
	CreatePlaceAsync(placeName?: string, templatePlaceID?: number, description?: string): number;
	/**
	 * Clones a place through the given `templatePlaceID` and puts it into the inventory of the given player.
	 */
	CreatePlaceInPlayerInventoryAsync(player?: Instance, placeName?: string, templatePlaceID?: number, description?: string): number;
	/** Creates a new `SurfaceAppearance` object using the provided content maps. */
	CreateSurfaceAppearanceAsync(content?: unknown): SurfaceAppearance;
	/**
	 * Returns an array of asset IDs that are contained in a specified package.
	 * @deprecated Deprecated.
	 */
	GetAssetIdsForPackage(packageAssetId?: number): unknown;
	/** Returns an array of asset IDs that are contained in a specified package. */
	GetAssetIdsForPackageAsync(packageAssetId?: number): unknown;
	/** Provides relevant metadata about a specific audio source. */
	GetAudioMetadataAsync(idList?: unknown): unknown;
	/** Returns details of the contents of specified bundle. */
	GetBundleDetailsAsync(bundleId?: number): unknown;
	/**
	 * Returns the UserId of the account who created the creationID asset.
	 * @deprecated Deprecated.
	 */
	GetCreatorAssetID(creationID?: number): number;
	/**
	 * Returns a `StandardPages` object which contains the name and `PlaceId` of places within the current experience.
	 */
	GetGamePlacesAsync(): Instance;
	/**
	 * Loads a `Model` instance given its asset ID. This is the modern replacement for `InsertService:LoadAsset()` and supports loading third-party assets.
	 */
	LoadAssetAsync(assetId?: number): Instance;
	/** Allows in-experience asset creation for users by prompting a publish dialog. */
	PromptCreateAssetAsync(player?: Player, instance?: Instance, assetType?: Enum.AssetType): unknown;
	PromptImportAnimationClipFromVideoAsync(player?: Player, progressCallback?: Function): unknown;
	/** Saves the state of the current place. */
	SavePlaceAsync(requestParameters?: unknown): undefined;
	/**
	 * Finds audio assets matching a variety of search criteria.
	 * @deprecated Deprecated.
	 */
	SearchAudio(searchParameters?: AudioSearchParams): AudioPages;
	/** Finds audio assets matching a variety of search criteria. */
	SearchAudioAsync(searchParameters?: AudioSearchParams): AudioPages;
}

/**
 * The `Atmosphere` object pushes Roblox closer toward realistic environments where sunlight scatters in different ways depending on density and other air particle properties.
 */
interface Atmosphere extends Instance {
	/** Changes the `Atmosphere` hue for subtle environmental moods. */
	Color: Color3;
	/**
	 * When used with increased `Atmosphere.Haze` and `Atmosphere.Glare`, defines the hue of the `Atmosphere` away from the sun, gradually falling off from `Atmosphere.Color` towards this value.
	 */
	Decay: Color3;
	/**
	 * Defines the amount of particles in the `Atmosphere` and essentially controls how much in-game objects/terrain will be obscured by them.
	 */
	Density: number;
	/**
	 * When used with increased `Atmosphere.Haze`, specifies the glow/glare of the `Atmosphere` around the sun. More glare results in an increased effect of sunlight cast onto the sky and world.
	 */
	Glare: number;
	/**
	 * Defines the haziness of the `Atmosphere` with a visible effect both above the horizon and into the distance.
	 */
	Haze: number;
	/** Controls how light transmits between the camera and the sky background. */
	Offset: number;
}

/**
 * Defines a point and orientation relative to an ancestor `PVInstance`, `Bone`, or another `Attachment`.
 */
interface Attachment extends Instance {
	/** Direction of the **X** axis of the attachment, represented as a unit `Vector3`. */
	Axis: Vector3;
	/** `CFrame` offset of the attachment. */
	CFrame: CFrame;
	/** Direction of the **Y** axis of the attachment, represented as a unit `Vector3`. */
	SecondaryAxis: Vector3;
	/** Toggles the in-experience visibility of the attachment. */
	Visible: boolean;
	/**
	 * Direction of the **X** axis of the attachment relative to the world, represented as a unit `Vector3` with a length of 1.
	 */
	WorldAxis: Vector3;
	/** The exact `CFrame` of the attachment in world space coordinates. */
	WorldCFrame: CFrame;
	/**
	 * Direction of the **Y** axis of the attachment relative to the world, represented as a unit `Vector3` with a length of 1.
	 */
	WorldSecondaryAxis: Vector3;
	/**
	 * Returns the value of the attachment's `Axis`.
	 * @deprecated Deprecated.
	 */
	GetAxis(): Vector3;
	/** Returns a list of `Constraints` connected to the attachment. */
	GetConstraints(): Instance[];
	/**
	 * Returns the value of the attachment's `SecondaryAxis`.
	 * @deprecated Deprecated.
	 */
	GetSecondaryAxis(): Vector3;
	/**
	 * Sets the value of the attachment's `Axis`.
	 * @deprecated Deprecated.
	 */
	SetAxis(axis?: Vector3): undefined;
	/**
	 * Sets the value of the attachment's `SecondaryAxis`.
	 * @deprecated Deprecated.
	 */
	SetSecondaryAxis(axis?: Vector3): undefined;
}

/**
 * Bones are non-rendered objects that drive the movement of one or more parts for the purposes of animation, or creating clothing and characters.
 */
interface Bone extends Attachment {
	/** Determines the current animated offset of the bone in its local space. */
	Transform: CFrame;
	/**
	 * Describes the combined `CFrame` offset of the bone and the current animation offset in world space.
	 */
	TransformedWorldCFrame: CFrame;
}

/**
 * Takes measurements from audio streams that are connected to it via one or more `Wires`.
 */
interface AudioAnalyzer extends Instance {
	/** The loudest volume observed during the last audio buffer. */
	PeakLevel: number;
	/** The root-mean-square average volume observed during the last audio buffer. */
	RmsLevel: number;
	/** Enables usage of `GetSpectrum`. */
	SpectrumEnabled: boolean;
	WindowSize: Enum.AudioWindowSize;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/** Returns the frequency spectrum of the last audio buffer. */
	GetSpectrum(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioAnalyzer` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Combines multiple audio streams into a single, multichannel audio stream. */
interface AudioChannelMixer extends Instance {
	/** Controls the output channel layout to be mixed to. */
	Layout: Enum.AudioChannelLayout;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioChannelMixer` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/**
 * Splits an audio stream into component channels so that each can be processed independently.
 */
interface AudioChannelSplitter extends Instance {
	/** Controls the input channel layout to be split from. */
	Layout: Enum.AudioChannelLayout;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioChannelSplitter` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/**
 * Makes an audio stream sound more voluminous. If applied to a single voice, it may sound like multiple voices.
 */
interface AudioChorus extends Instance {
	/** Whether audio streams are passed-through unaffected by this effect. */
	Bypass: boolean;
	/** Controls the maximum delay time of the copied streams in the chorus effect. */
	Depth: number;
	/** Controls the balance of plain input stream to modified output stream. */
	Mix: number;
	/** Controls the rate of pitch modulations. */
	Rate: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioChorus` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Adjusts the dynamic range of input streams. */
interface AudioCompressor extends Instance {
	/**
	 * Controls how quickly the compressor will clamp down on volume after it surpasses `Threshold`.
	 */
	Attack: number;
	/** Whether audio streams are passed-through unaffected by this effect. */
	Bypass: boolean;
	/** A gain value to be applied after compression. */
	MakeupGain: number;
	/**
	 * Ratio of input volume to output volume, to be applied when surpassing `Threshold`.
	 */
	Ratio: number;
	/**
	 * Controls how quickly the compressor will unclamp after the stream volume dips back below `Threshold`.
	 */
	Release: number;
	/** Gain value at which the compressor will start to modify the input stream. */
	Threshold: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioCompressor` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Produces audio streams from physical devices, such as microphones. */
interface AudioDeviceInput extends Instance {
	/**
	 * Determines whether the list of user IDs provided to `SetUserIdAccessList` is treated as an allow-list or deny-list.
	 */
	AccessType: Enum.AccessModifierType;
	/** Controls whether the physical device is actively recording. */
	readonly Active: boolean;
	/** Controls whether this `AudioDeviceInput` is muted. */
	Muted: boolean;
	/** Determines whose device is producing sound. */
	Player: Player;
	/** Volume level which is multiplied onto the output audio stream. */
	Volume: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Returns a list of user IDs that are either permitted to hear or blocked from hearing this `AudioDeviceInput`.
	 */
	GetUserIdAccessList(): unknown;
	/**
	 * Sets a list of user IDs that are either permitted to hear or blocked from hearing this `AudioDeviceInput`.
	 */
	SetUserIdAccessList(userIds?: unknown): undefined;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioDeviceInput` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/**
 * Accepts audio streams to be rendered out to physical hardware devices such as speakers or headphones.
 */
interface AudioDeviceOutput extends Instance {
	/** A `Player` who is intended to hear the connected audio streams. */
	Player: Player;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioDeviceOutput` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Distorts audio streams, making them sound fuzzier, grittier, and louder. */
interface AudioDistortion extends Instance {
	/** Whether audio streams are passed-through unaffected by this effect. */
	Bypass: boolean;
	/** Controls how distorted the input stream will become. */
	Level: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioDistortion` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Overlays delayed copies of audio streams. */
interface AudioEcho extends Instance {
	/** Whether audio streams are passed-through unaffected by this effect. */
	Bypass: boolean;
	/** The amount of time between echoes. */
	DelayTime: number;
	/** Gain level determining how loud the original, unaltered audio stream will be. */
	DryLevel: number;
	/** How slowly echoes fade away. */
	Feedback: number;
	RampTime: number;
	/** Gain level determining how loud the echoed stream will be. */
	WetLevel: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioEcho` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Emits audio streams into the world. */
interface AudioEmitter extends Instance {
	AcousticSimulationEnabled: boolean;
	/** Controls which `AudioListeners` are capable of hearing this `AudioEmitter`. */
	AudioInteractionGroup: string;
	/**
	 * Controls how detailed the audio simulation should be for this `AudioEmitter`.
	 * @deprecated Deprecated.
	 */
	SimulationFidelity: Enum.AudioSimulationFidelity;
	/**
	 * Gets the angle attenuation curve that the `AudioEmitter` is using, or an empty table if it's using the default curve.
	 */
	GetAngleAttenuation(): unknown;
	/** Calculates how audible this emitter is for a particular `AudioListener`. */
	GetAudibilityFor(listener?: AudioListener): number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the distance attenuation curve that the `AudioEmitter` is using, or an empty table if it's using the default curve.
	 */
	GetDistanceAttenuation(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/** Lists all `AudioListeners` that are capable of hearing this emitter. */
	GetInteractingListeners(): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Sets the angle attenuation curve that the `AudioEmitter` should use, or uses a constant curve of volume `1` if none is provided.
	 */
	SetAngleAttenuation(curve?: unknown): undefined;
	/**
	 * Sets the distance attenuation curve that the `AudioEmitter` should use, or uses an inverse rolloff curve if none is provided.
	 */
	SetDistanceAttenuation(curve?: unknown): undefined;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioEmitter` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Adjusts the frequency content of audio streams. */
interface AudioEqualizer extends Instance {
	/** Whether audio streams are passed-through unaffected by this effect. */
	Bypass: boolean;
	/**
	 * Gain value to be applied to the frequency content of the highest band in the equalizer.
	 */
	HighGain: number;
	/**
	 * Gain value to be applied to the frequency content of the lowest band in the equalizer.
	 */
	LowGain: number;
	/**
	 * Gain value to be applied to the frequency content of the middle band in the equalizer.
	 */
	MidGain: number;
	/** The frequency range of the band influenced by `MidGain`. */
	MidRange: NumberRange;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioEqualizer` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Adjusts the volume of audio streams. */
interface AudioFader extends Instance {
	/** Whether audio streams are passed-through unaffected by this effect. */
	Bypass: boolean;
	/** Volume level which is multiplied onto the input stream. */
	Volume: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioFader` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Adjusts the frequency content of audio streams. */
interface AudioFilter extends Instance {
	/** Whether audio streams are passed-through unaffected by this effect. */
	Bypass: boolean;
	/** The curve type of the band represented by the filter. */
	FilterType: Enum.AudioFilterType;
	/** The central frequency that the filter acts around. */
	Frequency: number;
	/** For peaking and shelving filters, controls volume increase or reduction. */
	Gain: number;
	/**
	 * For peaking, lowpass, highpass, bandpass, and notch filters, controls the selectiveness or resonance.
	 */
	Q: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/** Returns the magnitude response of the filter at the given frequency. */
	GetGainAt(frequency?: number): number;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioFilter` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Imparts a whooshing or sweeping sound on audio streams. */
interface AudioFlanger extends Instance {
	/** Whether audio streams are passed-through unaffected by this effect. */
	Bypass: boolean;
	/** Controls how strong the pitch modulation of the flanger is. */
	Depth: number;
	/** Controls the balance of plain input stream to modified output stream. */
	Mix: number;
	/** Controls the rate of pitch modulations. */
	Rate: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioFlanger` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface AudioFocusService extends Instance {
}

interface AudioGate extends Instance {
	Attack: number;
	Bypass: boolean;
	Release: number;
	Threshold: NumberRange;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioAnalyzer` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Limits how loud audio streams are allowed to be. */
interface AudioLimiter extends Instance {
	/** Whether audio streams are passed-through unaffected by this effect. */
	Bypass: boolean;
	/** The maximum volume tolerated. */
	MaxLevel: number;
	/**
	 * The amount of time it takes for previously limited streams to return to their normal volume.
	 */
	Release: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioLimiter` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Records an audio stream from its surrounding `AudioEmitters` in the 3D world. */
interface AudioListener extends Instance {
	AcousticSimulationEnabled: boolean;
	/** Controls which `AudioEmitters` are audible to this `AudioListener`. */
	AudioInteractionGroup: string;
	/**
	 * Controls how detailed the audio simulation should be for this `AudioListener`.
	 * @deprecated Deprecated.
	 */
	SimulationFidelity: Enum.AudioSimulationFidelity;
	/**
	 * Gets the angle attenuation curve that the `AudioListener` is using, or an empty table if it's using the default curve.
	 */
	GetAngleAttenuation(): unknown;
	/** Calculates how audible an `AudioEmitter` is for this listener */
	GetAudibilityFor(emitter?: AudioEmitter): number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the distance attenuation curve that the `AudioListener` is using, or an empty table if it's using the default curve.
	 */
	GetDistanceAttenuation(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/** Lists all `AudioEmitters` that this listener is capable of hearing. */
	GetInteractingEmitters(): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Sets the angle attenuation curve that the `AudioListener` should use, or uses a constant curve of volume `1` if none is provided.
	 */
	SetAngleAttenuation(curve?: unknown): undefined;
	/**
	 * Sets the distance attenuation curve that the `AudioListener` should use, or uses an inverse rolloff curve if none is provided.
	 */
	SetDistanceAttenuation(curve?: unknown): undefined;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioListener` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Adjusts the perceived pitch of audio streams. */
interface AudioPitchShifter extends Instance {
	/** Whether audio streams are passed-through unaffected by this effect. */
	Bypass: boolean;
	/** Pitch modification to be multiplied by the pitch of the input stream. */
	Pitch: number;
	WindowSize: Enum.AudioWindowSize;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioPitchShifter` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Used to play audio assets. */
interface AudioPlayer extends Instance {
	/** The asset to be loaded into the `AudioPlayer`. */
	Asset: ContentId;
	/** Controls whether `Asset` loads automatically once assigned. */
	AutoLoad: boolean;
	/**
	 * Denotes whether this `AudioPlayer` starts playing as soon as it spawns in for the first time.
	 */
	AutoPlay: boolean;
	/** Denotes whether this `AudioPlayer` is currently playing. */
	readonly IsPlaying: boolean;
	/** Denotes whether this `AudioPlayer` is loaded, buffered, and ready to play. */
	IsReady: boolean;
	/**
	 * A range, in seconds, denoting a desired loop start and loop end within the `PlaybackRegion` of this `AudioPlayer`.
	 */
	LoopRegion: NumberRange;
	/** Controls whether this `AudioPlayer` loops. */
	Looping: boolean;
	/**
	 * Range in seconds denoting a desired start time (minimum) and stop time (maximum) within the `TimeLength`.
	 */
	PlaybackRegion: NumberRange;
	/** Controls how quickly the asset will be played, which controls its pitch. */
	PlaybackSpeed: number;
	/** Denotes the length of the loaded asset. */
	TimeLength: number;
	/** Tracks the current position of the playhead within the asset. */
	TimePosition: number;
	/** Controls how loudly the asset will be played. */
	Volume: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/** Plays the `AudioPlayer` from wherever its `TimePosition` is. */
	Play(): undefined;
	/** Stops the `AudioPlayer` wherever its `TimePosition` is. */
	Stop(): undefined;
	GetWaveformAsync(timeRange?: NumberRange, samples?: number): unknown;
	/** Fires when the `AudioPlayer` has completed playback and stopped. */
	readonly Ended: RBXScriptSignal<() => void>;
	/** Fires when the `AudioPlayer` loops. */
	readonly Looped: RBXScriptSignal<() => void>;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioPlayer` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Records audio streams in-experience. */
interface AudioRecorder extends Instance {
	readonly IsRecording: boolean;
	TimeLength: number;
	Clear(): undefined;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	GetTemporaryContent(): Content;
	Stop(): undefined;
	CanRecordAsync(): boolean;
	GetUnrecordableInstancesAsync(): Instance[];
	RecordAsync(): undefined;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioAnalyzer` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Reverberates audio streams. */
interface AudioReverb extends Instance {
	/** Whether audio streams are passed-through unaffected by this effect. */
	Bypass: boolean;
	/**
	 * Controls how quickly high frequency sound decays compared to the overall reverb.
	 */
	DecayRatio: number;
	/** Controls how long it takes for the reverb to dissipate. */
	DecayTime: number;
	/** Controls how many reflections are generated. */
	Density: number;
	/** Controls how smooth and reflective the simulated surfaces are. */
	Diffusion: number;
	/** Gain level determining how loud the original, unaltered audio stream will be. */
	DryLevel: number;
	/** Controls the amount of time before reverberation begins . */
	EarlyDelayTime: number;
	/** Frequency above which sound is filtered out of the reverb. */
	HighCutFrequency: number;
	/** Time, following early delays, before diffuse reverberations begin. */
	LateDelayTime: number;
	/** Frequency below which audio can be boosted or reduced in the reverb. */
	LowShelfFrequency: number;
	/** Controls the presence of low frequency content in the reverb. */
	LowShelfGain: number;
	/**
	 * Frequency that separates low frequency decay speeds from high frequency decay speeds.
	 */
	ReferenceFrequency: number;
	/** Gain level determining how loud the reverberated stream will be. */
	WetLevel: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioReverb` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/**
 * Instance to be passed to `AssetService:SearchAudioAsync()` to search for audio assets.
 */
interface AudioSearchParams extends Instance {
	/** The album the audio asset belongs to. */
	Album: string;
	/** The artist that created the audio asset. */
	Artist: string;
	AudioSubType: Enum.AudioSubType;
	/**
	 * The subtype of the audio asset.
	 * @deprecated Deprecated.
	 */
	AudioSubtype: Enum.AudioSubType;
	/** The maximum duration of the audio asset. */
	MaxDuration: number;
	/** The minimum duration of the audio asset. */
	MinDuration: number;
	/** The keyword to search for. */
	SearchKeyword: string;
	/** The tag of the audio asset. */
	Tag: string;
	/** The title of the audio asset. */
	Title: string;
}

/** Converts spoken audio into text. */
interface AudioSpeechToText extends Instance {
	/**
	 * Whether the `AudioSpeechToText` object is enabled for processing input audio into text.
	 */
	Enabled: boolean;
	/** The text resulting from the conversion of speech audio. */
	Text: string;
	/**
	 * Whether the `AudioSpeechToText` object is detecting speech in the incoming audio signal.
	 */
	VoiceDetected: boolean;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioSpeechToText` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** Plays text as speech audio. */
interface AudioTextToSpeech extends Instance {
	/**
	 * Denotes whether the `AudioTextToSpeech` object is loaded, buffered, and ready to play.
	 */
	IsLoaded: boolean;
	/** Denotes whether the `AudioTextToSpeech` object is currently playing. */
	readonly IsPlaying: boolean;
	/** Controls whether the `AudioTextToSpeech` object loops. */
	Looping: boolean;
	/**
	 * Controls the pitch of the generated speech audio, which will be independent of its speed.
	 */
	Pitch: number;
	/** Controls how quickly the speech audio will be played, which controls its pitch. */
	PlaybackSpeed: number;
	/**
	 * Controls the speed of the generated speech audio, which will be independent of its pitch.
	 */
	Speed: number;
	/** The text to be converted into speech audio by `AudioTextToSpeech`. */
	Text: string;
	/** Denotes the length of the generated speech audio. */
	TimeLength: number;
	/** Tracks the current position of the playhead within the generated speech audio. */
	TimePosition: number;
	/** The voice style to be used by `AudioTextToSpeech`. */
	VoiceId: string;
	/** Controls how loudly the generated speech audio will be played. */
	Volume: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/** Pauses the `AudioTextToSpeech` object wherever its `TimePosition` is. */
	Pause(): undefined;
	/** Plays the `AudioTextToSpeech` from wherever its `TimePosition` is. */
	Play(): undefined;
	/** Unload the generated speech audio. */
	Unload(): undefined;
	GetWaveformAsync(timeRange?: NumberRange, samples?: number): unknown;
	/** Generates speech audio. */
	LoadAsync(): Enum.AssetFetchStatus;
	/** Fires when the `AudioTextToSpeech` object has completed playback and paused. */
	readonly Ended: RBXScriptSignal<() => void>;
	/** Fires when the `AudioTextToSpeech` object loops. */
	readonly Looped: RBXScriptSignal<() => void>;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioTextToSpeech` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/**
 * Creates a trembling effect on a sound by varying the volume of the sound up and down.
 */
interface AudioTremolo extends Instance {
	Bypass: boolean;
	/** Controls how much the volume will raise and lower. */
	Depth: number;
	/** Controls how long the effect will be active during one volume oscillation. */
	Duty: number;
	/** Sets how often the effect will oscillate the volume. */
	Frequency: number;
	/** Controls the shape of the low frequency oscillations. */
	Shape: number;
	/** Time-skews the low frequency oscillations cycle. */
	Skew: number;
	/** Flatness of the low frequency oscillations shape. */
	Square: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `AudioAnalyzer` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/** @deprecated This class is deprecated. */
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

/** A service to support developer avatar creators. */
interface AvatarCreationService extends Instance {
	/** Gets data regarding rules that assets must abide by to pass UGC validation. */
	GetValidationRules(): unknown;
	/** Automatically sets up a custom `Model` and/or avatar accessories. */
	AutoSetupAvatarAsync(player?: Player, autoSetupParams?: unknown, progressCallback?: Function?): string;
	/** Creates a 2D avatar preview and returns a previewId. */
	GenerateAvatar2DPreviewAsync(avatarGeneration2dPreviewParams?: unknown): string;
	/** Generates an avatar and returns a generationId. */
	GenerateAvatarAsync(avatarGenerationParams?: unknown): string;
	/**
	 * Gets the avatar creation token details for a list of avatar creation tokens at once.
	 */
	GetBatchTokenDetailsAsync(tokenIds?: unknown): unknown;
	/** Load an AvatarGeneration 2D preview on the client from a previewId. */
	LoadAvatar2DPreviewAsync(previewId?: string): EditableImage;
	/** Loads a generated avatar using an avatar generation ID. */
	LoadGeneratedAvatarAsync(generationId?: string): HumanoidDescription;
	/** Prepares in-experience avatar for preview. */
	PrepareAvatarForPreviewAsync(humanoidModel?: Model): undefined;
	/** Prompts a `Player` to purchase and create an avatar asset from an `Instance`. */
	PromptCreateAvatarAssetAsync(tokenId?: string, player?: Player, assetInstance?: Instance, assetType?: Enum.AvatarAssetType): unknown;
	/**
	 * Prompts a `Player` to purchase and create an avatar from a `HumanoidDescription`.
	 */
	PromptCreateAvatarAsync(tokenId?: string, player?: Player, humanoidDescription?: HumanoidDescription): unknown;
	/** Prompt the `Player` to take a selfie and return the FileId. */
	PromptSelectAvatarGenerationImageAsync(player?: Player): string;
	/** Request an AvatarGeneration session for a `Player`. */
	RequestAvatarGenerationSessionAsync(player?: Player, callback?: Function): unknown;
	/** Studio only. Runs UGC validation for an `Enum.AccessoryType`. */
	ValidateUGCAccessoryAsync(player?: Player, accessory?: Instance, accessoryType?: Enum.AccessoryType): unknown;
	/** Studio only. Runs UGC validation for an `Enum.BodyPart`. */
	ValidateUGCBodyPartAsync(player?: Player, instance?: Instance, bodyPart?: Enum.BodyPart): unknown;
	/** Studio only. Runs UGC validation for a whole body. */
	ValidateUGCFullBodyAsync(player?: Player, humanoidDescription?: HumanoidDescription): unknown;
	/**
	 * Fires when an in-experience-created avatar asset's moderation status has been updated from pending.
	 */
	readonly AvatarAssetModerationCompleted: RBXScriptSignal<(assetId: number, moderationStatus: Enum.ModerationStatus) => void>;
	/**
	 * Fires when an in-experience-created avatar's moderation status has been updated from pending.
	 */
	readonly AvatarModerationCompleted: RBXScriptSignal<(outfitId: number, moderationStatus: Enum.ModerationStatus) => void>;
}

/** A service to support developer Avatar Editors. */
interface AvatarEditorService extends Instance {
	GetAccessoryType(avatarAssetType?: Enum.AvatarAssetType): Enum.AccessoryType;
	/**
	 * Prompts the `Players.LocalPlayer` to allow the developer to read what items the user has in their inventory and other avatar editor related information.
	 */
	PromptAllowInventoryReadAccess(): undefined;
	/**
	 * Prompts the `Players.LocalPlayer` to save the given `HumanoidDescription` as an outfit.
	 */
	PromptCreateOutfit(outfit?: HumanoidDescription, rigType?: Enum.HumanoidRigType): undefined;
	/** Prompts the `Players.LocalPlayer` to delete the given outfit. */
	PromptDeleteOutfit(outfitId?: number): undefined;
	/** Prompts the `Players.LocalPlayer` to rename the given outfit. */
	PromptRenameOutfit(outfitId?: number): undefined;
	/**
	 * Prompts the `Players.LocalPlayer` to update their avatar based on the given `HumanoidDescription` and `Enum.RigType` of R6 or R15.
	 */
	PromptSaveAvatar(humanoidDescription?: HumanoidDescription, rigType?: Enum.HumanoidRigType): undefined;
	/**
	 * Prompts the `Players.LocalPlayer` to favorite or unfavorite the given asset or bundle.
	 */
	PromptSetFavorite(itemId?: number, itemType?: Enum.AvatarItemType, shouldFavorite?: boolean): undefined;
	/** Prompts the `Players.LocalPlayer` to update the given outfit. */
	PromptUpdateOutfit(outfitId?: number, updatedOutfit?: HumanoidDescription, rigType?: Enum.HumanoidRigType): undefined;
	/**
	 * Used to apply default clothing to the `HumanoidDescription` if necessary.
	 * @deprecated Deprecated.
	 */
	CheckApplyDefaultClothing(humanoidDescription?: HumanoidDescription): HumanoidDescription;
	/** Used to apply default clothing to the `HumanoidDescription` if necessary. */
	CheckApplyDefaultClothingAsync(humanoidDescription?: HumanoidDescription): HumanoidDescription;
	/** @deprecated Deprecated. */
	ConformToAvatarRules(humanoidDescription?: HumanoidDescription): HumanoidDescription;
	ConformToAvatarRulesAsync(humanoidDescription?: HumanoidDescription): HumanoidDescription;
	/**
	 * Returns the platform Avatar rules for things such as scaling, default shirts and pants, number of wearable assets.
	 * @deprecated Deprecated.
	 */
	GetAvatarRules(): unknown;
	/**
	 * Returns the platform Avatar rules for things such as scaling, default shirts and pants, number of wearable assets.
	 */
	GetAvatarRulesAsync(): unknown;
	/**
	 * Gets the item details for a list of items at once.
	 * @deprecated Deprecated.
	 */
	GetBatchItemDetails(itemIds?: unknown, itemType?: Enum.AvatarItemType): unknown;
	/** Gets the item details for a list of items at once. */
	GetBatchItemDetailsAsync(itemIds?: unknown, itemType?: Enum.AvatarItemType): unknown;
	/**
	 * Returns if the `Players.LocalPlayer` has favorited the given bundle or asset.
	 * @deprecated Deprecated.
	 */
	GetFavorite(itemId?: number, itemType?: Enum.AvatarItemType): boolean;
	/** Returns if the `Players.LocalPlayer` has favorited the given bundle or asset. */
	GetFavoriteAsync(itemId?: number, itemType?: Enum.AvatarItemType): boolean;
	GetHeadShapesAsync(): unknown;
	/**
	 * Returns an `InventoryPages` object with information about owned items in the users inventory with the given AvatarAssetTypes.
	 * @deprecated Deprecated.
	 */
	GetInventory(assetTypes?: unknown): InventoryPages;
	/**
	 * Returns an `InventoryPages` object with information about owned items in the users inventory with the given AvatarAssetTypes.
	 */
	GetInventoryAsync(assetTypes?: unknown): InventoryPages;
	/**
	 * Returns the item details for the given item.
	 * @deprecated Deprecated.
	 */
	GetItemDetails(itemId?: number, itemType?: Enum.AvatarItemType): unknown;
	/** Returns the item details for the given item. */
	GetItemDetailsAsync(itemId?: number, itemType?: Enum.AvatarItemType): unknown;
	/**
	 * Returns the outfit details for the given outfit.
	 * @deprecated Deprecated.
	 */
	GetOutfitDetails(outfitId?: number): unknown;
	/** Returns the outfit details for the given outfit. */
	GetOutfitDetailsAsync(outfitId?: number): unknown;
	/**
	 * Returns outfit data for the `Players.LocalPlayer`.
	 * @deprecated Deprecated.
	 */
	GetOutfits(outfitSource?: Enum.OutfitSource, outfitType?: Enum.OutfitType): OutfitPages;
	/** Returns outfit data for the `Players.LocalPlayer`. */
	GetOutfitsAsync(outfitSource?: Enum.OutfitSource, outfitType?: Enum.OutfitType): OutfitPages;
	/**
	 * Returns a list of recommended assets based on a given `Enum.AssetType` and asset ID.
	 * @deprecated Deprecated.
	 */
	GetRecommendedAssets(assetType?: Enum.AvatarAssetType, contextAssetId?: number): unknown;
	/**
	 * Returns a list of recommended assets based on a given `Enum.AssetType` and asset ID.
	 */
	GetRecommendedAssetsAsync(assetType?: Enum.AvatarAssetType, contextAssetId?: number): unknown;
	/**
	 * Returns a list of recommended bundles for a given bundle id.
	 * @deprecated Deprecated.
	 */
	GetRecommendedBundles(bundleId?: number): unknown;
	/** Returns a list of recommended bundles for a given bundle id. */
	GetRecommendedBundlesAsync(bundleId?: number): unknown;
	/**
	 * Returns a `CatalogPages` object containing the result of the given search.
	 * @deprecated Deprecated.
	 */
	SearchCatalog(searchParameters?: CatalogSearchParams): CatalogPages;
	/** Returns a `CatalogPages` object containing the result of the given search. */
	SearchCatalogAsync(searchParameters?: CatalogSearchParams): CatalogPages;
	/**
	 * Fires when the `AvatarEditorService:PromptAllowInventoryReadAccess()` prompt is responded to by the user.
	 */
	readonly PromptAllowInventoryReadAccessCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult) => void>;
	/** Fires when the PromptSaveOutfit operation is completed. */
	readonly PromptCreateOutfitCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult, failureType: unknown) => void>;
	/** Fires when the PromptDeleteOutfit operation is completed. */
	readonly PromptDeleteOutfitCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult) => void>;
	/** Fires when the PromptRenameOutfit operation is completed. */
	readonly PromptRenameOutfitCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult) => void>;
	/** Fires when the `AvatarEditorService:PromptSaveAvatar()` operation is completed. */
	readonly PromptSaveAvatarCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult, humanoidDescription: HumanoidDescription) => void>;
	/**
	 * Fires when the `AvatarEditorService:PromptSetFavorite()` operation is completed.
	 */
	readonly PromptSetFavoriteCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult) => void>;
	/**
	 * Fires when the `AvatarEditorService:PromptUpdateOutfit()` operation is completed.
	 */
	readonly PromptUpdateOutfitCompleted: RBXScriptSignal<(result: Enum.AvatarPromptResult) => void>;
}

interface AvatarImportService extends Instance {
}

interface AvatarRules extends Instance {
}

interface AvatarSettings extends Instance {
}

/**
 * A container object that holds a player's inventory. Any `Tool` in a player's Backpack will be displayed in their inventory at the bottom of their screen.
 */
interface Backpack extends Instance {
}

/** Provides information on badges and awards them. */
interface BadgeService extends Instance {
	/**
	 * Award a badge to a player given the ID of each.
	 * @deprecated Deprecated.
	 */
	AwardBadge(userId?: number, badgeId?: number): boolean;
	/** Award a badge to a player given the ID of each. */
	AwardBadgeAsync(userId?: number, badgeId?: number): boolean;
	/**
	 * Checks a list of badge IDs against a `UserId` and returns a list of badge IDs that the player owns.
	 */
	CheckUserBadgesAsync(userId?: number, badgeIds?: unknown): unknown;
	/** Fetch information about a badge given its ID. */
	GetBadgeInfoAsync(badgeId?: number): unknown;
	/**
	 * Returns whether a given badge is disabled.
	 * @deprecated Deprecated.
	 */
	IsDisabled(badgeId?: number): boolean;
	/**
	 * Determines if a given badge is associated with the current game.
	 * @deprecated Deprecated.
	 */
	IsLegal(badgeId?: number): boolean;
	/**
	 * Checks whether a user has the badge given the `Player.UserId` and the badge ID.
	 * @deprecated Deprecated.
	 */
	UserHasBadge(userId?: number, badgeId?: number): boolean;
	/**
	 * Checks whether a player has the badge given the `Player.UserId` and the badge ID.
	 */
	UserHasBadgeAsync(userId?: number, badgeId?: number): boolean;
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

/**
 * The BasePlayerGui is an abstract class which the GUI drawing storage classes inherit from.
 */
interface BasePlayerGui extends Instance {
	/**
	 * Returns a list of all `GuiObject` instances occupying the given point on the screen.
	 */
	GetGuiObjectsAtPosition(x?: number, y?: number): Instance[];
}

/**
 * The CoreGui is a service used to store Guis created in-game by Roblox for the core user interface found in every game (such as the game menu, the playerlist, the backpack, etc.). It can also be used by `Plugins` in Roblox Studio.
 */
interface CoreGui extends BasePlayerGui {
	/**
	 * The current version of the CoreGui. Every time the CoreGui is majorly changed, this number is increased.
	 */
	Version: number;
}

/** A container for a player's currently rendered `ScreenGuis`. */
interface PlayerGui extends BasePlayerGui {
	/** Describes the player's current screen orientation. */
	CurrentScreenOrientation: Enum.ScreenOrientation;
	/**
	 * Sets the preferred screen orientation mode for this player, if on a mobile device.
	 */
	ScreenOrientation: Enum.ScreenOrientation;
	/** Overrides the default selection adornment used for gamepads. */
	SelectionImageObject: GuiObject;
	/**
	 * Returns the transparency of the Topbar.
	 * @deprecated Deprecated.
	 */
	GetTopbarTransparency(): number;
	/**
	 * Sets the transparency of the top bar.
	 * @deprecated Deprecated.
	 */
	SetTopbarTransparency(transparency?: number): undefined;
	/**
	 * Fires when the transparency of the Topbar CoreGui changes.
	 * @deprecated Deprecated.
	 */
	readonly TopbarTransparencyChangedSignal: RBXScriptSignal<(transparency: number) => void>;
}

/**
 * A container for `LayerCollector` objects to be copied into the `PlayerGui` of `Players`. Also provides a range of functions for interacting with the `CoreGui`.
 */
interface StarterGui extends BasePlayerGui {
	/**
	 * Determines whether each child parented to the StarterGui will be cloned into a player's PlayerGui when that player's character is respawned.
	 * @deprecated Deprecated.
	 */
	ResetPlayerGuiOnSpawn: boolean;
	/** Sets the default screen orientation mode for users with mobile devices. */
	ScreenOrientation: Enum.ScreenOrientation;
	/** Determines whether the contents of `StarterGui` is visible in Studio. */
	ShowDevelopmentGui: boolean;
	/**
	 * Returns whether the given `Enum.CoreGuiType`is enabled, or if it has been disabled using `StarterGui:SetCoreGuiEnabled()`.
	 */
	GetCoreGuiEnabled(coreGuiType?: Enum.CoreGuiType): boolean;
	/** Allows you to perform certain interactions with Roblox's core scripts. */
	SetCore(parameterName?: string, value?: unknown): undefined;
	/**
	 * Sets whether the `CoreGui` element associated with the given `Enum.CoreGuiType` is enabled or disabled.
	 */
	SetCoreGuiEnabled(coreGuiType?: Enum.CoreGuiType, enabled?: boolean): undefined;
	/** Returns a variable that has been specified by a Roblox core script. */
	GetCore(parameterName?: string): unknown;
}

interface BaseRemoteEvent extends Instance {
}

/**
 * An object which facilitates asynchronous, one-way communication across the client-server boundary. Scripts firing a `RemoteEvent` do not yield.
 */
interface RemoteEvent extends BaseRemoteEvent {
	/** Fires the `OnClientEvent` event for each connected client. */
	FireAllClients(...args: unknown[]): undefined;
	/** Fires the `OnClientEvent` event for a specific client. */
	FireClient(player?: Player, ...args: unknown[]): undefined;
	/** Fires the `OnServerEvent` event on the server from one connected client. */
	FireServer(...args: unknown[]): undefined;
	/**
	 * Fires from a `LocalScript` when either `FireClient()` or `FireAllClients()` is called on the same `RemoteEvent` instance from a `Script`.
	 */
	readonly OnClientEvent: RBXScriptSignal<(...args: unknown[]) => void>;
	/**
	 * Fires from a `Script` when `FireServer()` is called on the same `RemoteEvent` instance from a `LocalScript`.
	 */
	readonly OnServerEvent: RBXScriptSignal<(player: Player, ...args: unknown[]) => void>;
}

/**
 * An object which facilitates asynchronous, unordered and unreliable, one-way communication across the client-server boundary. Scripts firing a `UnreliableRemoteEvent` do not yield.
 */
interface UnreliableRemoteEvent extends BaseRemoteEvent {
	/**
	 * Fires the `OnClientEvent` event for all connected clients. Has a 1000 byte limit to the payload of the event. Events with larger payloads are dropped.
	 */
	FireAllClients(...args: unknown[]): undefined;
	/**
	 * Fires the `OnClientEvent` event for a specific client. Has a 1000 byte limit to the payload of the event. Events with larger payloads are dropped.
	 */
	FireClient(player?: Player, ...args: unknown[]): undefined;
	/**
	 * Fires the `OnServerEvent` event on the server from one connected client. Has a 1000 byte limit to the payload of the event. Events with larger payloads are dropped.
	 */
	FireServer(...args: unknown[]): undefined;
	/**
	 * Fires from a `LocalScript` when either `FireClient()` or `FireAllClients()` is called on the same `UnreliableRemoteEvent` instance from a `Script`, although this firing is not guaranteed even if one of the above methods are called. This can occur due to packet loss or to maintain optimal engine performance.
	 */
	readonly OnClientEvent: RBXScriptSignal<(...args: unknown[]) => void>;
	/**
	 * Fires from a `Script` when `FireServer()` is called on the same `UnreliableRemoteEvent` instance from a `LocalScript`, although this firing is not guaranteed even if the above methods is called. This can occur due to packet loss or to maintain optimal engine performance.
	 */
	readonly OnServerEvent: RBXScriptSignal<(player: Player, ...args: unknown[]) => void>;
}

interface BaseWrap extends Instance {
	CageMeshContent: Content;
	/** Asset ID for cage mesh. */
	CageMeshId: ContentId;
	/** Cage mesh offset relative to parent `MeshPart`. */
	CageOrigin: CFrame;
	/** Cage mesh offset in world space. */
	CageOriginWorld: CFrame;
	/**
	 * Describes where a global zero was while authoring the cage mesh in an asset creation tool.
	 */
	ImportOrigin: CFrame;
	/**
	 * Describes where the origin (in world space) was while authoring the cage mesh in an asset creation tool.
	 */
	ImportOriginWorld: CFrame;
}

/** Allows for the real-time deformation of a `MeshPart`. */
interface WrapDeformer extends BaseWrap {
	/** Sets the cage mesh used to deform against a sibling `WrapTarget` cage mesh. */
	SetCageMeshContent(content?: Content, cageOrigin?: CoordinateFrame?): undefined;
	/**
	 * Returns an `EditableMesh` (currently unskinned) equivalent to the deformed parent mesh.
	 */
	CreateEditableMeshAsync(): EditableMesh;
	/** Returns a `CFrame` deformed comparably to the `MeshPart`. */
	GetDeformedCFrameAsync(originalCFrame?: CFrame): CFrame;
}

/**
 * The WrapLayer object defines a 3D accessory's inner and outer surfaces and other properties related to layering accessories. These surfaces, or the Inner Cage and Outer Cage, are similar to collision boxes, and describe the surfaces of which other 3D accessories can be placed without clipping or breaking.
 */
interface WrapLayer extends BaseWrap {
	AutoSkin: Enum.WrapLayerAutoSkin;
	/**
	 * `CFrame` is used to adjust a binding point for clothing item mesh. Could be used to move and rotate clothing items. This property is intended for fine-tuning only and it is heavily optional.
	 */
	BindOffset: CFrame;
	/** Allows for disabling of the `WrapLayer` object as if it does not exist. */
	Enabled: boolean;
	/** Controls the composition order for layered clothing. */
	Order: number;
	/** Controls how much underlying clothing items inflate the current clothing item. */
	Puffiness: number;
	ReferenceMeshContent: Content;
	/** AssetID for reference mesh used to define Inner Cage of a 3D object. */
	ReferenceMeshId: ContentId;
	/**
	 * Reference mesh offset relative to parent MeshPart (in the parent MeshPart space)  Note: this property is set up automatically by the FBX importer.
	 */
	ReferenceOrigin: CFrame;
	/**
	 * Reference mesh offset relative to parent MeshPart (in the world space)  Note: this property is set up automatically by the FBX importer.
	 */
	ReferenceOriginWorld: CFrame;
	/**
	 * Allows slight shrinking/expanding of the resulting render mesh, without affecting any other layers.
	 */
	ShrinkFactor: number;
}

/**
 * The WrapTarget object defines a target. A target is the 3D body with only an outer surface, or an Outer Cage.
 */
interface WrapTarget extends BaseWrap {
	/** Defines how much the body mesh can be compressed by clothing. */
	Stiffness: number;
}

/** Connects two `Attachments` by drawing a texture between them. */
interface Beam extends Instance {
	/** The `Attachment` the beam originates from. */
	Attachment0: Attachment;
	/** The `Attachment` the beam ends at. */
	Attachment1: Attachment;
	/** Scales the light emitted from the beam when `LightInfluence` is less than 1. */
	Brightness: number;
	/** Determines the color of the beam across its `Segments`. */
	Color: ColorSequence;
	/**
	 * Determines, along with `Attachment0`, the position of the second control point in the beam's Bézier curve.
	 */
	CurveSize0: number;
	/**
	 * Determines, along with `Attachment1`, the position of the third control point in the beam's Bézier curve.
	 */
	CurveSize1: number;
	/** Determines whether the beam is visible or not. */
	Enabled: boolean;
	/**
	 * Determines whether the `Segments` of the beam will always face the camera, regardless of its orientation.
	 */
	FaceCamera: boolean;
	/**
	 * Determines to what degree the colors of the beam are blended with the colors behind it.
	 */
	LightEmission: number;
	/**
	 * Determines the degree to which the beam is influenced by the environment's lighting.
	 */
	LightInfluence: number;
	/** Sets how many straight segments the beam is made up of. */
	Segments: number;
	/** The content ID of the texture to be displayed on the beam. */
	Texture: ContentId;
	/** Sets the length of the beam's texture, dependent on `TextureMode`. */
	TextureLength: number;
	/** Determines the manner in which the `Texture` scales and repeats. */
	TextureMode: Enum.TextureMode;
	/** Determines the speed at which the `Texture` image moves along the beam. */
	TextureSpeed: number;
	/** Determines the transparency of the beam across its segments. */
	Transparency: NumberSequence;
	/** The width of the beam at its origin (`Attachment0`), in studs. */
	Width0: number;
	/** The width of the beam at its end (`Attachment1`), in studs. */
	Width1: number;
	/**
	 * The distance, in studs, the beam display is offset relative to the `CurrentCamera`.
	 */
	ZOffset: number;
	/** Sets the current offset of the beam's texture cycle. */
	SetTextureOffset(offset?: number): undefined;
}

/**
 * An object which enables custom events through asynchronous one-way communication between scripts on the same side of the client-server boundary. Scripts firing a `BindableEvent` do not yield.
 */
interface BindableEvent extends Instance {
	/** Fires the `BindableEvent` which in turn fires the `Event` event. */
	Fire(...args: unknown[]): undefined;
	/**
	 * Fires when any script calls the `Fire()` method on the same `BindableEvent` instance.
	 */
	readonly Event: RBXScriptSignal<(...args: unknown[]) => void>;
}

/**
 * An object which allows for synchronous two-way communication between scripts on the same side of the client-server boundary. Scripts invoking a `BindableFunction` yield until the corresponding callback is found.
 */
interface BindableFunction extends Instance {
	/**
	 * Invokes the `BindableFunction` which in turn calls the `OnInvoke` callback, returning any values returned by the callback.
	 */
	Invoke(...args: unknown[]): unknown;
	/** Callback for when the `BindableFunction` is invoked with `Invoke()`. */
	OnInvoke?: (...args: unknown[]) => unknown;
}

/**
 * Base class for objects that continually exert forces to assemblies.
 * @deprecated This class is deprecated.
 */
interface BodyMover extends Instance {
}

/**
 * Applies a torque to maintain a constant angular velocity.
 * @deprecated This class is deprecated.
 */
interface BodyAngularVelocity extends BodyMover {
	/**
	 * Determines the axis of rotation (direction) and the rotational velocity (magnitude) in radians/s.
	 */
	AngularVelocity: Vector3;
	/** Determines the limit of torque that may be exerted on each world axis. */
	MaxTorque: Vector3;
	/**
	 * Determines how aggressive of a torque is applied in reaching the goal angular velocity.
	 */
	P: number;
	/** @deprecated Deprecated. */
	angularvelocity: Vector3;
	/**
	 * Determines how much force can be applied to each axis.
	 * @deprecated Deprecated.
	 */
	maxTorque: Vector3;
}

/**
 * Applies a constant force to an object.
 * @deprecated This class is deprecated.
 */
interface BodyForce extends BodyMover {
	/** Determines the force exerted on each axis. */
	Force: Vector3;
	/**
	 * Determines the amount of force applied on each axis.
	 * @deprecated Deprecated.
	 */
	force: Vector3;
}

/**
 * Applies a torque to maintain a constant orientation.
 * @deprecated This class is deprecated.
 */
interface BodyGyro extends BodyMover {
	/** Determines the target orientation (translational component ignored). */
	CFrame: CFrame;
	/** Determines the amount of dampening to use in reaching the goal `CFrame`. */
	D: number;
	/** Determines the limit on how much torque that may be applied to each axis. */
	MaxTorque: Vector3;
	/**
	 * Determines how aggressive of a torque is applied in reaching the goal orientation.
	 */
	P: number;
	/** @deprecated Deprecated. */
	cframe: CFrame;
	/** @deprecated Deprecated. */
	maxTorque: Vector3;
}

/**
 * Applies a force to maintain a constant position.
 * @deprecated This class is deprecated.
 */
interface BodyPosition extends BodyMover {
	/** Determines the amount of dampening to use in reaching the goal `Position`. */
	D: number;
	/** Determines the limit on how much force that may be applied to each axis. */
	MaxForce: Vector3;
	/** Determines how aggressive of a force is applied in reaching the goal position. */
	P: number;
	/** Determines the goal position towards which force will be applied. */
	Position: Vector3;
	/** @deprecated Deprecated. */
	maxForce: Vector3;
	/** @deprecated Deprecated. */
	position: Vector3;
	/** Returns the last force in the object. */
	GetLastForce(): Vector3;
	/**
	 * Returns the last force in the object.
	 * @deprecated Deprecated.
	 */
	lastForce(): Vector3;
	/**
	 * Fired when the Parent of the BodyPosition reaches the desired `BodyPosition.Position` (within .1 studs). Once this event fires it will not fire again until `BodyPosition.Position` is updated.
	 */
	readonly ReachedTarget: RBXScriptSignal<() => void>;
}

/**
 * Applies a constant force to an object at a specific point.
 * @deprecated This class is deprecated.
 */
interface BodyThrust extends BodyMover {
	/** Determines the amount of force exerted on each axis relative to the assembly. */
	Force: Vector3;
	/** Determines the relative position where the `Force` is exerted. */
	Location: Vector3;
	/** @deprecated Deprecated. */
	force: Vector3;
	/** @deprecated Deprecated. */
	location: Vector3;
}

/**
 * Applies a force to maintain a constant velocity.
 * @deprecated This class is deprecated.
 */
interface BodyVelocity extends BodyMover {
	/** Determines the limit on how much force that may be applied to each axis. */
	MaxForce: Vector3;
	/** Determines how aggressive of a force is applied in reaching the goal velocity. */
	P: number;
	/** Determines the goal velocity. */
	Velocity: Vector3;
	/** @deprecated Deprecated. */
	maxForce: Vector3;
	/** @deprecated Deprecated. */
	velocity: Vector3;
	/** Not implemented and will always return the `0` vector. */
	GetLastForce(): Vector3;
	/** Returns the last force in the object. */
	lastForce(): Vector3;
}

/**
 * Applies a force so that an assembly follows and faces a target part.
 * @deprecated This class is deprecated.
 */
interface RocketPropulsion extends BodyMover {
	/** Determines the tendency of the assembly to face the `Target`. */
	CartoonFactor: number;
	/**
	 * Determines the maximum speed at which the assembly will move toward the `Target`.
	 */
	MaxSpeed: number;
	/**
	 * Determines the maximum amount of thrust that will be exerted to move the assembly.
	 */
	MaxThrust: number;
	/**
	 * Determines the maximum amount of torque that may be exerted to rotate the assembly towards the `Target`.
	 */
	MaxTorque: Vector3;
	/** Determines the object towards which the assembly should follow/face. */
	Target: BasePart;
	/**
	 * Determines the world offset from the `Target` toward which the force/torque is exerted.
	 */
	TargetOffset: Vector3;
	/**
	 * Determines the maximum distance from the `Target` at which the assembly must be in order for `ReachedTarget` to be fired.
	 */
	TargetRadius: number;
	/**
	 * Determines the dampening applied to the assembly in order to prevent it from overshooting the `Target`.
	 */
	ThrustD: number;
	/** Determines how aggressive of a force is applied in reaching the `Target`. */
	ThrustP: number;
	/** Determines the amount of dampening that to use in reaching the `Target`. */
	TurnD: number;
	/** Determines how aggressive of a torque is applied in facing the `Target`. */
	TurnP: number;
	/** Causes the assembly to stop moving toward its `Target`. */
	Abort(): undefined;
	/** Causes the assembly to start moving toward its `Target`. */
	Fire(): undefined;
	/** @deprecated Deprecated. */
	fire(): undefined;
	/** Fires when the assembly comes within `TargetRadius` of the `Target`. */
	readonly ReachedTarget: RBXScriptSignal<() => void>;
}

/** Describes the appearance of an avatar body part for the `HumanoidDescription`. */
interface BodyPartDescription extends Instance {
	/** The asset ID that should be applied when applying this `BodyPartDescription`. */
	AssetId: number;
	/** The type of body part. */
	BodyPart: Enum.BodyPart;
	/** The `Color3` for this body part. */
	Color: Color3;
	/**
	 * Specifies the head shape identifier to apply to a Dynamic Head when this `BodyPartDescription` is applied.
	 */
	HeadShape: string;
	/**
	 * A reference to the `Instance` that should be applied when applying this `BodyPartDescription`.
	 */
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

/**
 * A variant of the `ContentProvider` that caches assets that have already been received. This service is not used directly, but it is used by the services that inherit from it.
 */
interface CacheableContentProvider extends Instance {
}

interface HSRDataContentProvider extends CacheableContentProvider {
}

/**
 * An internal Roblox service that is responsible for fetching, parsing and caching meshes. This service cannot be used by developers.
 */
interface MeshContentProvider extends CacheableContentProvider {
}

interface SlimContentProvider extends CacheableContentProvider {
}

/** An internal service which serves no functionality to developers. */
interface SolidModelContentProvider extends CacheableContentProvider {
}

interface CalloutService extends Instance {
}

/** A service which provides control over screenshot and video capture features. */
interface CaptureService extends Instance {
	/** Takes a screenshot and provides a temporary `contentId` to identify it. */
	CaptureScreenshot(onCaptureReady?: Function): undefined;
	GetDeviceInfo(): unknown;
	/** Prompts the user to save specified captures to their gallery. */
	PromptSaveCapturesToGallery(captures?: unknown, resultCallback?: Function): undefined;
	/** Prompts the user to share a specified capture. */
	PromptShareCapture(captureContent?: Content, launchData?: string, onAcceptedCallback?: Function, onDeniedCallback?: Function): undefined;
	/** Ends a video capture initiated by `StartVideoCaptureAsync()`. */
	StopVideoCapture(): undefined;
	/** Initiates a screenshot capture. */
	TakeScreenshotCaptureAsync(onCaptureReady?: Function, captureParams?: unknown): undefined;
	InternalCheckPlayabilityAsync(universeId: number): boolean;
	InternalGetStartPlaceIdAsync(universeId: number): number;
	PromptCaptureGalleryPermissionAsync(captureGalleryPermission?: Enum.CaptureGalleryPermission): boolean;
	ReadCapturesFromGalleryAsync(captureTypeFilters?: unknown, readFromAllEligibleExperiences?: boolean): unknown;
	/** Initiates a video capture recording. */
	StartVideoCaptureAsync(onCaptureReady?: Function, captureParams?: unknown): Enum.VideoCaptureStartedResult;
	UploadCaptureAsync(capture?: Capture): unknown;
	/** Fires immediately before a capture begins. */
	readonly CaptureBegan: RBXScriptSignal<(captureType: Enum.CaptureType) => void>;
	/** Fires after a capture finishes. */
	readonly CaptureEnded: RBXScriptSignal<(captureType: Enum.CaptureType) => void>;
	/** @deprecated Deprecated. */
	readonly CaptureSaved: RBXScriptSignal<(captureInfo: unknown) => void>;
	/** Fires when the user saves a capture. */
	readonly UserCaptureSaved: RBXScriptSignal<(captureContentId: ContentId) => void>;
}

/**
 * **Must** be used by plugins to communicate to Studio how to undo and redo the changes which they make to the experience.
 */
interface ChangeHistoryService extends Instance {
	/**
	 * Communicates to Studio that the identified recording is finished and to take the final operation to complete the recording.
	 */
	FinishRecording(identifier?: string, operation?: Enum.FinishRecordingOperation, finalOptions?: unknown): undefined;
	/**
	 * Returns whether there are actions that can be redone, and, if there are, returns the last of them.
	 */
	GetCanRedo(): unknown;
	/**
	 * Returns whether there are actions that can be undone, and, if there are, returns the last of them.
	 */
	GetCanUndo(): unknown;
	IsRecordingInProgress(identifier?: unknown): boolean;
	/** Executes the last action that was undone. */
	Redo(): undefined;
	/** Clears the history, causing all undo/redo waypoints to be removed. */
	ResetWaypoints(): undefined;
	/** Sets whether or not the ChangeHistoryService is enabled. */
	SetEnabled(state?: boolean): undefined;
	/** Sets a new waypoint which can be used as an undo or redo point. */
	SetWaypoint(name?: string): undefined;
	/** Begins tracking changes made to the data model into a recording. */
	TryBeginRecording(name?: string, displayName?: unknown): unknown;
	/** Undos the last action taken, for which there exists a waypoint. */
	Undo(): undefined;
	/**
	 * Fired when the user completes an action. Parameters come from `TryBeginRecording()` and `FinishRecording()`.
	 */
	readonly OnRecordingFinished: RBXScriptSignal<(name: string, displayName: unknown, identifier: unknown, operation: Enum.FinishRecordingOperation, finalOptions: unknown) => void>;
	/**
	 * Fired when the user begins an action. Parameters come from `TryBeginRecording()`.
	 */
	readonly OnRecordingStarted: RBXScriptSignal<(name: string, displayName: unknown) => void>;
	/**
	 * Fired when the user reverses the undo command. Waypoint describes the type action that has been redone.
	 */
	readonly OnRedo: RBXScriptSignal<(waypoint: string) => void>;
	/**
	 * Fired when the user undoes an action in studio. Waypoint describes the type action that has been undone.
	 */
	readonly OnUndo: RBXScriptSignal<(waypoint: string) => void>;
}

interface ChangeHistoryStreamingService extends Instance {
}

/**
 * The base class for objects that change the character's appearance, such as the `BodyColors`, `CharacterMesh`, `ShirtGraphic`, `Pants` and `Shirt` objects.
 */
interface CharacterAppearance extends Instance {
}

/**
 * For a Humanoid character, the BodyColors will specify the colors for the different body parts.
 */
interface BodyColors extends CharacterAppearance {
	/** Sets the color of the head, as a `BrickColor`. */
	HeadColor: BrickColor;
	/** Sets the color of the head, as a `Color3`. */
	HeadColor3: Color3;
	/** Sets the color of the left arm, as a `BrickColor`. */
	LeftArmColor: BrickColor;
	/** Sets the color of the left arm, as a `Color3`. */
	LeftArmColor3: Color3;
	/** Sets the color of the left leg, as a `BrickColor`. */
	LeftLegColor: BrickColor;
	/** Sets the color of the left leg, as a `Color3`. */
	LeftLegColor3: Color3;
	/** Sets the color of the right arm, as a `BrickColor`. */
	RightArmColor: BrickColor;
	/** Sets the color of the right arm, as a `Color3`. */
	RightArmColor3: Color3;
	/** Sets the color of the right leg, as a `BrickColor`. */
	RightLegColor: BrickColor;
	/** Sets the color of the right leg, as a `Color3`. */
	RightLegColor3: Color3;
	/** Sets the color of the torso, as a `BrickColor`. */
	TorsoColor: BrickColor;
	/** Sets the color of the torso, as a `Color3`. */
	TorsoColor3: Color3;
}

/** Modifies the appearance of an R6 body part. */
interface CharacterMesh extends CharacterAppearance {
	BaseTextureContent: Content;
	/**
	 * The texture of a CharacterMesh. It can be overridden by Shirts, Pants, T-Shirts, and the `CharacterMesh.OverlayTextureId` property.
	 */
	BaseTextureId: number;
	/** The part of the Character's body that is affected. */
	BodyPart: Enum.BodyPart;
	MeshContent: Content;
	/** Used to load a mesh file, and apply it to the given BodyPart. */
	MeshId: number;
	OverlayTextureContent: Content;
	/**
	 * The assetId of the overlay texture. The overlay covers Shirts, Pants, T-Shirts, and the `CharacterMesh.BaseTextureId`.
	 */
	OverlayTextureId: number;
}

/** Clothing is the base class for the `Shirt` and `Pants` clothing objects. */
interface Clothing extends CharacterAppearance {
	/** Determines the colorization to be applied to the `Clothing` texture. */
	Color3: Color3;
}

/**
 * Displays a Pants texture from the Roblox website to display on a `Humanoid` rig.
 */
interface Pants extends Clothing {
	/** Determines the texture of the `Pants`. */
	PantsTemplate: ContentId;
}

/** Displays a shirt texture on a `Humanoid` rig. */
interface Shirt extends Clothing {
	/** Determines the texture of the `Shirt`. */
	ShirtTemplate: ContentId;
}

/**
 * Applies a texture to the front surface of a character's torso, used to display t-shirts.
 */
interface ShirtGraphic extends CharacterAppearance {
	/** Determines the colorization to be applied to the `ShirtGraphic` texture. */
	Color3: Color3;
	/**
	 * The content ID link pointing to the `ShirtGraphic` texture hosted on the Roblox website. This property sets the texture associated with a t-shirt.
	 */
	Graphic: ContentId;
}

/**
 * Historically changed the colors of body parts to match the `Skin.SkinColor` property. Superseded by the `BodyColors` class.
 * @deprecated This class is deprecated.
 */
interface Skin extends CharacterAppearance {
	SkinColor: BrickColor;
}

/** Houses the Luau code responsible for running the legacy chat system. */
interface Chat extends Instance {
	/**
	 * Determines whether player's chat messages will appear above their in-game avatar.
	 */
	BubbleChatEnabled: boolean;
	/**
	 * Toggles whether the default chat framework should be automatically loaded when the game runs.
	 */
	readonly LoadDefaultChat: boolean;
	/** Fires the `Chat.Chatted` event with the parameters specified in this method. */
	Chat(partOrCharacter?: Instance, message?: string, color?: Enum.ChatColor): undefined;
	/**
	 * Invoke a chat callback function registered by `RegisterChatCallback`. Used by the Luau Chat System.
	 */
	InvokeChatCallback(callbackType?: Enum.ChatCallbackType, callbackArguments?: unknown): unknown;
	/**
	 * Register a function to be called upon the invocation of some chat system event (`InvokeChatCallback`).
	 */
	RegisterChatCallback(callbackType?: Enum.ChatCallbackType, callbackFunction?: Function): undefined;
	/** Customizes various settings of the in-game bubble chat. */
	SetBubbleChatSettings(settings?: unknown): undefined;
	/**
	 * Will return false if the player with the specified `Player.UserId` is not allowed to chat because of their account settings.
	 */
	CanUserChatAsync(userId?: number): boolean;
	/**
	 * Will return false if the two users cannot communicate because their account settings do not allow it.
	 */
	CanUsersChatAsync(userIdFrom?: number, userIdTo?: number): boolean;
	/**
	 * Filters a string sent from a player to another player using filtering that is appropriate to the players' account settings.
	 */
	FilterStringAsync(stringToFilter?: string, playerFrom?: Player, playerTo?: Player): string;
	/**
	 * Filters a string sent from a player meant for broadcast to no particular target. More restrictive than `Chat:FilterStringAsync()`.
	 */
	FilterStringForBroadcast(stringToFilter?: string, playerFrom?: Player): string;
	/**
	 * Filters a string appropriate to the given player's age settings, so they see what is appropriate to them.
	 * @deprecated Deprecated.
	 */
	FilterStringForPlayerAsync(stringToFilter?: string, playerToFilterFor?: Player): string;
	/** Fires when `Chat:Chat()` is called. */
	readonly Chatted: RBXScriptSignal<(part: Instance, message: string, color: Enum.ChatColor) => void>;
}

/** An object that provides user input on in-experience `BaseParts` and `Models`. */
interface ClickDetector extends Instance {
	/**
	 * Sets the cursor icon to display when the mouse is hovered over the parent of this `ClickDetector` or `DragDetector`.
	 */
	CursorIcon: ContentId;
	/**
	 * Sets the cursor icon to display when the mouse is hovered over the parent of this `ClickDetector` or `DragDetector`. Only supports asset URIs.
	 */
	CursorIconContent: Content;
	/**
	 * Maximum distance between a character and the `ClickDetector` or `DragDetector` for the player to be able to interact with it.
	 */
	MaxActivationDistance: number;
	/**
	 * Fires when a player interacts with the parent of a `ClickDetector` or `DragDetector`.
	 */
	readonly MouseClick: RBXScriptSignal<(playerWhoClicked: Player) => void>;
	/**
	 * Fires when the parent of a `ClickDetector` or `DragDetector` is hovered over by a player.
	 */
	readonly MouseHoverEnter: RBXScriptSignal<(playerWhoHovered: Player) => void>;
	/**
	 * Fires when a player's cursor hovers off the parent of a `ClickDetector` or `DragDetector`.
	 */
	readonly MouseHoverLeave: RBXScriptSignal<(playerWhoHovered: Player) => void>;
	/**
	 * Fires when a player right clicks their mouse cursor on a `ClickDetector` or `DragDetector`.
	 */
	readonly RightMouseClick: RBXScriptSignal<(playerWhoClicked: Player) => void>;
	/** @deprecated Deprecated. */
	readonly mouseClick: RBXScriptSignal<(playerWhoClicked: Player) => void>;
}

/**
 * Instance which facilitates and encourages interaction with 3D objects in an experience.
 */
interface DragDetector extends ClickDetector {
	/**
	 * Sets the cursor icon to display when the mouse is activated over the parent of this `DragDetector`.
	 */
	ActivatedCursorIcon: ContentId;
	/**
	 * Sets the cursor icon to display when the mouse is activated over the parent of this `DragDetector`. Only supports asset URIs
	 */
	ActivatedCursorIconContent: Content;
	/** Whether constraint force is applied to the object's center of mass. */
	ApplyAtCenterOfMass: boolean;
	/** The primary axis of motion, expressed relative to the reference frame. */
	Axis: Vector3;
	/**
	 * The `CFrame` of the pivot, dependent on the drag detector's `ReferenceInstance`.
	 */
	DragFrame: CFrame;
	/** The paradigm used to generate proposed motion. */
	DragStyle: Enum.DragDetectorDragStyle;
	/** Whether the `DragDetector` responds to user input. */
	Enabled: boolean;
	/**
	 * During gamepad input, the modifier `Enum.KeyCode` for the secondary mode of motion.
	 */
	GamepadModeSwitchKeyCode: Enum.KeyCode;
	/**
	 * During keyboard input, the modifier `Enum.KeyCode` for the secondary mode of motion.
	 */
	KeyboardModeSwitchKeyCode: Enum.KeyCode;
	/**
	 * Along with `MinDragAngle`, impedes the drag detector's attempts to generate motion.
	 */
	MaxDragAngle: number;
	/**
	 * Along with `MinDragTranslation`, impedes the drag detector's attempts to generate motion.
	 */
	MaxDragTranslation: Vector3;
	/** Maximum force applied for the object to reach its goal. */
	MaxForce: number;
	/** Maximum torque applied for the object to reach its goal. */
	MaxTorque: number;
	/**
	 * Along with `MaxDragAngle`, impedes the drag detector's attempts to generate motion.
	 */
	MinDragAngle: number;
	/**
	 * Along with `MaxDragTranslation`, impedes the drag detector's attempts to generate motion.
	 */
	MinDragTranslation: Vector3;
	/**
	 * Specifies the **YXZ** rotation of axes of motion relative to the reference frame.
	 */
	Orientation: Vector3;
	/**
	 * Controls the permission level for which players can interact with the `DragDetector`.
	 */
	PermissionPolicy: Enum.DragDetectorPermissionPolicy;
	/** An instance whose `CFrame` is the reference frame for the drag detector. */
	ReferenceInstance: Instance;
	/**
	 * The paradigm used to move, or not move, the objects affected by the drag detector.
	 */
	ResponseStyle: Enum.DragDetectorResponseStyle;
	/** Higher values cause the object to reach its goal more rapidly. */
	Responsiveness: number;
	/**
	 * Whether user input on a `DragDetector` replicates to the server or remains local to the specific client.
	 */
	RunLocally: boolean;
	/** The secondary axis of the motion. */
	SecondaryAxis: Vector3;
	/**
	 * If `DragStyle` is `Enum.DragDetectorDragStyle.RotateTrackball`, multiplier for adding a radial pull rotation as a contribution to the total.
	 */
	TrackballRadialPullFactor: number;
	/**
	 * If `DragStyle` is `Enum.DragDetectorDragStyle.RotateTrackball`, multiplier for adding roll rotation to the total.
	 */
	TrackballRollFactor: number;
	/** During VR input, the modifier `Enum.KeyCode` for the secondary mode of motion. */
	VRSwitchKeyCode: Enum.KeyCode;
	/** The `Axis` expressed in world space. */
	WorldAxis: Vector3;
	/** The `SecondaryAxis` expressed in world space. */
	WorldSecondaryAxis: Vector3;
	/** Adds a function to modify or constrain proposed motion. */
	AddConstraintFunction(priority?: number, _function?: Function): RBXScriptConnection;
	/** Returns the reference `CFrame` in which motion is expressed. */
	GetReferenceFrame(): CFrame;
	/** May be invoked from a script to restart the drag using new parameters. */
	RestartDrag(): undefined;
	/**
	 * Passes a function to be used if and only if `DragStyle` is set to `Enum.DragDetectorDragStyle.Scriptable`.
	 */
	SetDragStyleFunction(_function?: Function): undefined;
	/**
	 * Passes a function to be used if and only if `PermissionPolicy` is set to `Enum.DragDetectorPermissionPolicy.Scriptable`.
	 */
	SetPermissionPolicyFunction(_function?: Function): undefined;
	/**
	 * Fires when a user continues dragging the object after `DragStart` has been initiated.
	 */
	readonly DragContinue: RBXScriptSignal<(playerWhoDragged: Player, cursorRay: Ray, viewFrame: CFrame, vrInputFrame: OptionalCoordinateFrame, isModeSwitchKeyDown: boolean) => void>;
	/** Fires when a user stops dragging the object. */
	readonly DragEnd: RBXScriptSignal<(playerWhoDragged: Player) => void>;
	/** Fires when a user starts dragging the object. */
	readonly DragStart: RBXScriptSignal<(playerWhoDragged: Player, cursorRay: Ray, viewFrame: CFrame, hitFrame: CFrame, clickedPart: BasePart, vrInputFrame: OptionalCoordinateFrame, isModeSwitchKeyDown: boolean) => void>;
}

interface CloudCRUDService extends Instance {
}

/** Renders realistic clouds that drift slowly across the sky. */
interface Clouds extends Instance {
	/** Controls the material color of cloud particles. */
	Color: Color3;
	/** Defines the cloud cover within the overall skyscape layer. */
	Cover: number;
	/** Controls the particulate density of clouds. */
	Density: number;
	/** Toggles rendering of the `Clouds` object. */
	Enabled: boolean;
}

/** An internal service meant to cache cluster packets. */
interface ClusterPacketCache extends Instance {
}

interface Collaborator extends Instance {
}

interface CollaboratorsService extends Instance {
}

/** A service which manages instance collections using assigned tags. */
interface CollectionService extends Instance {
	/** Applies a tag to an `Instance`. */
	AddTag(instance?: Instance, tag?: string): undefined;
	/** Returns an array of all tags in the experience. */
	GetAllTags(): unknown;
	/**
	 * Returns all instances of a given class which are in the `DataModel`.
	 * @deprecated Deprecated.
	 */
	GetCollection(_class?: string): Instance[];
	/** Returns a signal that fires when a given tag is added to an instance. */
	GetInstanceAddedSignal(tag?: string): RBXScriptSignal;
	/** Returns a signal that fires when a given tag is removed from an instance. */
	GetInstanceRemovedSignal(tag?: string): RBXScriptSignal;
	/** Returns an array of instances in the game with a given tag. */
	GetTagged(tag?: string): Instance[];
	/** Gets an array of all tags applied to a given instance. */
	GetTags(instance?: Instance): unknown;
	/** Check whether an instance has a given tag. */
	HasTag(instance?: Instance, tag?: string): boolean;
	/** Removes a tag from an instance. */
	RemoveTag(instance?: Instance, tag?: string): undefined;
	/**
	 * Fires when a `Configuration`, `CustomEvent`, `CustomEventReceiver`, `Dialog`, or `VehicleSeat` is added to the `DataModel`.
	 * @deprecated Deprecated.
	 */
	readonly ItemAdded: RBXScriptSignal<(instance: Instance) => void>;
	/**
	 * Fires when a `Configuration`, `CustomEvent`, `CustomEventReceiver`, `Dialog`, or `VehicleSeat` is removed from the `DataModel`.
	 * @deprecated Deprecated.
	 */
	readonly ItemRemoved: RBXScriptSignal<(instance: Instance) => void>;
	/**
	 * Fires when a tag is added to an instance and the added tag is the only occurrence of that tag in the place.
	 */
	readonly TagAdded: RBXScriptSignal<(tag: string) => void>;
	/**
	 * Fires when a tag is removed from an instance and the removed tag is no longer used anywhere in the place.
	 */
	readonly TagRemoved: RBXScriptSignal<(tag: string) => void>;
}

/** Supports real-world purchases that you can bundle with digital benefits. */
interface CommerceService extends Instance {
	/**
	 * Prompts a user to purchase a commerce product using the provided `commerceProductId`. Opens a webview that guides the user through the purchasing flow.
	 */
	PromptCommerceProductPurchase(user?: Player, commerceProductId?: string): undefined;
	PromptRealWorldCommerceBrowser(player?: Player, url?: string): undefined;
	/**
	 * Retrieves information about the commerce products you are selling in experience.
	 */
	GetCommerceProductInfoAsync(commerceProductId?: string): unknown;
	UserEligibleForRealWorldCommerceAsync(): boolean;
	/**
	 * Fires when commerce purchase webview has closed - not an indicator that a purchase was successful.
	 */
	readonly PromptCommerceProductPurchaseFinished: RBXScriptSignal<(user: Player, productId: string) => void>;
}

/**
 * An animation curve that groups child `FloatCurves` which each animate a different component of a non-unary value.
 */
interface CompositeValueCurve extends Instance {
	/** The type of value animated by this `CompositeValueCurve`. */
	CurveType: Enum.CompositeValueCurveType;
	/**
	 * Returns the child curves with the given names for the `CurveType` of this `CompositeValueCurve`.
	 */
	GetComponentCurves(): Instance[];
	/** Returns the sampled animated value at the passed `time` argument. */
	GetValueAtTime(time?: number): unknown;
}

/**
 * A game service that gives access to in-experience configuration with updates in real time.
 */
interface ConfigService extends Instance {
	/** Clears current testing value for the given key. */
	ClearTestingValue(key?: string): undefined;
	/** Sets a testing override for the given key. */
	SetTestingValue(key?: string, value?: unknown): undefined;
	/** Retrieves a snapshot of the latest configuration. */
	GetConfigAsync(): ConfigSnapshot;
	/** Retrieves a snapshot of the latest configuration for a specific player. */
	GetConfigForPlayerAsync(player?: Player): ConfigSnapshot;
}

/**
 * The Configuration object is a container object that is designed to hold value objects to make values used in `Tools` or any model using `Scripts` more accessible.
 */
interface Configuration extends Instance {
}

interface ConfigureServerService extends Instance {
}

interface ConnectivityService extends Instance {
}

/** The base class for constraint-based objects. */
interface Constraint extends Instance {
	/** Indicates if the constraint is currently active in the world. */
	Active: boolean;
	/** The `Attachment` that is connected to `Constraint.Attachment1`. */
	Attachment0: Attachment;
	/** The `Attachment` that is connected to `Constraint.Attachment0`. */
	Attachment1: Attachment;
	/** The color of the constraint. */
	Color: BrickColor;
	/** Toggles whether or not the constraint is enabled. */
	Enabled: boolean;
	/** Toggles the constraint's visibility. */
	Visible: boolean;
	/** @deprecated Deprecated. */
	GetDebugAppliedForce(bodyId?: number): Vector3;
	/** @deprecated Deprecated. */
	GetDebugAppliedTorque(bodyId?: number): Vector3;
}

/**
 * Constraint which applies torque to align two attachments, or to align one attachment with a goal orientation.
 */
interface AlignOrientation extends Constraint {
	/** The constraint's axis alignment type. */
	AlignType: Enum.AlignType;
	/**
	 * The `CFrame` orientation with which the constraint will attempt to match the orientation of `Attachment0`.
	 */
	CFrame: CFrame;
	/**
	 * A `Vector3` world space location toward which the primary axis will attempt to align.
	 */
	LookAtPosition: Vector3;
	/** Maximum angular velocity the constraint can use to reach its goal. */
	MaxAngularVelocity: number;
	/** Maximum torque the constraint can use to reach its goal. */
	MaxTorque: number;
	/** Whether the constraint uses one or two attachments in calculating its goal. */
	Mode: Enum.OrientationAlignmentMode;
	/** The direction of the goal's **X** axis, represented as a unit `Vector3`. */
	PrimaryAxis: Vector3;
	/** Determines how the constraint's axes are affected by torque. */
	PrimaryAxisOnly: boolean;
	/**
	 * Whether the constraint applies torque only to `Attachment0`, or to both attachments in equal and opposite directions.
	 */
	ReactionTorqueEnabled: boolean;
	/**
	 * Controls how quickly the constraint reaches its goal. Higher values cause the attachment(s) to align more rapidly.
	 */
	Responsiveness: number;
	/**
	 * Whether torque is dependent on other properties, or if the physics solver reacts as quickly as possible to complete the alignment.
	 */
	RigidityEnabled: boolean;
	/** The direction of the goal's **Y** axis, represented as a unit `Vector3`. */
	SecondaryAxis: Vector3;
}

/**
 * Constraint which applies force to move two attachments together, or to move one attachment to a goal position.
 */
interface AlignPosition extends Constraint {
	/**
	 * Whether force is applied to the parent of `Attachment0` at that attachment's location, or at the parents' center of mass.
	 */
	ApplyAtCenterOfMass: boolean;
	/**
	 * Determines how the constraint force will be limited. Only used if `RigidityEnabled` is `false`.
	 */
	ForceLimitMode: Enum.ForceLimitMode;
	/**
	 * Determines the axes that the constraint uses to limit the force. Only applies when `RigidityEnabled` is `false` and `AlignPosition.ForceLimitMode` is `PerAxis`. .
	 */
	ForceRelativeTo: Enum.ActuatorRelativeTo;
	/**
	 * Maximum force along each axis that the constraint can apply to achieve its goal.
	 */
	MaxAxesForce: Vector3;
	/** Maximum force magnitude the constraint can apply to achieve its goal. */
	MaxForce: number;
	/** Maximum speed the attachments can move when converging. */
	MaxVelocity: number;
	/** Whether the constraint uses one or two attachments in calculating its goal. */
	Mode: Enum.PositionAlignmentMode;
	/** The position to which the constraint should move its `Attachment0`. */
	Position: Vector3;
	/**
	 * Whether the constraint applies force only to `Attachment0`, or to both attachments in equal and opposite directions.
	 */
	ReactionForceEnabled: boolean;
	/**
	 * Controls how quickly the constraint reaches its goal. Higher values cause the attachment(s) to align more rapidly.
	 */
	Responsiveness: number;
	/**
	 * Whether force is dependent on other properties, or if the physics solver reacts as quickly as possible to complete the alignment.
	 */
	RigidityEnabled: boolean;
}

/** Applies torque on an assembly to maintain a constant angular velocity. */
interface AngularVelocity extends Constraint {
	/** A `Vector3` that gives the desired or target angular velocity. */
	AngularVelocity: Vector3;
	/** Magnitude of the maximum torque the constraint can apply. */
	MaxTorque: number;
	/** Causes the constraint to apply equal and opposite reaction forces. */
	ReactionTorqueEnabled: boolean;
	RelativeTo: Enum.ActuatorRelativeTo;
}

/** Aligns two `BaseParts` with an animate-able kinematic or force-based joint. */
interface AnimationConstraint extends Constraint {
	/** Toggles whether the constraint is kinematic or physically simulated. */
	IsKinematic: boolean;
	/** Maximum force magnitude the constraint can apply to achieve its goal. */
	MaxForce: number;
	/** Maximum torque the constraint can apply to reach its goal. */
	MaxTorque: number;
	/** Describes the current animation offset of the constraint joint. */
	Transform: CFrame;
}

/**
 * Forces its two attachments into the same position and allows them to freely rotate about all three axes, with optional limits to restrict both tilt and twist.
 */
interface BallSocketConstraint extends Constraint {
	/**
	 * Sets whether the `BallSocketConstraint` sets a limit on rotation based on `UpperAngle`.
	 */
	LimitsEnabled: boolean;
	/** Sets the maximum frictional torque applied to keep its `Attachments` aligned. */
	MaxFrictionTorque: number;
	/** The visualized radius of the `BallSocketConstraint`. */
	Radius: number;
	/**
	 * How elastic `Attachments` connected by a `BallSocketConstraint` will be when they reach the end of the range specified by `UpperAngle` when `LimitsEnabled` is `true`.
	 */
	Restitution: number;
	/**
	 * Sets whether the `BallSocketConstraint` sets a limit on twist rotation based on `TwistUpperAngle` and `TwistLowerAngle`.
	 */
	TwistLimitsEnabled: boolean;
	/**
	 * Sets the lower twist rotation limit of the `BallSocketConstraint`, as long as `TwistLimitsEnabled` is `true`.
	 */
	TwistLowerAngle: number;
	/**
	 * Sets the upper twist rotation limit of the `BallSocketConstraint`, as long as `TwistLimitsEnabled` is `true`.
	 */
	TwistUpperAngle: number;
	/**
	 * Sets the upper rotation limit of the `BallSocketConstraint`, as long as `LimitsEnabled` is `true`.
	 */
	UpperAngle: number;
}

/** Constrains its attachments to rotate about a single axis. */
interface HingeConstraint extends Constraint {
	/**
	 * Sets whether the rotation of the `HingeConstraint` is actuated and, if so, what kind of actuation it uses.
	 */
	ActuatorType: Enum.ActuatorType;
	/** Specifies the sharpness of the servo motor in reaching the `TargetAngle`. */
	AngularResponsiveness: number;
	/**
	 * The desired angular speed a `HingeConstraint` with `ActuatorType` set to `Servo` will attempt to maintain while rotating towards its `TargetAngle`. Measured in radians/second.
	 */
	AngularSpeed: number;
	/**
	 * The angular velocity a `HingeConstraint` with `ActuatorType` set to `Motor` will attempt to achieve. Measured in radians/second.
	 */
	AngularVelocity: number;
	/** The current angle of the `HingeConstraint`. */
	CurrentAngle: number;
	/** Sets whether the `HingeConstraint` will limit the range of rotation. */
	LimitsEnabled: boolean;
	/**
	 * The minimum rotation angle the `HingeConstraint` will allow if `LimitsEnabled` is true.
	 */
	LowerAngle: number;
	/**
	 * The maximum angular acceleration a `HingeConstraint` with `ActuatorType` set to `Motor` can apply to achieve its `AngularVelocity`. Measured in radians/second&sup2;.
	 */
	MotorMaxAcceleration: number;
	/**
	 * The maximum torque a `HingeConstraint` with `ActuatorType` set to `Motor` can apply when trying to reach its desired `AngularVelocity`.
	 */
	MotorMaxTorque: number;
	/** The visualized radius of the `HingeConstraint`. */
	Radius: number;
	/**
	 * How elastic `Attachment` connected by a `HingeConstraint` will be when they reach the end of the range when `LimitsEnabled` is true. Constrained between 0 and 1.
	 */
	Restitution: number;
	/**
	 * The maximum torque a `HingeConstraint` with `ActuatorType` set to `Servo` can apply when trying to reach its desired `TargetAngle`.
	 */
	ServoMaxTorque: number;
	/** @deprecated Deprecated. */
	SoftlockServoUponReachingTarget: boolean;
	/**
	 * The target angle a `HingeConstraint` will attempt to rotate to if its `ActuatorType` is set to `Servo`. Measured in degrees.
	 */
	TargetAngle: number;
	/**
	 * The maximum rotation angle the `HingeConstraint` will allow if `LimitsEnabled` is true.
	 */
	UpperAngle: number;
}

/** Applies a force along the theoretical line connecting its two `Attachments`. */
interface LineForce extends Constraint {
	/** Whether force is applied at the center of mass of the parent assembly. */
	ApplyAtCenterOfMass: boolean;
	/**
	 * When `true`, the force magnitude is multiplied by the inverse square of the distance.
	 */
	InverseSquareLaw: boolean;
	/** The magnitude of the force. */
	Magnitude: number;
	/** Maximum absolute force that can be applied. */
	MaxForce: number;
	/** Enables an equal and opposite reaction force on the parent of `Attachment1`. */
	ReactionForceEnabled: boolean;
}

/** Applies force on an assembly to maintain a constant linear velocity. */
interface LinearVelocity extends Constraint {
	/** Determines how the constraint force will be limited. */
	ForceLimitMode: Enum.ForceLimitMode;
	/**
	 * Determines if the constraint force will be limited or if the physics solver can apply an unlimited force to achieve the target velocity.
	 */
	ForceLimitsEnabled: boolean;
	/** The normalized `Vector3` direction for constraining the velocity along a line. */
	LineDirection: Vector3;
	/** Float value of the velocity when `VelocityConstraintMode` is set to `Line`. */
	LineVelocity: number;
	/**
	 * Maximum force along each axis that the constraint can apply to achieve the vector velocity. Only used if `ForceLimitsEnabled` is `true`, `ForceLimitMode` is `PerAxis`, and `VelocityConstraintMode` is `Vector`.
	 */
	MaxAxesForce: Vector3;
	/** Maximum magnitude of the force vector the constraint can apply. */
	MaxForce: number;
	/**
	 * Maximum force along each axis that the constraint can apply to achieve the plane velocity. Only used if `ForceLimitsEnabled` is `true`, `ForceLimitMode` is `PerAxis`, and `VelocityConstraintMode` is `Plane`.
	 */
	MaxPlanarAxesForce: Vector2;
	/** `Vector2` value of the velocity in each tangent direction of the plane. */
	PlaneVelocity: Vector2;
	/** The primary axis in the plane, when `VelocityConstraintMode` is set to `Plane`. */
	PrimaryTangentAxis: Vector3;
	ReactionForceEnabled: boolean;
	/** Sets the `Enum.ActuatorRelativeTo` property for the constraint. */
	RelativeTo: Enum.ActuatorRelativeTo;
	/**
	 * The secondary axis in the plane, when `VelocityConstraintMode` is set to `Plane`.
	 */
	SecondaryTangentAxis: Vector3;
	/** `Vector3` velocity value when `VelocityConstraintMode` is set to `Vector`. */
	VectorVelocity: Vector3;
	/** The mode of the constraint. */
	VelocityConstraintMode: Enum.VelocityConstraintMode;
}

/**
 * Moves its attachments into a position/orientation along a plane whose normal vector is the primary axis of `Attachment0`.
 */
interface PlaneConstraint extends Constraint {
}

/**
 * Constrains Attachment0 and Attachment1 such that both points lie in a plane with origin at Attachment0's position and unit normal vector equal to Attachment0's primary axis.
 * @deprecated This class is deprecated.
 */
interface Plane extends PlaneConstraint {
}

/** Creates a rigid connection between two `Attachments` or `Bones`. */
interface RigidConstraint extends Constraint {
}

/** Keeps two attachments separated by its defined `Length`. */
interface RodConstraint extends Constraint {
	/** The current distance between the constraint's `Attachments`. */
	CurrentDistance: number;
	/** The distance apart at which the constraint attempts to keep its `Attachments`. */
	Length: number;
	/**
	 * The maximum angle between the rod and `Attachment0` when `LimitsEnabled` is true.
	 */
	LimitAngle0: number;
	/**
	 * The maximum angle between the rod and `Attachment1` when `LimitsEnabled` is true.
	 */
	LimitAngle1: number;
	/**
	 * Determines whether `LimitAngle0` and `LimitAngle1` control the angles between the rod and the respective attachments.
	 */
	LimitsEnabled: boolean;
	/** The visualized thickness of the `RodConstraint`. */
	Thickness: number;
}

/**
 * Simulates rope dynamics, preventing two attachments from separating further than a defined length.
 */
interface RopeConstraint extends Constraint {
	/** The current distance between the constraint's `Attachments`. */
	CurrentDistance: number;
	/** The maximum distance apart the two `Attachments` can be. */
	Length: number;
	/**
	 * Elasticity of the `Attachments` connected by the constraint when reaching the maximum defined `Length`. Constrained between 0 and 1.
	 */
	Restitution: number;
	/** The visualized thickness of the `RopeConstraint`. */
	Thickness: number;
	/** Enables the winch motor. */
	WinchEnabled: boolean;
	/** The maximum force that the winch motor can apply. */
	WinchForce: number;
	/** The sharpness of the winch motor in reaching the `WinchTarget`. */
	WinchResponsiveness: number;
	/** A positive desired velocity at which the winch motor changes the rope length. */
	WinchSpeed: number;
	/** The target length for the winch motor. */
	WinchTarget: number;
}

/**
 * The base class for constraints that allow their attachments to slide along an axis but not rotate.
 */
interface SlidingBallConstraint extends Constraint {
	/**
	 * Sets whether the translation of the `SlidingBallConstraint` is actuated and, if so, what kind of actuation.
	 */
	ActuatorType: Enum.ActuatorType;
	/** The current offset between the constraint's `Attachments`. */
	CurrentPosition: number;
	/** Sets whether the `SlidingBallConstraint` will limit the range of translation. */
	LimitsEnabled: boolean;
	/**
	 * Specifies the "sharpness" of the linear servo motor in reaching the `TargetPosition`.
	 */
	LinearResponsiveness: number;
	/**
	 * The lower positional limit along the **X** axis of `Attachment0` if `LimitsEnabled` is true.
	 */
	LowerLimit: number;
	/**
	 * The constraint's maximum acceleration when `ActuatorType` is set to `Motor` as the constraint attempts to reach its desired `Velocity`.
	 */
	MotorMaxAcceleration: number;
	/**
	 * The constraint's maximum force when `ActuatorType` is set to `Motor`, as the constraint attempts to reach its desired `Velocity`.
	 */
	MotorMaxForce: number;
	/**
	 * The elasticity of the constraint's `Attachments` when they reach the end of the range specified by `UpperLimit` and `LowerLimit`, assuming `LimitsEnabled` is set to true.
	 */
	Restitution: number;
	/**
	 * The constraint's maximum force when `ActuatorType` is set to `Servo`, as the constraint attempts to reach its desired `Speed`.
	 */
	ServoMaxForce: number;
	/** The constraint's visualized size. */
	Size: number;
	/** @deprecated Deprecated. */
	SoftlockServoUponReachingTarget: boolean;
	/**
	 * The constraint's desired speed when `ActuatorType` is set to `Servo`, as the constraint translates towards its `TargetPosition`. Measured in studs per second.
	 */
	Speed: number;
	/**
	 * The constraint's attempted target position when `ActuatorType` is set to `Servo`. Measured in studs.
	 */
	TargetPosition: number;
	/**
	 * The upper positional limit along the **X** axis of `Attachment0` if `LimitsEnabled` is true.
	 */
	UpperLimit: number;
	/**
	 * The constraint's attempted velocity when `ActuatorType` is set to `Motor`. Measured in studs per second.
	 */
	Velocity: number;
}

/**
 * Constrains two attachments on two parts to have a relative linear and rotational motion.
 */
interface CylindricalConstraint extends SlidingBallConstraint {
	/** Type of angular actuator. */
	AngularActuatorType: Enum.ActuatorType;
	/** Enables the angular limits around the rotation axis. */
	AngularLimitsEnabled: boolean;
	/**
	 * Specifies the sharpness of the angular servo motor in reaching the `TargetAngle`.
	 */
	AngularResponsiveness: number;
	/** Restitution of the two limits, or how elastic they are. */
	AngularRestitution: number;
	/**
	 * Target angular speed. This value is unsigned as the servo will always move toward its target. In radians per second.
	 */
	AngularSpeed: number;
	/**
	 * The target angular velocity of the motor in radians per second around the rotation axis.
	 */
	AngularVelocity: number;
	/**
	 * Signed angle (in degrees) between the reference axis and the secondary axis of `Attachment1` around the rotation axis.
	 */
	CurrentAngle: number;
	/**
	 * Direction of the rotation axis as an angle from the **X** axis in the **XY** plane of `Attachment0`.
	 */
	InclinationAngle: number;
	/**
	 * Lower limit for the angle (in degrees) between the reference axis and the SecondaryAxis of `Attachment1` around the rotation axis.
	 */
	LowerAngle: number;
	/** The maximum angular acceleration of the motor in radians per second squared. */
	MotorMaxAngularAcceleration: number;
	/** The maximum torque the motor can apply to achieve the target angular velocity. */
	MotorMaxTorque: number;
	/** Enable the visibility of the rotation axis. */
	RotationAxisVisible: boolean;
	/** Maximum torque the servo motor can apply. */
	ServoMaxTorque: number;
	/** @deprecated Deprecated. */
	SoftlockAngularServoUponReachingTarget: boolean;
	/**
	 * Target angle (in degrees) between the reference axis and the secondary axis of `Attachment1` around the rotation axis.
	 */
	TargetAngle: number;
	/**
	 * Upper limit for the angle (in degrees) between the reference axis and the secondary axis of `Attachment1` around the rotation axis.
	 */
	UpperAngle: number;
	/** The unit vector direction of the rotation axis in world coordinates. */
	WorldRotationAxis: Vector3;
}

/**
 * Constraint which creates a rigid joint between two `Attachments`, allowing them to slide along one axis but not rotate.
 */
interface PrismaticConstraint extends SlidingBallConstraint {
}

/** Simulates spring and damper behavior between two attachments. */
interface SpringConstraint extends Constraint {
	/** The number of coils visualized on the `SpringConstraint`. */
	Coils: number;
	/** The current distance between the constraint's `Attachments`. */
	CurrentLength: number;
	/**
	 * Damping constant for the `SpringConstraint`. Multiplied to the velocity of the constraint's `Attachments` to reduce the spring force applied.
	 */
	Damping: number;
	/** Natural resting length of the spring. */
	FreeLength: number;
	/** Sets whether the `SpringConstraint` enforces a minimum and maximum length. */
	LimitsEnabled: boolean;
	/** The maximum force the `SpringConstraint` can apply on its `Attachments`. */
	MaxForce: number;
	/**
	 * The maximum separation the SpringConstraint will allow if `LimitsEnabled` is true.
	 */
	MaxLength: number;
	/**
	 * The minimum separation the SpringConstraint will allow if `LimitsEnabled` is true.
	 */
	MinLength: number;
	/** The visualized radius of the spring's coils. */
	Radius: number;
	/**
	 * The strength of the spring. The higher this value the more force will be applied when the attachments are separated a different length than the `FreeLength`.
	 */
	Stiffness: number;
	/** The visualized thickness of the spring's coils. */
	Thickness: number;
}

/** Applies constant torque to an assembly from its center of mass. */
interface Torque extends Constraint {
	/** The `CFrame` in which the torque is expressed. */
	RelativeTo: Enum.ActuatorRelativeTo;
	/** The strength and direction of the torque. */
	Torque: Vector3;
}

/** A rotational spring that opposes the angular motion between two axes. */
interface TorsionSpringConstraint extends Constraint {
	/** The number of coils visualized for the constraint. */
	Coils: number;
	/** The current angle, in degrees, of the limiting cone. */
	CurrentAngle: number;
	/**
	 * Damping constant for the `TorsionSpringConstraint`. Multiplied to the velocity of the constraint's `Attachments` to reduce the spring force applied.
	 */
	Damping: number;
	/**
	 * Limits the relative angular motion of the secondary axes of attachments through a cone constraint.
	 */
	LimitsEnabled: boolean;
	/** The maximum angle of the constraint's limiting cone. */
	MaxAngle: number;
	/** The maximum allowable torque provided by the torsion spring. */
	MaxTorque: number;
	/** The visualization radius of the spring. */
	Radius: number;
	/** The restitution coefficient of the cone constraint. */
	Restitution: number;
	/** The torsional stiffness of the spring. */
	Stiffness: number;
}

/** Ensures two axes on two bodies remain perpendicular. */
interface UniversalConstraint extends Constraint {
	/** Determines whether the angular motion of attachments' primary axes is limited. */
	LimitsEnabled: boolean;
	/** The max angle, in degrees, of the constraint's limiting cone. */
	MaxAngle: number;
	/** The constraint's visualization radius. */
	Radius: number;
	/** The restitution coefficient of the cone constraint. */
	Restitution: number;
}

/** Applies constant force to an assembly. */
interface VectorForce extends Constraint {
	/** Whether force is applied at the center of mass of the parent assembly. */
	ApplyAtCenterOfMass: boolean;
	/** The strength and direction of the force. */
	Force: Vector3;
	/** The `CFrame` in which the force is expressed. */
	RelativeTo: Enum.ActuatorRelativeTo;
}

/** Service that is used to load content, or assets, into a game. */
interface ContentProvider extends Instance {
	/** Used by the `ContentProvider` to download assets from the Roblox website. */
	BaseUrl: string;
	/**
	 * Gives the number of items in the `ContentProvider` request queue that need to be downloaded.
	 */
	RequestQueueSize: number;
	/** Gets the current `Enum.AssetFetchStatus` of the `contentId` provided. */
	GetAssetFetchStatus(contentId?: ContentId): Enum.AssetFetchStatus;
	/**
	 * A signal that fires when the `Enum.AssetFetchStatus` of the provided content changes.
	 */
	GetAssetFetchStatusChangedSignal(contentId?: ContentId): RBXScriptSignal;
	ListEncryptedAssets(): unknown;
	/**
	 * Queues an asset to be downloaded by the `ContentProvider`.
	 * @deprecated Deprecated.
	 */
	Preload(contentId?: ContentId): undefined;
	RegisterDefaultEncryptionKey(encryptionKey?: string): undefined;
	RegisterDefaultSessionKey(sessionKey?: string): undefined;
	RegisterEncryptedAsset(assetId?: ContentId, encryptionKey?: string): undefined;
	RegisterSessionEncryptedAsset(contentId?: ContentId, sessionKey?: string): undefined;
	UnregisterDefaultEncryptionKey(): undefined;
	UnregisterEncryptedAsset(assetId?: ContentId): undefined;
	/**
	 * Yields until all of the assets associated with the given `Instances` have loaded.
	 */
	PreloadAsync(contentIdList?: unknown, callbackFunction?: Function): undefined;
	readonly AssetFetchFailed: RBXScriptSignal<(assetId: ContentId) => void>;
}

/** A service used to bind user input to contextual actions. */
interface ContextActionService extends Instance {
	/** Bind user input to an action given an action handling function. */
	BindAction(actionName?: string, functionToBind?: Function, createTouchButton?: boolean, inputTypes?: unknown): undefined;
	/**
	 * Behaves like `BindAction` but also allows a priority to be assigned to the bound action for overlapping input types (higher before lower).
	 */
	BindActionAtPriority(actionName?: string, functionToBind?: Function, createTouchButton?: boolean, priorityLevel?: number, inputTypes?: unknown): undefined;
	/**
	 * Binds _functionToBind_ to input events such as key presses, mouse movement, or controller input.
	 * @deprecated Deprecated.
	 */
	BindActionToInputTypes(actionName?: string, functionToBind?: Function, createTouchButton?: boolean, inputTypes?: unknown): undefined;
	/**
	 * Bind a `Enum.KeyCode` with a specific `Enum.UserInputType` to trigger `Tool.Activation` and `ClickDetector` events.
	 */
	BindActivate(userInputTypeForActivation?: Enum.UserInputType, keyCodesForActivation?: unknown): undefined;
	/**
	 * Get a table of information about all bound actions (key is the name passed to `BindAction`, value is a table from `GetBoundActionInfo` when called with the key).
	 */
	GetAllBoundActionInfo(): unknown;
	/**
	 * Get a table of information about a bound action given its name originally passed to `BindAction`.
	 */
	GetBoundActionInfo(actionName?: string): unknown;
	/**
	 * Return the `BackpackItem.TextureId` of a `Tool` currently `equipped` by the `Player`.
	 */
	GetCurrentLocalToolIcon(): string;
	/**
	 * Given the name of a bound action with a touch button, sets the description of the action.
	 */
	SetDescription(actionName?: string, description?: string): undefined;
	/**
	 * If `actionName` key contains a bound action, then `image` is set as the image of the touch button.
	 */
	SetImage(actionName?: string, image?: string): undefined;
	/**
	 * Given the name of a bound action with a touch button, sets the position of the button within the ContextButtonFrame.
	 */
	SetPosition(actionName?: string, position?: UDim2): undefined;
	/**
	 * Given the name of a bound action with a touch button, sets the text shown on the button.
	 */
	SetTitle(actionName?: string, title?: string): undefined;
	/** Unbind an action from input given its name. */
	UnbindAction(actionName?: string): undefined;
	/**
	 * Unbind a `Enum.KeyCode` with a specific `Enum.UserInputType` from triggering `Tool.Activation` when bound with `ContextActionService:BindActivate()`.
	 */
	UnbindActivate(userInputTypeForActivation?: Enum.UserInputType, keyCodeForActivation?: Enum.KeyCode): undefined;
	/**
	 * Removes all functions bound. No actionNames will remain. All touch buttons will be removed.
	 */
	UnbindAllActions(): undefined;
	/**
	 * Retrieves a `ImageButton` of a `bound` action that had a touch input button created.
	 */
	GetButton(actionName?: string): Instance;
	/** Fires when the current player equips a `Tool`. */
	readonly LocalToolEquipped: RBXScriptSignal<(toolEquipped: Instance) => void>;
	/** Fires when the current player unequips a `Tool`. */
	readonly LocalToolUnequipped: RBXScriptSignal<(toolUnequipped: Instance) => void>;
}

/** The base class for controller objects, such as the `HumanoidController` object. */
interface Controller extends Instance {
	/** Activates an overriding bind on the specified button. */
	BindButton(button?: Enum.Button, caption?: string): undefined;
	/** Returns whether or not Button is being pressed. */
	GetButton(button?: Enum.Button): boolean;
	/** Removes the bind on button. */
	UnbindButton(button?: Enum.Button): undefined;
	/** @deprecated Deprecated. */
	bindButton(button?: Enum.Button, caption?: string): undefined;
	/** @deprecated Deprecated. */
	getButton(button?: Enum.Button): boolean;
	/**
	 * Fired when the pressed state of a bound button is changed. This event can be used in conjunction with `Controller:GetButton()` to see whether a bound button is being pressed down or not.
	 */
	readonly ButtonChanged: RBXScriptSignal<(button: Enum.Button) => void>;
}

interface HumanoidController extends Controller {
}

interface SkateboardController extends Controller {
	/**
	 * The direction of movement, tied to the keys A and D. Must be 1 (right), 0 (straight), or -1 (left). Will refresh back to 0 unless constantly set.
	 */
	Steer: number;
	/**
	 * The direction of movement, tied to the keys W and S. Must be an integer 1 (forward), 0 (null), or -1 (reverse). Will refresh back to 0 unless constantly set.
	 */
	Throttle: number;
	/** Fired when any input state of the skateboard controller is updated. */
	readonly AxisChanged: RBXScriptSignal<(axis: string) => void>;
}

interface VehicleController extends Controller {
}

interface ControllerBase extends Instance {
	Active: boolean;
	BalanceRigidityEnabled: boolean;
	/** The value multiplied by the `ControllerManager.BaseMoveSpeed`. */
	MoveSpeedFactor: number;
}

interface AirController extends ControllerBase {
	/** The maximum torque the character can use to remain balanced upright. */
	BalanceMaxTorque: number;
	/** The maximum angular speed used to align the character upright. */
	BalanceSpeed: number;
	/** Determines whether angular momentum is preserved when input has stopped. */
	MaintainAngularMomentum: boolean;
	/** Determines whether linear momentum is preserved when input has stopped. */
	MaintainLinearMomentum: boolean;
	/**
	 * The maximum force that can be applied on the `ControllerManager.RootPart` for moving in the `ControllerManager.MovingDirection`.
	 */
	MoveMaxForce: number;
	/**
	 * The maximum torque that can be applied on the `ControllerManager.RootPart` for turning towards the `ControllerManager.FacingDirection`.
	 */
	TurnMaxTorque: number;
	/** The value multiplied by the `ControllerManager.BaseTurnSpeed`. */
	TurnSpeedFactor: number;
}

interface ClimbController extends ControllerBase {
	/** The amount of time taken to reach the desired climb velocity from 0. */
	AccelerationTime: number;
	/**
	 * The maximum torque used to keep the `ControllerManager.RootPart` aligned upright and aligned to the climbed surface.
	 */
	BalanceMaxTorque: number;
	/**
	 * The maximum angular speed used to align the `ControllerManager.RootPart` upright and with the climbed surface.
	 */
	BalanceSpeed: number;
	/**
	 * The maximum force used by the climbing "motor" to move the `ControllerManager.RootPart` or keep it stationary.
	 */
	MoveMaxForce: number;
}

interface GroundController extends ControllerBase {
	AccelerationLean: number;
	/** Estimated time taken to reach the desired speed. */
	AccelerationTime: number;
	/**
	 * The maximum torque used to keep the `ControllerManager.RootPart` aligned upright.
	 */
	BalanceMaxTorque: number;
	/**
	 * The maximum angular speed used to align the `ControllerManager.RootPart` upright.
	 */
	BalanceSpeed: number;
	/** Estimated time taken to reach a complete stop from full speed. */
	DecelerationTime: number;
	/** The coefficient of friction of the character on the ground. */
	Friction: number;
	/** Amount the character's friction is weighed against the ground friction. */
	FrictionWeight: number;
	/**
	 * The target distance above the ground to keep the `ControllerManager.RootPart` at.
	 */
	GroundOffset: number;
	StandForce: number;
	StandSpeed: number;
	/** The value multiplied by the `ControllerManager.BaseTurnSpeed`. */
	TurnSpeedFactor: number;
}

interface SwimController extends ControllerBase {
	AccelerationTime: number;
	/** The maximum torque used to rotate to the desired pitch. */
	PitchMaxTorque: number;
	/**
	 * Multiplied by `ControllerManager.BaseTurnSpeed` to determine the maximum angular velocity for pitch.
	 */
	PitchSpeedFactor: number;
	/** The maximum torque applied to rotate to the desired roll. */
	RollMaxTorque: number;
	/**
	 * Multiplied by `ControllerManager.BaseTurnSpeed` to determine the maximum angular velocity for roll.
	 */
	RollSpeedFactor: number;
}

/**
 * Manages simulated motion control for its assigned `ControllerManager.RootPart` .
 */
interface ControllerManager extends Instance {
	/** The `ControllerBase` that is set to be activated on the character. */
	ActiveController: ControllerBase;
	/** The base linear movement speed used by all controllers. */
	BaseMoveSpeed: number;
	/** The base angular turning speed used by all controllers. */
	BaseTurnSpeed: number;
	/** A reference to the sensor data used while a `ClimbController` is active. */
	ClimbSensor: ControllerSensor;
	/** The unit vector describing the desired direction to face. */
	FacingDirection: Vector3;
	/** A reference to the sensor data used while a `GroundController` is active. */
	GroundSensor: ControllerSensor;
	/** The vector describing the desired direction to move in. */
	MovingDirection: Vector3;
	/** The `BasePart` where the controller's forces and torques are applied. */
	RootPart: BasePart;
	UpDirection: Vector3;
}

/** Container class for the `HumanoidController` among other classes. */
interface ControllerService extends Instance {
}

interface ConversationalAIAcceptanceService extends Instance {
}

/**
 * A backend service used by Roblox to control HTTP cookies. Its functions are not available to developers.
 */
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

/** @deprecated This class is deprecated. */
interface CustomEvent extends Instance {
	/** Returns the `CustomEventReceivers` that are connected to the `CustomEvent`. */
	GetAttachedReceivers(): Instance[];
	/**
	 * Sets the value of the `CustomEvent` and fires the `CustomEventReceiver.SourceValueChanged` event for all connected `CustomEventReceiver|receivers`.
	 */
	SetValue(newValue?: number): undefined;
	/** Fires when a receiver is connected to the `CustomEvent`. */
	readonly ReceiverConnected: RBXScriptSignal<(receiver: Instance) => void>;
	/** Fires when a receiver is disconnected from the `CustomEvent`. */
	readonly ReceiverDisconnected: RBXScriptSignal<(receiver: Instance) => void>;
}

/** @deprecated This class is deprecated. */
interface CustomEventReceiver extends Instance {
	/** Attaches the `CustomEventReceiver` object to a `CustomEvent`. */
	Source: Instance;
	/**
	 * Returns the current value of the receiver's `CustomEventReceiver.Source` property.
	 */
	GetCurrentValue(): number;
	/**
	 * Fires when the receiver is attached to a different `CustomEvent`, when the `CustomEventReceiver.Source` property is changed.
	 */
	readonly EventConnected: RBXScriptSignal<(event: Instance) => void>;
	/**
	 * Fires when the receiver is attached to a different `CustomEvent` instance when the `CustomEventReceiver.Source` property is changed.
	 */
	readonly EventDisconnected: RBXScriptSignal<(event: Instance) => void>;
	/**
	 * Fires when the value of the CustomEvent's source is changed, passing the CustomEvent's new value.
	 */
	readonly SourceValueChanged: RBXScriptSignal<(newValue: number) => void>;
}

interface CustomLog extends Instance {
	Close(): undefined;
	GetLogPath(): string;
	Open(): undefined;
	WriteAppend(append?: string): undefined;
}

/** The DataModelMesh is an abstract class from which mesh classes descend. */
interface DataModelMesh extends Instance {
	/**
	 * The Offset of a mesh determines the relative position from the `BasePart.Position` of a `BasePart` that the mesh will be displayed at.
	 */
	Offset: Vector3;
	/**
	 * The Scale of a mesh determines the size of the mesh relative to its original dimensions.
	 */
	Scale: Vector3;
	/** Changes the hue of a mesh's texture, used with `FileMesh.TextureId`. */
	VertexColor: Vector3;
}

/**
 * An abstract class that `BlockMesh` and `CylinderMesh` inherit from.
 * @deprecated This class is deprecated.
 */
interface BevelMesh extends DataModelMesh {
}

/**
 * The BlockMesh object applies a 'brick' mesh to the `BasePart` it is parented to. It behaves identically to a `SpecialMesh` with `SpecialMesh.MeshType` set to 'Brick'.
 */
interface BlockMesh extends BevelMesh {
}

/**
 * The CylinderMesh object applies a 'cylinder' mesh to the `BasePart` it is parented to.
 * @deprecated This class is deprecated.
 */
interface CylinderMesh extends BevelMesh {
}

/**
 * The FileMesh object applies a mesh to a `BasePart` when parented to it. Its properties are inherited by the `SpecialMesh` object.
 */
interface FileMesh extends DataModelMesh {
	/** The MeshId is the content ID of the mesh that is to be displayed. */
	MeshId: ContentId;
	/**
	 * The TextureId is the content ID of the texture that is to be applied to the mesh.
	 */
	TextureId: ContentId;
}

/**
 * The `SpecialMesh` object applies a mesh to a `BasePart` depending on the `MeshType` property.
 */
interface SpecialMesh extends FileMesh {
	/**
	 * Determines the type of mesh that will be applied to the `BasePart` the `SpecialMesh` is parented to.
	 */
	MeshType: Enum.MeshType;
}

interface DataModelPatchService extends Instance {
}

interface DataModelSession extends Instance {
}

interface DataStoreGetOptions extends Instance {
	UseCache: boolean;
}

/** Specifies additional parameters for a `GlobalDataStore:IncrementAsync()` call. */
interface DataStoreIncrementOptions extends Instance {
	/** Gets the custom metadata set with this `DataStoreIncrementOptions` instance. */
	GetMetadata(): unknown;
	/** Sets custom metadata to be associated with the key. */
	SetMetadata(attributes?: unknown): undefined;
}

/** Object describing data store information. */
interface DataStoreInfo extends Instance {
	/** Indicates when the data store was created in milliseconds since epoch. */
	CreatedTime: number;
	/** The name of the data store. */
	DataStoreName: string;
	/** Indicates the last time the data store was updated in milliseconds since epoch. */
	UpdatedTime: number;
}

/** Object representing a key on a `DataStoreKeyPages` object. */
interface DataStoreKey extends Instance {
	/** The name of the key. */
	KeyName: string;
}

/** An object specifying information about a particular version of the key. */
interface DataStoreKeyInfo extends Instance {
	/** The date and time the object was created. */
	CreatedTime: number;
	/** The date and time the object was last updated. */
	UpdatedTime: number;
	/** Uniquely identifies the version of the object. */
	Version: string;
	/** Returns the metadata associated with the object. */
	GetMetadata(): unknown;
	/** An array of `UserIds` tagged with a key. */
	GetUserIds(): unknown;
}

/** An instance describing version information for a key. */
interface DataStoreObjectVersionInfo extends Instance {
	/** Indicates when the version was created in milliseconds since epoch. */
	CreatedTime: number;
	/** Whether the version has been marked as deleted. */
	IsDeleted: boolean;
	/** Uniquely identifies a particular version of the key. */
	Version: string;
}

/**
 * Object used to provide additional parameters to `DataStoreService:GetDataStore()`.
 */
interface DataStoreOptions extends Instance {
	/** Whether the `GlobalDataStore` should work with all scopes. */
	AllScopes: boolean;
	SetExperimentalFeatures(experimentalFeatures?: unknown): undefined;
}

/**
 * A game service that gives access to persistent data storage across places in a game.
 */
interface DataStoreService extends Instance {
	/** Creates a `DataStore` instance with the provided name and scope. */
	GetDataStore(name?: string, scope?: string, options?: Instance): DataStore;
	/** Returns the default data store. */
	GetGlobalDataStore(): DataStore;
	/** Get an `OrderedDataStore` given a name and optional scope. */
	GetOrderedDataStore(name?: string, scope?: string): OrderedDataStore;
	/** Returns the number of requests that can be made by the given request type. */
	GetRequestBudgetForRequestType(requestType?: Enum.DataStoreRequestType): number;
	SetRateLimitForRequestType(requestType?: Enum.DataStoreRequestType, baseLimit?: number, perPlayerLimit?: number): undefined;
	/**
	 * Returns a `DataStoreListingPages` object for enumerating through all of the experience's data stores.
	 */
	ListDataStoresAsync(prefix?: string, pageSize?: number, cursor?: string): DataStoreListingPages;
}

/** Specifies additional parameters for a `GlobalDataStore:SetAsync()` call. */
interface DataStoreSetOptions extends Instance {
	/** Gets the custom metadata set with this `DataStoreSetOptions` instance. */
	GetMetadata(): unknown;
	/** Sets custom metadata to be associated with the key. */
	SetMetadata(attributes?: unknown): undefined;
}

/** Allows scheduling the guaranteed destruction of an object without yielding.   . */
interface Debris extends Instance {
	/**
	 * The maximum number of items that can be assigned to the `Debris` service at one time.
	 * @deprecated Deprecated.
	 */
	MaxItems: number;
	/** Schedules a given `Instance` for destruction within the specified lifetime. */
	AddItem(item?: Instance, lifetime?: number): undefined;
	/** @deprecated Deprecated. */
	addItem(item?: Instance, lifetime?: number): undefined;
}

/** Collection of various developer-facing diagnostics information. */
interface DebugSettings extends Instance {
	/**
	 * Describes whether a `DataModel` is actively in memory, as an integer (where 1 = true, and 0 = false).
	 */
	DataModel: number;
	/** The number of instances active in the simulation. */
	InstanceCount: number;
	/** Whether or not a stacktrace is displayed in the output for an error. */
	IsScriptStackTracingEnabled: boolean;
	/** Returns the number of internal DataModel jobs actively being processed. */
	JobCount: number;
	/** The number of players currently in the active game-instance. */
	PlayerCount: number;
	/** Whether or not sound warnings should be reported. */
	ReportSoundWarnings: boolean;
	/**
	 * The current client version of Roblox. Can also be retrieved by using the version() function.
	 */
	RobloxVersion: string;
	/**
	 * Sets the internal sampling method used to measure elapsed time with consistency across platforms.
	 */
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
	GetDebuggers(): Instance[];
	Resume(): undefined;
	/** @deprecated Deprecated. */
	StepIn(): undefined;
	/** @deprecated Deprecated. */
	StepOut(): undefined;
	/** @deprecated Deprecated. */
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

/** Creates NPC billboard-style dialog bubbles. */
interface Dialog extends Instance {
	/** Sets whether the Dialog can be used by multiple players at once. */
	BehaviorType: Enum.DialogBehaviorType;
	/**
	 * The furthest distance that a player can be from the Dialog's parent to start a conversation.
	 */
	ConversationDistance: number;
	/** Toggles whether the goodbye option will be displayed. */
	GoodbyeChoiceActive: boolean;
	/** Sets the sentence that the dialog will show to the player when the chat ends. */
	GoodbyeDialog: string;
	/** If true, this dialog is being used by at least one player. */
	InUse: boolean;
	/**
	 * Sets the first sentence that the dialog will show to the player, once a chat is commenced.
	 */
	InitialPrompt: string;
	/** Sets the icon that the initial dialog displays. */
	Purpose: Enum.DialogPurpose;
	/** Sets the color of the NPC's speech bubble. */
	Tone: Enum.DialogTone;
	/** Sets the maximum distance that a dialog can be triggered from. */
	TriggerDistance: number;
	/** Sets the offset of the dialog relative to the dialog's parent. */
	TriggerOffset: Vector3;
	/** Returns a list of players currently using the Dialog. */
	GetCurrentPlayers(): Instance[];
	/** Fired when a player chooses something to say, through a `Dialog` instance. */
	readonly DialogChoiceSelected: RBXScriptSignal<(player: Instance, dialogChoice: Instance) => void>;
}

/**
 * Used to craft the further choices available to players who have started a dialog conversation with an NPC.
 */
interface DialogChoice extends Instance {
	/** Toggles whether the goodbye option will be displayed. */
	GoodbyeChoiceActive: boolean;
	/** Sets the sentence that the dialog will show to the player when the chat ends. */
	GoodbyeDialog: string;
	/** Sets what the NPC will say when the player chooses this DialogChoice. */
	ResponseDialog: string;
	/** Sets what the player will say when they choose this DialogChoice. */
	UserDialog: string;
}

interface DraftsService extends Instance {
}

/** A helper object used to create tools that can drag parts. */
interface Dragger extends Instance {
	/** Rotates the currently dragged part(s) by 90 degrees on the given axis. */
	AxisRotate(axis?: Enum.Axis): undefined;
	/** Initializes a dragging action, specifying which parts to use when dragging. */
	MouseDown(mousePart?: Instance, pointOnMousePart?: Vector3, parts?: Instance[]): undefined;
	/**
	 * Tries to move the currently dragged part to the point where MouseRay hits another part.
	 */
	MouseMove(mouseRay?: Ray): undefined;
	/** Stops the current dragging action (made by `Dragger:MouseDown()`). */
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

/** Service providing common encoding, hashing, and compression methods. */
interface EncodingService extends Instance {
	Base64Decode(input?: buffer): buffer;
	Base64Encode(input?: buffer): buffer;
	CompressBuffer(input?: buffer, algorithm?: Enum.CompressionAlgorithm, compressionLevel?: number): buffer;
	ComputeBufferHash(input?: buffer, algorithm?: Enum.HashAlgorithm): buffer;
	ComputeStringHash(input?: string, algorithm?: Enum.HashAlgorithm): string;
	DecompressBuffer(input?: buffer, algorithm?: Enum.CompressionAlgorithm): buffer;
	GetDecompressedBufferSize(input?: buffer, algorithm?: Enum.CompressionAlgorithm): unknown;
}

/** Represents a 3D rotation curve through a group of three `FloatCurves`. */
interface EulerRotationCurve extends Instance {
	/** Euler angles rotation order. */
	RotationOrder: Enum.RotationOrder;
	/**
	 * Samples the three `FloatCurves` (`X`, `Y`, `Z`) at the passed `time` argument and returns the result as three Euler angles.
	 */
	GetAnglesAtTime(time?: number): unknown;
	/**
	 * Samples the `EulerRotationCurve` at a given `time` and returns the corresponding rotation.
	 */
	GetRotationAtTime(time?: number): CFrame;
	/** Returns the `FloatCurve` controlling the `X` Euler angle channel. */
	X(): FloatCurve;
	/** Returns the `FloatCurve` controlling the `Y` Euler angle channel. */
	Y(): FloatCurve;
	/** Returns the `FloatCurve` controlling the `Z` Euler angle channel. */
	Z(): FloatCurve;
}

interface EventIngestService extends Instance {
}

interface ExampleV2Service extends Instance {
}

interface ExperienceAuthService extends Instance {
}

/** Used to customize a player invite prompt. */
interface ExperienceInviteOptions extends Instance {
	/** Asset ID that maps to a **Notification** asset type. */
	InviteMessageId: string;
	/** Roblox `UserId` of the specific connection to invite. */
	InviteUser: number;
	/**
	 * Used to set a parameter in `Player:GetJoinData()` when a connection joins from the invite notification.
	 */
	LaunchData: string;
	/** Custom text shown on the invite prompt for the sending player. */
	PromptMessage: string;
}

/**
 * Service containing methods to validate users and prompt them to enable experience notifications.
 */
interface ExperienceNotificationService extends Instance {
	/** Shows an in-experience prompt for the local player to enable notifications. */
	PromptOptIn(): undefined;
	/** Indicates whether the local player can be prompted to enable notifications. */
	CanPromptOptInAsync(): boolean;
	/** Fires when the local player closes the prompt. */
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

/**
 * Applies force to `BaseParts` within the explosion's `Explosion.BlastRadius`. Breaks `JointInstances` and `WeldConstraints` between parts and kills `Humanoid` characters not protected by a `ForceField`.
 */
interface Explosion extends Instance {
	/**
	 * Used to determine the amount of force applied to `BaseParts` caught in the `Explosion.BlastRadius`.
	 */
	BlastPressure: number;
	/**
	 * This property determines the radius of the `Explosion`, in studs. This radius determines the area of effect of the explosion, not the size of the explosion's visuals.
	 */
	BlastRadius: number;
	/**
	 * Used to set the proportion of the `Explosion.BlastRadius`, between 0 and 1, within which all joints will be destroyed. Anything outside of this range will only have the `Explosion` force applied to it.
	 */
	DestroyJointRadiusPercent: number;
	/**
	 * This property determines how the `Explosion` will interact with `Terrain`. Used to set if explosions will cause damage to the terrain or not.
	 */
	ExplosionType: Enum.ExplosionType;
	/**
	 * This property is the position of the center of the `Explosion`. It is defined in world-space and not influenced by the `Explosion` parent.
	 */
	Position: Vector3;
	/** Value between 0 and 1 that controls the speed of the particle effect. */
	TimeScale: number;
	/**
	 * This property determines whether or not the visual effect of an `Explosion` is shown or not.
	 */
	Visible: boolean;
	/**
	 * Fires when the `Explosion` hits a `BasePart` within its `Explosion.BlastRadius`. Returns the part hit along with the distance of the part from `Explosion.Position`.
	 */
	readonly Hit: RBXScriptSignal<(part: BasePart, distance: number) => void>;
}

interface FaceAnimatorService extends Instance {
}

/**
 * The `FaceControls` object defines a set of properties for controlling the facial expressions of a Dynamic Head.
 */
interface FaceControls extends Instance {
	/** Raises the chin up; moves the lower lip upwards. */
	ChinRaiser: number;
	/** Moves the upper lip when ChinRaiser is engaged and touching the upper lip. */
	ChinRaiserUpperLip: number;
	/** Brings the left and right brows inward together. */
	Corrugator: number;
	/** Moves gaze down. This is a required pose for avatars. */
	EyesLookDown: number;
	/** Moves gaze left. This is a required pose for avatars. */
	EyesLookLeft: number;
	/** Moves gaze right. This is a required pose for avatars. */
	EyesLookRight: number;
	/** Moves gaze up. This is a required pose for avatars. */
	EyesLookUp: number;
	/**
	 * Also known as lip tightener; brings the corners of the mouth inward and pressing the lips back against the teeth.
	 */
	FlatPucker: number;
	/** Makes a 'O' shape with the mouth. */
	Funneler: number;
	/** Lowers the jaw downward opening the mouth. This is a required pose for avatars. */
	JawDrop: number;
	/** Moves mouth and jaw to the left (character left). */
	JawLeft: number;
	/** Moves mouth and jaw to the right (character right). */
	JawRight: number;
	/** Lowers the left brow down. */
	LeftBrowLowerer: number;
	/** Puffs up the left cheek. */
	LeftCheekPuff: number;
	/** Squints the left eye. */
	LeftCheekRaiser: number;
	/** Moves the corners of the mouth back in Z. */
	LeftDimpler: number;
	/** Closes the left eyelid. This is a required pose for avatars. */
	LeftEyeClosed: number;
	/** Raises the left eyelid upwards to reveal more of the eye white above the iris. */
	LeftEyeUpperLidRaiser: number;
	/** Raises the interior half of the left brow upwards. */
	LeftInnerBrowRaiser: number;
	/** Lowers the corners of the mouth downwards in a frown. */
	LeftLipCornerDown: number;
	/**
	 * Raises the corners of the mouth upwards in a smile. This is a required pose for avatars.
	 */
	LeftLipCornerPuller: number;
	/** Stretches the corners of the mouth apart. This is a required pose for avatars. */
	LeftLipStretcher: number;
	/**
	 * Lowers the lower lip down away from the upper lip revealing the lower teeth. This is a required pose for avatars.
	 */
	LeftLowerLipDepressor: number;
	/**
	 * Raise the left nostril, pulls the brow down slightly, and wrinkles on the side of the nose.
	 */
	LeftNoseWrinkler: number;
	/** Raises the outer part of the left brow upwards. */
	LeftOuterBrowRaiser: number;
	/**
	 * Raises the left upper lip away from the lower lip revealing the upper teeth. This is a required pose for avatars.
	 */
	LeftUpperLipRaiser: number;
	/** Presses the lips together. */
	LipPresser: number;
	/**
	 * Brings the lips together relative to JawDrop. This is a required pose for avatars.
	 */
	LipsTogether: number;
	/** Rolls the lower lip up over the teeth. */
	LowerLipSuck: number;
	/** Moves the mouth left. */
	MouthLeft: number;
	/** Moves the mouth right. */
	MouthRight: number;
	/** Makes a kiss-like shape with the mouth. This is a required pose for avatars. */
	Pucker: number;
	/** Lowers the right brow down. */
	RightBrowLowerer: number;
	/** Puffs up the right cheek. */
	RightCheekPuff: number;
	/** Squints the right eye. */
	RightCheekRaiser: number;
	/** Moves the corners of the mouth back in Z. */
	RightDimpler: number;
	/** Closes the right eyelid. This is a required pose for avatars. */
	RightEyeClosed: number;
	/** Raises the right eyelid upwards to reveal more of the eye white above the iris. */
	RightEyeUpperLidRaiser: number;
	/** Raises the interior half of the right brow upwards. */
	RightInnerBrowRaiser: number;
	/** Lowers the corners of the mouth downwards in a frown. */
	RightLipCornerDown: number;
	/**
	 * Raises the corners of the mouth upwards in a smile. This is a required pose for avatars.
	 */
	RightLipCornerPuller: number;
	/** Stretches the corners of the mouth apart. This is a required pose for avatars. */
	RightLipStretcher: number;
	/**
	 * Lowers the lower lip down away from the upper lip revealing the lower teeth. This is a required pose for avatars.
	 */
	RightLowerLipDepressor: number;
	/**
	 * Raises the right nostril, pulls the brow down slightly, and wrinkles on the side of the nose.
	 */
	RightNoseWrinkler: number;
	/** Raises the outer part of the right brow upwards. */
	RightOuterBrowRaiser: number;
	/**
	 * Raises the right upper lip away from the lower lip revealing the upper teeth. This is a required pose for avatars.
	 */
	RightUpperLipRaiser: number;
	/** Bends the tongue down. */
	TongueDown: number;
	/** Extends the tip of the tongue out of the mouth. */
	TongueOut: number;
	/** Bends the tongue up. */
	TongueUp: number;
	/** Rolls the upper lip around the teeth. */
	UpperLipSuck: number;
}

/** An abstract class from which the `Decal` and `Texture` classes inherit. */
interface FaceInstance extends Instance {
	/** Sets which face of the parent `BasePart` the object appears on. */
	Face: Enum.NormalId;
}

/** Applies an image texture to a face of a parent `BasePart`. */
interface Decal extends FaceInstance {
	/** The `Color3` tint of the `Decal`. */
	Color3: Color3;
	/** Content ID that determines the color and opacity of the surface. */
	ColorMap: ContentId;
	/** `Content` object that determines the color and opacity of the surface. */
	ColorMapContent: Content;
	MetalnessMapContent: Content;
	NormalMapContent: Content;
	Rotation: number;
	RoughnessMapContent: Content;
	/** @deprecated Deprecated. */
	Shiny: number;
	/** @deprecated Deprecated. */
	Specular: number;
	/** The content ID of the image to be applied by the `Decal`. */
	Texture: ContentId;
	/** The texture content displayed by the `Decal`. */
	TextureContent: Content;
	/** Determines the transparency of the `Decal`. */
	Transparency: number;
	/** Shifts the UV coordinates by adding an offset before texture mapping. */
	UVOffset: Vector2;
	/** Stretches or compresses the UV coordinates by multiplying a scale factor. */
	UVScale: Vector2;
	/** Determines the rendering order when multiple decals are assigned the same face. */
	ZIndex: number;
}

/** Applies a repeating image texture to the face of a parent `BasePart`. */
interface Texture extends Decal {
	/** Determines the offset in studs of the rendered texture's horizontal coordinate. */
	OffsetStudsU: number;
	/** Determines the offset in studs of the rendered texture's vertical coordinate. */
	OffsetStudsV: number;
	/**
	 * Sets the horizontal size, in studs, of the tiled image applied by the `Texture`.
	 */
	StudsPerTileU: number;
	/** Sets the vertical size, in studs, of the tiled image applied by the `Texture`. */
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

/** The base class for the legacy motor system. */
interface Feature extends Instance {
	/** Sets what side of the Parent the object is on. */
	FaceId: Enum.NormalId;
	/**
	 * Controls how the Feature is positioned on it's parent's surface, in correspondence to the Feature's `Feature.LeftRight` and `Feature.TopBottom` properties.
	 */
	InOut: Enum.InOut;
	/**
	 * Controls whether the feature is shifted to the left, center, or right on the surface.
	 */
	LeftRight: Enum.LeftRight;
	/**
	 * Controls whether the feature is shifted to the top, center, or bottom on the surface.
	 */
	TopBottom: Enum.TopBottom;
}

/** @deprecated This class is deprecated. */
interface Hole extends Feature {
}

/** @deprecated This class is deprecated. */
interface MotorFeature extends Feature {
}

interface FeatureRestrictionManager extends Instance {
}

/** An asset loaded from a file on disk. */
interface File extends Instance {
	/** Reads the contents of the `File` as a string. */
	GetBinaryContents(): string;
	/** Gets a `rbxtemp://` asset ID for this `File`. */
	GetTemporaryId(): ContentId;
}

interface FileManagerService extends Instance {
}

/** A preconfigured particle emitter with the visual aesthetic of fire. */
interface Fire extends Instance {
	/** Determines the color of the primary (outer) flame particles. */
	Color: Color3;
	/** Determines whether flame particles are emit. */
	Enabled: boolean;
	/** Determines the velocity at which particles are emit. */
	Heat: number;
	/** Determines the color of the of the secondary (inner) flame particles. */
	SecondaryColor: Color3;
	/** Determines the size of the flame particles. */
	Size: number;
	/** Controls the speed of the particle effect. */
	TimeScale: number;
	/** @deprecated Deprecated. */
	size: number;
}

/**
 * An internal service responsible for handling the now deprecated `FlagStand` and `Flag` objects.
 */
interface FlagStandService extends Instance {
}

/**
 * A sorted list of time-value pairs that define a curve. Used to animate a single numerical value.
 */
interface FloatCurve extends Instance {
	/** Number of keys in the float curve. */
	Length: number;
	/** Returns a copy of a key at a given index. */
	GetKeyAtIndex(index?: number): FloatCurveKey;
	/** Returns the index of the last and first key of a period of time. */
	GetKeyIndicesAtTime(time?: number): unknown;
	/**
	 * Returns a copy of all the keys in the FloatCurve as a Luau array of `FloatCurveKeys`.
	 */
	GetKeys(): unknown;
	/** Samples the float curve at a given time passed as argument. */
	GetValueAtTime(time?: number): unknown;
	/**
	 * Adds the key passed as an argument to this curve. If a key at the same time is found, it will be replaced.
	 */
	InsertKey(key?: FloatCurveKey): unknown;
	/** Removes a given number of keys starting from a given index. */
	RemoveKeyAtIndex(startingIndex?: number, count?: number): number;
	/** Resets this curve's keys using the `FloatCurveKey` array passed as an argument. */
	SetKeys(keys?: unknown): number;
}

interface FlyweightService extends Instance {
}

interface CSGDictionaryService extends FlyweightService {
}

interface NonReplicatedCSGDictionaryService extends FlyweightService {
}

/** A simple container used to hold and organize Roblox instances. */
interface Folder extends Instance {
}

/**
 * Protects a `Humanoid` from taking damage dealt through the `Humanoid:TakeDamage()` method and protects `BaseParts` from having their joints broken due to an `Explosion`.
 */
interface ForceField extends Instance {
	/** Determines whether or not the `ForceField` particle effect is visible. */
	Visible: boolean;
}

/**
 * An internal service which is used to send, cancel, accept and decline connection requests in-game.
 */
interface FriendService extends Instance {
}

/** @deprecated This class is deprecated. */
interface FunctionalTest extends Instance {
	/** The description of the FunctionalTest. */
	Description: string;
	Error(message?: string): undefined;
	/** Prints a red message to the output, prefixed by _"TestService: "_. */
	Failed(message?: string): undefined;
	Pass(message?: string): undefined;
	Passed(message?: string): undefined;
	/** Prints if a condition is true, otherwise prints a warning. */
	Warn(message?: string): undefined;
}

/**
 * A service associated with the legacy game pass system. Use `MarketplaceService` for all new work.
 */
interface GamePassService extends Instance {
	/**
	 * Returns `true` if the `Player` has the specified **legacy** game pass. Does not work with new game passes.
	 * @deprecated Deprecated.
	 */
	PlayerHasPass(player?: Player, gamePassId?: number): boolean;
}

/** A container for miscellaneous in-game options. */
interface GameSettings extends Instance {
	/** @deprecated Deprecated. */
	VideoCaptureEnabled: boolean;
}

/**
 * The GamepadService is internally responsible for handling inputs from various controllers, such as Xbox One or PlayStation DualShock controllers.
 */
interface GamepadService extends Instance {
	/** The state of the gamepad virtual cursor. */
	readonly GamepadCursorEnabled: boolean;
	/** Disables the gamepad cursor, if currently enabled. */
	DisableGamepadCursor(): undefined;
	/** Enables the gamepad cursor or updates its position. */
	EnableGamepadCursor(guiObject?: Instance): undefined;
}

/** Service that allows developers to generate 3D objects from text prompts. */
interface GenerationService extends Instance {
	/**
	 * Starts the generation of a new 3D mesh from a text prompt and returns unique IDs used to track and retrieve the result.
	 */
	GenerateMeshAsync(inputs?: unknown, player?: Player, options?: unknown, intermediateResultCallback?: Function?): unknown;
	/**
	 * Enables generation of multi-mesh geometries according to provided `inputs` and a `schema`.
	 */
	GenerateModelAsync(inputs?: unknown, schema?: unknown, options?: unknown): unknown;
	/**
	 * Retrieves and loads a mesh generated by `GenerationService:GenerateMeshAsync()` using the provided `generationId`.
	 */
	LoadGeneratedMeshAsync(generationId?: string): MeshPart;
}

interface GenericChallengeService extends Instance {
}

/** An internal Roblox service which cannot be used by developers. */
interface Geometry extends Instance {
}

/** Service containing geometric operations. */
interface GeometryService extends Instance {
	/**
	 * Returns a table of `Constraints` and `Attachments` which you may choose to preserve, along with their respective parents.
	 */
	CalculateConstraintsToPreserve(source?: Instance, destination?: unknown, options?: unknown): unknown;
	/** This API has not been released. */
	GenerateFragmentSites(part?: BasePart, options?: unknown): unknown;
	/** This API has not been released. */
	FragmentAsync(part?: BasePart, sites?: unknown, options?: unknown): unknown;
	/**
	 * Creates one or more `PartOperations` from the intersecting geometry of one part and other parts.
	 */
	IntersectAsync(part?: Instance, parts?: unknown, options?: unknown): unknown;
	/**
	 * Creates one or more `PartOperations` from one part minus the geometry occupied by other parts.
	 */
	SubtractAsync(part?: Instance, parts?: unknown, options?: unknown): unknown;
	/** This API has not been released. */
	SweepPartAsync(part?: BasePart, cframes?: unknown, options?: unknown): MeshPart;
	/**
	 * Creates one or more `PartOperations` from one part plus the geometry occupied by other parts.
	 */
	UnionAsync(part?: Instance, parts?: unknown, options?: unknown): unknown;
}

/** Use with `TextService:GetTextBoundsAsync()` to measure the size of text. */
interface GetTextBoundsParams extends Instance {
	/** The `Font` of the text being measured. */
	Font: Font;
	RichText: boolean;
	/** The size of the text being measured. */
	Size: number;
	/** The text being measured. */
	Text: string;
	/** The width of the container for line breaking. */
	Width: number;
}

/** An object that exposes methods to access a single data store. */
interface GlobalDataStore extends Instance {
	/**
	 * Sets a callback function to be executed any time the value associated with a key is changed.
	 * @deprecated Deprecated.
	 */
	OnUpdate(key?: string, callback?: Function): RBXScriptConnection;
	/**
	 * Returns the value of a key in a specified data store and a `DataStoreKeyInfo` instance.
	 */
	GetAsync(key?: string, options?: DataStoreGetOptions): unknown;
	/** Increments the value of a key by the provided amount (both must be integers). */
	IncrementAsync(key?: string, delta?: number, userIds?: unknown, options?: DataStoreIncrementOptions): unknown;
	/** Removes the specified key while also retaining an accessible version. */
	RemoveAsync(key?: string): unknown;
	/** Sets the value of the data store for the given key. */
	SetAsync(key?: string, value?: unknown, userIds?: unknown, options?: DataStoreSetOptions): unknown;
	/** Updates a key's value with a new value from the specified callback function. */
	UpdateAsync(key?: string, transformFunction?: Function): unknown;
}

interface DataStore extends GlobalDataStore {
	/** Retrieves the specified key version. */
	GetVersionAsync(key?: string, version?: string): unknown;
	/** Retrieves the key version that was current at a given time. */
	GetVersionAtTimeAsync(key?: string, timestamp?: number): unknown;
	/**
	 * Returns a `DataStoreKeyPages` object for enumerating through keys of a data store.
	 */
	ListKeysAsync(prefix?: string, pageSize?: number, cursor?: string, excludeDeleted?: boolean): DataStoreKeyPages;
	/** Enumerates all versions of a key. */
	ListVersionsAsync(key?: string, sortDirection?: Enum.SortDirection, minDate?: number, maxDate?: number, pageSize?: number): DataStoreVersionPages;
	/** Permanently deletes the specified version of a key. */
	RemoveVersionAsync(key?: string, version?: string): undefined;
}

/** A GlobalDataStore that also allows for ordered data store entries. */
interface OrderedDataStore extends GlobalDataStore {
	/** Returns a `DataStorePages` object. */
	GetSortedAsync(ascending?: boolean, pagesize?: number, minValue?: unknown, maxValue?: unknown): DataStorePages;
}

/**
 * GroupService is a service that allows developers to fetch information about a Roblox group from within a game.
 */
interface GroupService extends Instance {
	/**
	 * Returns a `StandardPages` object including information on all of the specified group's allies.
	 */
	GetAlliesAsync(groupId?: number): StandardPages;
	/**
	 * Returns a `StandardPages` object including information on all of the specified group's enemies.
	 */
	GetEnemiesAsync(groupId?: number): StandardPages;
	/** Returns a table containing information about the given group. */
	GetGroupInfoAsync(groupId?: number): unknown;
	/**
	 * Returns a list of tables containing information on all of the groups a given player is a member of.
	 */
	GetGroupsAsync(userId?: number): unknown;
	/** Prompts the local `Player` to join a specified Roblox group via a native modal. */
	PromptJoinAsync(groupId?: number): Enum.GroupMembershipStatus;
}

/**
 * GuiBase is an abstract class which most graphical user interface objects inherit from.
 */
interface GuiBase extends Instance {
}

/** An abstract class inherited by 2D `GuiObjects`. */
interface GuiBase2d extends GuiBase {
	/** Describes the actual screen position of a `GuiBase2d` element, in pixels. */
	AbsolutePosition: Vector2;
	/** Describes the actual screen rotation of a `GuiBase2d` element, in degrees. */
	AbsoluteRotation: number;
	/** Describes the actual screen size of a `GuiBase2d` element, in pixels. */
	AbsoluteSize: Vector2;
	/**
	 * When set to `true`, localization will be applied to this `GuiBase2d` and its descendants.
	 */
	AutoLocalize: boolean;
	/**
	 * A reference to a `LocalizationTable` to be used to apply automated localization to this `GuiBase2d` and its descendants.
	 */
	RootLocalizationTable: LocalizationTable;
	/** Customizes gamepad selection behavior in the down direction. */
	SelectionBehaviorDown: Enum.SelectionBehavior;
	/** Customizes gamepad selection behavior in the left direction. */
	SelectionBehaviorLeft: Enum.SelectionBehavior;
	/** Customizes gamepad selection behavior in the right direction. */
	SelectionBehaviorRight: Enum.SelectionBehavior;
	/** Customizes gamepad selection behavior in the up direction. */
	SelectionBehaviorUp: Enum.SelectionBehavior;
	/** Allows customization of gamepad selection movement. */
	SelectionGroup: boolean;
	/**
	 * Fires when the gamepad selection moves to, leaves, or changes within the connected `GuiBase2d` or any descendant `GuiObjects`.
	 */
	readonly SelectionChanged: RBXScriptSignal<(amISelected: boolean, previousSelection: GuiObject, newSelection: GuiObject) => void>;
}

/** An abstract class for all 2D user interface objects. */
interface GuiObject extends GuiBase2d {
	/** Determines whether this UI element sinks input. */
	Active: boolean;
	/** Determines the origin point of a `GuiObject`, relative to its absolute size. */
	AnchorPoint: Vector2;
	/** Determines whether resizing occurs based on child content. */
	AutomaticSize: Enum.AutomaticSize;
	/** Determines the `GuiObject` background color. */
	BackgroundColor3: Color3;
	/** Determines the transparency of the `GuiObject` background and border. */
	BackgroundTransparency: number;
	/** Determines the color of the `GuiObject` border. */
	BorderColor3: Color3;
	/**
	 * Determines in what manner the `GuiObject` border is laid out relative to its dimensions.
	 */
	BorderMode: Enum.BorderMode;
	/** Determines the pixel width of the `GuiObject` border. */
	BorderSizePixel: number;
	/**
	 * Determines if descendant `GuiObjects` outside of the bounds of a parent GUI element should render.
	 */
	ClipsDescendants: boolean;
	/**
	 * Determines whether a `GuiObject` (and its descendants) can be dragged around the screen.
	 * @deprecated Deprecated.
	 */
	Draggable: boolean;
	/**
	 * Determines whether the player's mouse is being actively pressed on the `GuiObject` or not.
	 */
	GuiState: Enum.GuiState;
	/**
	 * Determines whether the `GuiButton` can be interacted with or not, or if the `GuiState` of the `GuiObject` is changing or not.
	 */
	Interactable: boolean;
	/**
	 * Controls the sort order of the `GuiObject` when used with a `UIGridStyleLayout`.
	 */
	LayoutOrder: number;
	/**
	 * Sets the `GuiObject` which will be selected when the gamepad selector is moved downward.
	 */
	NextSelectionDown: GuiObject;
	/**
	 * Sets the `GuiObject` which will be selected when the gamepad selector is moved to the left.
	 */
	NextSelectionLeft: GuiObject;
	/**
	 * Sets the `GuiObject` which will be selected when the gamepad selector is moved to the right.
	 */
	NextSelectionRight: GuiObject;
	/**
	 * Sets the `GuiObject` which will be selected when the gamepad selector is moved upward.
	 */
	NextSelectionUp: GuiObject;
	/** Determines the pixel and scalar position of the `GuiObject`. */
	Position: UDim2;
	/** Determines the number of degrees by which the `GuiObject` is rotated. */
	Rotation: number;
	/** Determine whether the `GuiObject` can be selected by a gamepad. */
	Selectable: boolean;
	/** Overrides the default selection adornment used for gamepads. */
	SelectionImageObject: GuiObject;
	/** The order of `GuiObjects` selected by the gamepad UI selection. */
	SelectionOrder: number;
	/** Determines the pixel and scalar size of the `GuiObject`. */
	Size: UDim2;
	/**
	 * Sets the `Size` axes that the `GuiObject` will be based on, relative to the size of its parent.
	 */
	SizeConstraint: Enum.SizeConstraint;
	/** Determines whether the `GuiObject` and its descendants will be rendered. */
	Visible: boolean;
	/** Determines the order in which a `GuiObject` renders relative to others. */
	ZIndex: number;
	/** Smoothly moves a GUI to a new `UDim2`. */
	TweenPosition(endPosition?: UDim2, easingDirection?: Enum.EasingDirection, easingStyle?: Enum.EasingStyle, time?: number, override?: boolean, callback?: Function): boolean;
	/** Smoothly resizes a `GuiObject` to a new `UDim2`. */
	TweenSize(endSize?: UDim2, easingDirection?: Enum.EasingDirection, easingStyle?: Enum.EasingStyle, time?: number, override?: boolean, callback?: Function): boolean;
	/** Smoothly moves a GUI to a new size and position. */
	TweenSizeAndPosition(endSize?: UDim2, endPosition?: UDim2, easingDirection?: Enum.EasingDirection, easingStyle?: Enum.EasingStyle, time?: number, override?: boolean, callback?: Function): boolean;
	/**
	 * Fired when a player begins dragging the object.
	 * @deprecated Deprecated.
	 */
	readonly DragBegin: RBXScriptSignal<(initialPosition: UDim2) => void>;
	/**
	 * Fired when a player stops dragging the object.
	 * @deprecated Deprecated.
	 */
	readonly DragStopped: RBXScriptSignal<(x: number, y: number) => void>;
	/**
	 * Fired when a user begins interacting via a Human-Computer Interface device (Mouse button down, touch begin, keyboard button down, etc).
	 */
	readonly InputBegan: RBXScriptSignal<(input: InputObject) => void>;
	/**
	 * Fired when a user changes how they're interacting via a Human-Computer Interface device (Mouse button down, touch begin, keyboard button down, etc).
	 */
	readonly InputChanged: RBXScriptSignal<(input: InputObject) => void>;
	/**
	 * Fired when a user stops interacting via a Human-Computer Interface device (Mouse button down, touch begin, keyboard button down, etc).
	 */
	readonly InputEnded: RBXScriptSignal<(input: InputObject) => void>;
	/** Fires when a user moves their mouse into a GUI element. */
	readonly MouseEnter: RBXScriptSignal<(x: number, y: number) => void>;
	/** Fires when a user moves their mouse out of a GUI element. */
	readonly MouseLeave: RBXScriptSignal<(x: number, y: number) => void>;
	/** Fires whenever a user moves their mouse while it is inside a GUI element. */
	readonly MouseMoved: RBXScriptSignal<(x: number, y: number) => void>;
	/**
	 * Fires when a user scrolls their mouse wheel back when the mouse is over a GUI element.
	 */
	readonly MouseWheelBackward: RBXScriptSignal<(x: number, y: number) => void>;
	/**
	 * Fires when a user scrolls their mouse wheel forward when the mouse is over a GUI element.
	 */
	readonly MouseWheelForward: RBXScriptSignal<(x: number, y: number) => void>;
	/** Fired when the GuiObject is being focused on with the Gamepad selector. */
	readonly SelectionGained: RBXScriptSignal<() => void>;
	/** Fired when the Gamepad selector stops focusing on the GuiObject. */
	readonly SelectionLost: RBXScriptSignal<() => void>;
	/** Fires when the player starts, continues and stops long-pressing the UI element. */
	readonly TouchLongPress: RBXScriptSignal<(touchPositions: unknown, state: Enum.UserInputState) => void>;
	/** Fires when the player moves their finger on the UI element. */
	readonly TouchPan: RBXScriptSignal<(touchPositions: unknown, totalTranslation: Vector2, velocity: Vector2, state: Enum.UserInputState) => void>;
	/**
	 * Fires when the player performs a pinch or pull gesture using two fingers on the UI element.
	 */
	readonly TouchPinch: RBXScriptSignal<(touchPositions: unknown, scale: number, velocity: number, state: Enum.UserInputState) => void>;
	/**
	 * Fires when the player performs a rotation gesture using two fingers on the UI element.
	 */
	readonly TouchRotate: RBXScriptSignal<(touchPositions: unknown, rotation: number, velocity: number, state: Enum.UserInputState) => void>;
	/** Fires when the player performs a swipe gesture on the UI element. */
	readonly TouchSwipe: RBXScriptSignal<(swipeDirection: Enum.SwipeDirection, numberOfTouches: number) => void>;
	/** Fires when the player performs a tap gesture on the UI element. */
	readonly TouchTap: RBXScriptSignal<(touchPositions: unknown) => void>;
}

/** Blends descendants as a group with color/transparency. */
interface CanvasGroup extends GuiObject {
	/** Color tint that applies to all descendants. */
	GroupColor3: Color3;
	/** Transparency that applies to all descendants. */
	GroupTransparency: number;
}

/** A `GuiObject` that renders as a plain rectangle, generally used as a container. */
interface Frame extends GuiObject {
	/** Sets what the frame looks like from a selection of pre-determined styles. */
	Style: Enum.FrameStyle;
}

/** An abstract class for interactive 2D user interface elements. */
interface GuiButton extends GuiObject {
	/**
	 * Determines whether the button automatically changes color when the mouse hovers over or clicks on it.
	 */
	AutoButtonColor: boolean;
	/** A `HapticEffect` instance that will play when the `GuiButton` is being hovered. */
	HoverHapticEffect: HapticEffect;
	/**
	 * If `true` while the GUI element is visible, the mouse will not be locked unless the right mouse button is down.
	 */
	Modal: boolean;
	/** A `HapticEffect` instance that will play when the `GuiButton` is being pressed. */
	PressHapticEffect: HapticEffect;
	/** A boolean property which indicates whether the object has been selected. */
	Selected: boolean;
	/** Sets the style of the `GuiButton` based on a list of pre-determined styles. */
	Style: Enum.ButtonStyle;
	/** Fires when the button is activated. */
	readonly Activated: RBXScriptSignal<(inputObject: InputObject, clickCount: number) => void>;
	/** Fires when the user's mouse fully left clicks the `GuiButton`. */
	readonly MouseButton1Click: RBXScriptSignal<() => void>;
	/** Fires when the user presses their left mouse button down on the `GuiButton`. */
	readonly MouseButton1Down: RBXScriptSignal<(x: number, y: number) => void>;
	/** Fires when the user releases their left mouse button off of the `GuiButton`. */
	readonly MouseButton1Up: RBXScriptSignal<(x: number, y: number) => void>;
	/** Fires when the user's mouse fully right clicks the `GuiButton`. */
	readonly MouseButton2Click: RBXScriptSignal<() => void>;
	/** Fires when the user presses their right mouse button down on the `GuiButton`. */
	readonly MouseButton2Down: RBXScriptSignal<(x: number, y: number) => void>;
	/** Fires when the user releases their right mouse button off of the `GuiButton`. */
	readonly MouseButton2Up: RBXScriptSignal<(x: number, y: number) => void>;
	readonly SecondaryActivated: RBXScriptSignal<(inputObject: InputObject) => void>;
}

/** A 2D user interface element that displays an interactive image. */
interface ImageButton extends GuiButton {
	/** A texture ID that will be used when the `ImageButton` is being hovered. */
	HoverImage: ContentId;
	/**
	 * The image content that will be used when the `ImageButton` is being hovered. Only supports asset URIs.
	 */
	HoverImageContent: Content;
	/**
	 * The image content displayed by the `ImageButton` element. Reads and writes to `ImageContent`.
	 */
	Image: ContentId;
	/** Determines how a rendered image will be colorized. */
	ImageColor3: Color3;
	/**
	 * The image content displayed by the UI element. Supports asset URIs and `EditableImage` objects.
	 */
	ImageContent: Content;
	/** The offset in pixels of the sub-area of an image to be displayed. */
	ImageRectOffset: Vector2;
	/** Determines the size in pixels of the sub-area of an image to be displayed. */
	ImageRectSize: Vector2;
	/** Determines the transparency of the rendered image. */
	ImageTransparency: number;
	/** Indicates whether the Image has finished loading from the Roblox website. */
	IsLoaded: boolean;
	/** A texture ID that will be used when an `ImageButton` is being pressed. */
	PressedImage: ContentId;
	/**
	 * The image content that will be used when an `ImageButton` is being pressed. Only supports asset URIs.
	 */
	PressedImageContent: Content;
	/** Selects the image resampling mode for the button. */
	ResampleMode: Enum.ResamplerMode;
	/**
	 * Determines how an image will scale if displayed in a UI element whose size differs from the source image.
	 */
	ScaleType: Enum.ScaleType;
	/** Sets the slice boundaries of a 9-sliced image. */
	SliceCenter: Rect;
	/** Scales the 9-slice edges by the specified ratio. */
	SliceScale: number;
	/** Sets the tiling scale of the ImageButton. */
	TileSize: UDim2;
}

/** A 2D user interface element that displays interactive text. */
interface TextButton extends GuiButton {
	/**
	 * A copy of `TextButton.Text` that contains exactly what is being rendered by the `TextButton`.
	 */
	ContentText: string;
	/** Determines the font used to render text. */
	FontFace: Font;
	/**
	 * Determines the font size to be used.
	 * @deprecated Deprecated.
	 */
	FontSize: Enum.FontSize;
	/** Scales the spacing between lines of text in the `TextButton`. */
	LineHeight: number;
	/** The maximum number of graphemes the `TextButton` can show. */
	MaxVisibleGraphemes: number;
	OpenTypeFeatures: string;
	OpenTypeFeaturesError: string;
	/**
	 * Determines whether the `TextButton` renders its text using rich text formatting.
	 */
	RichText: boolean;
	/** Determines the string rendered by the `TextButton`. */
	Text: string;
	/**
	 * Read-only property which reflects the absolute size of rendered text in offsets.
	 */
	TextBounds: Vector2;
	/** Determines the color of rendered text. */
	TextColor3: Color3;
	/** Direction in which the text is rendered. */
	TextDirection: Enum.TextDirection;
	/**
	 * A boolean representation of whether the button's text fits within the size of it.
	 */
	TextFits: boolean;
	/** Changes whether text is resized to fit within the `TextButton`. */
	TextScaled: boolean;
	/** Determines the line height of text in offsets. */
	TextSize: number;
	/** Determines the color of the text stroke (outline). */
	TextStrokeColor3: Color3;
	/** Determines the transparency of the text stroke (outline). */
	TextStrokeTransparency: number;
	/** Determines the transparency of rendered text. */
	TextTransparency: number;
	/** Controls the truncation of the text displayed in the `TextButton`. */
	TextTruncate: Enum.TextTruncate;
	/**
	 * Determines whether or not text should wrap at the edges of the `TextButton` element's space.
	 * @deprecated Deprecated.
	 */
	TextWrap: boolean;
	/**
	 * Determines if text wraps to multiple lines within the `TextButton` element's space, truncating excess text.
	 */
	TextWrapped: boolean;
	/** Determines the horizontal alignment of rendered text. */
	TextXAlignment: Enum.TextXAlignment;
	/** Determines the vertical alignment of rendered text. */
	TextYAlignment: Enum.TextYAlignment;
}

/** An abstract class for non-interactive 2D user interface elements. */
interface GuiLabel extends GuiObject {
}

/** A 2D user interface element that displays a single non-interactive image. */
interface ImageLabel extends GuiLabel {
	/**
	 * The image content displayed by the UI element. Reads and writes to `ImageContent`.
	 */
	Image: ContentId;
	/** Determines how a rendered image will be colorized. */
	ImageColor3: Color3;
	/**
	 * The image content displayed by the UI element. Supports [asset URIs](../../../projects/assets/index.md#asset-uris) and `EditableImage` objects.
	 */
	ImageContent: Content;
	/** The offset in pixels of the sub-area of an image to be displayed. */
	ImageRectOffset: Vector2;
	/** Determines the size in pixels of the sub-area of an image to be displayed. */
	ImageRectSize: Vector2;
	/** Determines the transparency of the rendered image. */
	ImageTransparency: number;
	/** Indicates whether the image has finished loading from Roblox. */
	IsLoaded: boolean;
	/** Selects the image resampling mode for the label. */
	ResampleMode: Enum.ResamplerMode;
	/**
	 * Determines how an image will scale if displayed in a UI element whose size differs from the source image.
	 */
	ScaleType: Enum.ScaleType;
	/** Sets the slice boundaries of a 9-sliced image. */
	SliceCenter: Rect;
	/** Scales the 9-slice edges by the specified ratio. */
	SliceScale: number;
	/** Sets the tiling size of the `ImageLabel`. */
	TileSize: UDim2;
}

/** A 2D user interface element that displays non-interactive text. */
interface TextLabel extends GuiLabel {
	/**
	 * A copy of `TextLabel.Text` that contains exactly what is being rendered by the `TextLabel`.
	 */
	ContentText: string;
	/** Determines the font used to render text. */
	FontFace: Font;
	/**
	 * Determines the font size to be used.
	 * @deprecated Deprecated.
	 */
	FontSize: Enum.FontSize;
	/** Scales the spacing between lines of text in the `TextLabel`. */
	LineHeight: number;
	/** The maximum number of graphemes the `TextLabel` can show. */
	MaxVisibleGraphemes: number;
	OpenTypeFeatures: string;
	OpenTypeFeaturesError: string;
	/** Determines whether the `TextLabel` renders its text using rich text formatting. */
	RichText: boolean;
	/** Determines the string rendered by the `TextLabel`. */
	Text: string;
	/**
	 * Read-only property which reflects the absolute size of rendered text in offsets.
	 */
	TextBounds: Vector2;
	/** Determines the color of rendered text. */
	TextColor3: Color3;
	/** Direction in which the text is rendered. */
	TextDirection: Enum.TextDirection;
	/**
	 * A boolean representation of whether the label's text fits within the size of it.
	 */
	TextFits: boolean;
	/** Changes whether text is resized to fit within the `TextLabel`. */
	TextScaled: boolean;
	/** Determines the line height of text in offsets. */
	TextSize: number;
	/** Determines the color of the text stroke (outline). */
	TextStrokeColor3: Color3;
	/** Determines the transparency of the text stroke (outline). */
	TextStrokeTransparency: number;
	/** Determines the transparency of rendered text. */
	TextTransparency: number;
	/** Controls the truncation of the text displayed in the `TextLabel`. */
	TextTruncate: Enum.TextTruncate;
	/**
	 * Determines whether or not text should wrap at the edges of the `TextLabel` element's space.
	 * @deprecated Deprecated.
	 */
	TextWrap: boolean;
	/**
	 * Determines if text wraps to multiple lines within the `TextLabel` element's space, truncating excess text.
	 */
	TextWrapped: boolean;
	/** Determines the horizontal alignment of rendered text. */
	TextXAlignment: Enum.TextXAlignment;
	/** Determines the vertical alignment of rendered text. */
	TextYAlignment: Enum.TextYAlignment;
}

interface RelativeGui extends GuiObject {
}

/**
 * `ScrollingFrame` is a special `Frame` type with built-in scrolling interactivity and different ways to customize how the scrolling works.
 */
interface ScrollingFrame extends GuiObject {
	/** The size of the area that is scrollable, in offsets. */
	AbsoluteCanvasSize: Vector2;
	/** The size of the frame, in offsets, without the scroll bars. */
	AbsoluteWindowSize: Vector2;
	/**
	 * Determines whether `ScrollingFrame.CanvasSize` is resized based on child content.
	 */
	AutomaticCanvasSize: Enum.AutomaticSize;
	/**
	 * Image that displays on the bottom of a vertical scroll bar, or the right of a horizontal scroll bar (rotated 90&deg; counterclockwise for a horizontal scroll bar).
	 */
	BottomImage: ContentId;
	/**
	 * Image that displays on the bottom of a vertical scroll bar, or the right of a horizontal scroll bar (rotated 90&deg; counterclockwise for a horizontal scroll bar). Only supports asset URIs as textures.
	 */
	BottomImageContent: Content;
	/**
	 * Reflects the **current** positional offset of the canvas within the frame, in pixels, and sets the position of scroll bars accordingly.
	 */
	CanvasPosition: Vector2;
	/** Determines the size of the scrollable area. */
	CanvasSize: UDim2;
	/** Determines if and when elastic scrolling is allowed on touch‑enabled devices. */
	ElasticBehavior: Enum.ElasticBehavior;
	/**
	 * Indicates whether `CanvasSize` is inset by `ScrollBarThickness` on the horizontal axis.
	 */
	HorizontalScrollBarInset: Enum.ScrollBarInset;
	/**
	 * Image which spans the area between `TopImage` and `BottomImage` (rotated 90&deg; counterclockwise for a horizontal scroll bar).
	 */
	MidImage: ContentId;
	/**
	 * Image which spans the area between `TopImageContent` and `BottomImageContent` (rotated 90&deg; counterclockwise for a horizontal scroll bar). Only supports asset URIs as textures.
	 */
	MidImageContent: Content;
	/** Determines how the rendered scroll bar images are colorized. */
	ScrollBarImageColor3: Color3;
	/** Determines the opacity of the scroll bar images. */
	ScrollBarImageTransparency: number;
	/**
	 * Thickness of the scroll bar in pixels; applies to both horizontal and vertical scroll bars.
	 */
	ScrollBarThickness: number;
	/** Determines the direction(s) in which scrolling is allowed. */
	ScrollingDirection: Enum.ScrollingDirection;
	/** Determines whether scrolling is allowed on the frame. */
	ScrollingEnabled: boolean;
	/**
	 * Image which displays on the top of a vertical scroll bar, or the left of a horizontal scroll bar (rotated 90&deg; counterclockwise for a horizontal scroll bar).
	 */
	TopImage: ContentId;
	TopImageContent: Content;
	/**
	 * Indicates whether `CanvasSize` is inset by `ScrollBarThickness` on the vertical axis.
	 */
	VerticalScrollBarInset: Enum.ScrollBarInset;
	/**
	 * Indicates whether the vertical scroll bar is positioned to the left or right of the canvas.
	 */
	VerticalScrollBarPosition: Enum.VerticalScrollBarPosition;
	GetScrollVelocity(): Vector2;
	ResetScrollVelocity(): undefined;
}

/** A 2D user interface element that displays player-editable text. */
interface TextBox extends GuiObject {
	/**
	 * Determines whether clicking on the `TextBox` will clear its `TextBox.Text` property.
	 */
	ClearTextOnFocus: boolean;
	ContentText: string;
	/**
	 * Determines the offset of the text cursor in bytes, or `-1` if there is no cursor.
	 */
	CursorPosition: number;
	/** Determines the font used to render text. */
	FontFace: Font;
	/**
	 * Determines the font size of a `TextBox` object.
	 * @deprecated Deprecated.
	 */
	FontSize: Enum.FontSize;
	/** Scales the spacing between lines of text in the `TextBox`. */
	LineHeight: number;
	/** The maximum number of graphemes the `TextBox` can show. */
	MaxVisibleGraphemes: number;
	/**
	 * When set to `true`, text inside a `TextBox` is able to move onto multiple lines. This also enables players to use the enter key to move onto a new line.
	 */
	MultiLine: boolean;
	OpenTypeFeatures: string;
	OpenTypeFeaturesError: string;
	/**
	 * Sets the text color that gets used when no text has been entered into the `TextBox` yet.
	 */
	PlaceholderColor3: Color3;
	/**
	 * Sets the text that gets displayed when no text has been entered into the `TextBox` yet.
	 */
	PlaceholderText: string;
	/**
	 * Determines whether the `TextBox` renders the `TextBox.Text` string using rich text formatting.
	 */
	RichText: boolean;
	/**
	 * Determines the starting position of a text selection, or -1 if no text is selected.
	 */
	SelectionStart: number;
	/**
	 * If set to true, input native to the platform is used instead of Roblox's built-in keyboard.
	 */
	ShowNativeInput: boolean;
	/** Determines the string rendered by the UI element. */
	Text: string;
	/** The size of a UI element's text in offsets. */
	TextBounds: Vector2;
	/** Determines the color of rendered text. */
	TextColor3: Color3;
	TextDirection: Enum.TextDirection;
	/** Determines whether the user can change the `Text`. */
	TextEditable: boolean;
	/** Whether the text fits within the constraints of the TextBox. */
	TextFits: boolean;
	/** Changes whether text is resized to fit the GUI object that renders it. */
	TextScaled: boolean;
	/** Determine the line height of text in offsets. */
	TextSize: number;
	/** Determines the color of the text stroke (outline). */
	TextStrokeColor3: Color3;
	/** Determines the transparency of the text stroke (outline). */
	TextStrokeTransparency: number;
	/** Determines the transparency of rendered text. */
	TextTransparency: number;
	/** Controls the truncation of the text displayed in this TextBox. */
	TextTruncate: Enum.TextTruncate;
	/** @deprecated Deprecated. */
	TextWrap: boolean;
	/**
	 * Determines if text wraps to multiple lines within the `GuiObject` element space, truncating excess text.
	 */
	TextWrapped: boolean;
	/** Determines the horizontal alignment of rendered text. */
	TextXAlignment: Enum.TextXAlignment;
	/** Determines the vertical alignment of rendered text. */
	TextYAlignment: Enum.TextYAlignment;
	/** Forces the client to focus on the TextBox. */
	CaptureFocus(): undefined;
	/** Returns `true` if the `TextBox` is focused or `false` if it is not. */
	IsFocused(): boolean;
	/** Forces the client to unfocus the TextBox. */
	ReleaseFocus(submitted?: boolean): undefined;
	/** Fires when the client lets their focus leave the `TextBox`. */
	readonly FocusLost: RBXScriptSignal<(enterPressed: boolean, inputThatCausedFocusLoss: InputObject) => void>;
	/** Fires when the `TextBox` gains focus. */
	readonly Focused: RBXScriptSignal<() => void>;
	readonly ReturnPressedFromOnScreenKeyboard: RBXScriptSignal<() => void>;
}

/** A GUI object that displays video content from a connected `VideoPlayer`. */
interface VideoDisplay extends GuiObject {
	/** Selects the texture resampling mode for the `VideoDisplay`. */
	ResampleMode: Enum.ResamplerMode;
	/**
	 * Determines how a video will scale if displayed in a UI element whose aspect ratio differs from the source video.
	 */
	ScaleType: Enum.ScaleType;
	TileSize: UDim2;
	/** Determines how a rendered video will be colorized. */
	VideoColor3: Color3;
	/** The offset in pixels of the sub-area of a video to be displayed. */
	VideoRectOffset: Vector2;
	/** Determines the size in pixels of the sub-area of a video to be displayed. */
	VideoRectSize: Vector2;
	/** Determines the transparency of the rendered video. */
	VideoTransparency: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/**
	 * Fires when another instance is connected to or disconnected from the `VideoDisplay` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

/**
 * A GUI object that renders a rectangle, like a `Frame` does, with a moving video image.
 */
interface VideoFrame extends GuiObject {
	/**
	 * Indicates when the `VideoFrame.Video` has loaded from Roblox servers and is ready to play.
	 */
	IsLoaded: boolean;
	/**
	 * Sets whether or not the `VideoFrame.Video` repeats once it has finished when it is playing.
	 */
	Looped: boolean;
	/**
	 * Indicates whether the `VideoFrame.Video` is currently playing. It can be set to start or pause playback.
	 */
	Playing: boolean;
	/** Gets the original source resolution of the `VideoFrame.Video` file. */
	Resolution: Vector2;
	/** Indicates the length of the `VideoFrame.Video` in seconds. */
	TimeLength: number;
	/** Indicates the progress in seconds of the `VideoFrame.Video`. */
	TimePosition: number;
	/** The content ID of the video file a `VideoFrame` object is associated with. */
	Video: ContentId;
	VideoContent: Content;
	/** Indicates how loud the `VideoFrame.Video` is currently playing back. */
	Volume: number;
	/**
	 * Sets `VideoFrame.Playing` to `false`, pausing playback if the `VideoFrame.Video` is playing.
	 */
	Pause(): undefined;
	/**
	 * Sets `VideoFrame.Playing` to `true`, playing the `VideoFrame.Video` from the current `VideoFrame.TimePosition`.
	 */
	Play(): undefined;
	/** Fires whenever the `VideoFrame.Video` loops. */
	readonly DidLoop: RBXScriptSignal<(video: string) => void>;
	/** Fires when the `VideoFrame.Video` has completed playback and stopped. */
	readonly Ended: RBXScriptSignal<(video: string) => void>;
	/** Fires when the `VideoFrame.Video` is loaded. */
	readonly Loaded: RBXScriptSignal<(video: string) => void>;
	/**
	 * This event fires whenever the `VideoFrame.Video` is paused using `VideoFrame:Pause()` or by setting `VideoFrame.Playing` to false.
	 */
	readonly Paused: RBXScriptSignal<(video: string) => void>;
	/**
	 * Fires whenever the `VideoFrame.Video` is played using the `VideoFrame:Play()` function or by setting `VideoFrame.Playing` to true.
	 */
	readonly Played: RBXScriptSignal<(video: string) => void>;
}

/** `GuiObject` that renders 3D objects inside its bounds. */
interface ViewportFrame extends GuiObject {
	/** The lighting hue applied to the area within the `ViewportFrame`. */
	Ambient: Color3;
	/** `Camera` that is used to render children objects. */
	CurrentCamera: Camera;
	/** Determines how the rendered viewport image will be colorized. */
	ImageColor3: Color3;
	/** Determines the transparency of the rendered viewport image. */
	ImageTransparency: number;
	/** The color of the emitted light. */
	LightColor: Color3;
	/** A `Vector3` representing the direction of the light source. */
	LightDirection: Vector3;
}

/** The base class of 2D UI containers which render `GuiObjects` in layers. */
interface LayerCollector extends GuiBase2d {
	/** Toggles the visibility of this `LayerCollector`. */
	Enabled: boolean;
	/**
	 * Determines if the `LayerCollector` resets (deletes itself and re-clones into the player's `PlayerGui`) every time the player's character respawns.
	 */
	ResetOnSpawn: boolean;
	/**
	 * Controls how `GuiObject.ZIndex` behaves on all descendants of this `LayerCollector`.
	 */
	ZIndexBehavior: Enum.ZIndexBehavior;
	/** @deprecated Deprecated. */
	GetLayoutNodeTree(): unknown;
}

/** A container for `GuiObjects` that renders in 3D space facing the camera. */
interface BillboardGui extends LayerCollector {
	/** Controls whether the descendants will receive input events. */
	Active: boolean;
	/**
	 * Sets the target part or attachment that the `BillboardGui` is positioned relative to.
	 */
	Adornee: Instance;
	/**
	 * Determines whether the `BillboardGui` will always be rendered on top of other 3D objects.
	 */
	AlwaysOnTop: boolean;
	/**
	 * Determines the factor by which the `BillboardGui` container's light is scaled when `LightInfluence` is `0`.
	 */
	Brightness: number;
	/**
	 * Whether portions of `GuiObjects` that fall outside of the `BillboardGui` canvas borders will be drawn.
	 */
	ClipsDescendants: boolean;
	/**
	 * The current distance in studs that the `BillboardGui` is from the player's camera.
	 */
	CurrentDistance: number;
	/**
	 * Determines the distance in studs at which the `BillboardGui` will stop scaling larger in size.
	 * @deprecated Deprecated.
	 */
	DistanceLowerLimit: number;
	/**
	 * Determines the size `CurrentDistance` increments and decrements in studs as the player's camera moves closer and further from the `BillboardGui`.
	 */
	DistanceStep: number;
	/**
	 * Determines the distance in studs at which the `BillboardGui` will stop scaling smaller in size.
	 * @deprecated Deprecated.
	 */
	DistanceUpperLimit: number;
	/**
	 * Determines how the `BillboardGui` is offset from its `Adornee`, relative to the `Camera` orientation, in units half the dimensions of the model's `Camera`-aligned bounding box.
	 */
	ExtentsOffset: Vector3;
	/**
	 * Determines how the `BillboardGui` is offset from its `Adornee`, relative to the global axes, in units half the dimensions of the model's axis-aligned bounding box.
	 */
	ExtentsOffsetWorldSpace: Vector3;
	/** Controls how much the `BillboardGui` is influenced by environmental lighting. */
	LightInfluence: number;
	/**
	 * Controls how far away the `BillboardGui` can be displayed before it stops rendering.
	 */
	MaxDistance: number;
	/** Used by scripts to hide the `BillboardGui` from a specific player. */
	PlayerToHideFrom: Instance;
	/** Controls the size that the `BillboardGui` will have on screen. */
	Size: UDim2;
	/** A 2D offset in size-relative units that acts like an anchor point. */
	SizeOffset: Vector2;
	/**
	 * Determines how the `BillboardGui` is offset from its `Adornee` in studs, relative to the `Camera` orientation.
	 */
	StudsOffset: Vector3;
	/**
	 * Determines how the `BillboardGui` is offset from its `Adornee` in studs, relative to the global axes.
	 */
	StudsOffsetWorldSpace: Vector3;
}

interface PluginGui extends LayerCollector {
	/** The title that is displayed above the contents of the `PluginGui`. */
	Title: string;
	/**
	 * Binds a function to the `PluginGui` close button, overriding the default behavior.
	 */
	BindToClose(_function?: Function): undefined;
	/** Returns the position of the mouse relative to the PluginGui. */
	GetRelativeMousePosition(): Vector2;
	/**
	 * Fires when the user releases their mouse when hovering over a PluginGui during a drag operation started by `Plugin:StartDrag()`.
	 */
	readonly PluginDragDropped: RBXScriptSignal<(dragData: unknown) => void>;
	/**
	 * Fires when the user's mouse enters a PluginGui during a drag operation started by `Plugin:StartDrag()`.
	 */
	readonly PluginDragEntered: RBXScriptSignal<(dragData: unknown) => void>;
	/**
	 * Fires when the user's mouse leaves a PluginGui during a drag operation started by `Plugin:StartDrag()`.
	 */
	readonly PluginDragLeft: RBXScriptSignal<(dragData: unknown) => void>;
	/**
	 * Fires when the user's mouse moves within a PluginGui during a drag operation started by `Plugin:StartDrag()`.
	 */
	readonly PluginDragMoved: RBXScriptSignal<(dragData: unknown) => void>;
	/** Fires when the user stops interacting with the window of the PluginGui. */
	readonly WindowFocusReleased: RBXScriptSignal<() => void>;
	/** Fires when the user begins interacting with the window of the PluginGui. */
	readonly WindowFocused: RBXScriptSignal<() => void>;
}

interface DockWidgetPluginGui extends PluginGui {
	/**
	 * Describes whether the previous state of this DockWidgetPluginGui was restored when it was created.
	 */
	HostWidgetWasRestored: boolean;
}

interface QWidgetPluginGui extends PluginGui {
}

/** Primary container of on-screen 2D user interface elements. */
interface ScreenGui extends LayerCollector {
	/** Whether to clip the contents of this `ScreenGui` to the device's safe area. */
	ClipToDeviceSafeArea: boolean;
	/** Controls the Z-index order in which multiple `ScreenGui` containers are drawn. */
	DisplayOrder: number;
	/**
	 * Determines whether the `ScreenGui` overflows into the range of Roblox's core UI elements.
	 */
	IgnoreGuiInset: boolean;
	/**
	 * Specifies whether automatic UI compatibility transformations are applied to descendant "fullscreen" `GuiObjects` on displays with screen cutouts.
	 */
	SafeAreaCompatibility: Enum.SafeAreaCompatibility;
	/**
	 * Controls the safe area insets that are applied to the contents of the `ScreenGui`.
	 */
	ScreenInsets: Enum.ScreenInsets;
}

/**
 * The original name of the `ScreenGui`.
 * @deprecated This class is deprecated.
 */
interface GuiMain extends ScreenGui {
}

interface SurfaceGuiBase extends LayerCollector {
	Active: boolean;
	/**
	 * `BasePart` on which to apply the `SurfaceGui`, overriding the default parent association.
	 */
	Adornee: Instance;
	/** `Enum.NormalId` face upon which to apply the `SurfaceGui`. */
	Face: Enum.NormalId;
}

interface AdGui extends SurfaceGuiBase {
	AdShape: Enum.AdShape;
	/** Enables the AdGui to serve video ads. */
	EnableVideoAds: boolean;
	FallbackImage: ContentId;
	Status: Enum.AdUnitStatus;
	/** Used to react to the AdGui events. */
	OnAdEvent?: (eventInfo?: unknown) => boolean;
}

/** Container for GuiObjects that are rendered on the surface of a part. */
interface SurfaceGui extends SurfaceGuiBase {
	/**
	 * Determines whether the `SurfaceGui` will always be rendered on top of other 3D objects.
	 */
	AlwaysOnTop: boolean;
	/**
	 * Determines the factor by which the `SurfaceGui` container's light is scaled when `LightInfluence` is `0`.
	 */
	Brightness: number;
	/**
	 * The size of a "virtual screen" in "virtual pixels" which makes `SurfaceGuis` pixel-to-pixel compatible with `ScreenGuis`.
	 */
	CanvasSize: Vector2;
	/**
	 * Whether portions of `GuiObjects` that fall outside of the `SurfaceGui` canvas borders will be drawn.
	 */
	ClipsDescendants: boolean;
	/** Controls how much the `SurfaceGui` is influenced by environmental lighting. */
	LightInfluence: number;
	/**
	 * Controls how far away the `SurfaceGui` can be displayed before it stops rendering.
	 */
	MaxDistance: number;
	/**
	 * Determines the density of pixels used for each world-space stud to render the contents of the `SurfaceGui`.
	 */
	PixelsPerStud: number;
	/**
	 * Determines whether the `SurfaceGui` will render at a fixed size or scale with its size in studs.
	 */
	SizingMode: Enum.SurfaceGuiSizingMode;
	/**
	 * Sets the distance in which left clicking starts acting on the `SurfaceGui` instead of for the held `Tool`.
	 */
	ToolPunchThroughDistance: number;
	/** Layers this `SurfaceGui` in relation to other `SurfaceGuis` on the same face. */
	ZOffset: number;
}

/** An abstract class for 3D GUI elements that are rendered in the world. */
interface GuiBase3d extends GuiBase {
	/** Sets the color of this `GuiBase3d` object. */
	Color3: Color3;
	/** Sets the transparency of this `GuiBase3d` object. */
	Transparency: number;
	/**
	 * Determines whether this `GuiBase3d` object and its descendants will be displayed.
	 */
	Visible: boolean;
}

/**
 * A FloorWire attempts to make a wire from two of its properties: `FloorWire.From` and `FloorWire.From`, which both need to be set to a `BasePart`.
 * @deprecated This class is deprecated.
 */
interface FloorWire extends GuiBase3d {
	/**
	 * A decimal number between 0 and 1, through which you can control how far all of the decals are along the wire.
	 */
	CycleOffset: number;
	/** The object that the FloorWire travels from. */
	From: BasePart;
	/** The number of studs between each FloorWire segment. */
	StudsBetweenTextures: number;
	/** Sets the texture to be displayed on the FloorWire. */
	Texture: ContentId;
	/** Sets the size of the texture used with the FloorWire. */
	TextureSize: Vector2;
	/** The object that the FloorWire travels to. */
	To: BasePart;
	/** The speed that the textures flow along the wire. */
	Velocity: number;
	/** The radius of the wire. */
	WireRadius: number;
}

/** A base class for all objects that adorn `Instance` classes. */
interface InstanceAdornment extends GuiBase3d {
	/** Which `Instance` to adorn. */
	Adornee: Instance;
}

/** Renders a 3D box around its `Adornee`. */
interface SelectionBox extends InstanceAdornment {
	/** Determines the thickness of the boxes outlines, in studs. */
	LineThickness: number;
	/** Determines the color of the box's surfaces. */
	SurfaceColor3: Color3;
	/** Determines the transparency of the box's surfaces. */
	SurfaceTransparency: number;
}

/**
 * An abstract class of which the inheritors can be adorned to objects of the `PVInstance` class.
 */
interface PVAdornment extends GuiBase3d {
	/** The `PVInstance` which this `PVAdornment` is attached to. */
	Adornee: PVInstance;
}

/** An abstract class inherited by 3D handle adornments. */
interface HandleAdornment extends PVAdornment {
	/** Determines whether to automatically cull the adornment. */
	AdornCullingMode: Enum.AdornCullingMode;
	/** Forces this adornment to render on top of all 3D objects in the workspace. */
	AlwaysOnTop: boolean;
	/** The position and rotation of the object relative to its `PVAdornment.Adornee`. */
	CFrame: CFrame;
	/** The positional offset of the adornment based on the adornee's `BasePart.Size`. */
	SizeRelativeOffset: Vector3;
	/**
	 * Determines the draw order of this `HandleAdornment` when `AlwaysOnTop` is `true`.
	 */
	ZIndex: number;
	/**
	 * Fires when a player presses down on their left mouse button while hovering over the adornment.
	 */
	readonly MouseButton1Down: RBXScriptSignal<() => void>;
	/**
	 * Fires when a player releases their left mouse button while hovering over the adornment.
	 */
	readonly MouseButton1Up: RBXScriptSignal<() => void>;
	/** Fires when a player moves their mouse over the adornment. */
	readonly MouseEnter: RBXScriptSignal<() => void>;
	/** Fires when a player moves their mouse out of the adornment. */
	readonly MouseLeave: RBXScriptSignal<() => void>;
}

/** A box-shaped handle that can be adorned to a `BasePart`. */
interface BoxHandleAdornment extends HandleAdornment {
	Shading: Enum.AdornShading;
	/** Size of the adornment. */
	Size: Vector3;
}

/** A cone-shaped handle that can be adorned to a `BasePart`. */
interface ConeHandleAdornment extends HandleAdornment {
	/** Height of the cone adornment. */
	Height: number;
	Hollow: boolean;
	/** Radius of the cone adornment. */
	Radius: number;
	Shading: Enum.AdornShading;
}

/** A cylinder-shaped handle that can be adorned to a `BasePart`. */
interface CylinderHandleAdornment extends HandleAdornment {
	/** Angle of the cylinder handle as in a "pie slice" sector. */
	Angle: number;
	/** Height of the cylinder adornment. */
	Height: number;
	/** Inner radius with which to render a hollow cylinder. */
	InnerRadius: number;
	/** Radius of the cylinder adornment. */
	Radius: number;
	Shading: Enum.AdornShading;
}

/** An image handle that can be adorned to a `BasePart`. */
interface ImageHandleAdornment extends HandleAdornment {
	/** Image to draw for the adornment. */
	Image: ContentId;
	/** Size of the image in studs. */
	Size: Vector2;
}

/** A line-shaped handle that can be adorned to a `BasePart`. */
interface LineHandleAdornment extends HandleAdornment {
	/** Length of the line. */
	Length: number;
	/** Thickness of the line in pixels. */
	Thickness: number;
}

/** A pyramid-shaped handle that can be adorned to a `BasePart`. */
interface PyramidHandleAdornment extends HandleAdornment {
	/** Height of the pyramid adornment. */
	Height: number;
	Shading: Enum.AdornShading;
	/** Number of sides for the pyramid adornment. */
	Sides: number;
	/** Size of the pyramid adornment's base. */
	Size: number;
}

/** A sphere-shaped handle that can be adorned to a `BasePart`. */
interface SphereHandleAdornment extends HandleAdornment {
	/** Radius of the sphere adornment. */
	Radius: number;
	Shading: Enum.AdornShading;
}

/**
 * Renders a wireframe adornment consisting of one or more lines onto a `BasePart` (including `Terrain`) or into the `Workspace`.
 */
interface WireframeHandleAdornment extends HandleAdornment {
	/** The **XYZ** scale of the wireframe adornment. */
	Scale: Vector3;
	/** Thickness of the wireframe adornment's lines in pixels. */
	Thickness: number;
	/**
	 * Adds a line to the wireframe adornment from a starting point to an ending point relative to the center of the `Adornee`.
	 */
	AddLine(from?: Vector3, to?: Vector3): undefined;
	/** Adds one or more lines to the wireframe adornment using an array. */
	AddLines(points?: unknown): undefined;
	/**
	 * Adds multiple line segments to the wireframe adornment in a sequence from point to point.
	 */
	AddPath(points?: unknown, loop?: boolean): undefined;
	/** Adds a text label to the wireframe adornment. */
	AddText(point?: Vector3, text?: string, size?: number): undefined;
	/** Instantly clears all lines and text in the wireframe adornment. */
	Clear(): undefined;
}

interface ParabolaAdornment extends PVAdornment {
}

/** Renders a 3D sphere around its `Adornee`. */
interface SelectionSphere extends PVAdornment {
	/** Determines the color of the sphere's surface. */
	SurfaceColor3: Color3;
	/** Determines the transparency of the sphere's surface. */
	SurfaceTransparency: number;
}

/**
 * An abstract class for GUI elements that are adorned to (displayed as attached to) objects deriving from `BasePart`.
 */
interface PartAdornment extends GuiBase3d {
	/** Sets the object to adorn to. */
	Adornee: BasePart;
}

/** An abstract class for Handle objects, such as `ArcHandles` and `Handles`. */
interface HandlesBase extends PartAdornment {
}

/**
 * The `ArcHandles` object places 3D arc handles around any 3D object that its `Adornee` is set to.
 */
interface ArcHandles extends HandlesBase {
	/** Sets the current Axes ArcHandles will show. */
	Axes: Axes;
	/** Fired when the left mouse button goes down on one of the GUI handles. */
	readonly MouseButton1Down: RBXScriptSignal<(axis: Enum.Axis) => void>;
	/** Fired when the left mouse button is released on one of the GUI handles. */
	readonly MouseButton1Up: RBXScriptSignal<(axis: Enum.Axis) => void>;
	/**
	 * Fired when the mouse moves while the MouseButton1Down event has fired, but the left mouse button has not been released yet.
	 */
	readonly MouseDrag: RBXScriptSignal<(axis: Enum.Axis, relativeAngle: number, deltaRadius: number) => void>;
	/** Fired when a mouse "enters" the GUI handle. */
	readonly MouseEnter: RBXScriptSignal<(axis: Enum.Axis) => void>;
	/** Fired when the mouse leaves the GUI handle. */
	readonly MouseLeave: RBXScriptSignal<(axis: Enum.Axis) => void>;
}

/** Places 3D handles around any object that its `Adornee` is set to. */
interface Handles extends HandlesBase {
	/** Sets which sides the GUI handles will appear. */
	Faces: Faces;
	/** Sets the GUI style of the handles. */
	Style: Enum.HandlesStyle;
	/** Fired when the left mouse button goes down on one of the GUI handles. */
	readonly MouseButton1Down: RBXScriptSignal<(face: Enum.NormalId) => void>;
	/** Fired when the left mouse button is released on one of the GUI handles. */
	readonly MouseButton1Up: RBXScriptSignal<(face: Enum.NormalId) => void>;
	/**
	 * Fired when the mouse moves while the MouseButton1Down event has fired, but the left mouse button has not been released yet.
	 */
	readonly MouseDrag: RBXScriptSignal<(face: Enum.NormalId, distance: number) => void>;
	/** Fired when a mouse "enters" the GUI handle. */
	readonly MouseEnter: RBXScriptSignal<(face: Enum.NormalId) => void>;
	/** Fired when the mouse leaves the GUI handle. */
	readonly MouseLeave: RBXScriptSignal<(face: Enum.NormalId) => void>;
}

/** Highlights a face of a surface in a configurable color. */
interface SurfaceSelection extends PartAdornment {
	/** Sets which side the SurfaceSelection will appear on, on the adorned `BasePart`. */
	TargetSurface: Enum.NormalId;
}

/** Abstract class for `SelectionPartLasso` and `SelectionPartLasso`. */
interface SelectionLasso extends GuiBase3d {
	/** The Humanoid that the Lasso belongs to, and will come from. */
	Humanoid: Humanoid;
}

/**
 * An instance used to display a "lasso" between a `Humanoid` Torso and a `BasePart`.
 * @deprecated This class is deprecated.
 */
interface SelectionPartLasso extends SelectionLasso {
	/** Sets the target of the lasso object. */
	Part: BasePart;
}

/** @deprecated This class is deprecated. */
interface SelectionPointLasso extends SelectionLasso {
	/** Sets the Vector3 target of the lasso object. */
	Point: Vector3;
}

interface Path2D extends GuiBase {
	/** Connects the first and last control points when enabled. */
	Closed: boolean;
	/** Determines the color of the `Path2D`. */
	Color3: Color3;
	/** Determines how thick the `Path2D` path is. */
	Thickness: number;
	/** Determines if the `Path2D` path is rendered or not. */
	Visible: boolean;
	/** Determines the order in which a `Path2D` path renders relative to other GUIs. */
	ZIndex: number;
	/** Returns the bounding size for the `Path2D`. */
	GetBoundingRect(): Rect;
	/** Returns the `Path2DControlPoint` for a given index. */
	GetControlPoint(index?: number): Path2DControlPoint;
	/** Returns all the `Path2DControlPoints` for the `Path2D`. */
	GetControlPoints(): unknown;
	/** Returns the length of the `Path2D`. */
	GetLength(): number;
	/** Returns the maximum allowed number of control points. */
	GetMaxControlPoints(): number;
	/** Returns the position at a given value in parameter space. */
	GetPositionOnCurve(t?: number): UDim2;
	/** Returns the position at a given value in arc length space. */
	GetPositionOnCurveArcLength(t?: number): UDim2;
	/** Returns the tangent at a given value in parameter space. */
	GetTangentOnCurve(t?: number): Vector2;
	/** Returns the tangent at a given value in arc length space. */
	GetTangentOnCurveArcLength(t?: number): Vector2;
	/** Inserts a new control point at a given index. */
	InsertControlPoint(index?: number, point?: Path2DControlPoint): undefined;
	/** Removes a control at the given index. */
	RemoveControlPoint(index?: number): undefined;
	/**
	 * Sets all the control points to the specified array, replacing all existing points with new ones.
	 */
	SetControlPoints(controlPoints?: unknown): undefined;
	/** Updates a control point at the given index. */
	UpdateControlPoint(index?: number, point?: Path2DControlPoint): undefined;
	/** Fires any time control points change. */
	readonly ControlPointChanged: RBXScriptSignal<() => void>;
}

/**
 * Offers numerous properties and methods for working with `GuiObjects`, player preferences, and other UI‑related tasks.
 */
interface GuiService extends Instance {
	/**
	 * If activated, the <kbd>Select</kbd> button on a gamepad or <kbd>Backslash</kbd> will automatically set a GUI as the selected object.
	 */
	AutoSelectGuiEnabled: boolean;
	/** Used to enable and disable the default controller GUI navigation. */
	GuiNavigationEnabled: boolean;
	/**
	 * Indicates whether a modal dialog is visible.
	 * @deprecated Deprecated.
	 */
	IsModalDialog: boolean;
	/**
	 * Indicates whether the user is playing on a computer running Windows.
	 * @deprecated Deprecated.
	 */
	IsWindows: boolean;
	/** Returns `true` if any menu of `CoreGui` is open. */
	MenuIsOpen: boolean;
	/** Gets the player's preferred text size as an `Enum.PreferredTextSize` value. */
	PreferredTextSize: Enum.PreferredTextSize;
	/** Sets the `GuiObject` currently being focused on by the GUI navigator. */
	SelectedObject: GuiObject;
	/**
	 * Used to determine the absolute size and position of unobstructed area within top bar space.
	 */
	TopbarInset: Rect;
	/**
	 * Used to enable and disable touch controls and touch control display UI. Defaults to `true`.
	 */
	TouchControlsEnabled: boolean;
	/**
	 * Read-only property which represents the physical rendering size of the viewport.
	 */
	ViewportDisplaySize: Enum.DisplaySize;
	/**
	 * Creates a selection group where gamepad GUI navigation will only consider selectable objects that are within the group.
	 * @deprecated Deprecated.
	 */
	AddSelectionParent(selectionName?: string, selectionParent?: Instance): undefined;
	/**
	 * **AddSelectionTuple** works similarly to `GuiService:AddSelectionParent()`, but you can give it a tuple of `GuiObject` that you want to be contained in the group.  Beware that the second argument is _not_ a table, but rather the first of several `GuiObject` in the tuple. To pass the contents of a table, use `unpack`/`table.unpack`:  ```lua local frame = script.Parent -- Passing various GuiObject individually GuiService:AddSelectionTuple("InventoryButtons", frame.Sort, frame.Trash, frame.Drop) -- Unpacking a table of GuiObject (unpack/table.unpack are equivalent) local inventoryButtons = { frame.Sort, frame.Trash, frame.Drop } GuiService:AddSelectionTuple("InventoryButtons", unpack(inventoryButtons)) ```
	 * @deprecated Deprecated.
	 */
	AddSelectionTuple(selectionName?: string, selections?: unknown): undefined;
	/** Closes the avatar inspection menu, if open. */
	CloseInspectMenu(): undefined;
	DismissNotification(notificationId?: string): boolean;
	/** Checks if the player emotes menu is open. */
	GetEmotesMenuOpen(): boolean;
	/**
	 * Returns whether or not the `Player.GameplayPaused` notification has been disabled.
	 */
	GetGameplayPausedNotificationEnabled(): boolean;
	/**
	 * Returns two `Vector2` values representing the inset of user GUIs in pixels, from the top‑left corner of the screen and the bottom‑right corner of the screen respectively.
	 */
	GetGuiInset(): unknown;
	GetInsetArea(screenInsets?: Enum.ScreenInsets): Rect;
	/** Returns whether the avatar inspection menu is enabled. */
	GetInspectMenuEnabled(): boolean;
	/**
	 * Allows the avatar inspection menu to appear showing the assets listed in a `HumanoidDescription` object.
	 */
	InspectPlayerFromHumanoidDescription(humanoidDescription?: Instance, name?: string): undefined;
	/**
	 * Allows the avatar inspection menu to appear showing the user that has the given `UserId`.
	 */
	InspectPlayerFromUserId(userId?: number): undefined;
	/**
	 * Returns `true` if the client is using the ten foot interface, a special version of Roblox's UI exclusive to consoles.
	 */
	IsTenFootInterface(): boolean;
	/**
	 * Removes a group that was created with `AddSelectionParent()` or `AddSelectionTuple()`.
	 * @deprecated Deprecated.
	 */
	RemoveSelectionGroup(selectionName?: string): undefined;
	/**
	 * Sets `GuiService.SelectedObject` to a child of a provided instance that is the `PlayerGui` or its descendants.
	 */
	Select(selectionParent?: Instance): undefined;
	SendNotification(notificationInfo?: unknown): string;
	/** Opens or closes the player emotes menu. */
	SetEmotesMenuOpen(isOpen?: boolean): undefined;
	/** Lets you disable the built-in notification when a player's gameplay is paused. */
	SetGameplayPausedNotificationEnabled(enabled?: boolean): undefined;
	/** Allows you to enable or disable the avatar inspection menu. */
	SetInspectMenuEnabled(enabled?: boolean): undefined;
	/** Fires when the user **closes** the Roblox `CoreGui` escape menu. */
	readonly MenuClosed: RBXScriptSignal<() => void>;
	/** Fires when the user **opens** the Roblox `CoreGui` escape menu. */
	readonly MenuOpened: RBXScriptSignal<() => void>;
}

/** An internal service, whose functionality is not accessible to developers. */
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
	/** Whether the haptic effect loops continuously. */
	Looped: boolean;
	/**
	 * Along with `Radius`, specifies the impact position relative to the input device and, effectively, how broadly that impact effects nearby motors.
	 */
	Position: Vector3;
	/**
	 * Along with `Position`, specifies the impact radius relative to the input device and, effectively, how broadly that impact effects nearby motors.
	 */
	Radius: number;
	/** `Enum.HapticEffectType` describing the haptic type. */
	Type: Enum.HapticEffectType;
	/** Plays the haptic effect. */
	Play(): undefined;
	/**
	 * Defines a custom waveform as a table and applies it to the haptic.      This method takes in an array of `FloatCurveKey` objects.
	 */
	SetWaveformKeys(keys?: unknown): undefined;
	/** Stops the haptic effect. */
	Stop(): undefined;
	/** Fires when the `HapticEffect` has completed playback and stopped. */
	readonly Ended: RBXScriptSignal<() => void>;
}

/** Provides haptic feedback to controllers and devices. */
interface HapticService extends Instance {
	/**
	 * Returns the current vibration value set to the specified `UserInputType` and `Enum.VibrationMotor`.
	 */
	GetMotor(inputType?: Enum.UserInputType, vibrationMotor?: Enum.VibrationMotor): unknown;
	/**
	 * Returns `true` if the specified motor is available to be used with the specified `Enum.UserInputType`.
	 */
	IsMotorSupported(inputType?: Enum.UserInputType, vibrationMotor?: Enum.VibrationMotor): boolean;
	/** Returns `true` if the specified `Enum.UserInputType` supports haptic feedback. */
	IsVibrationSupported(inputType?: Enum.UserInputType): boolean;
	/**
	 * Sets the vibration intensity of the specified `UserInputType` and `Enum.VibrationMotor`.
	 */
	SetMotor(inputType?: Enum.UserInputType, vibrationMotor?: Enum.VibrationMotor, vibrationValues?: unknown): undefined;
}

interface HarmonyService extends Instance {
}

interface HeapProfilerService extends Instance {
	ClientRequestDataAsync(player?: Player): string;
	ServerRequestDataAsync(): string;
	readonly OnNewData: RBXScriptSignal<(player: Player, jsonString: buffer, id: number, compressedLength: number, uncompressedLength: number) => void>;
}

interface HeatmapService extends Instance {
}

interface HeightmapImporterService extends Instance {
}

interface HiddenSurfaceRemovalAsset extends Instance {
}

/**
 * A visual effect which you can use to call attention to a specific object within an experience.
 */
interface Highlight extends Instance {
	/** The `Instance` that the `Highlight` is applied to. */
	Adornee: Instance;
	/**
	 * Controls how the `Highlight` effect displays with respect to other objects in the world.
	 */
	DepthMode: Enum.HighlightDepthMode;
	/** Sets whether or not the highlight is enabled. */
	Enabled: boolean;
	/** Sets the `Color3` value of the highlight's interior. */
	FillColor: Color3;
	/** Sets the transparency of the highlight's interior. */
	FillTransparency: number;
	/** Sets the `Color3` value of the highlight's outline. */
	OutlineColor: Color3;
	/** Sets the transparency of the highlight's outline. */
	OutlineTransparency: number;
}

/**
 * Hopper is the original name of the StarterPack service.
 * @deprecated This class is deprecated.
 */
interface Hopper extends Instance {
}

/** An internal service whose functionality is not available to developers. */
interface HttpRbxApiService extends Instance {
	RequestLimitedAsync(requestOptions?: unknown, priority?: Enum.ThrottlingPriority, content_type?: Enum.HttpContentType, httpRequestType?: Enum.HttpRequestType): string;
}

interface HttpRequest extends Instance {
}

/** Allows sending HTTP requests and provides various web-related and JSON methods. */
interface HttpService extends Instance {
	/** Indicates whether HTTP requests can be sent to external websites. */
	readonly HttpEnabled: boolean;
	/** Creates a client that opens a persistent connection to stream data. */
	CreateWebStreamClient(streamClientType?: Enum.WebStreamClientType, requestOptions?: unknown): WebStreamClient;
	/** Generates a UUID/GUID random string, optionally with curly braces. */
	GenerateGUID(wrapInCurlyBraces?: boolean): string;
	/** Returns a `Secret` from the secrets store. */
	GetSecret(key?: string): Secret;
	/** Decodes a JSON string into a Luau table. */
	JSONDecode(input?: string): unknown;
	/** Generate a JSON string from a Luau table. */
	JSONEncode(input?: unknown): string;
	/** Replaces URL-unsafe characters with '%' and two hexadecimal characters. */
	UrlEncode(input?: string): string;
	/** Sends an HTTP `GET` request. */
	GetAsync(url?: unknown, nocache?: boolean, headers?: unknown): string;
	/** Sends an HTTP `POST` request. */
	PostAsync(url?: unknown, data?: string, content_type?: Enum.HttpContentType, compress?: boolean, headers?: unknown): string;
	/** Sends an HTTP request using any HTTP method given a dictionary of information. */
	RequestAsync(requestOptions?: unknown): unknown;
}

/** A special object that gives models the functionality of a character. */
interface Humanoid extends Instance {
	/**
	 * Sets whether the character will automatically jump when they hit an obstacle as a player on a mobile device.
	 */
	AutoJumpEnabled: boolean;
	/**
	 * AutoRotate sets whether or not the Humanoid will automatically rotate to face in the direction they are moving in.
	 */
	AutoRotate: boolean;
	/**
	 * When Enabled, AutomaticScalingEnabled causes the size of the character to change in response to the values in the humanoid's child scale values changing.
	 */
	AutomaticScalingEnabled: boolean;
	/**
	 * Determines whether the humanoid's joints break when in the `Enum.HumanoidStateType.Dead` state.
	 */
	BreakJointsOnDeath: boolean;
	/**
	 * An offset applied to the Camera's subject position when its CameraSubject is set to this Humanoid.
	 */
	CameraOffset: Vector3;
	/**
	 * Selects the `Enum.HumanoidCollisionType` for R15 and Rthro non-player characters.
	 * @deprecated Deprecated.
	 */
	CollisionType: Enum.HumanoidCollisionType;
	/** Controls the distance behavior of the humanoid's name and health display. */
	DisplayDistanceType: Enum.HumanoidDisplayDistanceType;
	/** Sets the text of a Humanoid, displayed above their head. */
	DisplayName: string;
	/** Used to disable the internal physics and state machine of the Humanoid. */
	EvaluateStateMachine: boolean;
	/**
	 * Describes the `Enum.Material` that the `Humanoid` is currently standing on. If the `Humanoid` isn't standing on anything, the value of this property will be _Air_.
	 */
	FloorMaterial: Enum.Material;
	/**
	 * Describes the current health of the Humanoid on the range [0, `Humanoid.MaxHealth`].
	 */
	Health: number;
	/**
	 * Used in conjunction with the `DisplayDistanceType` property to control the distance from which a humanoid's health bar can be seen.
	 */
	HealthDisplayDistance: number;
	/** Controls when the humanoid's health bar is allowed to be displayed. */
	HealthDisplayType: Enum.HumanoidHealthDisplayType;
	/** Determines the distance off the ground the `Humanoid.RootPart` should be. */
	HipHeight: number;
	/** If `true`, the `Humanoid` jumps with an upwards force. */
	Jump: boolean;
	/** Provides control over the height that the `Humanoid` jumps to. */
	JumpHeight: number;
	/** Determines how much upwards force is applied to the `Humanoid` when jumping. */
	JumpPower: number;
	/** The maximum value of a humanoid's `Health`. */
	MaxHealth: number;
	/** The maximum slope angle that a humanoid can walk on without slipping. */
	MaxSlopeAngle: number;
	/** Describes the direction that the `Humanoid` is walking in. */
	MoveDirection: Vector3;
	/**
	 * Used in conjunction with the `Humanoid.DisplayDistanceType` property to control the distance from which a humanoid's name can be seen.
	 */
	NameDisplayDistance: number;
	/**
	 * Controls whether a humanoid's name and health bar can be seen behind walls or other objects.
	 */
	NameOcclusion: Enum.NameOcclusion;
	/**
	 * Determines whether the `Humanoid` is currently in the `Enum.HumanoidStateType.PlatformStanding` state.
	 */
	PlatformStand: boolean;
	/**
	 * Allows developers to disable the behavior where a player `Character|character` dies if the Neck `Motor6D` is removed or disconnected even momentarily.
	 */
	RequiresNeck: boolean;
	/**
	 * Describes whether this `Humanoid` is utilizing the legacy R6 character rig, or the new R15 character rig.
	 */
	RigType: Enum.HumanoidRigType;
	/** A reference to the humanoid's **HumanoidRootPart** object. */
	RootPart: BasePart;
	/** A reference to the seat that a `Humanoid` is currently sitting in, if any. */
	SeatPart: BasePart;
	/** Describes whether the `Humanoid` is currently sitting. */
	Sit: boolean;
	/**
	 * Describes the 3D position where the `Player` controlling the `Humanoid` last clicked in the world while using a `Tool`.
	 */
	TargetPoint: Vector3;
	/**
	 * Determines whether the `JumpHeight` (false) or `Humanoid.JumpPower` (true) property is used.
	 */
	UseJumpPower: boolean;
	/** Describes the humanoid's maximum movement speed in studs per second. */
	WalkSpeed: number;
	/** A reference to a part whose position is trying to be reached by a humanoid. */
	WalkToPart: BasePart;
	/**
	 * The position that a humanoid is trying to reach, after a call to `Humanoid:MoveTo()` is made.
	 */
	WalkToPoint: Vector3;
	/** @deprecated Deprecated. */
	maxHealth: number;
	/** Attaches the specified `Accessory` to the humanoid's parent. */
	AddAccessory(accessory?: Instance): undefined;
	/**
	 * Adds a custom status to the Humanoid.
	 * @deprecated Deprecated.
	 */
	AddCustomStatus(status?: string): boolean;
	/**
	 * Adds a BoolValue to the Humanoid's _Status_ object.
	 * @deprecated Deprecated.
	 */
	AddStatus(status?: Enum.Status): boolean;
	/**
	 * Assembles a tree of `Motor6D` joints by attaching together `Attachment` objects in a humanoid's character.
	 */
	BuildRigFromAttachments(): undefined;
	/** Sets the `Humanoid` to enter the given `Enum.HumanoidStateType`. */
	ChangeState(state?: Enum.HumanoidStateType): undefined;
	/** Makes the `Humanoid` equip the given `Tool`. */
	EquipTool(tool?: Instance): undefined;
	/**
	 * Returns an array of `Accessory` objects that the humanoid's parent is currently wearing.
	 */
	GetAccessories(): unknown;
	/**
	 * Returns a copy of the humanoid's cached `HumanoidDescription` which describes its current look.
	 */
	GetAppliedDescription(): HumanoidDescription;
	/**
	 * Pass a body part to this method (the body part should be a sibling of Humanoid, and a child of a Model) to get the `Enum.BodyPartR15` of the `Part`.
	 */
	GetBodyPartR15(part?: Instance): Enum.BodyPartR15;
	/** Returns the `Enum.Limb` enum that is associated with the given `Part`. */
	GetLimb(part?: Instance): Enum.Limb;
	GetMoveVelocity(): Vector3;
	/**
	 * Returns an array of all `AnimationTracks` that are currently being played on the `Humanoid`.
	 * @deprecated Deprecated.
	 */
	GetPlayingAnimationTracks(): unknown;
	/** Returns the humanoid's current `Enum.HumanoidStateType`. */
	GetState(): Enum.HumanoidStateType;
	/** Returns whether a `Enum.HumanoidStateType` is enabled for the `Humanoid`. */
	GetStateEnabled(state?: Enum.HumanoidStateType): boolean;
	/**
	 * Returns a table of the Humanoid's statuses, and custom statuses.
	 * @deprecated Deprecated.
	 */
	GetStatuses(): unknown;
	/**
	 * Returns boolean based on if custom statuses exist.
	 * @deprecated Deprecated.
	 */
	HasCustomStatus(status?: string): boolean;
	/**
	 * Returns a boolean based on if a status exists.
	 * @deprecated Deprecated.
	 */
	HasStatus(status?: Enum.Status): boolean;
	/**
	 * Loads an `Animation` onto a `Humanoid`, returning an `AnimationTrack` that can be used for playback.
	 * @deprecated Deprecated.
	 */
	LoadAnimation(animation?: Animation): AnimationTrack;
	/** Causes the `Humanoid` to walk in the given direction. */
	Move(moveDirection?: Vector3, relativeToCamera?: boolean): undefined;
	/**
	 * Causes the `Humanoid` to attempt to walk to the given location by setting the `Humanoid.WalkToPoint` and `Humanoid.WalkToPart` properties.
	 */
	MoveTo(location?: Vector3, part?: Instance): undefined;
	/** Removes all `Accessory` objects worn by the humanoid's parent. */
	RemoveAccessories(): undefined;
	/**
	 * Removes the defined custom status from the Status model in the Humanoid..
	 * @deprecated Deprecated.
	 */
	RemoveCustomStatus(status?: string): boolean;
	/**
	 * Removes the defined status from the Status model in the Humanoid.
	 * @deprecated Deprecated.
	 */
	RemoveStatus(status?: Enum.Status): boolean;
	/** Dynamically replaces a Humanoid body part with a different part. */
	ReplaceBodyPartR15(bodyPart?: Enum.BodyPartR15, part?: BasePart): boolean;
	/** Sets whether a given `Enum.HumanoidStateType` is enabled for the `Humanoid`. */
	SetStateEnabled(state?: Enum.HumanoidStateType, enabled?: boolean): undefined;
	/**
	 * Lowers the `Humanoid.Health` of the `Humanoid` by the given _amount_ if it is not protected by a `ForceField`.
	 */
	TakeDamage(amount?: number): undefined;
	/** Unequips any `Tool` currently equipped by the `Humanoid`. */
	UnequipTools(): undefined;
	/** @deprecated Deprecated. */
	loadAnimation(animation?: Animation): AnimationTrack;
	/** @deprecated Deprecated. */
	takeDamage(amount?: number): undefined;
	/**
	 * Makes the character's look match that of the passed in `HumanoidDescription`.
	 * @deprecated Deprecated.
	 */
	ApplyDescription(humanoidDescription?: HumanoidDescription, assetTypeVerification?: Enum.AssetTypeVerification): undefined;
	/** Makes the character's look match that of the passed in `HumanoidDescription`. */
	ApplyDescriptionAsync(humanoidDescription?: HumanoidDescription, assetTypeVerification?: Enum.AssetTypeVerification): undefined;
	/**
	 * Makes the character's look match that of the passed in `HumanoidDescription`, even after external changes.
	 * @deprecated Deprecated.
	 */
	ApplyDescriptionReset(humanoidDescription?: HumanoidDescription, assetTypeVerification?: Enum.AssetTypeVerification): undefined;
	/**
	 * Makes the character's look match that of the passed in `HumanoidDescription`, even after external changes.
	 */
	ApplyDescriptionResetAsync(humanoidDescription?: HumanoidDescription, assetTypeVerification?: Enum.AssetTypeVerification): undefined;
	/**
	 * Plays emotes and returns if was successfully ran.
	 * @deprecated Deprecated.
	 */
	PlayEmote(emoteName?: string): boolean;
	/** Plays emotes and returns if was successfully ran. */
	PlayEmoteAsync(emoteName?: string): boolean;
	/**
	 * Fires when an `AnimationTrack` begins playing on the `Humanoid`.
	 * @deprecated Deprecated.
	 */
	readonly AnimationPlayed: RBXScriptSignal<(animationTrack: AnimationTrack) => void>;
	readonly ApplyDescriptionFinished: RBXScriptSignal<(description: HumanoidDescription) => void>;
	/** Fires when the speed at which a `Humanoid` is climbing changes. */
	readonly Climbing: RBXScriptSignal<(speed: number) => void>;
	/**
	 * Fired when a status is added to the Humanoid.
	 * @deprecated Deprecated.
	 */
	readonly CustomStatusAdded: RBXScriptSignal<(status: string) => void>;
	/**
	 * Fired when a status is removed from the Humanoid.
	 * @deprecated Deprecated.
	 */
	readonly CustomStatusRemoved: RBXScriptSignal<(status: string) => void>;
	/** Fires when the `Humanoid` dies. */
	readonly Died: RBXScriptSignal<() => void>;
	/**
	 * Fires when the `Humanoid` enters or leaves the `FallingDown` `Enum.HumanoidStateType`.
	 */
	readonly FallingDown: RBXScriptSignal<(active: boolean) => void>;
	/**
	 * Fires when the `Humanoid` enters or leaves the `Freefall` `Enum.HumanoidStateType`.
	 */
	readonly FreeFalling: RBXScriptSignal<(active: boolean) => void>;
	/**
	 * Fires when the `Humanoid` enters or leaves the `GettingUp` `Enum.HumanoidStateType`.
	 */
	readonly GettingUp: RBXScriptSignal<(active: boolean) => void>;
	/**
	 * Fires when the `Humanoid.Health` changes (or when the `Humanoid.MaxHealth` is set).
	 */
	readonly HealthChanged: RBXScriptSignal<(health: number) => void>;
	/**
	 * Fires when the `Humanoid` enters and leaves the `Jumping` `Enum.HumanoidStateType`.
	 */
	readonly Jumping: RBXScriptSignal<(active: boolean) => void>;
	/**
	 * Fires when the `Humanoid` finishes walking to a goal declared by `Humanoid:MoveTo()`.
	 */
	readonly MoveToFinished: RBXScriptSignal<(reached: boolean) => void>;
	/**
	 * Fires when the `Humanoid` enters or leaves the `PlatformStanding` `Enum.HumanoidStateType`.
	 */
	readonly PlatformStanding: RBXScriptSignal<(active: boolean) => void>;
	/**
	 * Fires when the `Humanoid` enters or leaves the `Ragdoll` `Enum.HumanoidStateType`.
	 */
	readonly Ragdoll: RBXScriptSignal<(active: boolean) => void>;
	/** Fires when the speed at which a `Humanoid` is running changes. */
	readonly Running: RBXScriptSignal<(speed: number) => void>;
	/** Fired when a `Humanoid` either sits in a `Seat` or `VehicleSeat` or gets up. */
	readonly Seated: RBXScriptSignal<(active: boolean, currentSeatPart: BasePart) => void>;
	/** Fires when the state of the `Humanoid` is changed. */
	readonly StateChanged: RBXScriptSignal<(old: Enum.HumanoidStateType, _new: Enum.HumanoidStateType) => void>;
	/** Fires when `Humanoid:SetStateEnabled()` is called on the `Humanoid`. */
	readonly StateEnabledChanged: RBXScriptSignal<(state: Enum.HumanoidStateType, isEnabled: boolean) => void>;
	/**
	 * Fired when a status is added to the Humanoid.
	 * @deprecated Deprecated.
	 */
	readonly StatusAdded: RBXScriptSignal<(status: Enum.Status) => void>;
	/**
	 * Fired when a status is removed from the Humanoid.
	 * @deprecated Deprecated.
	 */
	readonly StatusRemoved: RBXScriptSignal<(status: Enum.Status) => void>;
	/**
	 * Fires when the `Humanoid` enters or leaves the `StrafingNoPhysics` `Enum.HumanoidStateType`.
	 */
	readonly Strafing: RBXScriptSignal<(active: boolean) => void>;
	/**
	 * Fires when the speed at which a `Humanoid` is swimming in `Terrain` water changes.
	 */
	readonly Swimming: RBXScriptSignal<(speed: number) => void>;
	/** Fires when one of the humanoid's limbs come in contact with another `BasePart`. */
	readonly Touched: RBXScriptSignal<(touchingPart: BasePart, humanoidPart: BasePart) => void>;
}

/**
 * Describes the appearance of a Humanoid character including body parts, accessories, colors, scales, animations, and emotes.
 */
interface HumanoidDescription extends Instance {
	/**
	 * A comma-separated list of asset IDs that will be added as `Accessories` to a `Humanoid` rig when `applied`, usually those attached to its back (such as capes).
	 */
	BackAccessory: string;
	/**
	 * Determines the factor by which the shape of a `Humanoid` is interpolated from the standard R15 body shape (0) to a taller and more slender body type (1).
	 */
	BodyTypeScale: number;
	/**
	 * When this description is `applied` to a `Humanoid`, this determines the `Animation.AnimationId` to play when its `state` is `Climbing`.
	 */
	ClimbAnimation: number;
	/**
	 * Determines by what factor the depth (back-to-front distance) of a `Humanoid` is scaled.
	 */
	DepthScale: number;
	/** Determines the asset ID of the Face to be applied to the `Humanoid`. */
	Face: number;
	/**
	 * A comma-separated list of asset IDs that will be added as `Accessories` to a `Humanoid` rig when `applied`, usually those attached to the front of its face (such as glasses).
	 */
	FaceAccessory: string;
	/**
	 * When this description is `applied` to a `Humanoid`, this determines the `Animation.AnimationId` to play when its `state` is `Freefall`.
	 */
	FallAnimation: number;
	/**
	 * A comma-separated list of asset IDs that will be added as `Accessories` to a `Humanoid` rig when `applied`, usually those attached to front of its torso (such as medals or ties).
	 */
	FrontAccessory: string;
	/** Determines the `Graphic` used by a `ShirtGraphic`. */
	GraphicTShirt: number;
	/**
	 * A comma-separated list of asset IDs that will be added as `Accessories` to a `Humanoid` rig when `applied`, usually those attached to its head resembling hair.
	 */
	HairAccessory: string;
	/**
	 * A comma-separated list of asset IDs that will be added as `Accessories` to a `Humanoid` rig when `applied`, usually those attached to its head.
	 */
	HatAccessory: string;
	/** Determines the asset ID of the Head to be applied to the `Humanoid`. */
	Head: number;
	/**
	 * Determines the `BodyColors.HeadColor3` and `BodyColors.HeadColor` of a `Humanoid` when `applied`.
	 */
	HeadColor: Color3;
	/**
	 * Determines by what factor the **Head** object of a `Humanoid` is scaled, as well as any accessories attached to it.
	 */
	HeadScale: number;
	/**
	 * Determines by what factor the height (top-to-bottom distance) of a `Humanoid` is scaled, as well as all accessories not attached to its head.
	 */
	HeightScale: number;
	/**
	 * When this description is `applied` to a `Humanoid`, this determines the `Animation.AnimationId` to play when its `state` is `Running` at a speed near zero.
	 */
	IdleAnimation: number;
	/**
	 * When this description is `applied` to a `Humanoid`, this determines the `Animation.AnimationId` to play when its `state` is `Jumping`.
	 */
	JumpAnimation: number;
	/** Determines the asset ID of the LeftArm to be applied to the `Humanoid`. */
	LeftArm: number;
	/**
	 * Determines the `BodyColors.LeftArmColor3` and `BodyColors.LeftArmColor` of a `Humanoid` when applied.
	 */
	LeftArmColor: Color3;
	/** Determines the asset ID of the LeftLeg to be applied to the `Humanoid`. */
	LeftLeg: number;
	/**
	 * Determines the `BodyColors.LeftLegColor3` and `BodyColors.LeftLegColor` of a `Humanoid` when applied.
	 */
	LeftLegColor: Color3;
	MoodAnimation: number;
	/**
	 * A comma-separated list of asset IDs that will be added as `Accessories` to a `Humanoid` rig when `applied`, usually those attached to its neck (such as scarves or necklaces).
	 */
	NeckAccessory: string;
	/** Determines the `PantsTemplate` used by a `Pants` instance. */
	Pants: number;
	/** Determines how wide (0) or narrow (1) a `Humanoid` rig is. */
	ProportionScale: number;
	/** Determines the asset ID of the RightArm to be applied to the `Humanoid`. */
	RightArm: number;
	/**
	 * Determines the `BodyColors.RightArmColor3` and `BodyColors.RightArmColor` of a Humanoid when applied.
	 */
	RightArmColor: Color3;
	/** Determines the asset ID of the RightLeg to be applied to the `Humanoid`. */
	RightLeg: number;
	/**
	 * Determines the `BodyColors.RightLegColor3` and `BodyColors.RightLegColor` of a Humanoid when applied.
	 */
	RightLegColor: Color3;
	/**
	 * When this description is `applied` to a `Humanoid`, this determines the `Animation.AnimationId` to play when its `state` is `Running` at a moderate speed.
	 */
	RunAnimation: number;
	/** Determines the `ShirtTemplate` used by a `Shirt` instance. */
	Shirt: number;
	/**
	 * A comma-separated list of asset IDs that will be added as `Accessories` to a `Humanoid` rig when `applied`, usually those attached to its shoulders (such as shoulder-mounted critters).
	 */
	ShouldersAccessory: string;
	StaticFacialAnimation: boolean;
	/**
	 * When this description is `applied` to a `Humanoid`, this determines the `Animation.AnimationId` to play when its `state` is `Swimming`.
	 */
	SwimAnimation: number;
	/** Determines the asset ID of the Torso to be applied to the `Humanoid`. */
	Torso: number;
	/**
	 * Determines the `BodyColors.TorsoColor3` and `BodyColors.TorsoColor` of a Humanoid when applied.
	 */
	TorsoColor: Color3;
	UseAvatarSettings: boolean;
	/**
	 * A comma-separated list of asset IDs that will be added as `Accessories` to a `Humanoid` rig when `applied`, usually those attached to its waist (such as belts).
	 */
	WaistAccessory: string;
	/**
	 * When this description is `applied` to a `Humanoid`, this determines the `Animation.AnimationId` to play when its `state` is `Running` at a low speed.
	 */
	WalkAnimation: number;
	/**
	 * Determines by what factor the width (left-to-right distance) of a `Humanoid` is scaled, as well as all accessories not attached to its head.
	 */
	WidthScale: number;
	/** Adds the emote to the description given a name and its asset ID. */
	AddEmote(name?: string, assetId?: number): undefined;
	/** Returns a table of an avatar's current accessories. */
	GetAccessories(includeRigidAccessories?: boolean): unknown;
	/**
	 * Returns a dictionary of emotes that have been `added` or `set` to this description.
	 */
	GetEmotes(): unknown;
	/** Returns an array of tables describing the equipped emotes that have been `set`. */
	GetEquippedEmotes(): unknown;
	/** Removes any emotes that have been added under the given name. */
	RemoveEmote(name?: string): undefined;
	/** Accepts a table that sets the accessories and related properties for an avatar. */
	SetAccessories(accessories?: unknown, includeRigidAccessories?: boolean): undefined;
	/** Sets all of the emotes on this description. */
	SetEmotes(emotes?: unknown): undefined;
	/** Sets the currently equipped emotes given an array of emote names. */
	SetEquippedEmotes(equippedEmotes?: unknown): undefined;
	/** Fires when emotes are added, removed or set on this description. */
	readonly EmotesChanged: RBXScriptSignal<(newEmotes: unknown) => void>;
	/** Fires when the equipped emotes are `set` on this description. */
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
	GetJointFromName(name?: string): Instance;
	GetJointNames(): unknown;
	GetR15JointNames(): unknown;
	GetR6JointNames(): unknown;
}

/**
 * Specifies a control to generate a procedural animation pose using Inverse Kinematics.
 */
interface IKControl extends Instance {
	/**
	 * The last part that you are interested in moving your character. For example, the upper arm. Must be an ancestor of `EndEffector` and be a `BasePart` or a `Bone` in your character.
	 */
	ChainRoot: Instance;
	/** Toggles the control on and off. True by default. */
	Enabled: boolean;
	/**
	 * The part that you are interested in moving to reach the `Target`. For example, the hand of your character. Must be a descendant of `ChainRoot` and be a `BasePart` or a `Bone` in your character.
	 */
	EndEffector: Instance;
	/**
	 * An additional offset applied on top of the `EndEffector` in its local space to change where it moves.
	 */
	EndEffectorOffset: CFrame;
	/**
	 * An additional offset applied on top of the `Target` to change where the `EndEffector` moves.
	 */
	Offset: CFrame;
	/**
	 * An optional instance that determines which way the chain bends. You can use this to specify which way an elbow or knee bends.
	 */
	Pole: Instance;
	/**
	 * Specifies the order in which controls are solved. Higher values have higher priority.
	 */
	Priority: number;
	/**
	 * Specifies the average number of seconds that it takes for the `EndEffector` to smoothly reach the `Target`.
	 */
	SmoothTime: number;
	/**
	 * The object that the `EndEffector` reaches for or points at. It can be anything that has a position in the world, such as `BasePart`, `Attachment`, `Bone`, or `Motor6D`.
	 */
	Target: Instance;
	/** Specifies how the solver satisfies this control. */
	Type: Enum.IKControlType;
	/** Specifies the weight of the IK control target. Should be in the [0, 1] range. */
	Weight: number;
	GetChainCount(): number;
	GetChainLength(): number;
	GetNodeLocalCFrame(index?: number): CFrame;
	GetNodeWorldCFrame(index?: number): CFrame;
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

/**
 * Defines a gameplay action mechanic. These actions are then mapped to hardware inputs using `InputBinding`.
 */
interface InputAction extends Instance {
	/** Determines if the `InputAction` is enabled or not. */
	Enabled: boolean;
	/** Specifies what type of input value the action is expecting. */
	Type: Enum.InputActionType;
	/** Updates the `InputAction` to the given state and fires the appropriate signals. */
	Fire(state?: unknown): undefined;
	/** Returns the current state of the `InputAction`. */
	GetState(): unknown;
	/**
	 * Fires only when the `InputAction.Type` is set to `Bool` on a state transition from `false` to `true`.
	 */
	readonly Pressed: RBXScriptSignal<() => void>;
	/**
	 * Fires only when the `InputAction.Type` is set to `Bool` on a state transition from `true` to `false`.
	 */
	readonly Released: RBXScriptSignal<() => void>;
	/**
	 * Fires for all `Enum.InputActionType` types whenever the state changes, except if the state attempts to transition to the same state.
	 */
	readonly StateChanged: RBXScriptSignal<(value: unknown) => void>;
}

/** Defines which hardware binding should trigger the parent `InputAction`. */
interface InputBinding extends Instance {
	/**
	 * Specifies an alternate `Enum.KeyCode` for dispatching directionally "backward" inputs to the parent `InputAction`.
	 */
	Backward: Enum.KeyCode;
	ClampMagnitudeToOne: boolean;
	/**
	 * Specifies an alternate `Enum.KeyCode` for dispatching directionally "down" inputs to the parent `InputAction`.
	 */
	Down: Enum.KeyCode;
	/**
	 * Specifies an alternate `Enum.KeyCode` for dispatching directionally "forward" inputs to the parent `InputAction`.
	 */
	Forward: Enum.KeyCode;
	/** Specifies the `Enum.KeyCode` which triggers the parent `InputAction`. */
	KeyCode: Enum.KeyCode;
	/**
	 * Specifies an alternate `Enum.KeyCode` for dispatching directionally "left" inputs to the parent `InputAction`.
	 */
	Left: Enum.KeyCode;
	PointerIndex: number;
	/** Numerical value above which to fire an `InputAction` with a `Type` of `Bool`. */
	PressedThreshold: number;
	/**
	 * Specifies a primary `Enum.KeyCode` that must be pressed for the binding to activate.
	 */
	PrimaryModifier: Enum.KeyCode;
	/** Numerical value below which to fire an `InputAction` with a `Type` of `Bool`. */
	ReleasedThreshold: number;
	/** Numerical value to configure scaling for more precise thumbstick aiming. */
	ResponseCurve: number;
	/**
	 * Specifies an alternate `Enum.KeyCode` for dispatching directionally "right" inputs to the parent `InputAction`.
	 */
	Right: Enum.KeyCode;
	/** Amount by which to linearly scale the values of a directional `InputAction`. */
	Scale: number;
	/**
	 * Specifies a secondary `Enum.KeyCode` that must be pressed for the binding to activate.
	 */
	SecondaryModifier: Enum.KeyCode;
	/** Connects a `GuiButton` to a boolean action. */
	UIButton: GuiButton;
	/**
	 * Specifies an alternate `Enum.KeyCode` for dispatching directionally "up" inputs to the parent `InputAction`.
	 */
	Up: Enum.KeyCode;
	/**
	 * Amount by which to linearly scale the values of a two-directional `InputAction`.
	 */
	Vector2Scale: Vector2;
	Vector3Scale: Vector3;
}

/**
 * Collection of actions which holds related actions and defines how they interact with other contexts/actions.
 */
interface InputContext extends Instance {
	/** Determines if this `InputContext` is enabled or not. */
	Enabled: boolean;
	/** The priority level at which the context should be run. */
	Priority: number;
	/** Determines whether input bindings of lower priority will be processed. */
	Sink: boolean;
}

/** An object created when an input begins that describes a particular user input. */
interface InputObject extends Instance {
	/** A `Vector3` describing the delta between input movements. */
	Delta: Vector3;
	/** Contains an Enum that describes the kind of input used. */
	KeyCode: Enum.KeyCode;
	/** A `Vector3` describing the positional value of this input. */
	Position: Vector3;
	/**
	 * Describes the state of an input being performed, following a specific flow depending on the `UserInputType`.
	 */
	UserInputState: Enum.UserInputState;
	/**
	 * Describes the kind of input being performed (mouse, keyboard, gamepad, touch, etc.).
	 */
	UserInputType: Enum.UserInputType;
	/** Returns whether the passed in modifier key is down. */
	IsModifierKeyDown(modifierKey?: Enum.ModifierKey): boolean;
}

/** Used to insert assets from the Roblox website. */
interface InsertService extends Instance {
	/**
	 * Indicates whether ''Free Models'' can be inserted into the game.
	 * @deprecated Deprecated.
	 */
	AllowInsertFreeModels: boolean;
	/** @deprecated Deprecated. */
	ApproveAssetId(assetId?: number): undefined;
	/** @deprecated Deprecated. */
	ApproveAssetVersionId(assetVersionId?: number): undefined;
	/**
	 * Inserts `Instance` into `Workspace`.
	 * @deprecated Deprecated.
	 */
	Insert(instance?: Instance): undefined;
	/** Creates a new `MeshPart` with specified fidelity values. */
	CreateMeshPartAsync(meshId?: ContentId, collisionFidelity?: Enum.CollisionFidelity, renderFidelity?: Enum.RenderFidelity): MeshPart;
	/** @deprecated Deprecated. */
	GetBaseCategories(): unknown;
	/**
	 * Returns an array of dictionaries, containing information about various Roblox approved sets.
	 * @deprecated Deprecated.
	 */
	GetBaseSets(): unknown;
	/**
	 * Returns the most recently uploaded models in the specified category.
	 * @deprecated Deprecated.
	 */
	GetCollection(categoryId?: number): unknown;
	/**
	 * Retrieves a list of free Decals from the Catalog.
	 * @deprecated Deprecated.
	 */
	GetFreeDecals(searchText?: string, pageNum?: number): unknown;
	/** Retrieves a list of free Decals from the Catalog. */
	GetFreeDecalsAsync(searchText?: string, pageNum?: number): unknown;
	/**
	 * Retrieves a list of Free Models from the Catalog.
	 * @deprecated Deprecated.
	 */
	GetFreeModels(searchText?: string, pageNum?: number): unknown;
	/** Retrieves a list of Free Models from the Catalog. */
	GetFreeModelsAsync(searchText?: string, pageNum?: number): unknown;
	/**
	 * Returns the latest AssetVersionId of an asset for assets created by the place creator. Can be used in combination with `InsertService:LoadAssetVersion()` to load the latest version of a model, even if it gets updated while the game is running.
	 */
	GetLatestAssetVersionAsync(assetId?: number): number;
	/** @deprecated Deprecated. */
	GetUserCategories(userId?: number): unknown;
	/**
	 * Returns an array of dictionaries, containing information about sets owned by the user.
	 * @deprecated Deprecated.
	 */
	GetUserSets(userId?: number): unknown;
	/** Returns a `Model` containing the asset. */
	LoadAsset(assetId?: number): Instance;
	/**
	 * Returns a model inserted into `InsertService` containing the asset with the given assetVersionId.
	 */
	LoadAssetVersion(assetVersionId?: number): Instance;
	/** @deprecated Deprecated. */
	loadAsset(assetId?: number): Instance;
}

interface InstanceExtensionsService extends Instance {
}

/** A service for interacting with file sync from a plugin. */
interface InstanceFileSyncService extends Instance {
	/** Returns an array of all instances currently involved in file synchronization. */
	GetAllInstances(): Instance[];
	/** Returns the synchronization status of a specific instance. */
	GetStatus(instance?: Instance): Enum.InstanceFileSyncStatus;
	/** Returns the instance corresponding to a given file path. */
	GetSyncedInstance(filePath?: string): Instance;
	/** Fires when the synchronization status of an instance changes. */
	readonly StatusChanged: RBXScriptSignal<(instance: Instance, status: Enum.InstanceFileSyncStatus) => void>;
}

/** The base class for joints. */
interface JointInstance extends Instance {
	/** Determines if the joint is currently active in the world. */
	Active: boolean;
	/** Determines how the offset point is attached to `JointInstance.Part0`. */
	C0: CFrame;
	/** Subtracted from the `C0` property to create an offset point for `Part1`. */
	C1: CFrame;
	/** Sets whether the joint is active or not. */
	Enabled: boolean;
	/** The first `BasePart` that the joint connects. */
	Part0: BasePart;
	/** The second `BasePart` that the joint connects. */
	Part1: BasePart;
}

/** The base class for classic motor joints. */
interface DynamicRotate extends JointInstance {
	/** The base angle of the DynamicRotate object, in radians. */
	BaseAngle: number;
}

/** @deprecated This class is deprecated. */
interface RotateP extends DynamicRotate {
}

/** @deprecated This class is deprecated. */
interface RotateV extends DynamicRotate {
}

/**
 * Glue is a type of joint that can break when enough force is applied.
 * @deprecated This class is deprecated.
 */
interface Glue extends JointInstance {
	/** Determines the face of a `Glue`. */
	F0: Vector3;
	/** Determines the face of a `Glue`. */
	F1: Vector3;
	/** Determines the face of a `Glue`. */
	F2: Vector3;
	/** Determines the face of a `Glue`. */
	F3: Vector3;
}

/**
 * ManualSurfaceJointInstance is the base class for `ManualGlue` and `ManualWeld`.
 * @deprecated This class is deprecated.
 */
interface ManualSurfaceJointInstance extends JointInstance {
}

/**
 * ManualGlue is a joint created in a similar manner to the `ManualWeld` class. It functions identically to the `Glue` class.
 * @deprecated This class is deprecated.
 */
interface ManualGlue extends ManualSurfaceJointInstance {
}

/**
 * Holds two parts together and functions identically to `Weld`.
 * @deprecated This class is deprecated.
 */
interface ManualWeld extends ManualSurfaceJointInstance {
}

/** Makes a movable `JointInstance` between two parts. */
interface Motor extends JointInstance {
	/** Displays the current rotation of the motor in radians. */
	CurrentAngle: number;
	/** The desired angle to turn the motor to in radians. */
	DesiredAngle: number;
	/**
	 * The maximum velocity the motor can use to reach `Motor.DesiredAngle` measured in radians per physics frame (1/60th of a second).
	 */
	MaxVelocity: number;
	/** Sets `Motor.DesiredAngle` of the motor. */
	SetDesiredAngle(value?: number): undefined;
}

/** Creates an animatable joint between two `BaseParts`. */
interface Motor6D extends Motor {
}

/** @deprecated This class is deprecated. */
interface Rotate extends JointInstance {
}

/**
 * Holds two parts together and functions identically to `Weld`.
 * @deprecated This class is deprecated.
 */
interface Snap extends JointInstance {
}

interface VelocityMotor extends JointInstance {
	/** Displays the angle that the motor is at in radians. */
	CurrentAngle: number;
	/** The desired angle to be reached. The motor will attempt to reach this angle. */
	DesiredAngle: number;
	/** The `Hole` linked to this VelocityMotor. */
	Hole: Hole;
	/** The maximum amount of velocity able to be reached. */
	MaxVelocity: number;
}

interface Weld extends JointInstance {
}

/**
 * A service that stores joints created by surface connections.
 * @deprecated This class is deprecated.
 */
interface JointsService extends Instance {
	/**
	 * Will remove any 'create joints' that were made visible via the `JointsService:ShowPermissibleJoints()` method.
	 */
	ClearJoinAfterMoveJoints(): undefined;
	/**
	 * Updates all visible joints for the parts assigned by the `JointsService:SetJoinAfterMoveTarget()` and `JointsService:SetJoinAfterMoveInstance()` methods.
	 */
	CreateJoinAfterMoveJoints(): undefined;
	/**
	 * Sets the PVInstance that will be connected with the target PVInstance specified by `JointsService:SetJoinAfterMoveTarget()`.
	 */
	SetJoinAfterMoveInstance(joinInstance?: Instance): undefined;
	/**
	 * Sets the PVInstance that will be connected with the PVInstance specified by `JointsService:SetJoinAfterMoveInstance()`.
	 */
	SetJoinAfterMoveTarget(joinTarget?: Instance): undefined;
	/**
	 * When used it will visibly display a potential surface connection between the two `BasePart`, which were set with `JointsService:SetJoinAfterMoveTarget()` and `JointsService:SetJoinAfterMoveInstance()`.
	 */
	ShowPermissibleJoints(): undefined;
}

interface KeyboardService extends Instance {
}

/**
 * A Keyframe holds the `Poses` applied to joints in a `Model` at a given point of time in an animation. `Keyframes` are interpolated between during animation playback.
 */
interface Keyframe extends Instance {
	/**
	 * The `Keyframe` time position (in seconds) in an animation. This determines the time at which the `Poses` inside the keyframe will be shown.
	 */
	Time: number;
	/** Adds a `KeyframeMarker` to the `Keyframe` by parenting it to the keyframe. */
	AddMarker(marker?: Instance): undefined;
	/** Adds a `Pose` to the `Keyframe` by parenting it to the keyframe. */
	AddPose(pose?: Instance): undefined;
	/**
	 * Returns an array containing all `KeyframeMarkers` that have been added to the `Keyframe`.
	 */
	GetMarkers(): Instance[];
	/** Returns an array containing all `Poses` that have been added to a `Keyframe`. */
	GetPoses(): Instance[];
	/**
	 * Removes a `KeyframeMarker` from the `Keyframe` by settings its `Instance.Parent` to `nil`.
	 */
	RemoveMarker(marker?: Instance): undefined;
	/** Removes a `Pose` from the `Keyframe` by setting its `Instance.Parent` to `nil`. */
	RemovePose(pose?: Instance): undefined;
}

/**
 * An instance meant to represent an event that will eventually be fired when a `Keyframe` is hit.
 */
interface KeyframeMarker extends Instance {
	/** A value that is specified for a `KeyframeMarker`. */
	Value: string;
}

/** Provides functions to load and preview `KeyframeSequence`. */
interface KeyframeSequenceProvider extends Instance {
	/**
	 * Returns a `KeyframeSequence` from a given asset URL.
	 * @deprecated Deprecated.
	 */
	GetKeyframeSequence(assetId?: ContentId): Instance;
	/**
	 * Returns a `KeyframeSequence` from the supplied assetId.
	 * @deprecated Deprecated.
	 */
	GetKeyframeSequenceById(assetId?: number, useCache?: boolean): Instance;
	/**
	 * Generates a temporary asset ID from a `KeyframeSequence` that can be used for localized testing of an animation. Generates an _active://_ URL.
	 */
	RegisterActiveKeyframeSequence(keyframeSequence?: Instance): ContentId;
	/**
	 * Generates a temporary asset ID from a `KeyframeSequence` that can be used for localized testing of an animation. Generates a hash.
	 */
	RegisterKeyframeSequence(keyframeSequence?: Instance): ContentId;
	/**
	 * This function returns an `InventoryPages` object which can be used to iterate over animations owned by a specific user.
	 * @deprecated Deprecated.
	 */
	GetAnimations(userId?: number): Instance;
	/**
	 * This function returns an `InventoryPages` object which can be used to iterate over animations owned by a specific user.
	 */
	GetAnimationsAsync(userId?: number): Instance;
	/** Returns a KeyframeSequence based on the specified assetId asynchronously. */
	GetKeyframeSequenceAsync(assetId?: ContentId): Instance;
}

interface LSPFileSyncService extends Instance {
}

interface LanguageService extends Instance {
	GetCapabilitiesUsedInPackageAsync(instances: Instance[]): unknown;
}

/** Light is a root class for dynamic lighting related objects. */
interface Light extends Instance {
	/** Sets how bright the emitted light is, defaults to 1. */
	Brightness: number;
	/** The color of the emitted light. */
	Color: Color3;
	/** If set to true, light will be emitted from the source object. */
	Enabled: boolean;
	/** If set to true, will project shadows if light is blocked by an obstacle. */
	Shadows: boolean;
}

/** A light source that emits illumination from a single point. */
interface PointLight extends Light {
	/** The size of the area that the PointLight will illuminate. */
	Range: number;
}

/**
 * A light source that emits light directionally in the shape of a cone with a spherical base.
 */
interface SpotLight extends Light {
	/** The angle of which the light is shone from the SpotLight. */
	Angle: number;
	/** Sets the side of the parent that the SpotLight comes from. */
	Face: Enum.NormalId;
	/** The size of the area that the SpotLight will illuminate. */
	Range: number;
}

/**
 * A light source that emits illumination of a specified color and brightness from a face for a specified range.
 */
interface SurfaceLight extends Light {
	/** The angle of which the light is shone from the SurfaceLight. */
	Angle: number;
	/** Sets the side of the parent that the SurfaceLight comes from. */
	Face: Enum.NormalId;
	/** The distance from the SurfaceLight's face that will illuminate. */
	Range: number;
}

/**
 * The `Lighting` service controls global lighting in an experience. It includes a range of adjustable properties that you can use to change how lighting appears and interacts with other objects.
 */
interface Lighting extends Instance {
	/**
	 * The lighting hue applied to areas that are occluded from the sky, such as indoor areas.
	 */
	Ambient: Color3;
	/** The intensity of illumination in the place. */
	Brightness: number;
	/**
	 * A numerical representation (in hours) of the current time of day used by `Lighting`.
	 */
	ClockTime: number;
	/**
	 * The hue represented in light reflected in the opposite surfaces to those facing the sun or moon.
	 */
	ColorShift_Bottom: Color3;
	/** The hue represented in light reflected from surfaces facing the sun or moon. */
	ColorShift_Top: Color3;
	/** Ambient light that is derived from the environment. */
	EnvironmentDiffuseScale: number;
	/** Specular light derived from environment. */
	EnvironmentSpecularScale: number;
	/** The exposure compensation value. */
	ExposureCompensation: number;
	/** A `Color3` value giving the hue of `Lighting` fog. */
	FogColor: Color3;
	/**
	 * The depth from the `Workspace.CurrentCamera`, in studs, at which fog will be completely opaque.
	 */
	FogEnd: number;
	/**
	 * The depth from the `Workspace.CurrentCamera`, in studs, at which fog begins to show.
	 */
	FogStart: number;
	/**
	 * The geographic latitude, in degrees, of the scene, influencing the result of `Lighting` time on the position of the sun and moon.
	 */
	GeographicLatitude: number;
	/** Toggles voxel-based dynamic lighting for the place. */
	GlobalShadows: boolean;
	/** The artistic intent behind lighting in the experience. */
	readonly LightingStyle: Enum.LightingStyle;
	/** The lighting hue applied to outdoor areas. */
	OutdoorAmbient: Color3;
	/**
	 * Determines whether outlines are enabled or disabled in a place.
	 * @deprecated Deprecated.
	 */
	Outlines: boolean;
	/**
	 * Indicates whether you prefer lighting/shading quality or view distance to scale down first.
	 */
	readonly PrioritizeLightingQuality: boolean;
	/**
	 * This is supposed to change the color of player shadows, but currently doesn't do anything.
	 * @deprecated Deprecated.
	 */
	ShadowColor: Color3;
	/** Controls how blurry the shadows are. */
	ShadowSoftness: number;
	/** A 24-hour string representation of the current time of day used by `Lighting`. */
	TimeOfDay: string;
	/**
	 * Returns the number of minutes that have passed after midnight for the purposes of lighting.
	 */
	GetMinutesAfterMidnight(): number;
	/** Returns a `Vector3` representing the direction of the moon. */
	GetMoonDirection(): Vector3;
	/** Returns the moon's current phase. */
	GetMoonPhase(): number;
	/** Returns a `Vector3` representing the direction of the sun. */
	GetSunDirection(): Vector3;
	/** Sets `TimeOfDay` and `ClockTime` to the given number of minutes after midnight. */
	SetMinutesAfterMidnight(minutes?: number): undefined;
	/** @deprecated Deprecated. */
	getMinutesAfterMidnight(): number;
	/** @deprecated Deprecated. */
	setMinutesAfterMidnight(minutes?: number): undefined;
	/**
	 * This event fires when a `Lighting` property is changed or a `Sky` is added or removed from `Lighting`.
	 */
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

/** Handles automated translation. */
interface LocalizationService extends Instance {
	/** The locale ID used for localizing core and internal features. */
	RobloxLocaleId: string;
	/** The locale ID that the local player has set for their operating system. */
	SystemLocaleId: string;
	/** Returns a list of `LocalizationTable` objects used for localizing core scripts. */
	GetCorescriptLocalizations(): Instance[];
	/** Gets all entries used for automated localization. */
	GetTableEntries(instance?: Instance): unknown;
	/**
	 * Returns a `Translator` to be used for translations using the locale data loaded.
	 */
	GetTranslatorForPlayer(player?: Instance): Instance;
	/** Returns country/region code string according to player's client IP geolocation. */
	GetCountryRegionForPlayerAsync(player?: Instance): string;
	/**
	 * Yields until the cloud `LocalizationTable` for the argument locale has been loaded - if available. Returns a `Translator` instance to be used for translations for the provided locale.
	 */
	GetTranslatorForLocaleAsync(locale?: string): Instance;
	/**
	 * Yields until the cloud `LocalizationTable` for the player's locale has been loaded - if available. Returns a `Translator` instance to be used for translations for the provided locale.
	 */
	GetTranslatorForPlayerAsync(player?: Instance): Instance;
}

/**
 * A LocalizationTable is a database of translations. It contains source strings and translations for various languages.
 */
interface LocalizationTable extends Instance {
	/** The locale of source strings. */
	SourceLocaleId: string;
	/** @deprecated Deprecated. */
	GetContents(): string;
	/**
	 * Returns an array of dictionaries, where each dictionary represents an entry of localization data.
	 */
	GetEntries(): unknown;
	/**
	 * Returns a translation based on the specified language and key.
	 * @deprecated Deprecated.
	 */
	GetString(targetLocaleId?: string, key?: string): string;
	/**
	 * Returns a `Translator` for entries in this LocalizationTable, in the specified locale.
	 */
	GetTranslator(localeId?: string): Instance;
	/**
	 * Removes an entry from the LocalizationTable, using the specified `key`, `source`, and `context` to narrow down the specific entry to be removed.
	 */
	RemoveEntry(key?: string, source?: string, context?: string): undefined;
	/**
	 * Removes a single language translation from the LocalizationTable, using the provided `key`, `source`, `context`, and `localeId` to narrow down the specific entry to be removed.
	 */
	RemoveEntryValue(key?: string, source?: string, context?: string, localeId?: string): undefined;
	/**
	 * Deprecated in favor of `LocalizationTable:RemoveEntry()`.
	 * @deprecated Deprecated.
	 */
	RemoveKey(key?: string): undefined;
	/**
	 * Removes all translations from the LocalizationTable with the specified localeId.
	 */
	RemoveTargetLocale(localeId?: string): undefined;
	/**
	 * Sets the contents of the LocalizationTable, via the legacy JSON format.
	 * @deprecated Deprecated.
	 */
	SetContents(contents?: string): undefined;
	/** Sets the contents of the LocalizationTable. */
	SetEntries(entries?: unknown): undefined;
	/** @deprecated Deprecated. */
	SetEntry(key?: string, targetLocaleId?: string, text?: string): undefined;
	/**
	 * Sets the **Context** field of a LocalizationTable entry to `newContext`, using the specified `key`, `source`, and `context` to narrow down the entry that will have this change applied.
	 */
	SetEntryContext(key?: string, source?: string, context?: string, newContext?: string): undefined;
	/**
	 * Sets the **Example** field of a LocalizationTable entry to `example`, using the specified `key`, `source`, and `context` to narrow down the entry that will have this change applied.
	 */
	SetEntryExample(key?: string, source?: string, context?: string, example?: string): undefined;
	/**
	 * Sets the **Key** field of a LocalizationTable entry to `newKey`, using the specified `key`, `source`, and `context` to narrow down the entry that will have this change applied.
	 */
	SetEntryKey(key?: string, source?: string, context?: string, newKey?: string): undefined;
	/**
	 * Sets the **Source** field of a LocalizationTable entry to `newSource`, using the specified `key`, `source`, and `context` to narrow down the entry that will have this change applied.
	 */
	SetEntrySource(key?: string, source?: string, context?: string, newSource?: string): undefined;
	/**
	 * Sets the text of the specified localeId in a LocalizationTable entry, using the specified `key`, `source`, and `context` to narrow down the entry that will have this change applied.
	 */
	SetEntryValue(key?: string, source?: string, context?: string, localeId?: string, text?: string): undefined;
}

interface CloudLocalizationTable extends LocalizationTable {
}

interface LodDataEntity extends Instance {
}

interface LodDataService extends Instance {
}

interface LogReporterService extends Instance {
}

/** A service that allows you to read outputted text. */
interface LogService extends Instance {
	/** Clears the Roblox Studio output window. */
	ClearOutput(): undefined;
	/**
	 * Returns a table of tables, each with the message string, message type, and timestamp of a message that the client displays in the output window.
	 */
	GetLogHistory(): unknown;
	/** Fires when the client outputs text. */
	readonly MessageOut: RBXScriptSignal<(message: string, messageType: Enum.MessageType) => void>;
}

/** An internal service whose functionality is not available to developers. */
interface LoginService extends Instance {
}

interface LuaSettings extends Instance {
}

/** The base class for all objects which contain Luau code. */
interface LuaSourceContainer extends Instance {
}

/** The base class for all script objects which run automatically. */
interface BaseScript extends LuaSourceContainer {
	/** Determines whether a `BaseScript` will run or not. */
	Disabled: boolean;
	/** Determines whether a `BaseScript` will run or not. */
	Enabled: boolean;
	/**
	 * The content ID of an uploaded script. When set binds the uploaded code to the script's `Script.Source`.
	 * @deprecated Deprecated.
	 */
	LinkedSource: ContentId;
	/** Determines the context under which the script will run. */
	RunContext: Enum.RunContext;
}

interface CoreScript extends BaseScript {
}

/** An object that contains and runs Luau code on the server. */
interface Script extends BaseScript {
	/** The code to be executed. */
	Source: string;
}

/**
 * An object that contains and runs Luau code on the client (player's device) instead of the server.
 */
interface LocalScript extends Script {
}

/**
 * A script type that runs once when `Global.LuaGlobals.require()` is called with it. Returns exactly one value, usually a table of functions, to used by other scripts. Useful for compartmentalizing code.
 */
interface ModuleScript extends LuaSourceContainer {
	/**
	 * Used to store a URL that points to an online script source. Binds the online code to the script's `Script.Source`.
	 * @deprecated Deprecated.
	 */
	LinkedSource: ContentId;
	/** The code to be executed. */
	Source: string;
}

/**
 * An internal service, which is responsible for retrieving HTTP data from websites. Used by a range of services, including `MarketplaceService`, `InsertService` and `HttpService`. Its functions cannot be accessed by developers.
 */
interface LuaWebService extends Instance {
}

interface LuauScriptAnalyzerService extends Instance {
}

interface MLModelDeliveryService extends Instance {
}

interface MLService extends Instance {
	CreateSessionAsync(assetId?: string): MLSession;
}

interface MakeupDescription extends Instance {
	AssetId: number;
	Instance: Instance;
	MakeupType: Enum.MakeupType;
	Order: number;
	GetAppliedInstance(): Instance;
}

/** Represents a list of strings markers in chronological order. */
interface MarkerCurve extends Instance {
	/** Returns the number of markers in the MarkerCurve. */
	Length: number;
	/** Returns the time and string value of the marker at the provided index. */
	GetMarkerAtIndex(index?: number): unknown;
	/** Returns the time and string value of all markers in the MarkerCurve. */
	GetMarkers(): unknown;
	/** Inserts a marker with the provided string value at the provided time. */
	InsertMarkerAtTime(time?: number, marker?: string): unknown;
	/** Remove several markers in the MarkerCurve starting at the provided index. */
	RemoveMarkerAtIndex(startingIndex?: number, count?: number): number;
}

/** The service responsible for in-experience transactions. */
interface MarketplaceService extends Instance {
	/**
	 * Prompts a user to purchase multiple avatar items with the given `assetId` or `bundleId`.
	 */
	PromptBulkPurchase(player?: Player, lineItems?: unknown, options?: unknown): undefined;
	/** Prompts a user to purchase a bundle with the given `bundleId`. */
	PromptBundlePurchase(player?: Instance, bundleId?: number): undefined;
	/** Prompts a user to cancel a subscription for the given `subscriptionId`. */
	PromptCancelSubscription(user?: Player, subscriptionId?: string): undefined;
	/** Prompts a user to purchase a pass with the given `gamePassId`. */
	PromptGamePassPurchase(player?: Instance, gamePassId?: number): undefined;
	/** Prompts a user to purchase Roblox Premium. */
	PromptPremiumPurchase(player?: Instance): undefined;
	/** Prompts a user to purchase a developer product with the given `productId`. */
	PromptProductPurchase(player?: Instance, productId?: number, equipIfPurchased?: boolean, currencyType?: Enum.CurrencyType): undefined;
	/**
	 * Prompts a user to purchase an item with the given `assetId`. Does not work for USD Creator Store purchases.
	 */
	PromptPurchase(player?: Instance, assetId?: number, equipIfPurchased?: boolean, currencyType?: Enum.CurrencyType): undefined;
	/** Prompts a user to purchase a subscription for the given `subscriptionId`. */
	PromptSubscriptionPurchase(user?: Player, subscriptionId?: string): undefined;
	/**
	 * Returns a `Pages` object which contains information for all of the current experience's developer products.
	 */
	GetDeveloperProductsAsync(): Instance;
	/**
	 * Returns the product information of an asset using its asset ID.
	 * @deprecated Deprecated.
	 */
	GetProductInfo(assetId?: number, infoType?: Enum.InfoType): unknown;
	/** Returns the product information of an asset using its asset ID. */
	GetProductInfoAsync(assetId?: number, infoType?: Enum.InfoType): unknown;
	/**
	 * Returns the product information of a subscription for the given `subscriptionId`.
	 */
	GetSubscriptionProductInfoAsync(subscriptionId?: string): unknown;
	/**
	 * Returns a table that contains the details of the user's subscription for a given `subscriptionId`.
	 */
	GetUserSubscriptionDetailsAsync(user?: Player, subscriptionId?: string): unknown;
	/**
	 * Returns an `Library.table|Array` that contains up to one year of the user's subscription payment history for the given `subscriptionId`.
	 */
	GetUserSubscriptionPaymentHistoryAsync(user?: Player, subscriptionId?: string): unknown;
	/**
	 * Returns a `Library.table` that contains the subscription status of the user for the given `subscriptionId`.
	 */
	GetUserSubscriptionStatusAsync(user?: Player, subscriptionId?: string): unknown;
	/**
	 * Returns the regionalized price level of a user, representing the recommended price for an item in their regional market.
	 */
	GetUsersPriceLevelsAsync(userIds?: unknown): unknown;
	/**
	 * Returns whether the given user has the given asset.
	 * @deprecated Deprecated.
	 */
	PlayerOwnsAsset(player?: Instance, assetId?: number): boolean;
	/** Returns whether the given user has the given asset. */
	PlayerOwnsAssetAsync(player?: Instance, assetId?: number): boolean;
	/**
	 * Returns whether the given player owns the given bundle.
	 * @deprecated Deprecated.
	 */
	PlayerOwnsBundle(player?: Player, bundleId?: number): boolean;
	/** Returns whether the given player owns the given bundle. */
	PlayerOwnsBundleAsync(player?: Player, bundleId?: number): boolean;
	/**
	 * Takes a list of product IDs and returns a personalized ordered list of those products.
	 */
	RankProductsAsync(productIdentifiers?: unknown): unknown;
	/**
	 * - Takes an array of `Enum.InfoType` and returns up to 50 items   representing the products a user is most likely to engage with and   purchase.
	 */
	RecommendTopProductsAsync(infoTypes?: unknown): unknown;
	/**
	 * Returns true if the player with the given `UserId` owns the pass with the given `gamePassId`.
	 */
	UserOwnsGamePassAsync(userId?: number, gamePassId?: number): boolean;
	/** Fires when a purchase prompt for bulk avatar items is closed. */
	readonly PromptBulkPurchaseFinished: RBXScriptSignal<(player: Instance, status: Enum.MarketplaceBulkPurchasePromptStatus, results: unknown) => void>;
	readonly PromptBundlePurchaseFinished: RBXScriptSignal<(player: Instance, bundleId: number, wasPurchased: boolean) => void>;
	/** Fires when a purchase prompt for a pass is closed. */
	readonly PromptGamePassPurchaseFinished: RBXScriptSignal<(player: Instance, gamePassId: number, wasPurchased: boolean) => void>;
	/** Fires when a purchase prompt for Roblox Premium is closed. */
	readonly PromptPremiumPurchaseFinished: RBXScriptSignal<() => void>;
	/**
	 * Fires when a purchase prompt for a developer product is closed. Do not use this event to process purchases.
	 */
	readonly PromptProductPurchaseFinished: RBXScriptSignal<(userId: number, productId: number, isPurchased: boolean) => void>;
	/**
	 * Fires when a purchase prompt for an affiliate gear sale or other asset is closed. Does **not** fire for developer product or pass prompts.
	 */
	readonly PromptPurchaseFinished: RBXScriptSignal<(player: Instance, assetId: number, isPurchased: boolean) => void>;
	/** Fires when a purchase prompt for a subscription is closed. */
	readonly PromptSubscriptionPurchaseFinished: RBXScriptSignal<(user: Player, subscriptionId: string, didTryPurchasing: boolean) => void>;
	/** A callback to process receipts of developer product purchases. */
	ProcessReceipt?: (receiptInfo?: unknown) => Enum.ProductPurchaseDecision;
}

/** The service responsible for managing custom matchmaking data. */
interface MatchmakingService extends Instance {
	/** Retrieves the value of a specific server attribute. */
	GetServerAttribute(name?: string): unknown;
	/** Initiates the server attribute schema and its values to test in Studio. */
	InitializeServerAttributesForStudio(serverAttributes?: unknown): unknown;
	/** Assigns a value to a specific server attribute. */
	SetServerAttribute(name?: string, value?: unknown): unknown;
}

interface MaterialGenerationService extends Instance {
}

/** The game service responsible for managing materials. */
interface MaterialService extends Instance {
	/** Get the override `MaterialVariant` name of specified Material type. */
	GetBaseMaterialOverride(material?: Enum.Material): string;
	/** Get the effective MaterialVariant reference given a name and Material. */
	GetMaterialVariant(material?: Enum.Material, name?: string): MaterialVariant;
	/** Set a `MaterialVariant` name that overrides a built-in material. */
	SetBaseMaterialOverride(material?: Enum.Material, name?: string): undefined;
}

/** Represent a variant of a Material. */
interface MaterialVariant extends Instance {
	/** Determines how the alpha channel of the `MaterialVariant.ColorMap` is used. */
	AlphaMode: Enum.AlphaMode;
	/** Category Material this variant belongs to. */
	BaseMaterial: Enum.Material;
	/** Determines the color of the surface. */
	ColorMap: ContentId;
	/** Determines the color of the surface. Only supports asset URIs as textures. */
	ColorMapContent: Content;
	CustomPhysicalProperties: PhysicalProperties;
	/** Determines the emissivity across the surface. */
	EmissiveMaskContent: Content;
	/** Determines the strength of emissive contribution. */
	EmissiveStrength: number;
	/** Determines the tinting color for emissive contribution. */
	EmissiveTint: Color3;
	/** Determines texture tiling method. */
	MaterialPattern: Enum.MaterialPattern;
	/** Determines which parts of the surface are metal and are non-metal. */
	MetalnessMap: ContentId;
	/**
	 * Determines which parts of the surface are metal and are non-metal. Only supports asset URIs as textures.
	 */
	MetalnessMapContent: Content;
	/**
	 * Modifies the lighting of the surface by adding bumps, dents, cracks, and curves without adding more polygons.
	 */
	NormalMap: ContentId;
	/**
	 * Modifies the lighting of the surface by adding bumps, dents, cracks, and curves without adding more polygons. Only supports asset URIs as textures.
	 */
	NormalMapContent: Content;
	/** Determines the apparent roughness across the surface. */
	RoughnessMap: ContentId;
	/**
	 * Determines the apparent roughness across the surface. Only supports asset URIs as textures.
	 */
	RoughnessMapContent: Content;
	/** Determines the scale of textures. */
	StudsPerTile: number;
}

interface MemStorageConnection extends Instance {
	Disconnect(): undefined;
}

interface MemStorageService extends Instance {
}

/** Provides access to a hash map within `MemoryStoreService`. */
interface MemoryStoreHashMap extends Instance {
	/** Retrieves the value of a key in the hash map. */
	GetAsync(key?: string): unknown;
	/**
	 * Returns a `MemoryStoreHashMapPages` object for enumerating through items in the hash map.
	 */
	ListItemsAsync(count?: number): MemoryStoreHashMapPages;
	/** Removes an item from the hash map. */
	RemoveAsync(key?: string): undefined;
	/** Sets the value of a key in the hash map. */
	SetAsync(key?: string, value?: unknown, expiration?: number): boolean;
	/**
	 * Retrieves the value of a key from a hash map and lets you update it to a new value.
	 */
	UpdateAsync(key?: string, transformFunction?: Function, expiration?: number): unknown;
}

/** Provides access to a queue within MemoryStore. */
interface MemoryStoreQueue extends Instance {
	/** Adds an item to the queue. */
	AddAsync(value?: unknown, expiration?: number, priority?: number): undefined;
	/** Gets the size of the queue. */
	GetSizeAsync(excludeInvisible?: boolean): number;
	/** Reads one or more items from the queue. */
	ReadAsync(count?: number, allOrNothing?: boolean, waitTimeout?: number): unknown;
	/** Removes an item or items previously read from the queue. */
	RemoveAsync(id?: string): undefined;
}

/** Exposes methods to access specific primitives within MemoryStore. */
interface MemoryStoreService extends Instance {
	/** Returns a `MemoryStoreHashMap` instance for the provided name. */
	GetHashMap(name?: string): MemoryStoreHashMap;
	/** Returns a `MemoryStoreQueue` instance for the provided name. */
	GetQueue(name?: string, invisibilityTimeout?: number): MemoryStoreQueue;
	/** Returns a `MemoryStoreSortedMap` instance for the provided name. */
	GetSortedMap(name?: string): MemoryStoreSortedMap;
}

/** Provides access to a sorted map within `MemoryStoreService`. */
interface MemoryStoreSortedMap extends Instance {
	/** Retrieves the value and sort key of a key in the sorted map. */
	GetAsync(key?: string): unknown;
	/** Retrieves items within a sorted range of keys and sort keys. */
	GetRangeAsync(direction?: Enum.SortDirection, count?: number, exclusiveLowerBound?: unknown, exclusiveUpperBound?: unknown): unknown;
	/** Gets the size of the sorted map. */
	GetSizeAsync(): number;
	/** Removes the provided key from the sorted map. */
	RemoveAsync(key?: string): undefined;
	/** Sets the value of a key. */
	SetAsync(key?: string, value?: unknown, expiration?: number, sortKey?: unknown): boolean;
	/**
	 * Retrieves the value and sort key of a key from a sorted map and updates it with a new value and sort key.
	 */
	UpdateAsync(key?: string, transformFunction?: Function, expiration?: number): unknown;
}

/**
 * Fills the entire screen with a semi-transparent grey background, with centered text in the middle of the screen.
 * @deprecated This class is deprecated.
 */
interface Message extends Instance {
	/** Sets the text of a `Message` or `Hint`. */
	Text: string;
}

/**
 * A Hint is an object that creates a small black bar at the very top of the screen with text.
 * @deprecated This class is deprecated.
 */
interface Hint extends Message {
}

interface MessageBusConnection extends Instance {
}

interface MessageBusService extends Instance {
}

/** Allows servers of the same experience to communicate with each other. */
interface MessagingService extends Instance {
	/** Invokes the supplied callback whenever a message is pushed to the topic. */
	PublishAsync(topic?: string, message?: unknown): undefined;
	/** Begins listening to the given topic. */
	SubscribeAsync(topic?: string, callback?: Function): RBXScriptConnection;
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
	BindReviewableContentEventProcessor(priority?: number, callback?: Function): RBXScriptConnection;
	CreateReviewableContentKey(content?: Content): string;
	CreateReviewableContentAsync(config?: unknown): string;
	InternalRequestReviewableContentReviewAsync(config?: unknown): undefined;
}

/** Legacy object that contains members useful for pointer input. */
interface Mouse extends Instance {
	/** The `CFrame` of the mouse's position in 3D space. */
	Hit: CFrame;
	/** The content ID of the image used as the `Mouse` icon. */
	Icon: ContentId;
	/** The content of the image used as the `Mouse` icon. Only supports asset URIs. */
	IconContent: Content;
	/**
	 * A `CFrame` positioned at the `Workspace.CurrentCamera` and oriented toward the mouse's 3D position.
	 */
	Origin: CFrame;
	/** The object in 3D space the `mouse` is pointing to. */
	Target: BasePart;
	/**
	 * Determines an object (and its descendants) to be ignored when determining `Mouse.Hit` and `Mouse.Target`.
	 */
	TargetFilter: Instance;
	/**
	 * Indicates the `Enum.NormalId` of the `BasePart` surface at which the mouse is pointing.
	 */
	TargetSurface: Enum.NormalId;
	/**
	 * A `Ray` directed towards the mouse's world position, originating from the `Workspace.CurrentCamera` world position.
	 */
	UnitRay: Ray;
	/** Describes the width of the game window in pixels. */
	ViewSizeX: number;
	/** Describes the height of the game window in pixels. */
	ViewSizeY: number;
	/** Describes the X (horizontal) component of the mouse's position on the screen. */
	X: number;
	/** Describes the Y (vertical) component of the mouse's screen position. */
	Y: number;
	/** @deprecated Deprecated. */
	target: BasePart;
	/** Fires when the left mouse button is pressed. */
	readonly Button1Down: RBXScriptSignal<() => void>;
	/** Fires when the left mouse button is released. */
	readonly Button1Up: RBXScriptSignal<() => void>;
	/** Fires when the right mouse button is pressed. */
	readonly Button2Down: RBXScriptSignal<() => void>;
	/** Fired when the right mouse button is released. */
	readonly Button2Up: RBXScriptSignal<() => void>;
	/**
	 * Fired during every heartbeat that the mouse isn't being passed to another mouse event.
	 */
	readonly Idle: RBXScriptSignal<() => void>;
	/**
	 * Fires when a Key is pressed.
	 * @deprecated Deprecated.
	 */
	readonly KeyDown: RBXScriptSignal<(key: string) => void>;
	/**
	 * Fires when a Key is released.
	 * @deprecated Deprecated.
	 */
	readonly KeyUp: RBXScriptSignal<(key: string) => void>;
	/** Fired when the mouse is moved. */
	readonly Move: RBXScriptSignal<() => void>;
	/** Fires when the mouse wheel is scrolled backwards. */
	readonly WheelBackward: RBXScriptSignal<() => void>;
	/** Fires when the mouse wheel is scrolled forwards. */
	readonly WheelForward: RBXScriptSignal<() => void>;
	/** @deprecated Deprecated. */
	readonly keyDown: RBXScriptSignal<(key: string) => void>;
}

/**
 * The PlayerMouse behaves identically to the `Mouse` object that is obtained using `Tool.Equipped`. Both PlayerMouse and `Mouse` are legacy APIs, superseded by `UserInputService`.
 */
interface PlayerMouse extends Mouse {
}

/**
 * The PluginMouse object gives `Plugins` access to the mouse. It works like the `Mouse` object and can be obtained using the plugin `Plugin:GetMouse()` method.
 */
interface PluginMouse extends Mouse {
	/** Fired when Instances are being selected while the mouse is dragging. */
	readonly DragEnter: RBXScriptSignal<(instances: Instance[]) => void>;
}

interface MouseService extends Instance {
}

interface MultipleDocumentInterfaceInstance extends Instance {
}

/**
 * The NetworkMarker is used to tell the client when the server has finished loading the world for the client.
 */
interface NetworkMarker extends Instance {
	/** Fired when the server has finished replicating the world to the client. */
	readonly Received: RBXScriptSignal<() => void>;
}

/** The `NetworkPeer` object is the most basic class of the network objects. */
interface NetworkPeer extends Instance {
	/** Sets the maximum outgoing bandwidth that Roblox can use. */
	SetOutgoingKBPSLimit(limit?: number): undefined;
}

interface NetworkClient extends NetworkPeer {
	/**
	 * Fired when the client successfully connects to a server. Returns a string showing the server's IP and port, and the client's `ClientReplicator`.
	 */
	readonly ConnectionAccepted: RBXScriptSignal<(peer: string, replicator: Instance) => void>;
	/** Fired if the client fails to connect to the server. */
	readonly ConnectionFailed: RBXScriptSignal<(peer: string, code: number) => void>;
}

interface NetworkServer extends NetworkPeer {
	EncryptStringForPlayerId(toEncrypt?: string, playerId?: number): string;
}

/**
 * An object which handles the replication of other objects either from the server to the client, or from the client to the server.
 */
interface NetworkReplicator extends Instance {
	/** Returns the player that is connected to the NetworkReplicator. */
	GetPlayer(): Instance;
}

interface ClientReplicator extends NetworkReplicator {
}

interface ServerReplicator extends NetworkReplicator {
}

/** Settings related to networked engine behaviors. */
interface NetworkSettings extends Instance {
	readonly HttpProxyEnabled: boolean;
	readonly HttpProxyURL: string;
	/** Simulates additional network latency in the network receiving path. */
	IncomingReplicationLag: number;
	/** Prints diagnostic information about data sent on connect. */
	PrintJoinSizeBreakdown: boolean;
	/**
	 * Whether debug messages will be printed to the output pertaining to physics replication errors.
	 */
	PrintPhysicsErrors: boolean;
	/**
	 * Whether debug information is printed to the output regarding the replication of instances when `Workspace.StreamingEnabled` is set to `true`.
	 */
	PrintStreamInstanceQuota: boolean;
	/** Special facility to help catch bugs related to how your experience loads. */
	RandomizeJoinInstanceOrder: boolean;
	/**
	 * Whether regions of space that are being streamed to the client will be outlined in red.
	 */
	RenderStreamedRegions: boolean;
	/**
	 * Whether a label will be shown above each player character's head, showing the current animation being played.
	 */
	ShowActiveAnimationAsset: boolean;
}

/** An instance used to prevent collisions between two specific parts. */
interface NoCollisionConstraint extends Instance {
	/** Determines whether the two linked `BaseParts` will collide with each other. */
	Enabled: boolean;
	/** The second `BasePart` that the constraint connects. */
	Part0: BasePart;
	/** The first `BasePart` that the constraint connects. */
	Part1: BasePart;
}

interface Noise extends Instance {
}

/** An internal service which cannot be used by developers. */
interface NotificationService extends Instance {
	readonly Roblox17sConnectionChanged: RBXScriptSignal<(connectionName: string, connectionState: Enum.ConnectionState, namespaceSequenceNumbers: string) => void>;
	readonly Roblox17sEventReceived: RBXScriptSignal<(eventData: unknown) => void>;
}

interface OmniRecommendationsService extends Instance {
}

/** @deprecated This class is deprecated. */
interface OpenCloudApiV1 extends Instance {
	/** @deprecated Deprecated. */
	CreateModel(name?: string): OpenCloudModel;
	/** @deprecated Deprecated. */
	CreateUserNotificationAsync(user?: string, userNotification?: OpenCloudModel): OpenCloudModel;
}

/** @deprecated This class is deprecated. */
interface OpenCloudService extends Instance {
	/** @deprecated Deprecated. */
	GetApiV1(): OpenCloudApiV1;
	/** @deprecated Deprecated. */
	InvokeAsync(version?: string, methodName?: string, arguments?: unknown, headers?: unknown): unknown;
}

interface OperationGraph extends Instance {
}

/** Abstract class for all objects that have a physical location in the world. */
interface PVInstance extends Instance {
	/** Gets the pivot of a `PVInstance`. */
	GetPivot(): CFrame;
	/**
	 * Transforms the `PVInstance` along with all of its descendant `PVInstances` such that the pivot is now located at the specified `CFrame`.
	 */
	PivotTo(targetCFrame?: CFrame): undefined;
}

/** The abstract base class for in-world objects that physically interact. */
interface BasePart extends PVInstance {
	/** Determines whether a part is immovable by physics. */
	Anchored: boolean;
	/** The angular velocity of the part's assembly. */
	AssemblyAngularVelocity: Vector3;
	/** The center of mass of the part's assembly in world space. */
	AssemblyCenterOfMass: Vector3;
	/** The linear velocity of the part's assembly. */
	AssemblyLinearVelocity: Vector3;
	/** The total mass of the part's assembly. */
	AssemblyMass: number;
	/** A reference to the root part of the assembly. */
	AssemblyRootPart: BasePart;
	/**
	 * Determines whether the part will physically interact with audio simulation, similar to `CastShadow` for lighting.
	 */
	AudioCanCollide: boolean;
	/** Determines the type of surface for the back face of a part. */
	BackSurface: Enum.SurfaceType;
	/** Determines the type of surface for the bottom face of a part. */
	BottomSurface: Enum.SurfaceType;
	/** Determines the color of a part. */
	BrickColor: BrickColor;
	/** Determines the position and orientation of the `BasePart` in the world. */
	CFrame: CFrame;
	/** Determines whether a part may collide with other parts. */
	CanCollide: boolean;
	/** Determines whether the part is considered during spatial query operations. */
	CanQuery: boolean;
	/** Determines if `Touched` and `TouchEnded` events fire on the part. */
	CanTouch: boolean;
	/** Determines whether or not a part casts a shadow. */
	CastShadow: boolean;
	/** Describes the world position in which a part's center of mass is located. */
	CenterOfMass: Vector3;
	/** Describes the name of a part's collision group. */
	CollisionGroup: string;
	/**
	 * Describes the automatically set ID number of a part's collision group.
	 * @deprecated Deprecated.
	 */
	CollisionGroupId: number;
	/** Determines the color of a part. */
	Color: Color3;
	/** Indicates the current physical properties of the part. */
	CurrentPhysicalProperties: PhysicalProperties;
	/** Determines several physical properties of a part. */
	CustomPhysicalProperties: PhysicalProperties;
	/** Used to enable or disable aerodynamic forces on parts and assemblies. */
	EnableFluidForces: boolean;
	/** The `CFrame` of the physical extents of the `BasePart`. */
	ExtentsCFrame: CFrame;
	/** The actual physical size of the `BasePart` as regarded by the physics engine. */
	ExtentsSize: Vector3;
	/** Determines the type of surface for the front face of a part. */
	FrontSurface: Enum.SurfaceType;
	/** Determines the type of surface for the left face of a part. */
	LeftSurface: Enum.SurfaceType;
	/** Determines whether a part is selectable in Studio. */
	Locked: boolean;
	/** Describes the mass of the part, the product of its density and volume. */
	Mass: number;
	/**
	 * Determines whether the part contributes to the total mass or inertia of its rigid body.
	 */
	Massless: boolean;
	/** Determines the texture and default physical properties of a part. */
	Material: Enum.Material;
	/** The name of `MaterialVariant`. */
	MaterialVariant: string;
	/** Specifies the offset of the part's pivot from its `CFrame`. */
	PivotOffset: CFrame;
	/** Determines how much a part reflects the skybox. */
	Reflectance: number;
	/** Describes the smallest change in size allowable by the `Resize()` method. */
	ResizeIncrement: number;
	/** Describes the faces on which a part may be resized. */
	ResizeableFaces: Faces;
	/** Determines the type of surface for the right face of a part. */
	RightSurface: Enum.SurfaceType;
	/** The main rule in determining the root part of an assembly. */
	RootPriority: number;
	/** The rotation of the part in degrees for the three axes. */
	Rotation: Vector3;
	/** Determines the dimensions of a part (length, width, height). */
	Size: Vector3;
	/**
	 * The ratio of the part's density to the density of water determined by the `BasePart.Material`.
	 * @deprecated Deprecated.
	 */
	SpecificGravity: number;
	/** Determines the type of surface for the top face of a part. */
	TopSurface: Enum.SurfaceType;
	/** Determines how much a part can be seen through (the inverse of part opacity). */
	Transparency: number;
	/** @deprecated Deprecated. */
	brickColor: BrickColor;
	AngularAccelerationToTorque(angAcceleration?: Vector3, angVelocity?: Vector3): Vector3;
	/** Apply an angular impulse to the assembly. */
	ApplyAngularImpulse(impulse?: Vector3): undefined;
	/** Apply an impulse to the assembly at the assembly's `center of mass`. */
	ApplyImpulse(impulse?: Vector3): undefined;
	/** Apply an impulse to the assembly at specified position. */
	ApplyImpulseAtPosition(impulse?: Vector3, position?: Vector3): undefined;
	/**
	 * Breaks any surface connection with any adjacent part, including `Weld` and other `JointInstance`.
	 * @deprecated Deprecated.
	 */
	BreakJoints(): undefined;
	/** Returns whether the parts can collide with each other. */
	CanCollideWith(part?: BasePart): boolean;
	/** Checks whether you can set a part's network ownership. */
	CanSetNetworkOwnership(): unknown;
	GetClosestPointOnSurface(position?: Vector3): Vector3;
	/** Returns a table of parts connected to the object by any kind of rigid joint. */
	GetConnectedParts(recursive?: boolean): Instance[];
	/** Return all Joints or Constraints that is connected to this Part. */
	GetJoints(): Instance[];
	/** Returns the value of the `Mass` property. */
	GetMass(): number;
	/**
	 * Returns the current player who is the network owner of this part, or `nil` in case of the server.
	 */
	GetNetworkOwner(): Instance;
	/**
	 * Returns true if the game engine automatically decides the network owner for this part.
	 */
	GetNetworkOwnershipAuto(): boolean;
	GetNoCollisionConstraints(): Instance[];
	/**
	 * OBSOLETE. Returns a CFrame describing where the part is being rendered at.
	 * @deprecated Deprecated.
	 */
	GetRenderCFrame(): CFrame;
	/**
	 * Returns the base part of an assembly of parts.
	 * @deprecated Deprecated.
	 */
	GetRootPart(): Instance;
	/**
	 * Returns a table of all `BasePart.CanCollide` true parts that intersect with this part.
	 */
	GetTouchingParts(): Instance[];
	/**
	 * Returns the linear velocity of the part's assembly at the given position relative to this part.
	 */
	GetVelocityAtPosition(position?: Vector3): Vector3;
	/**
	 * Returns true if the object is connected to a part that will hold it in place (eg an `Anchored` part), otherwise returns false.
	 */
	IsGrounded(): boolean;
	/**
	 * Creates a joint on any side of the object that has a surface ID that can make a joint.
	 * @deprecated Deprecated.
	 */
	MakeJoints(): undefined;
	/** Changes the size of an object just like using the Studio resize tool. */
	Resize(normalId?: Enum.NormalId, deltaAmount?: number): boolean;
	/** Sets the given player as network owner for this and all connected parts. */
	SetNetworkOwner(playerInstance?: Player): undefined;
	/**
	 * Lets the game engine dynamically decide who will handle the part's physics (one of the clients or the server).
	 */
	SetNetworkOwnershipAuto(): undefined;
	TorqueToAngularAcceleration(torque?: Vector3, angVelocity?: Vector3): Vector3;
	/** @deprecated Deprecated. */
	breakJoints(): undefined;
	/** @deprecated Deprecated. */
	getMass(): number;
	/** @deprecated Deprecated. */
	makeJoints(): undefined;
	/** @deprecated Deprecated. */
	resize(normalId?: Enum.NormalId, deltaAmount?: number): boolean;
	/**
	 * Creates a new `IntersectOperation` from the overlapping geometry of the part and the other parts in the given array.
	 */
	IntersectAsync(parts?: Instance[], collisionfidelity?: Enum.CollisionFidelity, renderFidelity?: Enum.RenderFidelity): Instance;
	/**
	 * Creates a new `UnionOperation` from the part, minus the geometry occupied by the parts in the given array.
	 */
	SubtractAsync(parts?: Instance[], collisionfidelity?: Enum.CollisionFidelity, renderFidelity?: Enum.RenderFidelity): Instance;
	/**
	 * Creates a new `UnionOperation` from the part, plus the geometry occupied by the parts in the given array.
	 */
	UnionAsync(parts?: Instance[], collisionfidelity?: Enum.CollisionFidelity, renderFidelity?: Enum.RenderFidelity): Instance;
	/** @deprecated Deprecated. */
	readonly LocalSimulationTouched: RBXScriptSignal<(part: BasePart) => void>;
	/** @deprecated Deprecated. */
	readonly OutfitChanged: RBXScriptSignal<() => void>;
	/** @deprecated Deprecated. */
	readonly StoppedTouching: RBXScriptSignal<(otherPart: BasePart) => void>;
	/** Fires when a part stops touching another part as a result of physical movement. */
	readonly TouchEnded: RBXScriptSignal<(otherPart: BasePart) => void>;
	/** Fires when a part touches another part as a result of physical movement. */
	readonly Touched: RBXScriptSignal<(otherPart: BasePart) => void>;
}

interface CornerWedgePart extends BasePart {
}

/**
 * The FormFactorPart class is an abstract class. It inherits from the BasePart class and adds the FormFactor property to classes that inherit from it.
 */
interface FormFactorPart extends BasePart {
	/** @deprecated Deprecated. */
	FormFactor: Enum.FormFactor;
}

/** A common type of `BasePart` that comes in different primitive shapes. */
interface Part extends FormFactorPart {
	/** Sets the overall shape of the object. */
	Shape: Enum.PartType;
}

/**
 * The FlagStand object helps you make 'capture the flag' style games.
 * @deprecated This class is deprecated.
 */
interface FlagStand extends Part {
	/**
	 * The Team that owns the `FlagStand`. Corresponds with the TeamColors in the `Teams` service.
	 */
	TeamColor: BrickColor;
	/**
	 * Fires when a player bearing an opposing flag, and having the same `Player.TeamColor` as the stand, touches the `FlagStand`.
	 */
	readonly FlagCaptured: RBXScriptSignal<(player: Instance) => void>;
}

/**
 * Historically a form of `Seat` that wouldn't place the player in a sitting pose. This object is no longer create-able and cannot be used by developers.
 */
interface Platform extends Part {
}

/**
 * A type of `BasePart` that characters can 'sit' in. When a character touches an enabled Seat object, it will be attached to the part by a `Weld` and the default character scripts will play a sitting animation.
 */
interface Seat extends Part {
	/**
	 * Whether or not the seat is usable. If set to true, the seat will act as a normal part.
	 */
	Disabled: boolean;
	/** The humanoid that is sitting in the seat. */
	Occupant: Humanoid;
	/** Forces the character with the specified `Humanoid` to sit in the Seat. */
	Sit(humanoid?: Instance): undefined;
}

/**
 * A SkateboardPlatform can be used to create a skateboard. When characters get on a skateboard, they are stuck to it until they press the escape key. Until then, the character uses skateboard animations and travels faster than a walking character.
 * @deprecated This class is deprecated.
 */
interface SkateboardPlatform extends Part {
	/** The SkateboardPlatform's active SkateboardController. */
	Controller: SkateboardController;
	/** The `Humanoid` that is controlling the SkateboardPlatform. */
	ControllingHumanoid: Humanoid;
	/**
	 * The direction of movement, tied to the keys A and D. Must be 1 (right), 0 (straight), or -1 (left). Will refresh back to 0 unless constantly set.
	 */
	Steer: number;
	/** If true, wheels won't roll without user input. */
	StickyWheels: boolean;
	/**
	 * The direction of movement, tied to the keys W and S. Must be an integer 1 (forward), 0 (null), or -1 (reverse). Will refresh back to 0 unless constantly set.
	 */
	Throttle: number;
	/** Adds ''impulseWorld'' to the SkateboardPlatform's `BasePart.Velocity`. */
	ApplySpecificImpulse(impulseWorld?: Vector3): undefined;
	/** Fired when the skateboard is equipped. */
	readonly Equipped: RBXScriptSignal<(humanoid: Instance, skateboardController: Instance) => void>;
	/**
	 * Fired when the SkateboardPlatform's `SkateboardPlatform.ControllingHumanoid` changes the force being used on the SkateboardPlatform.
	 */
	readonly MoveStateChanged: RBXScriptSignal<(newState: Enum.MoveState, oldState: Enum.MoveState) => void>;
	/** Fired whenever the skateboard is unequipped. */
	readonly Unequipped: RBXScriptSignal<(humanoid: Instance) => void>;
	/** @deprecated Deprecated. */
	readonly equipped: RBXScriptSignal<(humanoid: Instance, skateboardController: Instance) => void>;
	/** @deprecated Deprecated. */
	readonly unequipped: RBXScriptSignal<(humanoid: Instance) => void>;
}

/**
 * `SpawnLocations`, or "spawns" determine where a `Player` respawns when they die. They can be configured to allow only certain players to use each spawn, using `Teams`. They also control how `ForceFields` are set up for newly-spawned players.
 */
interface SpawnLocation extends Part {
	/**
	 * Allows a `Player` to join the team by touching the `SpawnLocation`. When set to true, if a `Player` character comes into contact with the `SpawnLocation`, the player's `Player.TeamColor` will be set to `SpawnLocation.TeamColor`.
	 */
	AllowTeamChangeOnTouch: boolean;
	/**
	 * The length of time, in seconds, that a `ForceField` will be applied to a `Player` character spawning at this `SpawnLocation`. If Duration is zero, the `ForceField` is never created, and it will not trigger the `Instance.DescendantAdded` or `Instance.ChildAdded` events.
	 */
	Duration: number;
	/**
	 * Sets whether or not the `SpawnLocation` is enabled. When disabled players cannot spawn at the `SpawnLocation` and the AllowTeamChangeOnTouch functionality is disabled.
	 */
	Enabled: boolean;
	/**
	 * Whether or not a `SpawnLocation` is affiliated with a specific team. This means that any `Player`, of any `Team`, can spawn on it if this property is set to true.
	 */
	Neutral: boolean;
	/**
	 * Sets what team the `SpawnLocation` is affiliated to. If `SpawnLocation.Neutral` property is false, only `Players` with the same `Player.TeamColor` as the spawn's TeamColor will be able to spawn there.
	 */
	TeamColor: BrickColor;
}

/** A type of `BasePart` that has a wedge shape. */
interface WedgePart extends FormFactorPart {
}

/** Terrain lets you to create dynamically morphable environments. */
interface Terrain extends BasePart {
	/**
	 * Returns true if the current game is using the smooth terrain system.
	 * @deprecated Deprecated.
	 */
	IsSmooth: boolean;
	/** Displays the boundaries of the largest possible editable region. */
	MaxExtents: Region3int16;
	/** The tint of the Terrain water. */
	WaterColor: Color3;
	/** Controls how opaque the Terrain's water reflections are. */
	WaterReflectance: number;
	/** The transparency of the Terrain water. */
	WaterTransparency: number;
	/** Sets the maximum height of the Terrain water waves in studs. */
	WaterWaveSize: number;
	/** Sets how many times the Terrain water waves will move up and down per minute. */
	WaterWaveSpeed: number;
	/**
	 * _(OBSOLETE)_ No longer does anything.
	 * @deprecated Deprecated.
	 */
	AutowedgeCell(x?: number, y?: number, z?: number): boolean;
	/**
	 * _(OBSOLETE)_ No longer does anything.
	 * @deprecated Deprecated.
	 */
	AutowedgeCells(region?: Region3int16): undefined;
	/** Returns the world position of the center of the terrain cell (x, y, z). */
	CellCenterToWorld(x?: number, y?: number, z?: number): Vector3;
	/**
	 * Returns the position of the lower-left-forward corner of the grid cell (x, y, z).
	 */
	CellCornerToWorld(x?: number, y?: number, z?: number): Vector3;
	/** Clears the terrain. */
	Clear(): undefined;
	ClearVoxelsAsync_beta(region?: Region3, channelIds?: unknown): undefined;
	/**
	 * Transforms the legacy terrain engine into the new terrain engine.
	 * @deprecated Deprecated.
	 */
	ConvertToSmooth(): undefined;
	/**
	 * Stores a chunk of terrain into a `TerrainRegion` object so it can be loaded back later. Note: `TerrainRegion` data does not replicate between server and client.
	 */
	CopyRegion(region?: Region3int16): TerrainRegion;
	/** Returns the number of non-empty cells in the Terrain. */
	CountCells(): number;
	/** Fills a ball of smooth terrain in a given space. */
	FillBall(center?: Vector3, radius?: number, material?: Enum.Material): undefined;
	/**
	 * Fills a block of smooth terrain with a given location, rotation, size, and material.
	 */
	FillBlock(cframe?: CFrame, size?: Vector3, material?: Enum.Material): undefined;
	/** Fills a cylinder of smooth terrain in a given space. */
	FillCylinder(cframe?: CFrame, height?: number, radius?: number, material?: Enum.Material): undefined;
	/** Fills a `Region3` space with smooth terrain. */
	FillRegion(region?: Region3, resolution?: number, material?: Enum.Material): undefined;
	/**
	 * Fills a wedge-shaped volume of Terrain with the given `Enum.Material` and the area's CFrame and Size.
	 */
	FillWedge(cframe?: CFrame, size?: Vector3, material?: Enum.Material): undefined;
	/**
	 * Returns the closest CellMaterial from the legacy terrain engine that matches the smooth terrain voxel specified.
	 * @deprecated Deprecated.
	 */
	GetCell(x?: number, y?: number, z?: number): unknown;
	/** Returns current terrain material color for specified terrain material. */
	GetMaterialColor(material?: Enum.Material): Color3;
	/**
	 * Returns if the cell is a water cell.
	 * @deprecated Deprecated.
	 */
	GetWaterCell(x?: number, y?: number, z?: number): unknown;
	IterateVoxelsAsync_beta(region?: Region3, resolution?: number, channelIds?: unknown): TerrainIterateOperation;
	ModifyVoxelsAsync_beta(region?: Region3, resolution?: number, channelIds?: unknown): TerrainModifyOperation;
	/**
	 * Applies a chunk of terrain to the Terrain object. Note: `TerrainRegion` data does not replicate between server and client.
	 */
	PasteRegion(region?: TerrainRegion, corner?: Vector3int16, pasteEmptyCells?: boolean): undefined;
	/**
	 * Returns a region of terrain voxel data in table format based on the channel names.
	 */
	ReadVoxelChannels(region?: Region3, resolution?: number, channelIds?: unknown): unknown;
	/** Returns a certain region of smooth terrain in table format. */
	ReadVoxels(region?: Region3, resolution?: number): unknown;
	ReadVoxelsAsync_beta(region?: Region3, resolution?: number, channelIds?: unknown): TerrainReadOperation;
	/** Replaces the terrain of a material within a region with another material. */
	ReplaceMaterial(region?: Region3, resolution?: number, sourceMaterial?: Enum.Material, targetMaterial?: Enum.Material): undefined;
	/**
	 * Sets the occupancy and material of a specific terrain voxel.
	 * @deprecated Deprecated.
	 */
	SetCell(x?: number, y?: number, z?: number, material?: Enum.CellMaterial, block?: Enum.CellBlock, orientation?: Enum.CellOrientation): undefined;
	/**
	 * Sets the occupancy and material of all terrain voxels in a specific region.
	 * @deprecated Deprecated.
	 */
	SetCells(region?: Region3int16, material?: Enum.CellMaterial, block?: Enum.CellBlock, orientation?: Enum.CellOrientation): undefined;
	/** Sets current terrain material color for specified terrain material. */
	SetMaterialColor(material?: Enum.Material, value?: Color3): undefined;
	/**
	 * Sets the specified terrain voxel's material to ''Water'' and sets its occupancy to 1.
	 * @deprecated Deprecated.
	 */
	SetWaterCell(x?: number, y?: number, z?: number, force?: Enum.WaterForce, direction?: Enum.WaterDirection): undefined;
	/** Returns the grid cell location that contains the point **position**. */
	WorldToCell(position?: Vector3): Vector3;
	/**
	 * Returns the grid cell location that contains the point position, preferring empty grid cells when position is on a grid edge.
	 */
	WorldToCellPreferEmpty(position?: Vector3): Vector3;
	/**
	 * Returns the grid cell location that contains the point position, preferring non-empty grid cells when position is on a grid edge.
	 */
	WorldToCellPreferSolid(position?: Vector3): Vector3;
	/** Sets a region of terrain using a dictionary of voxel channel data. */
	WriteVoxelChannels(region?: Region3, resolution?: number, channels?: unknown): undefined;
	/** Sets a certain region of smooth terrain using table format. */
	WriteVoxels(region?: Region3, resolution?: number, materials?: unknown, occupancy?: unknown): undefined;
	WriteVoxelsAsync_beta(region?: Region3, resolution?: number, channelIds?: unknown): TerrainWriteOperation;
}

/**
 * Abstract intermediate class that manages physical geometry properties for PartOperations and MeshParts.
 */
interface TriangleMeshPart extends BasePart {
	/** Determines the level of detail the part's physics will adhere to its mesh. */
	CollisionFidelity: Enum.CollisionFidelity;
	/**
	 * Determines the geometric representation used to compute aerodynamic forces and torques.
	 */
	FluidFidelity: Enum.FluidFidelity;
	MeshSize: Vector3;
}

/** A form of `BasePart` that includes a physically simulated custom mesh. */
interface MeshPart extends TriangleMeshPart {
	/** Determines whether to render both faces of polygons in the mesh. */
	DoubleSided: boolean;
	/**
	 * The mesh that is displayed on the `MeshPart`. Supports [asset URIs](../../../projects/assets/index.md#asset-uris) and `EditableMesh` objects.
	 */
	readonly MeshContent: Content;
	/**
	 * The [asset URIs](../../../projects/assets/index.md#asset-uris) of the mesh that is displayed on the `MeshPart`. Reads and writes to `MeshContent`.
	 */
	readonly MeshId: ContentId;
	/** The level of detail used to render the `MeshPart`. */
	RenderFidelity: Enum.RenderFidelity;
	/**
	 * The texture applied to the `MeshPart`. Supports [asset URIs](../../../projects/assets/index.md#asset-uris) and `EditableImage` objects.
	 */
	TextureContent: Content;
	/** The texture applied to the `MeshPart`. Reads and writes to `TextureContent`. */
	TextureID: ContentId;
	/**
	 * Overwrites the `MeshContent`, `TextureContent`, and collision geometry properties of this `MeshPart` from the given source `meshPart`.
	 */
	ApplyMesh(meshPart?: Instance): undefined;
}

/** An abstract class that all parts based on solid modeling inherit from. */
interface PartOperation extends TriangleMeshPart {
	/** The level of detail used to render the solid modeled part. */
	RenderFidelity: Enum.RenderFidelity;
	/** An angle in degrees which affects the smooth shading of a solid modeled part. */
	SmoothingAngle: number;
	/** The number of polygons in this solid model. */
	TriangleCount: number;
	/**
	 * Sets whether the `PartOperation` can be recolored using inherited color properties.
	 */
	UsePartColor: boolean;
	/**
	 * Substitutes the geometry of this `PartOperation` with the geometry of another `PartOperation`.
	 */
	SubstituteGeometry(source?: Instance): undefined;
}

/** Result of parts that have been intersected into a single solid model. */
interface IntersectOperation extends PartOperation {
}

/** Result of a part that has been negated for use in solid modeling. */
interface NegateOperation extends PartOperation {
}

/** Result of parts that have been joined together into a single solid model. */
interface UnionOperation extends PartOperation {
}

/**
 * Similar to a `Part` but with a different visual `Style` and the important distinction that default characters are able to climb it.
 */
interface TrussPart extends BasePart {
	/** Sets what the truss looks like. */
	Style: Enum.Style;
}

/** A seat object that can be used to control a vehicle. */
interface VehicleSeat extends BasePart {
	/**
	 * Displays how many hinges are detected by the VehicleSeat. Useful for debugging vehicle designs.
	 */
	AreHingesDetected: number;
	/** Toggles whether the `VehicleSeat` is active or not. */
	Disabled: boolean;
	/**
	 * If true, a fancy speed bar will be displayed speed on screen that tells you what speed the Vehicle is moving at.
	 */
	HeadsUpDisplay: boolean;
	/** The maximum speed that can be attained. */
	MaxSpeed: number;
	/** The humanoid that is sitting in the seat. */
	Occupant: Humanoid;
	/**
	 * The direction of movement, tied to the keys A and D. Must be one of 1 (right), 0 (straight), or -1 (left). Will refresh back to 0 unless constantly set.
	 */
	Steer: number;
	/** Functions identically to `VehicleSeat.Steer`, but the value is not an integer. */
	SteerFloat: number;
	/**
	 * The direction of movement, tied to the keys W and S. Must be an integer 1 (forward) 0 (null) or -1 (reverse). Will refresh back to 0 unless constantly set.
	 */
	Throttle: number;
	/**
	 * Functions identically to `VehicleSeat.Throttle`, but the value is not an integer.
	 */
	ThrottleFloat: number;
	/**
	 * How fast the vehicles will be able to attain `VehicleSeat.MaxSpeed`. The greater the number, the faster it will reach the maximum speed.
	 */
	Torque: number;
	/**
	 * The speed at which the vehicle will turn. Higher numbers can cause problems and are not necessarily better.
	 */
	TurnSpeed: number;
	/** Forces the character with the specified `Humanoid` to sit in the VehicleSeat. */
	Sit(humanoid?: Instance): undefined;
}

/** A class which defines a view of the 3D world. */
interface Camera extends PVInstance {
	/**
	 * The `CFrame` of the `Camera`, defining its position and orientation in the 3D world.
	 */
	CFrame: CFrame;
	/** The `Humanoid` or `BasePart` that is the `Camera` subject. */
	CameraSubject: Instance;
	/** Specifies the `Enum.CameraType` to be read by the camera scripts. */
	CameraType: Enum.CameraType;
	/** Sets the angle of the camera's diagonal field of view. */
	DiagonalFieldOfView: number;
	/** Sets the angle of the camera's vertical field of view. */
	FieldOfView: number;
	/**
	 * Determines the FOV value of the `Camera` that's invariant under viewport size changes.
	 */
	FieldOfViewMode: Enum.FieldOfViewMode;
	/** Sets the area in 3D space that is prioritized by Roblox's graphical systems. */
	Focus: CFrame;
	/**
	 * Toggles whether the camera will automatically track the head motion of a player using a VR device.
	 */
	HeadLocked: boolean;
	/** Sets the scale of the user's perspective of the world when using VR. */
	HeadScale: number;
	/** Sets the angle of the camera's field of view along the longest viewport axis. */
	MaxAxisFieldOfView: number;
	/**
	 * Describes the negative **Z** offset, in studs, of the camera's near clipping plane.
	 */
	NearPlaneZ: number;
	/**
	 * Toggles whether to apply tilt and roll from the `CFrame` property while the player is using a VR device.
	 */
	VRTiltAndRollEnabled: boolean;
	/** The dimensions of the device safe area on a Roblox client. */
	ViewportSize: Vector2;
	/** @deprecated Deprecated. */
	focus: CFrame;
	/**
	 * Returns how much the `Camera` needs to be pushed towards its `Focus` in order to make sure there is no obstructions between the `Focus` and `CFrame`.
	 * @deprecated Deprecated.
	 */
	GetLargestCutoffDistance(ignoreList?: Instance[]): number;
	/**
	 * Returns the current 'pan' speed of the `Camera`.
	 * @deprecated Deprecated.
	 */
	GetPanSpeed(): number;
	/**
	 * Returns an array of `BaseParts` that are obscuring the lines of sight between the camera's `CFrame` and the cast points.
	 */
	GetPartsObscuringTarget(castPoints?: unknown, ignoreList?: Instance[]): Instance[];
	/**
	 * Returns the actual `CFrame`where the `Camera` is being rendered, accounting for any roll applied and the impact of VR devices.
	 */
	GetRenderCFrame(): CFrame;
	/**
	 * Returns in radians the current roll, or rotation around the camera's Z-axis, applied to the `Camera` using `SetRoll()`.
	 */
	GetRoll(): number;
	/**
	 * Returns the current tilt speed of the `Camera`.
	 * @deprecated Deprecated.
	 */
	GetTiltSpeed(): number;
	/**
	 * Tweens the `Camera` in a linear fashion towards a new `CFrame` and `Focus` over a given duration.
	 * @deprecated Deprecated.
	 */
	Interpolate(endPos?: CFrame, endFocus?: CFrame, duration?: number): undefined;
	/**
	 * Pans the `Camera` around the `Focus` in 45 degree increments around the **Y** axis.
	 * @deprecated Deprecated.
	 */
	PanUnits(units?: number): undefined;
	/**
	 * Creates a unit `Ray` from a position on the screen (in pixels), at a set depth from the `Camera` orientated in the camera's direction. Accounts for the GUI inset.
	 */
	ScreenPointToRay(x?: number, y?: number, depth?: number): Ray;
	/**
	 * Sets the `Enum.CameraPanMode` to be used by the `Camera` on mobile devices.
	 * @deprecated Deprecated.
	 */
	SetCameraPanMode(mode?: Enum.CameraPanMode): undefined;
	/** Sets the current rotation applied around the camera's Z-axis. */
	SetRoll(rollAngle?: number): undefined;
	/**
	 * Tilts the `Camera` around its `Focus` in 10 degree increments around the camera's **X** axis.
	 * @deprecated Deprecated.
	 */
	TiltUnits(units?: number): boolean;
	/**
	 * Creates a unit `Ray` from a position on the viewport (in pixels), at a given depth from the `Camera`, orientated in the camera's direction. Does not account for the `CoreUISafeInsets` inset.
	 */
	ViewportPointToRay(x?: number, y?: number, depth?: number): Ray;
	/**
	 * Returns the screen location and depth of a `Vector3` `worldPoint` and whether this point is within the bounds of the screen. Accounts for the GUI inset.
	 */
	WorldToScreenPoint(worldPoint?: Vector3): unknown;
	/**
	 * Returns the screen location and depth of a `Vector3` `worldPoint` and whether this point is within the bounds of the screen. Does not account for the GUI inset.
	 */
	WorldToViewportPoint(worldPoint?: Vector3): unknown;
	/**
	 * Adjusts the `CFrame` so that the specified bounding box is fully visible within the camera's viewport.
	 */
	ZoomToExtents(boundingBoxCFrame?: CFrame, boundingBoxSize?: Vector3): undefined;
	/** Fired when the `Camera` has finished interpolating using`Interpolate()`. */
	readonly InterpolationFinished: RBXScriptSignal<() => void>;
}

/**
 * Models are container objects, meaning they group objects together. They are best used to hold collections of `BaseParts` and have a number of functions that extend their functionality.
 */
interface Model extends PVInstance {
	/**
	 * Sets the level of detail on the model for experiences with instance streaming enabled.
	 */
	LevelOfDetail: Enum.ModelLevelOfDetail;
	/**
	 * Controls the model streaming behavior on `Models` when instance streaming is enabled.
	 */
	ModelStreamingMode: Enum.ModelStreamingMode;
	/** The primary part of the `Model`, or `nil` if not explicitly set. */
	PrimaryPart: BasePart;
	/**
	 * Determines where the pivot of a `Model` which does **not** have a set `Model.PrimaryPart` is located.
	 */
	WorldPivot: CFrame;
	/**
	 * Sets this model to be persistent for the specified player. `ModelStreamingMode` must be set to `PersistentPerPlayer` for behavior to be changed as a result of addition.
	 */
	AddPersistentPlayer(playerInstance?: Player): undefined;
	/**
	 * Breaks connections between `BaseParts`, including surface connections with any adjacent parts, `WeldConstraints` and all `Welds` and other `JointInstances`.
	 * @deprecated Deprecated.
	 */
	BreakJoints(): undefined;
	/** Returns a description of a volume that contains all parts of a Model. */
	GetBoundingBox(): unknown;
	/**
	 * Returns the size of the smallest bounding box that contains all of the `BaseParts` in the `Model`, aligned with the `Model.PrimaryPart` if it is set.
	 */
	GetExtentsSize(): Vector3;
	/**
	 * This value historically returned the CFrame of a central position in the model.
	 * @deprecated Deprecated.
	 */
	GetModelCFrame(): CFrame;
	/**
	 * Returns the Vector3 size of the Model.
	 * @deprecated Deprecated.
	 */
	GetModelSize(): Vector3;
	/**
	 * Returns all the `Player` objects that this model object is persistent for. Behavior varies based on whether this method is called from a `Script` or a `LocalScript`.
	 */
	GetPersistentPlayers(): Instance[];
	/**
	 * Returns the `CFrame` of the model's `Model.PrimaryPart`. This function will throw an error if no primary part exists for the `Model`.
	 * @deprecated Deprecated.
	 */
	GetPrimaryPartCFrame(): CFrame;
	/**
	 * Returns the canonical scale of the model, which defaults to 1 for newly created models and will change as it is scaled via `Model:ScaleTo()`.
	 */
	GetScale(): number;
	/**
	 * Goes through all `BaseParts` in the `Model`. If any part's side has a SurfaceType that can make a joint it will create a joint with any adjacent parts.
	 * @deprecated Deprecated.
	 */
	MakeJoints(): undefined;
	/**
	 * Moves the `PrimaryPart` to the given position. If a primary part has not been specified, the root part of the model will be used.
	 */
	MoveTo(position?: Vector3): undefined;
	/**
	 * Makes this model no longer persistent for the specified player. `ModelStreamingMode` must be set to `PersistentPerPlayer` for behavior to be changed as a result of removal.
	 */
	RemovePersistentPlayer(playerInstance?: Player): undefined;
	/**
	 * Resets the rotation of the model's parts to the previously set identity rotation, which is done through the `Model:SetIdentityOrientation()` method.
	 * @deprecated Deprecated.
	 */
	ResetOrientationToIdentity(): undefined;
	/**
	 * Sets the scale factor of the model, adjusting the sizing and location of all descendant Instances such that they have that scale factor relative to their initial sizes and locations when scale factor was 1.
	 */
	ScaleTo(newScaleFactor?: number): undefined;
	/**
	 * Sets the identity rotation of the given model, allowing you to reset the rotation of the entire model later, through the use of the `ResetOrientationToIdentity` method.
	 * @deprecated Deprecated.
	 */
	SetIdentityOrientation(): undefined;
	/**
	 * Sets the `BasePart.CFrame` of the model's `Model.PrimaryPart`. All other parts in the model will also be moved and will maintain their orientation and offset respective to the `Model.PrimaryPart`.
	 * @deprecated Deprecated.
	 */
	SetPrimaryPartCFrame(cframe?: CFrame): undefined;
	/**
	 * Shifts a `Model` by the given `Vector3` offset, preserving the model's orientation. If another `BasePart` or `Terrain` already exists at the new position then the `Model` will overlap said object.
	 */
	TranslateBy(delta?: Vector3): undefined;
	/** @deprecated Deprecated. */
	breakJoints(): undefined;
	/** @deprecated Deprecated. */
	makeJoints(): undefined;
	/** @deprecated Deprecated. */
	move(location?: Vector3): undefined;
	/** @deprecated Deprecated. */
	moveTo(location?: Vector3): undefined;
}

/**
 * An `Actor` is a container for code that can be safely split into its own thread.
 */
interface Actor extends Model {
	/** Binds a Luau callback to a message with the specified topic. */
	BindToMessage(topic?: string, _function?: Function): RBXScriptConnection;
	/** Binds a Luau callback to a message with the specified topic. */
	BindToMessageParallel(topic?: string, _function?: Function): RBXScriptConnection;
	/** Sends a message to an Actor. */
	SendMessage(topic?: string, message?: unknown): undefined;
}

/**
 * BackpackItem is an abstract class for backpack items such as HopperBins and Tools.
 */
interface BackpackItem extends Model {
	/**
	 * The texture icon that is displayed for a tool in the player's backpack. Only supports asset URIs.
	 */
	TextureContent: Content;
	/** The texture icon that is displayed for a tool in the player's backpack. */
	TextureId: ContentId;
}

/** @deprecated This class is deprecated. */
interface HopperBin extends BackpackItem {
	Active: boolean;
	BinType: Enum.BinType;
	readonly Deselected: RBXScriptSignal<() => void>;
	readonly Selected: RBXScriptSignal<(mouse: Instance) => void>;
}

/** An object, such as a weapon, that can be equipped by a `Humanoid`. */
interface Tool extends BackpackItem {
	/** Controls whether the player can drop the tool. */
	CanBeDropped: boolean;
	/** Relates to whether or not the tool can be used. */
	Enabled: boolean;
	/** Stores the tool's "grip" properties as one `CFrame`. */
	Grip: CFrame;
	/**
	 * Controls whether the `Tool` can be activated without executing `Tool:Activate()`.
	 */
	ManualActivationOnly: boolean;
	/** Determines whether a `Tool` functions without a handle. */
	RequiresHandle: boolean;
	/**
	 * Controls the message displayed when the player's mouse hovers over the tool in their backpack.
	 */
	ToolTip: string;
	/** Simulates activation of the `Tool`. */
	Activate(): undefined;
	/** Simulates deactivation of the `Tool`. */
	Deactivate(): undefined;
	/** Fires when the player clicks while the tool is equipped. */
	readonly Activated: RBXScriptSignal<() => void>;
	/**
	 * Fires when the player releases their click while the tool is equipped and activated.
	 */
	readonly Deactivated: RBXScriptSignal<() => void>;
	/** Fires when the tool is equipped. */
	readonly Equipped: RBXScriptSignal<(mouse: Mouse) => void>;
	/** Fires when the tool is unequipped. */
	readonly Unequipped: RBXScriptSignal<() => void>;
}

/**
 * The Flag object helps you make 'capture the flag' style games.
 * @deprecated This class is deprecated.
 */
interface Flag extends Tool {
	/**
	 * The `Team` this flag is for. Corresponds with the TeamColors in the `Teams` service.
	 */
	TeamColor: BrickColor;
}

/**
 * An unfinished object which offers no functionality to developers.
 * @deprecated This class is deprecated.
 */
interface Status extends Model {
}

/** Base class for handling physics simulation and 3D spatial queries. */
interface WorldRoot extends Model {
	/** Returns true if any of the given `BasePart` are touching any other parts. */
	ArePartsTouchingOthers(partList?: Instance[], overlapIgnored?: number): boolean;
	/**
	 * Casts a block shape in a given direction and returns a `RaycastResult` if the shape hits a `BasePart` or `Terrain` cell.
	 */
	Blockcast(cframe?: CFrame, size?: Vector3, direction?: Vector3, params?: RaycastParams): RaycastResult?;
	/** Moves a table of `BaseParts` to a table of `CFrames`. */
	BulkMoveTo(partList?: Instance[], cframeList?: unknown, eventMode?: Enum.BulkMoveMode): undefined;
	/**
	 * Returns the first `BasePart` or `Terrain` cell intersecting with the given `Ray`.
	 * @deprecated Deprecated.
	 */
	FindPartOnRay(ray?: Ray, ignoreDescendantsInstance?: Instance, terrainCellsAreCubes?: boolean, ignoreWater?: boolean): unknown;
	/**
	 * Returns the first `BasePart` or `Terrain` cell intersecting with the given `Ray` that isn't in, nor is a descendant of an object in, the given ignore list.
	 * @deprecated Deprecated.
	 */
	FindPartOnRayWithIgnoreList(ray?: Ray, ignoreDescendantsTable?: Instance[], terrainCellsAreCubes?: boolean, ignoreWater?: boolean): unknown;
	/**
	 * Returns the first `BasePart` or `Terrain` cell intersecting with the given `Ray` that is in, or is a descendant of an object in, the given inclusion list.
	 * @deprecated Deprecated.
	 */
	FindPartOnRayWithWhitelist(ray?: Ray, whitelistDescendantsTable?: Instance[], ignoreWater?: boolean): unknown;
	/**
	 * Returns an array of `BaseParts` in the given `Region3`.
	 * @deprecated Deprecated.
	 */
	FindPartsInRegion3(region?: Region3, ignoreDescendantsInstance?: Instance, maxParts?: number): Instance[];
	/**
	 * Returns an array of `BaseParts` in the given `Region3` that aren't in, or a descendant of an entry in, the given ignore list.
	 * @deprecated Deprecated.
	 */
	FindPartsInRegion3WithIgnoreList(region?: Region3, ignoreDescendantsTable?: Instance[], maxParts?: number): Instance[];
	/**
	 * Returns an array of `BaseParts` in the given `Region3` that are in, or descendant of an entry in, the given inclusion list.
	 * @deprecated Deprecated.
	 */
	FindPartsInRegion3WithWhiteList(region?: Region3, whitelistDescendantsTable?: Instance[], maxParts?: number): Instance[];
	/** Returns an array of parts whose **bounding boxes** overlap a given box. */
	GetPartBoundsInBox(cframe?: CFrame, size?: Vector3, overlapParams?: OverlapParams): Instance[];
	/** Returns an array of parts whose **bounding boxes** overlap a given sphere. */
	GetPartBoundsInRadius(position?: Vector3, radius?: number, overlapParams?: OverlapParams): Instance[];
	/** Returns an array of parts whose occupied space is shared with the given part. */
	GetPartsInPart(part?: BasePart, overlapParams?: OverlapParams): Instance[];
	/**
	 * Moves the specified part to the specified location via inverse kinematics rather than moving it there directly, to ensure any joints, constraints, or collisions that part is participating in remain physically satisfied.
	 */
	IKMoveTo(part?: BasePart, target?: CFrame, translateStiffness?: number, rotateStiffness?: number, collisionsMode?: Enum.IKCollisionsMode): undefined;
	/**
	 * Returns a bool indicating whether there are no `BaseParts` within the given `Region3`.
	 * @deprecated Deprecated.
	 */
	IsRegion3Empty(region?: Region3, ignoreDescendentsInstance?: Instance): boolean;
	/**
	 * Returns a boolean indicating whether there are no `BaseParts` within the given `Region3`, ignoring any `BaseParts` that are descendants of the objects within the given ignore list.
	 * @deprecated Deprecated.
	 */
	IsRegion3EmptyWithIgnoreList(region?: Region3, ignoreDescendentsTable?: Instance[]): boolean;
	/**
	 * Casts a ray using an origin, direction, and optional `RaycastParams`, then returns a `RaycastResult` if an eligible object or terrain intersects the ray.
	 */
	Raycast(origin?: Vector3, direction?: Vector3, raycastParams?: RaycastParams): RaycastResult?;
	Shapecast(part?: BasePart, direction?: Vector3, params?: RaycastParams): RaycastResult?;
	/**
	 * Casts a spherical shape in a given direction and returns a `RaycastResult` if the shape hits a `BasePart` or `Terrain` cell.
	 */
	Spherecast(position?: Vector3, radius?: number, direction?: Vector3, params?: RaycastParams): RaycastResult?;
	/**
	 * Advances the simulation for parts in the world forward based on a specified time increment and an optional set of `BaseParts`.
	 */
	StepPhysics(dt?: number, parts?: Instance[]): undefined;
	/** @deprecated Deprecated. */
	findPartOnRay(ray?: Ray, ignoreDescendantsInstance?: Instance, terrainCellsAreCubes?: boolean, ignoreWater?: boolean): unknown;
	/** @deprecated Deprecated. */
	findPartsInRegion3(region?: Region3, ignoreDescendantsInstance?: Instance, maxParts?: number): Instance[];
}

/**
 * **Workspace** houses 3D objects which are rendered to the 3D world. Objects not descending from it will not be rendered or physically interact with the world.
 */
interface Workspace extends WorldRoot {
	/** The air density at ground level, used in the aerodynamic force model. */
	AirDensity: number;
	/**
	 * Controls the strength of turbulence present in the wind velocity field, affecting the aerodynamic force model.
	 */
	AirTurbulenceIntensity: number;
	/** Determines whether assets created by other users can be sold in the game. */
	AllowThirdPartySales: boolean;
	/** Specifies the animation throttling mode for the local client. */
	ClientAnimatorThrottling: Enum.ClientAnimatorThrottlingMode;
	/** The `Camera` object being used by the local player. */
	CurrentCamera: Camera;
	/** The amount of time, in seconds, that the game has been running. */
	DistributedGameTime: number;
	FallHeightEnabled: boolean;
	/**
	 * Determines the height at which falling `BaseParts` and their ancestor `Models` are removed from `Workspace`.
	 */
	FallenPartsDestroyHeight: number;
	/**
	 * Specifies the global wind vector for animated terrain grass, dynamic clouds, and particles.
	 */
	GlobalWind: Vector3;
	/** Determines the acceleration due to gravity applied to falling `BaseParts`. */
	Gravity: number;
	InsertPoint: Vector3;
	LuauTypeCheckMode: Enum.LuauTypeCheckMode;
	Retargeting: Enum.AnimatorRetargetingMode;
	/** Whether content streaming is enabled for the place. */
	StreamingEnabled: boolean;
	/** A reference to the `Terrain` object parented to the `Workspace`. */
	Terrain: Terrain;
	/**
	 * Goes through all `BaseParts` given, breaking any joints connected to these parts.
	 * @deprecated Deprecated.
	 */
	BreakJoints(objects?: Instance[]): undefined;
	/**
	 * Returns the number of `BaseParts` that are deemed physically active, due to being recently under the influence of physics.
	 */
	GetNumAwakeParts(): number;
	/**
	 * Returns an integer, between 0 and 100, representing the percentage of real time that physics simulation is currently being throttled to.
	 */
	GetPhysicsThrottling(): number;
	/**
	 * Returns the number of frames per second that physics is currently being simulated at.
	 */
	GetRealPhysicsFPS(): number;
	/** Returns the server's Unix time in seconds. */
	GetServerTimeNow(): number;
	/**
	 * Creates joints between the specified `Parts` and any touching parts depending on the parts' surfaces and the specified joint creation mode.
	 */
	JoinToOutsiders(objects?: Instance[], jointType?: Enum.JointCreationMode): undefined;
	/**
	 * Goes through all `BaseParts` given. If any part's side has a `Enum.SurfaceType` that can make a joint it will create a joint with any adjacent parts.
	 * @deprecated Deprecated.
	 */
	MakeJoints(objects?: Instance[]): undefined;
	/** Returns `true` if the game has the PGS Physics solver enabled. */
	PGSIsEnabled(): boolean;
	/** Breaks all joints between the specified `BaseParts` and other `BaseParts`. */
	UnjoinFromOutsiders(objects?: Instance[]): undefined;
	/**
	 * Positions and zooms the `Workspace.CurrentCamera` to show the extent of `BaseParts` currently in the `Workspace`.
	 */
	ZoomToExtents(): undefined;
	/** Fires when persistent models have been sent to the specified player. */
	readonly PersistentLoaded: RBXScriptSignal<(player: Player) => void>;
}

/** Extends limited physics for its children on to a parent `ViewportFrame`. */
interface WorldModel extends WorldRoot {
}

/** Links a `DataModel` instance to a corresponding asset in the cloud. */
interface PackageLink extends Instance {
	readonly DefaultName: string;
	/** The ID of the asset this package corresponds to. */
	PackageId: ContentId;
	readonly SerializedDefaultAttributes: string;
	/** Refers to a revision of a specific package. */
	readonly VersionNumber: number;
}

interface PackageService extends Instance {
}

interface PackageUIService extends Instance {
}

/** An abstract class for pages objects. */
interface Pages extends Instance {
	/** Whether or not the current page is the last page available. */
	IsFinished: boolean;
	/**
	 * Returns the items on the current page. The keys in the item are determined by the source of this object.
	 */
	GetCurrentPage(): unknown;
	/** Iterates to the next page in the pages object, if possible. */
	AdvanceToNextPageAsync(): undefined;
}

/**
 * A special version of the `Pages` class returned by `AssetService:SearchAudioAsync()`.
 */
interface AudioPages extends Pages {
}

/**
 * Returned by `Players:GetBanHistoryAsync` to view the entire ban and unban history of any UserId.
 */
interface BanHistoryPages extends Pages {
}

/**
 * A special version of the `Pages` class returned by `CaptureService.ReadCapturesFromGalleryAsync`.
 */
interface CapturesPages extends Pages {
}

interface CatalogPages extends Pages {
}

/** A special type of `Pages` object whose pages contain `DataStoreKey` instances. */
interface DataStoreKeyPages extends Pages {
	Cursor: string;
}

/** A special type of `Pages` object whose pages contain `DataStoreInfo` instances. */
interface DataStoreListingPages extends Pages {
	Cursor: string;
}

/**
 * A `Pages` object that allows iteration through `OrderedDataStore` key/value pairs.
 */
interface DataStorePages extends Pages {
}

/**
 * A special type of `Pages` object whose pages contain `DataStoreObjectVersionInfo` instances.
 */
interface DataStoreVersionPages extends Pages {
}

/**
 * A special version of `Pages` that contains information about a player's connections.
 */
interface FriendPages extends Pages {
}

interface InventoryPages extends Pages {
}

interface EmotesPages extends InventoryPages {
}

/**
 * A special type of `Pages` object whose pages contain key-value pairs from a `MemoryStoreHashMap`.
 */
interface MemoryStoreHashMapPages extends Pages {
}

/** The `OutfitPages` class is used in the case of iterating over a user's outfits. */
interface OutfitPages extends Pages {
}

/** A special version of the `Pages` class returned by `GenerateItemListAsync`. */
interface RecommendationPages extends Pages {
}

interface StandardPages extends Pages {
}

/** An internal service which cannot be used by developers. */
interface PartOperationAsset extends Instance {
}

/** A special object that emits customizable 2D particles into the world. */
interface ParticleEmitter extends Instance {
	/**
	 * Determines the global-axis acceleration of all active particles, measured in studs per second squared.
	 */
	Acceleration: Vector3;
	/**
	 * Scales the light emitted from the emitter when `ParticleEmitter.LightInfluence` is 0.
	 */
	Brightness: number;
	/** Determines the color of all active particles over their individual lifetimes. */
	Color: ColorSequence;
	/**
	 * Determines the rate at which particles will lose half their speed through exponential decay.
	 */
	Drag: number;
	/** Determines the face of the object that particles emit from. */
	EmissionDirection: Enum.NormalId;
	/** Determines if particles emit from the emitter. */
	Enabled: boolean;
	/** Determines how fast the flipbook texture animates in frames per second. */
	FlipbookFramerate: NumberRange;
	/** The error message to display if the `Texture` is incompatible for a flipbook. */
	FlipbookIncompatible: string;
	/**
	 * Determines the layout of the flipbook texture. Must be None, Grid2x2, Grid4x4, Grid8x8 or Custom.
	 */
	FlipbookLayout: Enum.ParticleFlipbookLayout;
	/**
	 * Determines the type of the flipbook animation. Must be Loop, OneShot, PingPong, or Random.
	 */
	FlipbookMode: Enum.ParticleFlipbookMode;
	/** Defines the number of horizontal frames in a custom flipbook layout. */
	FlipbookSizeX: number;
	/** Defines the number of vertical frames in a custom flipbook layout. */
	FlipbookSizeY: number;
	/**
	 * Determines whether the animation starts at a random frame chosen per particle instead of always starting at frame zero.
	 */
	FlipbookStartRandom: boolean;
	/** Defines a random range of ages for newly emitted particles. */
	Lifetime: NumberRange;
	/** Determines how much particles' colors are blended with the colors behind them. */
	LightEmission: number;
	/** Determines how much particles are influenced by the environmental light. */
	LightInfluence: number;
	/**
	 * Determines whether the particles rigidly move with the part they're being emitted from.
	 */
	LockedToPart: boolean;
	/** Specifies how to orient particles. */
	Orientation: Enum.ParticleOrientation;
	/** Determines the number of particles emitted per second. */
	Rate: number;
	/**
	 * Determines the range of angular speeds of emitted particles, measured in degrees per second.
	 */
	RotSpeed: NumberRange;
	/** Determines the range of rotations in degrees for newly emitted particles. */
	Rotation: NumberRange;
	/** Sets the shape of the emitter to either a box, sphere, cylinder, or disc. */
	Shape: Enum.ParticleEmitterShape;
	/** Sets whether particles emit outward only, inward only, or in both directions. */
	ShapeInOut: Enum.ParticleEmitterShapeInOut;
	/** Influences particle emission from cylinder, disc, sphere, and box shapes. */
	ShapePartial: number;
	/** Sets particle emission to either volumetric or surface-only emission. */
	ShapeStyle: Enum.ParticleEmitterShapeStyle;
	/** Determines the world size over individual particles' lifetimes. */
	Size: NumberSequence;
	/**
	 * Determines a random range of velocities (minimum to maximum) at which new particles will emit, measured in studs per second.
	 */
	Speed: NumberRange;
	/**
	 * Determines the angles at which particles may be randomly emit, measured in degrees.
	 */
	SpreadAngle: Vector2;
	/**
	 * Allows for non-uniform scaling of particles, curve-controlled over their lifetime.
	 */
	Squash: NumberSequence;
	/** Determines the image rendered on particles. */
	Texture: ContentId;
	/** Value between 0 and 1 that controls the speed of the particle effect. */
	TimeScale: number;
	/** Determines the transparency of particles over their individual lifetimes. */
	Transparency: NumberSequence;
	/**
	 * Determines how much of the parent's velocity is inherited by particles when emitted.
	 */
	VelocityInheritance: number;
	/**
	 * Determines how offset a particle can be fired from the local emitter direction of its parent.
	 * @deprecated Deprecated.
	 */
	VelocitySpread: number;
	/** Whether emitted particles follow the `Workspace.GlobalWind` vector. */
	WindAffectsDrag: boolean;
	/**
	 * Determines the forward-backward render position of particles; used to control what particles render on top/bottom.
	 */
	ZOffset: number;
	/** Clears all particles that have been emitted. */
	Clear(): undefined;
	/** Emits a given number of particles. */
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

/** Stores the result of paths created by `PathfindingService:CreatePath()`. */
interface Path extends Instance {
	/** The success of the generated `Path`. */
	Status: Enum.PathStatus;
	/**
	 * Returns a table of `Path` instances.
	 * @deprecated Deprecated.
	 */
	GetPointCoordinates(): unknown;
	/** Returns an array of points in the path. */
	GetWaypoints(): unknown;
	/** Checks if a path is blocked starting at a specific waypoint. */
	CheckOcclusionAsync(start?: number): number;
	/** Computes a `Path` from a start position to an end position. */
	ComputeAsync(start?: Vector3, finish?: Vector3): undefined;
	/** Fires when the computed path becomes blocked. */
	readonly Blocked: RBXScriptSignal<(blockedWaypointIdx: number) => void>;
	/** Fires when a computed path that was blocked becomes unblocked. */
	readonly Unblocked: RBXScriptSignal<(unblockedWaypointIdx: number) => void>;
}

/** Connects two locations which otherwise by default are unconnected. */
interface PathfindingLink extends Instance {
	/** The originating attachment of the link. */
	Attachment0: Attachment;
	/** The landing attachment of the link. */
	Attachment1: Attachment;
	/**
	 * Enables a path to traverse a link in both directions. The default value is `true`.
	 */
	IsBidirectional: boolean;
	/**
	 * A classifying string to add additional information about the link. This Label is included in the waypoint generated by this link.
	 */
	Label: string;
}

/**
 * Modifiers used to represent space that has a higher or lower cost to be traversed when creating paths using the `PathfindingService`.
 */
interface PathfindingModifier extends Instance {
	/** The name of the navigation area inside or on top of the `Part` volume. */
	Label: string;
	/**
	 * Determines if the parts enclosed by the modifier are traversable, even if they would normally be collided with.
	 */
	PassThrough: boolean;
}

/** Used to find logical paths between two points. */
interface PathfindingService extends Instance {
	/**
	 * Sets the percent of a voxel has to be occupied to be considered empty. Defaults to 0.16.
	 * @deprecated Deprecated.
	 */
	EmptyCutoff: number;
	CreatePath(agentParameters?: unknown): Path;
	/**
	 * Computes and returns a `Path` between two `Vector3s`. If the given MaxDistance is greater than 512, an error will be thrown. (MaxDistance is too large).
	 * @deprecated Deprecated.
	 */
	ComputeRawPathAsync(start?: Vector3, finish?: Vector3, maxDistance?: number): Path;
	/**
	 * Computes and returns a smooth `Path` between two `Vector3s`.
	 * @deprecated Deprecated.
	 */
	ComputeSmoothPathAsync(start?: Vector3, finish?: Vector3, maxDistance?: number): Path;
	/** Finds a `Path` between the two provided points. */
	FindPathAsync(start?: Vector3, finish?: Vector3): Path;
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
	/**
	 * Returns whether the part is in the collision group.
	 * @deprecated Deprecated.
	 */
	CollisionGroupContainsPart(name?: string, part?: BasePart): boolean;
	/** Sets the collision status between two groups. */
	CollisionGroupSetCollidable(name1?: string, name2?: string, collidable?: boolean): undefined;
	/** Returns whether the two groups will collide. */
	CollisionGroupsAreCollidable(name1?: string, name2?: string): boolean;
	/**
	 * Creates a new collision group with the given name, and returns the ID of the created group.
	 * @deprecated Deprecated.
	 */
	CreateCollisionGroup(name?: string): number;
	/**
	 * Returns the ID of the collision group with the specified name.
	 * @deprecated Deprecated.
	 */
	GetCollisionGroupId(name?: string): number;
	/**
	 * Returns the name of the group with the corresponding ID.
	 * @deprecated Deprecated.
	 */
	GetCollisionGroupName(name?: number): string;
	/**
	 * Returns a table with info on all of the place's collision groups.
	 * @deprecated Deprecated.
	 */
	GetCollisionGroups(): unknown;
	/** Returns the maximum number of collision groups. */
	GetMaxCollisionGroups(): number;
	/** Returns a table with info on all of the place's collision groups. */
	GetRegisteredCollisionGroups(): unknown;
	/** Checks if a collision group is registered. */
	IsCollisionGroupRegistered(name?: string): boolean;
	/** Registers a new collision group with the given name. */
	RegisterCollisionGroup(name?: string): undefined;
	/**
	 * Removes the collision group with the given name.
	 * @deprecated Deprecated.
	 */
	RemoveCollisionGroup(name?: string): undefined;
	/** Renames specified collision group. */
	RenameCollisionGroup(from?: string, to?: string): undefined;
	/**
	 * Sets the collision group of a part.
	 * @deprecated Deprecated.
	 */
	SetPartCollisionGroup(part?: BasePart, name?: string): undefined;
	/** Unregisters the collision group for the given name. */
	UnregisterCollisionGroup(name?: string): undefined;
}

interface PhysicsSettings extends Instance {
	/**
	 * When set to true, physically simulated objects will stop being simulated if they have little to no motion for a set period of time.
	 */
	AllowSleep: boolean;
	/**
	 * When set to true, parts that are `BasePart.Anchored` will show a gray surface outline on the surface of the part's bounding box that is currently facing the ground.
	 */
	AreAnchorsShown: boolean;
	/**
	 * When set to true, each physics assembly is assigned a unique color and the `Part` associated with the assembly are outlined with the color. Parts that are attached together by `JointInstance` will share the same color.
	 */
	AreAssembliesShown: boolean;
	/**
	 * When set to true, parts that are actively being physically simulated will have a red outline.
	 */
	AreAwakePartsHighlighted: boolean;
	/**
	 * When set to true, `Part` will be outlined with a specific color, depending on the state of its root simulation body.
	 */
	AreBodyTypesShown: boolean;
	/**
	 * When set to true, each contact island will render `SelectionBox` adorns on the parts in contact islands, where each contact island is assigned a random color.
	 */
	AreContactIslandsShown: boolean;
	/**
	 * When set to true, sphere adorns will be drawn at the contact points of each part where physics interactions are occurring.
	 */
	AreContactPointsShown: boolean;
	/** When set to true, XYZ axes are rendered at the `BasePart.CFrame` of every part. */
	AreJointCoordinatesShown: boolean;
	/** When set to true, every individual mechanism of parts is given a unique color. */
	AreMechanismsShown: boolean;
	/**
	 * An ancient property that hasn't work correctly since late 2007. It's supposed to render an XYZ axis on the root part of a `Model`, but the axis rendering component doesn't work correctly.
	 */
	AreModelCoordsShown: boolean;
	AreNonAnchorsShown: boolean;
	/**
	 * When set to true, each player's character is outlined with a unique color, and each part that the player has network ownership over is outlined with the same color.
	 */
	AreOwnersShown: boolean;
	/**
	 * An ancient property that hasn't worked correctly since late 2007. It's supposed to render a large XYZ axis in the center of each `BasePart`, but the axis rendering component doesn't work correctly.
	 */
	ArePartCoordsShown: boolean;
	/**
	 * When set to true, a cylinder is drawn around each player's character, representing their `Player.SimulationRadius`.
	 */
	AreRegionsShown: boolean;
	AreTerrainReplicationRegionsShown: boolean;
	/**
	 * When set to true, parts that aren't aligned on the 1x1x1 grid will be outlined yellow.
	 */
	AreUnalignedPartsShown: boolean;
	/**
	 * An ancient property that hasn't worked correctly since late 2007. It's supposed to render a large XYZ axis in the center of the world, but the axis rendering component doesn't work correctly.
	 */
	AreWorldCoordsShown: boolean;
	/**
	 * When set to true, Roblox will fall back to using its legacy CSG solver when performing solid model operations.
	 */
	DisableCSGv2: boolean;
	DisableCSGv3ForPlugins: boolean;
	IsInterpolationThrottleShown: boolean;
	/**
	 * This property is supposed to show the `BasePart.ReceiveAge` of a part, but it does not work correctly.
	 */
	IsReceiveAgeShown: boolean;
	/**
	 * When set to true, the joint connections of each part, and the states of their underlying primitive components are visualized as a spanning tree.
	 */
	IsTreeShown: boolean;
	/** Controls the throttle rate of Roblox's physics engine. */
	PhysicsEnvironmentalThrottle: Enum.EnviromentalPhysicsThrottle;
	/**
	 * When set to true, the underlying collision geometry for `PartOperation` and `MeshPart` is rendered.
	 */
	ShowDecompositionGeometry: boolean;
	/**
	 * If the `PhysicsSettings.PhysicsEnvironmentalThrottle` is set to `DefaultAuto`, this specifies the maximum time that the physics environmental throttle has to wait before it is allowed to automatically change.
	 */
	ThrottleAdjustTime: number;
	/**
	 * If set to true, version 2 of Roblox's CSG solver will be used instead of version 1.
	 */
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

/** An object that represents a presently connected client to the experience. */
interface Player extends Instance {
	/** Describes the player's account age in days. */
	AccountAge: number;
	/**
	 * Determines whether the character of a player using a mobile device will automatically jump upon hitting an obstacle.
	 */
	AutoJumpEnabled: boolean;
	/** The maximum distance the player's camera is allowed to zoom out. */
	CameraMaxZoomDistance: number;
	/** The minimum distance the player's camera is allowed to zoom in. */
	CameraMinZoomDistance: number;
	/** Changes the camera's mode to either first or third person. */
	CameraMode: Enum.CameraMode;
	/**
	 * Determines whether the character's appearance will be loaded when the player spawns. If `false`, the player will spawn with a default appearance.
	 */
	CanLoadCharacterAppearance: boolean;
	/**
	 * A `Model` controlled by the player that contains a `Humanoid`, body parts, scripts, and other objects.
	 */
	Character: Model;
	/**
	 * The URL of the asset containing the character's appearance, clothing, and gear.
	 * @deprecated Deprecated.
	 */
	CharacterAppearance: string;
	/**
	 * Determines the user ID of the account whose character appearance is used for a player's `Character`.
	 */
	CharacterAppearanceId: number;
	/** Sets how the default camera handles objects between the camera and the player. */
	DevCameraOcclusionMode: Enum.DevCameraOcclusionMode;
	/**
	 * Determines player's camera movement mode when using a device with a mouse and keyboard.
	 */
	DevComputerCameraMode: Enum.DevComputerCameraMovementMode;
	/**
	 * Determines player's character movement mode when using a device with a mouse and keyboard.
	 */
	DevComputerMovementMode: Enum.DevComputerMovementMode;
	/** Determines if the player can toggle mouse lock. */
	DevEnableMouseLock: boolean;
	/** Determines player's camera movement mode when using a touch-enabled device. */
	DevTouchCameraMode: Enum.DevTouchCameraMovementMode;
	/** Determines player's character movement mode when using a touch-enabled device. */
	DevTouchMovementMode: Enum.DevTouchMovementMode;
	/** The display name of the authenticated user associated with the `Player`. */
	DisplayName: string;
	/**
	 * Describes the user ID of the player who was followed into an experience by a player.
	 */
	FollowUserId: number;
	/** Indicates if a player has a **Verified** badge. */
	HasVerifiedBadge: boolean;
	/** Sets the distance at which this player will see other players' health bars. */
	HealthDisplayDistance: number;
	/** Describes the account's membership type. */
	MembershipType: Enum.MembershipType;
	/** Sets the distance at which this player will see other players' names. */
	NameDisplayDistance: number;
	/** Determines whether the player is on a specific team. */
	Neutral: boolean;
	/** Sets the part to focus replication around. */
	ReplicationFocus: Instance;
	/** If set, the player will respawn at the given `SpawnLocation`. */
	RespawnLocation: SpawnLocation;
	/** Determines the `Team` with which the player is associated. */
	Team: Team;
	/**
	 * Determines the `Team` with which the player is associated with according to that team's `Team.TeamColor`.
	 */
	TeamColor: BrickColor;
	/** A unique identifying integer assigned to all user accounts. */
	UserId: number;
	/** @deprecated Deprecated. */
	userId: number;
	/** Adds an additional replication focus for the player. */
	AddReplicationFocus(part?: BasePart): undefined;
	/**
	 * Removes all accessories and other character appearance objects from a player's `Character`.
	 */
	ClearCharacterAppearance(): undefined;
	/**
	 * Returns the distance between the character's head and the given `Vector3`, or `0` if the player has no character.
	 */
	DistanceFromCharacter(point?: Vector3): number;
	GetData(): PlayerData;
	/**
	 * Returns a dictionary containing information describing how the player joins the experience.
	 */
	GetJoinData(): unknown;
	/** Returns the mouse being used by the client. */
	GetMouse(): Mouse;
	/** Returns the round-trip, isolated network latency in seconds. */
	GetNetworkPing(): number;
	/** Returns whether or not the appearance of the player's character has loaded. */
	HasAppearanceLoaded(): boolean;
	/** Returns whether the player is verified with concrete, real-world signals. */
	IsVerified(): boolean;
	/**
	 * Forcibly disconnect a player from the experience, optionally providing a message.
	 */
	Kick(message?: string): undefined;
	/**
	 * Returns a boolean value that was previously saved to the player with `Player:SaveBoolean()` with the same key.
	 * @deprecated Deprecated.
	 */
	LoadBoolean(key?: string): boolean;
	/**
	 * Places the given instance either in the player's character, head, or StarterGear based on the instance's class.
	 * @deprecated Deprecated.
	 */
	LoadCharacterAppearance(assetInstance?: Instance): undefined;
	/**
	 * Returns an instance that was previously saved to the player with `Player:SaveInstance()` with the same key.
	 * @deprecated Deprecated.
	 */
	LoadInstance(key?: string): Instance;
	/**
	 * Returns a number value that was previously saved to the player.
	 * @deprecated Deprecated.
	 */
	LoadNumber(key?: string): number;
	/**
	 * Returns a string value that was previously saved to the player.
	 * @deprecated Deprecated.
	 */
	LoadString(key?: string): string;
	/**
	 * Causes the player's character to walk in the given direction until stopped, or interrupted by the player (by using their controls).
	 */
	Move(walkDirection?: Vector3, relativeToCamera?: boolean): undefined;
	/** Removes a previously added replication focus. */
	RemoveReplicationFocus(part?: BasePart): undefined;
	/**
	 * Used to save a boolean value that can be loaded again at a later time using `Player:LoadBoolean()`.
	 * @deprecated Deprecated.
	 */
	SaveBoolean(key?: string, value?: boolean): undefined;
	/**
	 * Saves an instance which can be loaded again at a later time.
	 * @deprecated Deprecated.
	 */
	SaveInstance(key?: string, value?: Instance): undefined;
	/**
	 * Saves a number value that can be loaded again at a later time using.
	 * @deprecated Deprecated.
	 */
	SaveNumber(key?: string, value?: number): undefined;
	/**
	 * Saves a string value that can be loaded again at a later time.
	 * @deprecated Deprecated.
	 */
	SaveString(key?: string, value?: string): undefined;
	/** Sets the `AccountAge` of the player. */
	SetAccountAge(accountAge?: number): undefined;
	/** Sets whether or not the player sees filtered chats, rather than normal chats. */
	SetSuperSafeChat(value?: boolean): undefined;
	/** @deprecated Deprecated. */
	loadBoolean(key?: string): boolean;
	/** @deprecated Deprecated. */
	loadInstance(key?: string): Instance;
	/** @deprecated Deprecated. */
	loadNumber(key?: string): number;
	/** @deprecated Deprecated. */
	loadString(key?: string): string;
	/** @deprecated Deprecated. */
	saveBoolean(key?: string, value?: boolean): undefined;
	/** @deprecated Deprecated. */
	saveInstance(key?: string, value?: Instance): undefined;
	/** @deprecated Deprecated. */
	saveNumber(key?: string, value?: number): undefined;
	/** @deprecated Deprecated. */
	saveString(key?: string, value?: string): undefined;
	/**
	 * Returns a dictionary of online connections. Returns the product information of an asset using its asset ID.
	 * @deprecated Deprecated.
	 */
	GetFriendsOnline(maxFriends?: number): unknown;
	/** Returns a dictionary of online connections. */
	GetFriendsOnlineAsync(maxFriends?: number): unknown;
	/**
	 * Returns the player's rank in the group as an integer.
	 * @deprecated Deprecated.
	 */
	GetRankInGroup(groupId?: number): number;
	/** Returns the player's rank in the group as an integer. */
	GetRankInGroupAsync(groupId?: number): number;
	/**
	 * Returns the player's role in the group as a string, or `Guest` if the player isn't part of the group.
	 * @deprecated Deprecated.
	 */
	GetRoleInGroup(groupId?: number): string;
	/**
	 * Returns the player's role in the group as a string, or `Guest` if the player isn't part of the group.
	 */
	GetRoleInGroupAsync(groupId?: number): string;
	/**
	 * Returns whether a player is connections with the specified user.
	 * @deprecated Deprecated.
	 */
	IsBestFriendsWith(userId?: number): boolean;
	/**
	 * Checks whether a player is a connection of the user with the given `Player.UserId`.
	 * @deprecated Deprecated.
	 */
	IsFriendsWith(userId?: number): boolean;
	/**
	 * Checks whether a player is a connection of the user with the given `Player.UserId`.
	 */
	IsFriendsWithAsync(userId?: number): boolean;
	/**
	 * Checks whether a player is a member of a group with the given ID.
	 * @deprecated Deprecated.
	 */
	IsInGroup(groupId?: number): boolean;
	/** Checks whether a player is a member of a group with the given ID. */
	IsInGroupAsync(groupId?: number): boolean;
	/**
	 * Creates a new character for the player, removing the old one. Also clears the player's `Backpack` and `PlayerGui`.
	 * @deprecated Deprecated.
	 */
	LoadCharacter(): undefined;
	/**
	 * Creates a new character for the player, removing the old one. Also clears the player's `Backpack` and `PlayerGui`.
	 */
	LoadCharacterAsync(): undefined;
	/**
	 * Spawns a player character with everything equipped in the passed in `HumanoidDescription`.
	 * @deprecated Deprecated.
	 */
	LoadCharacterWithHumanoidDescription(humanoidDescription?: HumanoidDescription): undefined;
	/**
	 * Spawns a player character with everything equipped in the passed in `HumanoidDescription`.
	 */
	LoadCharacterWithHumanoidDescriptionAsync(humanoidDescription?: HumanoidDescription): undefined;
	/** Requests that the server stream to the player around the specified location. */
	RequestStreamAroundAsync(position?: Vector3, timeOut?: number): undefined;
	/**
	 * Used to pause the script until the player's data is available to manipulate, or until a certain amount of time has elapsed without fetching the player's data.
	 * @deprecated Deprecated.
	 */
	WaitForDataReady(): boolean;
	/** @deprecated Deprecated. */
	isFriendsWith(userId?: number): boolean;
	/** @deprecated Deprecated. */
	waitForDataReady(): boolean;
	/** Fires when a player's character spawns or respawns. */
	readonly CharacterAdded: RBXScriptSignal<(character: Model) => void>;
	/** Fires when the full appearance of a `Character` has been inserted. */
	readonly CharacterAppearanceLoaded: RBXScriptSignal<(character: Model) => void>;
	/** Fires right before a player's character is removed. */
	readonly CharacterRemoving: RBXScriptSignal<(character: Model) => void>;
	/** Fires when a player chats in experience using Roblox's provided chat bar. */
	readonly Chatted: RBXScriptSignal<(message: string, recipient: Player) => void>;
	/**
	 * This event fires approximately two minutes after the engine classifies the player as idle. Time is the number of seconds that have elapsed since that point.
	 */
	readonly Idled: RBXScriptSignal<(time: number) => void>;
	/** Fires when the teleport state of a player changes. */
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

/** A container for LocalScripts to be run on the client. */
interface PlayerScripts extends Instance {
	/**
	 * Unregisters all ComputerCameraMovementMode enums from the experience's settings menu.
	 */
	ClearComputerCameraMovementModes(): undefined;
	/** Unregisters all ComputerMovementMode enums from the experience's settings menu. */
	ClearComputerMovementModes(): undefined;
	/**
	 * Unregisters all TouchCameraMovementMode enums from the experience's settings menu.
	 */
	ClearTouchCameraMovementModes(): undefined;
	/** Unregisters all TouchMovementMode enums from the experience's settings menu. */
	ClearTouchMovementModes(): undefined;
	/**
	 * Registers that a computer camera movement mode is available to be selected from the game menu.
	 */
	RegisterComputerCameraMovementMode(cameraMovementMode?: Enum.ComputerCameraMovementMode): undefined;
	/**
	 * Registers that a computer movement mode is available to be selected from the game menu.
	 */
	RegisterComputerMovementMode(movementMode?: Enum.ComputerMovementMode): undefined;
	/**
	 * Registers that a touch camera movement mode is available to be selected from the game menu.
	 */
	RegisterTouchCameraMovementMode(cameraMovementMode?: Enum.TouchCameraMovementMode): undefined;
	/**
	 * Registers that a touch movement mode is available to be selected from the game menu.
	 */
	RegisterTouchMovementMode(movementMode?: Enum.TouchMovementMode): undefined;
}

/** Provides a way to get additional information about a player's view. */
interface PlayerViewService extends Instance {
	/** Returns a world space `CFrame` looking at the player's character. */
	GetDeviceCameraCFrame(player?: Player): CFrame;
}

/** A service that contains presently connected `Player` objects. */
interface Players extends Instance {
	/**
	 * Indicates whether or not bubble chat is enabled. It is set with the `Players:SetChatStyle()` method.
	 */
	BubbleChat: boolean;
	/** Indicates whether `characters` will respawn automatically. */
	CharacterAutoLoads: boolean;
	/**
	 * Indicates whether or not classic chat is enabled; set by the `Players:SetChatStyle()` method.
	 */
	ClassicChat: boolean;
	/** The `Player` that the `LocalScript` is running for. */
	LocalPlayer: Player;
	/** The maximum number of players that can be in a server. */
	MaxPlayers: number;
	/**
	 * Returns the number of people in the server at the current time.
	 * @deprecated Deprecated.
	 */
	NumPlayers: number;
	/** The preferred number of players for a server. */
	PreferredPlayers: number;
	/** Controls the amount of time taken for a players character to respawn. */
	RespawnTime: number;
	/** Makes the local player chat the given message. */
	Chat(message?: string): undefined;
	/** Returns the `Player` with the given `UserId` if they are in-experience. */
	GetPlayerByUserId(userId?: number): Player;
	/**
	 * Returns the `Player` whose `Player.Character` matches the given instance, or `nil` if one cannot be found.
	 */
	GetPlayerFromCharacter(character?: Model): Player;
	/** Returns a table of all presently connected `Player` objects. */
	GetPlayers(): Instance[];
	/**
	 * Sets whether BubbleChat and ClassicChat are being used, and tells TeamChat and `Chat` what to do.
	 */
	SetChatStyle(style?: Enum.ChatStyle): undefined;
	/**
	 * Makes the local player chat the given message, which will only be viewable by users on the same team.
	 */
	TeamChat(message?: string): undefined;
	/** @deprecated Deprecated. */
	getPlayers(): Instance[];
	/** @deprecated Deprecated. */
	playerFromCharacter(character?: Model): Player;
	/**
	 * Returns a list of players in an experience.
	 * @deprecated Deprecated.
	 */
	players(): Instance[];
	/**
	 * Bans users from your experience, with options to specify duration, reason, whether the ban applies to the entire universe or just the current place, and more. This method is enabled and disabled by the `Players.BanningEnabled` property, which you can toggle in Studio.
	 */
	BanAsync(config?: unknown): undefined;
	/**
	 * Returns a character `Model` equipped with everything specified in the passed in `HumanoidDescription`.
	 * @deprecated Deprecated.
	 */
	CreateHumanoidModelFromDescription(description?: HumanoidDescription, rigType?: Enum.HumanoidRigType, assetTypeVerification?: Enum.AssetTypeVerification): Model;
	/**
	 * Returns a character `Model` equipped with everything specified in the passed in `HumanoidDescription`.
	 */
	CreateHumanoidModelFromDescriptionAsync(description?: HumanoidDescription, rigType?: Enum.HumanoidRigType, assetTypeVerification?: Enum.AssetTypeVerification): Model;
	/**
	 * Returns a character Model set-up with everything equipped to match the avatar of the user specified by the passed in userId.
	 * @deprecated Deprecated.
	 */
	CreateHumanoidModelFromUserId(userId?: number): Model;
	/**
	 * Returns a character Model set-up with everything equipped to match the avatar of the user specified by the passed in userId.
	 */
	CreateHumanoidModelFromUserIdAsync(userId?: number): Model;
	/**
	 * Retrieves the ban and unban history of any user within the experience's universe. This method is enabled and disabled by the `Players.BanningEnabled` property, which you can toggle in Studio.
	 */
	GetBanHistoryAsync(userId?: number): BanHistoryPages;
	/**
	 * Returns a `Model` containing the assets which the player is wearing, excluding gear.
	 * @deprecated Deprecated.
	 */
	GetCharacterAppearanceAsync(userId?: number): Model;
	/** Returns information about the character appearance of a given user. */
	GetCharacterAppearanceInfoAsync(userId?: number): unknown;
	/**
	 * Returns a `FriendPages` object which contains information for all of the given player's connections.
	 */
	GetFriendsAsync(userId?: number): FriendPages;
	/**
	 * Returns the HumanoidDescription for a specified outfit, which will be set with the parts/colors/Animations etc of the outfit.
	 * @deprecated Deprecated.
	 */
	GetHumanoidDescriptionFromOutfitId(outfitId?: number): HumanoidDescription;
	/**
	 * Returns the HumanoidDescription for a specified outfit, which will be set with the parts/colors/Animations etc of the outfit.
	 */
	GetHumanoidDescriptionFromOutfitIdAsync(outfitId?: number): HumanoidDescription;
	/**
	 * Returns a HumanoidDescription which specifies everything equipped for the avatar of the user specified by the passed in userId.
	 * @deprecated Deprecated.
	 */
	GetHumanoidDescriptionFromUserId(userId?: number): HumanoidDescription;
	/**
	 * Returns a HumanoidDescription which specifies everything equipped for the avatar of the user specified by the passed in userId.
	 */
	GetHumanoidDescriptionFromUserIdAsync(userId?: number): HumanoidDescription;
	/**
	 * Sends a query to the Roblox website for the username of an account with a given `UserId`.
	 */
	GetNameFromUserIdAsync(userId?: number): string;
	/**
	 * Sends a query to the Roblox website for the `userId` of an account with a given username.
	 */
	GetUserIdFromNameAsync(userName?: string): number;
	/**
	 * Returns the content URL of a player thumbnail given the size and type, as well as a boolean describing if the image is ready to use.
	 */
	GetUserThumbnailAsync(userId?: number, thumbnailType?: Enum.ThumbnailType, thumbnailSize?: Enum.ThumbnailSize): unknown;
	/**
	 * Unbans players banned from `Players:BanAsync()` or the User Restrictions Open Cloud API. This method is enabled and disabled by the `Players.BanningEnabled` property, which you can toggle in Studio.
	 */
	UnbanAsync(config?: unknown): undefined;
	/** Fires when a player enters the experience. */
	readonly PlayerAdded: RBXScriptSignal<(player: Player) => void>;
	/**
	 * Fires when the experience server recognizes that a player's membership has changed.
	 */
	readonly PlayerMembershipChanged: RBXScriptSignal<(player: Player) => void>;
	/** Fires when a player is about to leave the experience. */
	readonly PlayerRemoving: RBXScriptSignal<(player: Player, reason: Enum.PlayerExitReason) => void>;
	/**
	 * Fires when the experience server recognizes that the user's status for a certain subscription has changed.
	 */
	readonly UserSubscriptionStatusChanged: RBXScriptSignal<(user: Player, subscriptionId: string) => void>;
}

interface Plugin extends Instance {
	/** Returns whether the user has enabled **Collisions** in Studio's toolbar. */
	CollisionEnabled: boolean;
	/** Returns the grid snapping size the user has set in Studio. */
	GridSize: number;
	/** Sets the state of the calling plugin to activated. */
	Activate(exclusiveMouse?: boolean): undefined;
	/**
	 * Creates a `PluginAction` which represents a generic performable action in Studio with no directly‑associated `PluginToolbarButton`.
	 */
	CreatePluginAction(actionId?: string, text?: string, statusTip?: string, iconName?: string, allowBinding?: boolean): PluginAction;
	/** Creates a new plugin menu. */
	CreatePluginMenu(id?: string, title?: string, icon?: string): PluginMenu;
	/** Creates a new `PluginToolbar` with the given name. */
	CreateToolbar(name?: string): PluginToolbar;
	/** Deactivates the plugin. */
	Deactivate(): undefined;
	/** Returns the `Enum.JointCreationMode` the user has set in Studio's toolbar. */
	GetJoinMode(): Enum.JointCreationMode;
	/** Returns a `Mouse` that can be used while the plugin is active. */
	GetMouse(): PluginMouse;
	/** Returns the currently selected `Enum.RibbonTool`. */
	GetSelectedRibbonTool(): Enum.RibbonTool;
	/**
	 * Retrieves a previously stored value with the given key, or `nil` if the given key doesn't exist.
	 */
	GetSetting(key?: string): unknown;
	/**
	 * Returns the Studio user's userId if they're logged in, otherwise returns 0.
	 * @deprecated Deprecated.
	 */
	GetStudioUserId(): number;
	/** Intersects the given parts and returns the resulting `IntersectOperation`. */
	Intersect(objects?: Instance[]): Instance;
	/**
	 * Returns `true` if this plugin is currently active, after having been activated via the `Activate()` function.
	 */
	IsActivated(): boolean;
	/** Returns `true` if this plugin is currently active with an exclusive mouse. */
	IsActivatedWithExclusiveMouse(): boolean;
	/** Negates the given parts and returns the resulting `NegateOperations`. */
	Negate(objects?: Instance[]): Instance[];
	/**
	 * Used to open the given script instance in an editor window, in Roblox studio, at the given line. If no line is given as an argument it will default to 1.
	 * @deprecated Deprecated.
	 */
	OpenScript(script?: LuaSourceContainer, lineNumber?: number): undefined;
	/** Opens the context help window to the wiki page that `url` links to. */
	OpenWikiPage(url?: string): undefined;
	/** Opens an upload window for the user's current selection. */
	SaveSelectedToRoblox(): undefined;
	/** Activates the specified Roblox Studio tool. */
	SelectRibbonTool(tool?: Enum.RibbonTool, position?: UDim2): undefined;
	/** Separates the given `UnionOperations` and returns the resulting parts. */
	Separate(objects?: Instance[]): Instance[];
	/**
	 * Stores a given value for later use under the given key. The value will persist even after Studio is closed.
	 */
	SetSetting(key?: string, value?: unknown): undefined;
	/** Starts a drag action given a dictionary of parameters. */
	StartDrag(dragData?: unknown): undefined;
	/** Unions the given parts and returns the resulting `UnionOperation`. */
	Union(objects?: Instance[]): Instance;
	/**
	 * Creates a `DockWidgetPluginGui` given a `DockWidgetPluginGuiInfo`.
	 * @deprecated Deprecated.
	 */
	CreateDockWidgetPluginGui(pluginGuiId?: string, dockWidgetPluginGuiInfo?: DockWidgetPluginGuiInfo): DockWidgetPluginGui;
	/** Creates a `DockWidgetPluginGui` given a `DockWidgetPluginGuiInfo`. */
	CreateDockWidgetPluginGuiAsync(pluginGuiId?: string, dockWidgetPluginGuiInfo?: DockWidgetPluginGuiInfo): DockWidgetPluginGui;
	/**
	 * Prompts the user to open a `.fbx` animation file that can be loaded onto the `rigModel`, then proceeds to insert the animation as a `KeyframeSequence` in the `Workspace`.
	 * @deprecated Deprecated.
	 */
	ImportFbxAnimation(rigModel?: Instance, isR15?: boolean): Instance;
	/**
	 * Prompts the user to open a `.fbx` animation file that can be loaded onto the `rigModel`, then proceeds to insert the animation as a `KeyframeSequence` in the `Workspace`.
	 */
	ImportFbxAnimationAsync(rigModel?: Instance, isR15?: boolean): Instance;
	/**
	 * Prompts the user to open a `.fbx` file, uploads the individual components of the model as meshes, and generates a character rig for use in animation, which is loaded into the `Workspace`.
	 * @deprecated Deprecated.
	 */
	ImportFbxRig(isR15?: boolean): Instance;
	/**
	 * Prompts the user to open a `.fbx` file, uploads the individual components of the model as meshes, and generates a character rig for use in animation, which is loaded into the `Workspace`.
	 */
	ImportFbxRigAsync(isR15?: boolean): Instance;
	/**
	 * Opens a window in Roblox Studio which prompts the user to select an asset based on the `assetType` specified.
	 */
	PromptForExistingAssetId(assetType?: string): number;
	/**
	 * Opens a window in Roblox Studio which prompts the user to select an asset based on the `assetType` specified.
	 */
	PromptForExistingAssetIdAsync(assetType?: string): number;
	/**
	 * Prompts the user to save their current selection with the specified file name.
	 * @deprecated Deprecated.
	 */
	PromptSaveSelection(suggestedFileName?: string): boolean;
	/** Prompts the user to save their current selection with the specified file name. */
	PromptSaveSelectionAsync(suggestedFileName?: string): boolean;
	/** Fired when the plugin is deactivated. */
	readonly Deactivation: RBXScriptSignal<() => void>;
	/** Fires immediately before the `Plugin` stops running. */
	readonly Unloading: RBXScriptSignal<() => void>;
}

interface PluginAction extends Instance {
	/** A string that uniquely identifies this action. */
	ActionId: string;
	/** Determines whether the action can be assigned a keyboard shortcut in Studio. */
	AllowBinding: boolean;
	/**
	 * The description of the action when viewing it from the keyboard shortcuts window in Roblox Studio.
	 */
	StatusTip: string;
	/** The text that is displayed when viewing this action in Roblox Studio. */
	readonly Text: string;
	/** Fires when the action is triggered. */
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

/** A service that stores `PluginGui` objects to be displayed in Roblox Studio. */
interface PluginGuiService extends Instance {
}

interface PluginManagementService extends Instance {
}

interface PluginManager extends Instance {
	/** @deprecated Deprecated. */
	CreatePlugin(): Instance;
	/**
	 * Exports the place to an `.obj` file that is saved to the path chosen by the user in a file save dialogue.
	 */
	ExportPlace(filePath?: string): undefined;
	/**
	 * Exports the current `Selection` to an `.obj` file that is saved to the path chosen by the user in a file save dialogue.
	 */
	ExportSelection(filePath?: string): undefined;
}

interface PluginManagerInterface extends Instance {
	/** @deprecated Deprecated. */
	CreatePlugin(): Instance;
	ExportPlace(filePath?: string): undefined;
	ExportSelection(filePath?: string): undefined;
}

/**
 * A context menu that can be shown in Studio. Displays a list of `PluginActions` and supports submenus.
 */
interface PluginMenu extends Instance {
	/** The icon to be displayed when used as a submenu. */
	Icon: string;
	/** The text to be displayed when used as a submenu. */
	Title: string;
	/** Adds the given action to the menu. */
	AddAction(action?: Instance): undefined;
	/** Adds the given menu as a separator. */
	AddMenu(menu?: Instance): undefined;
	/**
	 * Creates a temporary action that is hidden from Studio's customize shortcuts window.
	 */
	AddNewAction(actionId?: string, text?: string, icon?: string): Instance;
	/** Adds a separator between items in the menu. */
	AddSeparator(): undefined;
	/** Clears the menu. */
	Clear(): undefined;
	/**
	 * Shows the menu at the mouse cursor. Yields until either an item is selected or the menu is closed.
	 */
	ShowAsync(): Instance;
}

interface PluginPolicyService extends Instance {
}

interface PluginToolbar extends Instance {
	/**
	 * Creates a `PluginToolbarButton` that allows the user to initiate a single, one-off action in Studio.
	 */
	CreateButton(buttonId?: string, tooltip?: string, iconname?: string, text?: string): PluginToolbarButton;
}

interface PluginToolbarButton extends Instance {
	/**
	 * Determines whether the button can be clicked when the 3D viewport is hidden, such as when a `Script` is being edited in another tab.
	 */
	ClickableWhenViewportHidden: boolean;
	/** Determines whether the button is clickable in general. */
	Enabled: boolean;
	/** Determines what icon should represent the button. */
	Icon: ContentId;
	/** Sets the state of the plugin button. */
	SetActive(active?: boolean): undefined;
	/** Fires when the user presses and releases their cursor on the button. */
	readonly Click: RBXScriptSignal<() => void>;
}

/**
 * This service controls the points award system used to showcase a player's achievements and participation throughout Roblox.
 * @deprecated This class is deprecated.
 */
interface PointsService extends Instance {
	/**
	 * Returns the number of points the current game has available to award to players.
	 * @deprecated Deprecated.
	 */
	GetAwardablePoints(): number;
	/**
	 * Attempts to award the user with the specified `Player.UserId` the specified number of points.
	 * @deprecated Deprecated.
	 */
	AwardPoints(userId?: number, amount?: number): unknown;
	/**
	 * Returns the total number of points a player has in the current game.
	 * @deprecated Deprecated.
	 */
	GetGamePointBalance(userId?: number): number;
	/**
	 * Returns the total number of points the given player has across all games.
	 * @deprecated Deprecated.
	 */
	GetPointBalance(userId?: number): number;
	/**
	 * Fires when points have been successfully awarded to a player, while also passing along the updated balance of points the player has in the current game and all games.
	 */
	readonly PointsAwarded: RBXScriptSignal<(userId: number, pointsAwarded: number, userBalanceInGame: number, userTotalBalance: number) => void>;
}

/**
 * Helps you query information regarding policy compliance for players around the world based on age range, location, and platform type.
 */
interface PolicyService extends Instance {
	/** Determines if a user can see brand project assets inside your experience. */
	CanViewBrandProjectAsync(player?: Player, brandProjectId?: string): boolean;
	/**
	 * Returns policy information about a player based on geolocation, age group, and platform.
	 */
	GetPolicyInfoForPlayerAsync(player?: Instance): unknown;
}

/** Base class of all 'Pose Instance' objects. */
interface PoseBase extends Instance {
	/** The easing direction to use to reach the next Pose's value. */
	EasingDirection: Enum.PoseEasingDirection;
	/** The easing style to use to reach the next Pose's value. */
	EasingStyle: Enum.PoseEasingStyle;
	Weight: number;
}

/** Holds the value applied to a specific FACS control. */
interface NumberPose extends PoseBase {
	/**
	 * The value that will be applied to the FACS control corresponding to the `NumberPose`.
	 */
	Value: number;
}

/**
 * Holds the `CFrame` applied to the `Motor6D` connected to its associated `BasePart`. The part which is controlled depends on the name of the Pose.
 */
interface Pose extends PoseBase {
	/**
	 * This `CFrame` applies to the `Motor6D` corresponding with the `Pose` when the `Motor6D.Transform` is changed.
	 */
	CFrame: CFrame;
	/** @deprecated Deprecated. */
	MaskWeight: number;
	/** Adds a sub `Pose` to the `Pose` by parenting it. */
	AddSubPose(pose?: Instance): undefined;
	/** Returns an array containing all sub `Poses` that have been added to a `Pose`. */
	GetSubPoses(): Instance[];
	/** Removes a sub `Pose` from the `Pose` by parenting it to `nil`. */
	RemoveSubPose(pose?: Instance): undefined;
}

/** Abstract base class for post-processing effects. */
interface PostEffect extends Instance {
	/** Toggles whether or not the PostEffect is enabled. */
	Enabled: boolean;
}

/** Simulates the camera viewing a very bright light. */
interface BloomEffect extends PostEffect {
	/** Determines the additive blending intensity. */
	Intensity: number;
	/** Determines the radius of the bloom in pixels. */
	Size: number;
	/** Determines how bright a color must be before it blooms. */
	Threshold: number;
}

/** Applies a blur to the entire game world. */
interface BlurEffect extends PostEffect {
	/** Determines the blur radius. */
	Size: number;
}

/**
 * Adjusts color-related properties of the rendered world like saturation, tint, brightness, and contrast.
 */
interface ColorCorrectionEffect extends PostEffect {
	/** Determines by how much the brightness of pixel colors will be shifted. */
	Brightness: number;
	/** Determines the change in separation between the dark and light colors. */
	Contrast: number;
	/** Determines the change in intensity of colors. */
	Saturation: number;
	/** Determines by how much the RGB channels of pixels are scaled. */
	TintColor: Color3;
}

/**
 * Modifies how color values calculated by the renderer should be converted to the screen's color range.
 */
interface ColorGradingEffect extends PostEffect {
	/** Specifies which tone mapper preset to use. */
	TonemapperPreset: Enum.TonemapperPreset;
}

/** Simulates a camera lens by blurring parts of a scene not in focus. */
interface DepthOfFieldEffect extends PostEffect {
	/** Intensity of the far field blur. */
	FarIntensity: number;
	/** Distance away from the camera where objects are in focus. */
	FocusDistance: number;
	/** Controls the distance away from the `FocusDistance` where no blur is applied. */
	InFocusRadius: number;
	/** Intensity of the near field blur. */
	NearIntensity: number;
}

/** Renders dynamic rays from the sun. */
interface SunRaysEffect extends PostEffect {
	/** Determines the opacity of the sun rays. */
	Intensity: number;
	/** Determines how wide the sun rays will spread out. */
	Spread: number;
}

interface ProcessInstancePhysicsService extends Instance {
}

/**
 * An object that lets you prompt players to interact with an object in the 3D world.
 */
interface ProximityPrompt extends Instance {
	/** The action text shown to the user. */
	ActionText: string;
	/**
	 * Whether the prompt's `ProximityPrompt.ActionText` and `ProximityPrompt.ObjectText` will be localized according to the `ProximityPrompt.RootLocalizationTable`.
	 */
	AutoLocalize: boolean;
	/** Whether the prompt can be activated by clicking/tapping on the prompt UI. */
	ClickablePrompt: boolean;
	/** Whether or not this prompt should be shown. */
	Enabled: boolean;
	/** Used to customize which prompts can be shown at the same time. */
	Exclusivity: Enum.ProximityPromptExclusivity;
	/** The gamepad button the player should press to trigger the prompt. */
	GamepadKeyCode: Enum.KeyCode;
	/**
	 * The duration, in seconds, that the player must hold the button/key down to trigger the prompt.
	 */
	HoldDuration: number;
	/** The key the player should press to trigger the prompt. */
	KeyboardKeyCode: Enum.KeyCode;
	/**
	 * The maximum distance a Player's `character` can be from the `ProximityPrompt` for the prompt to appear.
	 */
	MaxActivationDistance: number;
	MaxIndicatorDistance: number;
	/** An optional property that determines the object name text shown to the user. */
	ObjectText: string;
	/**
	 * Whether the prompt is hidden if the path between the player's `Camera` and object parented to the `ProximityPrompt` is obstructed.
	 */
	RequiresLineOfSight: boolean;
	/**
	 * A reference to a `LocalizationTable` to be used to apply automated localization to this prompt's `ProximityPrompt.ActionText` and `ProximityPrompt.ObjectText`.
	 */
	RootLocalizationTable: LocalizationTable;
	/** The style of the prompt's UI. */
	Style: Enum.ProximityPromptStyle;
	/** The pixel offset applied to the prompt's UI. */
	UIOffset: Vector2;
	/** Fires a signal indicating that the user began pressing the prompt GUI button. */
	InputHoldBegin(): undefined;
	/** Fires a signal indicating that the user ended pressing the prompt GUI button. */
	InputHoldEnd(): undefined;
	readonly IndicatorHidden: RBXScriptSignal<() => void>;
	readonly IndicatorShown: RBXScriptSignal<() => void>;
	/**
	 * Triggered when a player begins holding down the `key`/button connected to a prompt with a non-zero `ProximityPrompt.HoldDuration`.
	 */
	readonly PromptButtonHoldBegan: RBXScriptSignal<(playerWhoTriggered: Player) => void>;
	/**
	 * Triggers when the player ends holding down the button on a prompt with a non-zero `ProximityPrompt.HoldDuration`.
	 */
	readonly PromptButtonHoldEnded: RBXScriptSignal<(playerWhoTriggered: Player) => void>;
	/** Triggers when the `prompt` becomes hidden. */
	readonly PromptHidden: RBXScriptSignal<() => void>;
	/** Triggers when the `prompt` becomes visible. */
	readonly PromptShown: RBXScriptSignal<(inputType: Enum.ProximityPromptInputType) => void>;
	/**
	 * Triggers when `key`/button is released, for longer events where the user is required to hold down the button.
	 */
	readonly TriggerEnded: RBXScriptSignal<(playerWhoTriggered: Player) => void>;
	/**
	 * Triggered when the prompt `key`/button is pressed, or after a specified amount of time holding the button, if `ProximityPrompt.HoldDuration` is used.
	 */
	readonly Triggered: RBXScriptSignal<(playerWhoTriggered: Player) => void>;
}

/** Allows developers to interact with `ProximityPrompt` objects in a global way. */
interface ProximityPromptService extends Instance {
	/** Whether `ProximityPrompts` are enabled, and therefore shown, in-experience. */
	Enabled: boolean;
	MaxIndicatorsVisible: number;
	/** Maximum number of `ProximityPrompts` that will be shown to the player. */
	MaxPromptsVisible: number;
	readonly IndicatorHidden: RBXScriptSignal<(prompt: ProximityPrompt) => void>;
	readonly IndicatorShown: RBXScriptSignal<(prompt: ProximityPrompt) => void>;
	/**
	 * Triggers when the player begins holding down the `KeyboardKeyCode` key/button on a prompt with a non-zero `HoldDuration`.
	 */
	readonly PromptButtonHoldBegan: RBXScriptSignal<(prompt: ProximityPrompt, playerWhoTriggered: Player) => void>;
	/**
	 * Triggers when the player stops holding down the `KeyboardKeyCode` key/button on a prompt with a non-zero `HoldDuration`.
	 */
	readonly PromptButtonHoldEnded: RBXScriptSignal<(prompt: ProximityPrompt, playerWhoTriggered: Player) => void>;
	/** Triggers client-side when a prompt becomes hidden. */
	readonly PromptHidden: RBXScriptSignal<(prompt: ProximityPrompt) => void>;
	/** Triggers client-side when a prompt becomes visible. */
	readonly PromptShown: RBXScriptSignal<(prompt: ProximityPrompt, inputType: Enum.ProximityPromptInputType) => void>;
	/**
	 * Triggers when the player stops holding down the `KeyboardKeyCode` key/button while triggering a prompt.
	 */
	readonly PromptTriggerEnded: RBXScriptSignal<(prompt: ProximityPrompt, playerWhoTriggered: Player) => void>;
	/** Triggers when the user interacts with this prompt. */
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

/**
 * A service that provides an interface for you to manage and display personalized content recommendations.
 */
interface RecommendationService extends Instance {
	LogActionEvent(actionType?: Enum.RecommendationActionType, itemId?: string, tracingId?: string, actionEventDetails?: unknown): undefined;
	LogImpressionEvent(impressionType?: Enum.RecommendationImpressionType, itemId?: string, tracingId?: string, impressionEventDetails?: unknown): undefined;
	GenerateItemListAsync(generateRecommendationItemListRequest?: unknown): RecommendationPages;
	GetRecommendationItemAsync(itemId?: string): unknown;
	RegisterItemAsync(player?: Player, registerRecommendationItemsRequest?: unknown): unknown;
	RemoveItemAsync(itemId?: string): undefined;
	UpdateItemAsync(updateRecommendationItemRequest?: unknown): undefined;
}

/**
 * A currently unused object whose functionality was split into `ReflectionMetadataClasses` and `ReflectionMetadataEnums`.
 */
interface ReflectionMetadata extends Instance {
}

/**
 * Acts as a `Folder` containing information about callbacks for a `ReflectionMetadataClass`, and should be parented to it. `ReflectionMetadataMembers` that are parented to this object will be perceived as callbacks under the class this is parented to.
 */
interface ReflectionMetadataCallbacks extends Instance {
}

/** An internal object which cannot be used by developers. */
interface ReflectionMetadataClasses extends Instance {
}

/** Acts as a `Folder` for `ReflectionMetadataEnum` objects. */
interface ReflectionMetadataEnums extends Instance {
}

/**
 * Acts as a `Folder` containing information about events for a `ReflectionMetadataClass`, and should be parented to it. `ReflectionMetadataMembers` that are parented to this object will be perceived as events under the class this is parented to.
 */
interface ReflectionMetadataEvents extends Instance {
}

/**
 * Acts as a `Folder` containing information about functions for a `ReflectionMetadataClass`, and should be parented to it. `ReflectionMetadataMembers` that are parented to this object will be perceived as functions under the class this is parented to.
 */
interface ReflectionMetadataFunctions extends Instance {
}

/**
 * Acts as abstract properties for generic information about Classes, Members, Enums, and EnumItems.
 */
interface ReflectionMetadataItem extends Instance {
	/** Whether or not this can be seen in studio. */
	Browsable: boolean;
	/** Describes the category of this class. */
	ClassCategory: string;
	ClientOnly: boolean;
	/**
	 * Describes a constraint for a single-argument function whose argument type is a `Object.ClassName`.
	 */
	Constraint: string;
	/** Whether or not this item is deprecated. */
	Deprecated: boolean;
	/** Toggles whether this property can be edited from the Properties window. */
	EditingDisabled: boolean;
	EditorType: string;
	FFlag: string;
	/** Vague value for showing if this depends on backend stuff. */
	IsBackend: boolean;
	PropertyOrder: number;
	/**
	 * Describes the context where this member can be used. If set to "Server", this member will not be available to auto fill when editing a `LocalScript`. If set to "Client", this member will not be available to auto fill when editing a `Script`.
	 */
	ScriptContext: string;
	ServerOnly: boolean;
	SliderScaling: string;
	/**
	 * The maximum value of this property. Used with `ReflectionMetadataItem.UIMinimum` to control the slider bar of this property in the `Properties` window.
	 */
	UIMaximum: number;
	/**
	 * The minimum value of this property. Used with `ReflectionMetadataItem.UIMaximum` to control the slider bar of this property in the `Properties` window.
	 */
	UIMinimum: number;
	/**
	 * The number of potential values the property's slider bar can be set to, `ReflectionMetadataItem.UIMinimum` and `ReflectionMetadataItem.UIMaximum`.
	 */
	UINumTicks: number;
}

/**
 * Registers information about a class, and its members. Should be parented to `ReflectionMetadataClasses`.
 */
interface ReflectionMetadataClass extends ReflectionMetadataItem {
	/** A number index, which refers to a specific class icon. */
	ExplorerImageIndex: number;
	/** Determines how this class is sorted in the Explorer compared to other classes. */
	ExplorerOrder: number;
	/**
	 * Toggles whether or not this object can be inserted through the Advanced Objects menu.
	 */
	Insertable: boolean;
	/** Sets the class that this class would prefer parenting to. */
	PreferredParent: string;
}

/** Registers information about an `Enum` and its EnumItems. */
interface ReflectionMetadataEnum extends ReflectionMetadataItem {
}

/** Contains information about a specific EnumItem embedded within an Enum. */
interface ReflectionMetadataEnumItem extends ReflectionMetadataItem {
}

/** An internal object which cannot be used by developers. */
interface ReflectionMetadataMember extends ReflectionMetadataItem {
}

/**
 * Acts as a `Folder` containing information about properties for a `ReflectionMetadataClass`, and should be parented to it. `ReflectionMetadataMembers` that are parented to this object will be perceived as properties under the class this is parented to.
 */
interface ReflectionMetadataProperties extends Instance {
}

/**
 * Acts as a `Folder` containing information about yielding functions for a `ReflectionMetadataClass`, and should be parented to it. `ReflectionMetadataMembers` that are parented to this object will be perceived as yielding functions under the class this is parented to.
 */
interface ReflectionMetadataYieldFunctions extends Instance {
}

interface ReflectionService extends Instance {
	/**
	 * Returns information about a class when given its name, assuming that class is accessible.
	 */
	GetClass(className?: string, filter?: unknown): unknown;
	/** Returns a list of all classes accessible with filters applied. */
	GetClasses(filter?: unknown): unknown;
	/** Returns a list of events for a given class with filters applied. */
	GetEventsOfClass(className?: string, filter?: unknown): unknown;
	/** Returns a list of methods for a given class with filters applied. */
	GetMethodsOfClass(className?: string, filter?: unknown): unknown;
	/** Returns a list of properties for a given class with filters applied. */
	GetPropertiesOfClass(className?: string, filter?: unknown): unknown;
}

interface RemoteCommandService extends Instance {
	GetExecutingPlayer(): Player;
	GetReceivedUpdateSignal(): RBXScriptSignal;
	GetStoppingSignal(): RBXScriptSignal;
	SendUpdate(...args: unknown[]): undefined;
}

interface RemoteCursorService extends Instance {
}

interface RemoteDebuggerServer extends Instance {
}

/**
 * An object which facilitates synchronous, two-way communication across the client-server boundary. Scripts invoking a `RemoteFunction` yield until they receive a response from the recipient.
 */
interface RemoteFunction extends Instance {
	/** Invokes the `RemoteFunction` which in turn calls the `OnClientInvoke` callback. */
	InvokeClient(player?: Player, ...args: unknown[]): unknown;
	/** Invokes the `RemoteFunction` which in turn calls the `OnServerInvoke` callback. */
	InvokeServer(...args: unknown[]): unknown;
	/** Callback for when the `RemoteFunction` is invoked with `InvokeClient()`. */
	OnClientInvoke?: (...args: unknown[]) => unknown;
	/** Callback for when the `RemoteFunction` is invoked with `InvokeServer()`. */
	OnServerInvoke?: (player: Player, ...args: unknown[]) => unknown;
}

interface RenderSettings extends Instance {
	/** Sets the starting quality level of the framerate manager. */
	AutoFRMLevel: number;
	/**
	 * Whether all scene updates will be given an unlimited budget, regardless of how computationally expensive it may be.
	 */
	EagerBulkExecution: boolean;
	/** Sets the graphics quality level in Roblox Studio. */
	EditQualityLevel: Enum.QualityLevel;
	["Enable VR Mode"]: boolean;
	/**
	 * Sets whether materials should be generated per part, or per unique appearance in Roblox's exporter.
	 */
	ExportMergeByMaterial: boolean;
	/** Specifies the behavior of the framerate manager. */
	FrameRateManager: Enum.FramerateManagerMode;
	/** The graphics API that Roblox will use on startup. */
	GraphicsMode: Enum.GraphicsMode;
	/** The size in bytes of the mesh cache. */
	MeshCacheSize: number;
	/**
	 * Studio only. Used to visually verify the quality of `MeshParts` at lower level of detail at close range.
	 */
	MeshPartDetailLevel: Enum.MeshPartDetailLevel;
	/** Controls the quality level in Roblox Studio. */
	QualityLevel: Enum.QualityLevel;
	/**
	 * Whether Roblox Studio will automatically reload changes that are made to files in Roblox's `content` folder.
	 */
	ReloadAssets: boolean;
	/** Whether a wireframe of polygons will be shown on all `PartOperation` objects. */
	RenderCSGTrianglesDebug: boolean;
	/**
	 * Whether bounding boxes are rendered around each individual rendered entity in the scene.
	 */
	ShowBoundingBoxes: boolean;
	ViewMode: Enum.ViewMode;
	/** Returns the maximum quality level. */
	GetMaxQualityLevel(): number;
}

/** An internal testing utility for the rendering pipeline. */
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
	/** An internal service which cannot be used by developers. */
	RenderdocTriggerCapture(): undefined;
}

/**
 * A container whose contents are replicated to all clients (but not back to the server) first before anything else.
 */
interface ReplicatedFirst extends Instance {
	/** Immediately removes the default Roblox loading screen. */
	RemoveDefaultLoadingScreen(): undefined;
}

/** A container service for objects that are replicated to all clients. */
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

interface RolloutValidationService extends Instance {
}

interface RomarkRbxAnalyticsService extends Instance {
}

interface RomarkService extends Instance {
	EndRemoteRomarkTest(): undefined;
}

/** Represents a sequence of rotations and the interpolation curve between them. */
interface RotationCurve extends Instance {
	/** Number of rotation keys in this curve. */
	Length: number;
	/** Returns a copy of a key at a given index. */
	GetKeyAtIndex(index?: number): RotationCurveKey;
	/** Returns the index of the last and first key of a period of time. */
	GetKeyIndicesAtTime(time?: number): unknown;
	/**
	 * Returns a copy of all the keys in the rotation curve as a Luau array of `RotationCurveKeys`.
	 */
	GetKeys(): unknown;
	/**
	 * Samples the rotation curve at a given time and returns the corresponding rotation as a `CFrame`.
	 */
	GetValueAtTime(time?: number): CoordinateFrame?;
	/**
	 * Adds the key passed as an argument to this curve. If a key at the same time is found, it will be replaced.
	 */
	InsertKey(key?: RotationCurveKey): unknown;
	/** Removes a given number of keys starting from a given index. */
	RemoveKeyAtIndex(startingIndex?: number, count?: number): number;
	/**
	 * Resets this curve's keys using the `RotationCurveKey` array passed as an argument.
	 */
	SetKeys(keys?: unknown): number;
}

interface RtMessagingService extends Instance {
}

/** Service responsible for all runtime activity and progression of time. */
interface RunService extends Instance {
	FrameNumber: number;
	RunState: Enum.RunState;
	/**
	 * Given a string name of a function and a priority, this method binds the function to `RunService.PreRender`.
	 */
	BindToRenderStep(name?: string, priority?: number, _function?: Function): undefined;
	/**
	 * Binds a custom function to be called at a fixed frequency which is independent of the frame rate.
	 */
	BindToSimulation(_function?: Function, frequency?: Enum.StepFrequency): RBXScriptConnection;
	/**
	 * Checks the `Enum.PredictionStatus` of a specific context instance, useful for debugging scripts affecting multiple instances where some might be predicted and others might not.
	 */
	GetPredictionStatus(context?: Instance): Enum.PredictionStatus;
	/** Returns whether the current environment is running on the client. */
	IsClient(): boolean;
	/** Returns whether the current environment is in `Edit` mode. */
	IsEdit(): boolean;
	/** Returns whether a **Run** playtest has been initiated in Studio. */
	IsRunMode(): boolean;
	/** Returns whether the experience is currently running. */
	IsRunning(): boolean;
	/** Returns whether the current environment is running on the server. */
	IsServer(): boolean;
	/** Returns whether the current environment is running in Studio. */
	IsStudio(): boolean;
	/**
	 * Pauses the experience's simulation if it is running, suspending physics and scripts.
	 */
	Pause(): undefined;
	/**
	 * Resets the current game to a waypoint set when `RunService:Run()` was called.
	 * @deprecated Deprecated.
	 */
	Reset(): undefined;
	/** Runs the game's simulation, running physics and scripts. */
	Run(): undefined;
	/** Sets the prediction mode for an `Instance` to an `Enum.PredictionMode` value. */
	SetPredictionMode(context?: Instance, mode?: Enum.PredictionMode): undefined;
	/** Stops the experience's simulation if it is running. */
	Stop(): undefined;
	/**
	 * Unbinds a function that was bound to the render loop using `RunService:BindToRenderStep()`.
	 */
	UnbindFromRenderStep(name?: string): undefined;
	/** Fires every frame, after the physics simulation has completed. */
	readonly Heartbeat: RBXScriptSignal<(deltaTime: number) => void>;
	readonly Misprediction: RBXScriptSignal<(remoteWorldStepId: number, mispredictedInstances: unknown) => void>;
	/** Fires every frame, after the physics simulation has completed. */
	readonly PostSimulation: RBXScriptSignal<(deltaTimeSim: number) => void>;
	/** Fires every frame, prior to the physics simulation but after rendering. */
	readonly PreAnimation: RBXScriptSignal<(deltaTimeSim: number) => void>;
	/** Fires every frame, prior to the frame being rendered. */
	readonly PreRender: RBXScriptSignal<(deltaTimeRender: number) => void>;
	/** Fires every frame, prior to the physics simulation. */
	readonly PreSimulation: RBXScriptSignal<(deltaTimeSim: number) => void>;
	/** Fires every frame, prior to the frame being rendered. */
	readonly RenderStepped: RBXScriptSignal<(deltaTime: number) => void>;
	/** Fires every frame, prior to the physics simulation. */
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

/**
 * A 2D user interface that allows users to capture and save screenshots to their local device.
 */
interface ScreenshotHud extends Instance {
	/** Asset ID of the icon used for the camera button. */
	CameraButtonIcon: ContentId;
	/** Screen location of the camera button. */
	CameraButtonPosition: UDim2;
	/** Screen location of the close button. */
	CloseButtonPosition: UDim2;
	/** Whether the `ScreenshotHud` closes automatically when a screenshot is taken. */
	CloseWhenScreenshotTaken: boolean;
	HideCoreGuiForCaptures: boolean;
	HidePlayerGuiForCaptures: boolean;
	/** Determines whether the `ScreenshotHud` is visible. */
	Visible: boolean;
}

interface ScriptBuilder extends Instance {
}

interface SyncScriptBuilder extends ScriptBuilder {
	CompileTarget: Enum.CompileTarget;
	CoverageInfo: boolean;
	DebugInfo: boolean;
	PackAsSource: boolean;
	/** @deprecated Deprecated. */
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
	/** Limits how long a script is allowed to run without yielding. */
	SetTimeout(seconds?: number): undefined;
	/** Fired when an error occurs. */
	readonly Error: RBXScriptSignal<(message: string, stackTrace: string, script: Instance) => void>;
}

interface ScriptDebugger extends Instance {
	CurrentLine: number;
	IsDebugging: boolean;
	IsPaused: boolean;
	Script: Instance;
	AddWatch(expression: string): Instance;
	GetBreakpoints(): Instance[];
	GetGlobals(stackFrame?: number): unknown;
	GetLocals(stackFrame?: number): unknown;
	GetStack(): unknown;
	GetUpvalues(stackFrame?: number): unknown;
	GetWatchValue(watch: Instance): unknown;
	GetWatches(): Instance[];
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
	/**
	 * Returns the text of the specified line. When no argument is provided, returns the line of the current cursor position.
	 */
	GetLine(lineIndex?: unknown): string;
	/** Returns the number of lines in the document. */
	GetLineCount(): number;
	/**
	 * Returns the underlying `LuaSourceContainer` instance, if one exists, otherwise `nil`.
	 */
	GetScript(): LuaSourceContainer;
	/**
	 * Gets the text selected in the editor, or an empty string if there is no selection.
	 */
	GetSelectedText(): string;
	/**
	 * Returns the last known selection of the Script Editor in the format: `CursorLine, CursorChar, AnchorLine, AnchorChar`. If the Script Editor has no selection, `CursorLine == AnchorLine` and `CursorChar == AnchorChar`.
	 */
	GetSelection(): unknown;
	/**
	 * Gets the larger of the cursor position and anchor. If the editor has no selection, they are the same value.
	 */
	GetSelectionEnd(): unknown;
	/**
	 * Gets the smaller of the cursor position and anchor. If the editor has no selection, they are the same value.
	 */
	GetSelectionStart(): unknown;
	/** Returns text from the open editor. */
	GetText(startLine?: unknown, startCharacter?: unknown, endLine?: unknown, endCharacter?: unknown): string;
	/** Returns the currently displayed line numbers in the editor change. */
	GetViewport(): unknown;
	/** Returns whether or not the editor has any text selected. */
	HasSelectedText(): boolean;
	/** Returns true if the `ScriptDocument` represents the Command bar. */
	IsCommandBar(): boolean;
	/**
	 * Requests that the editor associated with this document close. Yields the current thread until the editor responds to the request.
	 */
	CloseAsync(): unknown;
	/**
	 * Replaces the text in the specified range from (`startLine`, `startColumn`) to (`endLine`, `endColumn`) with newText.
	 */
	EditTextAsync(newText?: string, startLine?: number, startCharacter?: number, endLine?: number, endCharacter?: number): unknown;
	/** Asks the editor to set its cursor selection to the argument values. */
	ForceSetSelectionAsync(cursorLine?: number, cursorCharacter?: number, anchorLine?: unknown, anchorCharacter?: unknown): unknown;
	MultiEditTextAsync(edits?: unknown): unknown;
	/** Asks the editor to set its cursor selection to the argument values. */
	RequestSetSelectionAsync(cursorLine?: number, cursorCharacter?: number, anchorLine?: unknown, anchorCharacter?: unknown): unknown;
	/**
	 * Fires when the ScriptDocument changes, including immediately after a text change.
	 */
	readonly SelectionChanged: RBXScriptSignal<(positionLine: number, positionCharacter: number, anchorLine: number, anchorCharacter: number) => void>;
	/** Fires when the displayed line numbers in the editor change. */
	readonly ViewportChanged: RBXScriptSignal<(startLine: number, endLine: number) => void>;
}

/** This service is used for interacting with `ScriptDocument` instances. */
interface ScriptEditorService extends Instance {
	/** Removes a previously registered callback with the name `name`. */
	DeregisterAutocompleteCallback(name?: string): undefined;
	/** Removes a previously registered callback with the name `name`. */
	DeregisterScriptAnalysisCallback(name?: string): undefined;
	/**
	 * Returns the open `ScriptDocument` corresponding to the given `LuaSourceContainer`, or `nil` if the given script is not open.
	 */
	FindScriptDocument(script?: LuaSourceContainer): ScriptDocument;
	/** Returns the edit-time source for the given script. */
	GetEditorSource(script?: LuaSourceContainer): string;
	/**
	 * Returns an array of the currently open script documents, including the command bar.
	 */
	GetScriptDocuments(): Instance[];
	/**
	 * Registers an autocomplete callback `callbackFunction` named `name` with priority `priority`.
	 */
	RegisterAutocompleteCallback(name?: string, priority?: number, callbackFunction?: Function): undefined;
	/**
	 * Registers a Script Analysis callback `callbackFunction` named `name` with `priority`.
	 */
	RegisterScriptAnalysisCallback(name?: string, priority?: number, callbackFunction?: Function): undefined;
	/**
	 * Requests that a Script Editor open the specified script. Returns (true, nil) if the request succeeds. Returns (false, string) if the request fails, with a string that describes the problem.
	 */
	OpenScriptDocumentAsync(script?: LuaSourceContainer, options?: unknown): unknown;
	/**
	 * Generates new content from the old script and updates the script editor if it's open, or the `Script` instance if the script editor is closed.
	 */
	UpdateSourceAsync(script?: LuaSourceContainer, callback?: Function): undefined;
	/** Fires just after a `ScriptDocument` changes. */
	readonly TextDocumentDidChange: RBXScriptSignal<(document: ScriptDocument, changesArray: unknown) => void>;
	/**
	 * Fires just before a `ScriptDocument` object is destroyed, which happens right after the script editor closes.
	 */
	readonly TextDocumentDidClose: RBXScriptSignal<(oldDocument: ScriptDocument) => void>;
	/**
	 * Fires just after a `ScriptDocument` object is created and parented to the service, which happens right after the script editor opens.
	 */
	readonly TextDocumentDidOpen: RBXScriptSignal<(newDocument: ScriptDocument) => void>;
}

interface ScriptProfilerService extends Instance {
	ClientRequestData(player?: Player): undefined;
	ClientStart(player?: Player, frequency?: unknown): undefined;
	ClientStop(player?: Player): undefined;
	DeserializeJSON(jsonString?: unknown): unknown;
	ServerRequestData(): undefined;
	ServerStart(frequency?: unknown): undefined;
	ServerStop(): undefined;
	readonly OnNewData: RBXScriptSignal<(player: Player, jsonString: string) => void>;
}

interface ScriptRegistrationService extends Instance {
}

interface ScriptRuntime extends Instance {
}

/**
 * An unimplemented service that has zero functionality, in a similar manner to the `LocalWorkspace` service.
 */
interface ScriptService extends Instance {
}

/**
 * The Selection service controls the `Instances` that are selected in Roblox Studio.
 */
interface Selection extends Instance {
	SelectionThickness: number;
	Add(instancesToAdd?: Instance[]): undefined;
	/** Returns an array of currently selected `Instances` in Roblox Studio. */
	Get(): Instance[];
	Remove(instancesToRemove?: Instance[]): undefined;
	/**
	 * Sets the currently selected objects in Roblox Studio to `Instances` in the given array.
	 */
	Set(selection?: Instance[]): undefined;
	/** Fires when the `Instances` selected in Roblox Studio changes. */
	readonly SelectionChanged: RBXScriptSignal<() => void>;
}

interface SelectionHighlightManager extends Instance {
}

/** An abstract class for various sensor instance types. */
interface SensorBase extends Instance {
	/** Determines how the sensor will update its output data. */
	UpdateType: Enum.SensorUpdateType;
	/** @deprecated Deprecated. */
	Sense(): undefined;
	readonly OnSensorOutputChanged: RBXScriptSignal<() => void>;
}

/**
 * A `SensorBase` that outputs data about the `AirDensity` and `RelativeWindVelocity` at the sensor's position.
 */
interface AtmosphereSensor extends SensorBase {
	/** Measures the density of the air where the sensor is positioned. */
	AirDensity: number;
	/** Reports the wind velocity relative to the sensor. */
	RelativeWindVelocity: Vector3;
}

/**
 * A `SensorBase` that outputs data about how its `BasePart` is interacting with `Terrain` water.
 */
interface BuoyancySensor extends SensorBase {
	/**
	 * True when the entirety of the `BasePart` is submerged in `Terrain` water with at least one voxel of water above it.
	 */
	FullySubmerged: boolean;
	/** True when any position on the `BasePart` is touching `Terrain` water. */
	TouchingSurface: boolean;
}

interface ControllerSensor extends SensorBase {
}

/**
 * A `SensorBase` that outputs data about another `BasePart` based on `Humanoid` floor and ladder detection logic.
 */
interface ControllerPartSensor extends ControllerSensor {
	/**
	 * The position in world space where the sensor hit the `ControllerPartSensor.SensedPart`.
	 */
	HitFrame: CFrame;
	/**
	 * The surface normal at the position where the sensor hit the `ControllerPartSensor.SensedPart`.
	 */
	HitNormal: Vector3;
	/**
	 * The distance from the sensor's parent `BasePart` to use when sensing other parts.
	 */
	SearchDistance: number;
	/** A reference to the `BasePart` hit by the sensor. */
	SensedPart: BasePart;
	/** Determines what behavior this `SensorBase` uses when sensing other parts. */
	SensorMode: Enum.SensorMode;
}

/** A `SensorBase` that outputs `Force`, `Torque` and `CenterOfPressure`. */
interface FluidForceSensor extends SensorBase {
	/**
	 * Assembly center of pressure offset from its center of mass in world coordinates.
	 */
	CenterOfPressure: Vector3;
	/** Assembly fluid force in world coordinates. */
	Force: Vector3;
	/** Assembly fluid torque in world coordinates. */
	Torque: Vector3;
	/**
	 * Asynchronously computes force, torque, and center of pressure for the parent part of a sensor given provided inputs.
	 */
	EvaluateAsync(linearVelocity?: Vector3, angularVelocity?: Vector3, cframe?: CFrame): unknown;
}

interface SerializationService extends Instance {
	/**
	 * Deserializes a `Library.buffer` containing `.rbxm` content, returning a list of `instances`.
	 */
	DeserializeInstancesAsync(buffer?: buffer): Instance[];
	/**
	 * Serializes a list of `instances` to the `.rbxm` format, returning a `Library.buffer` or `.rbxm` content.
	 */
	SerializeInstancesAsync(inputInstances?: Instance[]): buffer;
}

/** A container service for server-only `Script` objects. */
interface ServerScriptService extends Instance {
}

/**
 * A container whose contents are only accessible on the server. Objects descending from ServerStorage will not replicate to the client and will not be accessible from `LocalScripts`.
 */
interface ServerStorage extends Instance {
}

/**
 * A ServiceProvider is an abstract class, which stores, and provides certain singleton classes, depending on what inherited class you are using its members with.
 */
interface ServiceProvider extends Instance {
	/**
	 * Returns the service specified by the given className if it's already created, errors for an invalid name.
	 */
	FindService(className?: string): Instance;
	/**
	 * Returns the service with the requested class name, creating it if it does not exist.
	 */
	GetService(className?: string): Instance;
	/** @deprecated Deprecated. */
	getService(className?: string): Instance;
	/** @deprecated Deprecated. */
	service(className?: string): Instance;
	/** Fires when the current place is exited. */
	readonly Close: RBXScriptSignal<() => void>;
	/** Fired when a service is created. */
	readonly ServiceAdded: RBXScriptSignal<(service: Instance) => void>;
	/** Fired when a service is about to be removed. */
	readonly ServiceRemoving: RBXScriptSignal<(service: Instance) => void>;
}

/**
 * The root of Roblox's parent-child hierarchy. Its direct children are services, such as `Workspace` and `Lighting`, that act as the fundamental components of a Roblox game.
 */
interface DataModel extends ServiceProvider {
	/** Describes the ID of the user or group that owns the place. */
	CreatorId: number;
	/**
	 * Describes the `Enum.CreatorType` of the place, whether the place is owned by a user or a group.
	 */
	CreatorType: Enum.CreatorType;
	/**
	 * Describes the ID of the experience that the place running on the server belongs to.
	 */
	GameId: number;
	/**
	 * Not functional. Historically described the gear permissions of the place as set on the Roblox website.
	 * @deprecated Deprecated.
	 */
	GearGenreSetting: Enum.GearGenreSetting;
	/**
	 * Not functional. Historically described the `Enum.Genre` of the place as set on the Roblox website.
	 */
	Genre: Enum.Genre;
	/** A unique identifier for the running game server instance. */
	JobId: string;
	/** Represents how players in the server are handled by matchmaking. */
	MatchmakingType: Enum.MatchmakingType;
	/** Describes the ID of the place running on the server. */
	PlaceId: number;
	/** Describes the version of the place the server is running on. */
	PlaceVersion: number;
	/**
	 * Describes the private server ID of the server, if the server is a private server or a `reserved server`.
	 */
	PrivateServerId: string;
	/**
	 * Describes the `UserId` of the `Player` that owns the private server if the server is private.
	 */
	PrivateServerOwnerId: number;
	RunService: Instance;
	/** A reference to the `Workspace` service. */
	Workspace: Workspace;
	/**
	 * Refers to the game's `Lighting` service.
	 * @deprecated Deprecated.
	 */
	lighting: Instance;
	/** @deprecated Deprecated. */
	workspace: Workspace;
	/** Binds a function to be called before the server shuts down. */
	BindToClose(_function?: Function): undefined;
	/**
	 * Returns a table containing basic information about the jobs performed by the task scheduler.
	 */
	GetJobsInfo(): unknown;
	/**
	 * **_[OBSOLETE]:_** This function will always return a blank string.
	 * @deprecated Deprecated.
	 */
	GetMessage(): string;
	/**
	 * This method is no longer useful and will always return false.
	 * @deprecated Deprecated.
	 */
	GetRemoteBuildMode(): boolean;
	/**
	 * Returns whether gear of the given `Enum.GearType` is permitted to be added to `Players'` `StarterGears`.
	 * @deprecated Deprecated.
	 */
	IsGearTypeAllowed(gearType?: Enum.GearType): boolean;
	/** Returns true if the client has finished loading the game for the first time. */
	IsLoaded(): boolean;
	/** Returns an array of `Instances` associated with the given content URL. */
	GetObjects(url?: ContentId): Instance[];
	/** Sets the `DataModel.PlaceId` of the current game instance. */
	SetPlaceId(placeId?: number): undefined;
	/**
	 * Sets the `DataModel.GameId` of the current game instance to the given `universeId`.
	 */
	SetUniverseId(universeId?: number): undefined;
	/**
	 * Saves the current place.
	 * @deprecated Deprecated.
	 */
	SavePlace(saveFilter?: Enum.SaveFilter): boolean;
	/**
	 * Fires when SetGearSettings is called with a different value for `allowedGenres`.
	 * @deprecated Deprecated.
	 */
	readonly AllowedGearTypeChanged: RBXScriptSignal<() => void>;
	/**
	 * Fires when the user prompts and increase or decrease in graphics quality using the hotkeys.
	 */
	readonly GraphicsQualityChangeRequest: RBXScriptSignal<(betterQuality: boolean) => void>;
	/**
	 * Fires when a property of any object in the `DataModel` is changed.
	 * @deprecated Deprecated.
	 */
	readonly ItemChanged: RBXScriptSignal<(object: Instance, descriptor: string) => void>;
	/** Fires on the client when the game finishes loading for the first time. */
	readonly Loaded: RBXScriptSignal<() => void>;
	/**
	 * Invoked before the game is shut down. When this callback returns, or the timeout period is hit, the game finishes shutting down.
	 * @deprecated Deprecated.
	 */
	OnClose?: () => unknown;
}

/** The abstract class for settings database classes. */
interface GenericSettings extends ServiceProvider {
}

/** Collection of menu settings for Roblox Studio. */
interface GlobalSettings extends GenericSettings {
	/** Returns the value of an FFlag if it exists. */
	GetFFlag(name?: string): boolean;
	/** Returns the value of an FVariable, if it exists. */
	GetFVariable(name?: string): string;
}

/**
 * A singleton object that houses basic user settings, which persist across all games on Roblox.
 */
interface UserSettings extends GenericSettings {
	/**
	 * Returns true if the specified user feature is enabled. This will throw an error if the user feature does not exist.
	 */
	IsUserFeatureEnabled(name?: string): boolean;
	/** Erases the saved state of the UserSettings, and restores its default values. */
	Reset(): undefined;
}

interface ServiceVisibilityService extends Instance {
}

interface SessionCheckService extends Instance {
}

interface SessionService extends Instance {
}

/** Provides a global registry of named `SharedTable` objects. */
interface SharedTableRegistry extends Instance {
	/** Gets the registered `SharedTable` with the specified name. */
	GetSharedTable(name?: string): SharedTable;
	/** Registers the provided `SharedTable` with the specified name. */
	SetSharedTable(name?: string, st?: SharedTable?): undefined;
}

/** Changes the default appearance of the experience's sky. */
interface Sky extends Instance {
	/** Sets whether the sun, moon, and stars will show. */
	CelestialBodiesShown: boolean;
	/** The perceived angular size of the moon while using this skybox, in degrees. */
	MoonAngularSize: number;
	MoonTextureContent: Content;
	/** The texture of the moon while using this skybox. */
	MoonTextureId: ContentId;
	SkyboxBackContent: Content;
	/** The URL link to a picture for the back surface of the sky. */
	SkyboxBk: ContentId;
	/** Asset ID for the bottom surface of the skybox. */
	SkyboxDn: ContentId;
	SkyboxDownContent: Content;
	SkyboxFrontContent: Content;
	/** Asset ID for the front surface of the skybox. */
	SkyboxFt: ContentId;
	SkyboxLeftContent: Content;
	/** Asset ID for the left surface of the skybox. */
	SkyboxLf: ContentId;
	/** Angle of the skybox, in degrees, with rotation order of **Y**, **X**, **Z**. */
	SkyboxOrientation: Vector3;
	SkyboxRightContent: Content;
	/** Asset ID for the right surface of the skybox. */
	SkyboxRt: ContentId;
	/** Asset ID for the top surface of the skybox. */
	SkyboxUp: ContentId;
	SkyboxUpContent: Content;
	/** How many stars are shown in the skybox. */
	StarCount: number;
	/** The perceived angular size of the sun while using this skybox, in degrees. */
	SunAngularSize: number;
	SunTextureContent: Content;
	/** The texture of the sun while using this skybox. */
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

/** A particle emitter with the visual aesthetic of smoke. */
interface Smoke extends Instance {
	/** Determines the color of the smoke particles. */
	Color: Color3;
	/** Determines whether smoke particles emit. */
	Enabled: boolean;
	/** Determines how opaque smoke particles render. */
	Opacity: number;
	/** Determines the velocity of the smoke particles. */
	RiseVelocity: number;
	/** Determines the size of newly emit smoke particles. */
	Size: number;
	/** Value between 0-1 that controls the speed of the particle effect. */
	TimeScale: number;
}

interface SmoothVoxelsUpgraderService extends Instance {
}

interface SnippetService extends Instance {
}

/**
 * Facilitates social functions that impact relationships made on the Roblox platform.
 */
interface SocialService extends Instance {
	/**
	 * Returns a table of all presently connected `Player` objects whose `Player.PartyId` property matches the passed `partyId`.
	 */
	GetPlayersByPartyId(partyId?: string): Instance[];
	/** Hides the calling player's self view. */
	HideSelfView(): undefined;
	/** Prompts the given `Player` with the invite screen. */
	PromptGameInvite(player?: Instance, experienceInviteOptions?: Instance): undefined;
	/** Prompts the given `Player` with the phone book. */
	PromptPhoneBook(player?: Instance, tag?: string): undefined;
	/** Shows the calling player's self view. */
	ShowSelfView(selfViewPosition?: Enum.SelfViewPosition): undefined;
	/** Indicates whether the given `Player` can invite other players to a call. */
	CanSendCallInviteAsync(player?: Instance): boolean;
	/** Indicates whether the given `Player` can invite other players. */
	CanSendGameInviteAsync(player?: Instance, recipientId?: number): boolean;
	/** Returns the local player's RSVP status for the given event. */
	GetEventRsvpStatusAsync(eventId?: string): Enum.RsvpStatus;
	/**
	 * Returns details for the specified experience event or `nil` if it is unavailable.
	 */
	GetExperienceEventAsync(eventId?: string): unknown;
	/**
	 * Returns an array of dictionaries containing data for all members of the specified party who are currently in the experience.
	 */
	GetPartyAsync(partyId?: string): unknown;
	/** Returns active and upcoming experience events for the current experience. */
	GetUpcomingExperienceEventsAsync(): unknown;
	/** Prompts the player to submit feedback about the current experience. */
	PromptFeedbackSubmissionAsync(): undefined;
	/** @deprecated Deprecated. */
	PromptLinkSharing(player?: Player, options?: unknown): unknown;
	PromptLinkSharingAsync(player?: Player, options?: unknown): unknown;
	/**
	 * Prompts the local `Player` with a prompt to change their RSVP status to the given event.
	 */
	PromptRsvpToEventAsync(eventId?: string): Enum.RsvpStatus;
	/** Fires when a player's call invite state changes. */
	readonly CallInviteStateChanged: RBXScriptSignal<(player: Instance, inviteState: Enum.InviteState) => void>;
	/** Fires when a player closes an invite prompt. */
	readonly GameInvitePromptClosed: RBXScriptSignal<(player: Instance, recipientIds: unknown) => void>;
	/** Fires when a player closes the phone book prompt. */
	readonly PhoneBookPromptClosed: RBXScriptSignal<(player: Instance) => void>;
	readonly ShareSheetClosed: RBXScriptSignal<(player: Player) => void>;
	/** Callback for when a call is placed from the phone book. */
	OnCallInviteInvoked?: (tag?: string, callParticipantIds?: unknown) => Instance;
}

/**
 * An object that emits sound. This object can be placed within a `BasePart` or `Attachment` to emit a sound from a particular position within a place or world, or it can be attached elsewhere to play the sound at a constant volume throughout the entire place.
 */
interface Sound extends Instance {
	AcousticSimulationEnabled: boolean;
	/**
	 * The minimum distance, in studs, at which a 3D `Sound` (direct child of a `BasePart` or `Attachment`) will begin to attenuate (decrease in volume).
	 * @deprecated Deprecated.
	 */
	EmitterSize: number;
	/**
	 * This property is `true` when the `Sound` has loaded from Roblox servers and is ready to play.
	 */
	IsLoaded: boolean;
	/**
	 * A range denoting a desired loop start and loop end within the `PlaybackRegion`, in seconds.
	 */
	LoopRegion: NumberRange;
	/** Sets whether or not the `Sound` repeats once it has finished playing. */
	Looped: boolean;
	/**
	 * The maximum distance, in studs, a client's listener can be from the `Sound\s` origin and still hear it. Only applies to Sounds parented to a `Part` or `Attachment` (3D sounds).
	 * @deprecated Deprecated.
	 */
	MaxDistance: number;
	/**
	 * The minimum distance at which a 3D `Sound` (direct child of a `BasePart` or `Attachment`) will begin to attenuate. Effectively, the emitter size.
	 * @deprecated Deprecated.
	 */
	MinDistance: number;
	/**
	 * Sets how high pitched and fast a `Sound` is when it is played. The greater the integer, the higher and faster the `Sound` is.
	 * @deprecated Deprecated.
	 */
	Pitch: number;
	/** When `true`, the `Sound` will play when it is removed from the experience. */
	PlayOnRemove: boolean;
	/**
	 * A number between `0` and `1000` indicating how loud the `Sound` is currently playing back.
	 */
	PlaybackLoudness: number;
	/**
	 * A range denoting a desired start and stop time within the `TimeLength`, in seconds.
	 */
	PlaybackRegion: NumberRange;
	/**
	 * If `true`, this property gives your `Sound` access to the `PlaybackRegion` and `LoopRegion` properties which can more-accurately control its playback.
	 */
	PlaybackRegionsEnabled: boolean;
	/**
	 * Determines the speed at which a `Sound` will play, with higher values causing the sound to play faster and at a higher pitch.
	 */
	PlaybackSpeed: number;
	/** Indicates whether the `Sound` is currently playing. */
	Playing: boolean;
	/**
	 * The maximum distance, in studs, a client's listener can be from the sound's origin and still hear it. Only applies to `Sounds` parented to a `BasePart` or `Attachment`.
	 */
	RollOffMaxDistance: number;
	/**
	 * The minimum distance, in studs, at which a `Sound` which is parented to a `BasePart` or `Attachment` will begin to attenuate (decrease in volume).
	 */
	RollOffMinDistance: number;
	/**
	 * Controls how the volume of a `Sound` which is parented to a `BasePart` or `Attachment` attenuates (fades out) as the distance between the listener and parent changes.
	 */
	RollOffMode: Enum.RollOffMode;
	/** The `SoundGroup` that is linked to this `Sound`. */
	SoundGroup: SoundGroup;
	/** Content ID of the sound file to associate with the `Sound`. */
	SoundId: ContentId;
	/** The length of the `Sound` in seconds. */
	TimeLength: number;
	/**
	 * Progress of the `Sound` in seconds. Can be changed to move the playback position of the `Sound` both before and during playback.
	 */
	TimePosition: number;
	/** The volume of the `Sound`. */
	Volume: number;
	/** @deprecated Deprecated. */
	isPlaying: boolean;
	/** Pauses playback of the `Sound` if it is playing. */
	Pause(): undefined;
	/** Plays the `Sound`. */
	Play(): undefined;
	/** Resumes the `Sound`. */
	Resume(): undefined;
	/** Stops the `Sound`. */
	Stop(): undefined;
	/** @deprecated Deprecated. */
	pause(): undefined;
	/** @deprecated Deprecated. */
	play(): undefined;
	/** @deprecated Deprecated. */
	stop(): undefined;
	/** Fires whenever the `Sound` loops. */
	readonly DidLoop: RBXScriptSignal<(soundId: string, numOfTimesLooped: number) => void>;
	/** Fires when the `Sound` has completed playback and stopped. */
	readonly Ended: RBXScriptSignal<(soundId: string) => void>;
	/** Fires when the `Sound` is loaded. */
	readonly Loaded: RBXScriptSignal<(soundId: string) => void>;
	/** Fires whenever the `Sound` is paused using `Pause()`. */
	readonly Paused: RBXScriptSignal<(soundId: string) => void>;
	/** Fires whenever the `Sound` is played using `Play()`. */
	readonly Played: RBXScriptSignal<(soundId: string) => void>;
	/** Fires when the `Sound` is resumed using `Resume()`. */
	readonly Resumed: RBXScriptSignal<(soundId: string) => void>;
	/** Fires when the `Sound` is stopped through using `Stop()`. */
	readonly Stopped: RBXScriptSignal<(soundId: string) => void>;
}

/**
 * SoundEffect is the base class that all other sound effects derive from. A SoundEffect can be applied to either a `Sound` or `SoundGroup` by being parented to either.
 */
interface SoundEffect extends Instance {
	/** Toggles the effect on and off. */
	Enabled: boolean;
	/** Determines the order the effect will be applied in relation to other effects. */
	Priority: number;
}

/**
 * Makes audio more voluminous by simulating multiple voices playing the same part.
 */
interface ChorusSoundEffect extends SoundEffect {
	/** Controls how intense the effect is. */
	Depth: number;
	/** Percentage of the original sound that will be applied to the filter. */
	Mix: number;
	/** How frequently the pitch variation changes. */
	Rate: number;
}

/** Adjusts the dynamic range of audio. */
interface CompressorSoundEffect extends SoundEffect {
	/**
	 * The time the effect takes to become active after its `Threshold` has been reached.
	 */
	Attack: number;
	/**
	 * The overall amplification applied to the effect's `Sound` or `SoundGroup` after attenuation of sounds above the threshold.
	 */
	GainMakeup: number;
	/** The ratio between the `SideChain` sound effect, and this sound effect. */
	Ratio: number;
	/**
	 * The time the effect takes to become inactive after its sound is below the `Threshold`.
	 */
	Release: number;
	/**
	 * Applies a ducking effect to the compressor sound effect. The behavior of the sidechain depends on the `Sound` or `SoundGroup` linked to it.
	 */
	SideChain: Instance;
	/** Volume level at which point the compressor applies its effect. */
	Threshold: number;
}

interface CustomSoundEffect extends SoundEffect {
}

interface AssetSoundEffect extends CustomSoundEffect {
}

interface ChannelSelectorSoundEffect extends CustomSoundEffect {
	Channel: number;
}

/** Distorts audio, making it sound fuzzier and overdriven. */
interface DistortionSoundEffect extends SoundEffect {
	/** The intensity of the effect. */
	Level: number;
}

/** Adds delayed repetitions of a sound with diminishing volume. */
interface EchoSoundEffect extends SoundEffect {
	/** The amount of time between echoes. */
	Delay: number;
	/** The output volume of the original sound. */
	DryLevel: number;
	/** The echo decay every time the echo plays. */
	Feedback: number;
	/** The output volume of the echoed effect. */
	WetLevel: number;
}

/** Controls the volume of incoming audio across three frequency ranges. */
interface EqualizerSoundEffect extends SoundEffect {
	/** The output volume of frequencies greater than 4000 Hz. */
	HighGain: number;
	/** The output volume of frequencies lower than 400 Hz. */
	LowGain: number;
	/** The output volume of frequencies between 400 and 4000 Hz. */
	MidGain: number;
}

/** Creates a sweeping or swooshing effect on a sound. */
interface FlangeSoundEffect extends SoundEffect {
	/** The intensity of the effect. */
	Depth: number;
	/** Percentage of the original sound that will be applied to the filter. */
	Mix: number;
	/** The frequency that the effect oscillates at. */
	Rate: number;
}

/** Adjusts the pitch of a sound without changing its playback speed. */
interface PitchShiftSoundEffect extends SoundEffect {
	/** The percentage to shift the original pitch. */
	Octave: number;
}

/** Reverberates audio, simulating the effect of bouncing off walls in a room. */
interface ReverbSoundEffect extends SoundEffect {
	/** Sets how long it takes for the reverberating echoes to fade out completely. */
	DecayTime: number;
	/** Controls how many reflections are generated. */
	Density: number;
	/** Controls how smooth and reflective the simulated surfaces are. */
	Diffusion: number;
	/** The output volume of the original sound. */
	DryLevel: number;
	/** The output volume of the echoed effect. */
	WetLevel: number;
}

/**
 * Creates a trembling effect on a sound by varying the volume of the sound up and down.
 */
interface TremoloSoundEffect extends SoundEffect {
	/** Controls how much the volume will raise and lower. */
	Depth: number;
	/** Controls how long during one volume oscillation the effect will be active. */
	Duty: number;
	/** Sets how often the effect will oscillate the volume. */
	Frequency: number;
}

/**
 * A `SoundGroup` is used to manage the volume and sound effects on multiple `Sounds` at once. `Sounds` in the SoundGroup will have their volume and effects adjusted by the SoundGroup.
 */
interface SoundGroup extends Instance {
	/** The volume multiplier applied to `Sounds` that are in the `SoundGroup`. */
	Volume: number;
}

/**
 * A service that determines various aspects of how the audio engine works. Most of its properties affect how `Sounds` play in the experience.
 */
interface SoundService extends Instance {
	/**
	 * Determines whether acoustic simulation is enabled globally in the advanced audio system.
	 */
	AcousticSimulationEnabled: boolean;
	/** The ambient sound environment preset applied to all `Sounds`. */
	AmbientReverb: Enum.ReverbType;
	/**
	 * Determines whether the default character sounds will use instances in the advanced audio system vs. `Sounds`.
	 */
	CharacterSoundsUseNewApi: Enum.RolloutState;
	/** Determines where (if anywhere) to place an `AudioListener` by default. */
	DefaultListenerLocation: Enum.ListenerLocation;
	/**
	 * The number of studs to be considered a meter by `SoundService` when simulating the Doppler effect for `Sounds`.
	 */
	DistanceFactor: number;
	/** Degree to which the pitch of a `Sound` varies due to the Doppler effect. */
	DopplerScale: number;
	/** Sets whether `Sound` playback from a client will replicate to the server. */
	RespectFilteringEnabled: boolean;
	/**
	 * Determines how fast the volume of a `Sound` attenuates beyond its `Sound.RollOffMinDistance`.
	 */
	RolloffScale: number;
	/**
	 * Returns the current listener type used by `Sounds`, as well as what that listener is currently set to.
	 */
	GetListener(): unknown;
	/**
	 * Opens the attenuation curve editor in Studio for the provided `AudioEmitter` or `AudioListener` instances.
	 */
	OpenAttenuationCurveEditor(selectedCurveObjects?: Instance[]): undefined;
	/**
	 * Opens the directional curve editor in Studio for the provided `AudioEmitter` or `AudioListener` instances.
	 */
	OpenDirectionalCurveEditor(selectedCurveObjects?: Instance[]): undefined;
	/**
	 * Plays a copy of a `Sound` locally, such that it will only be heard by the client calling this method.
	 */
	PlayLocalSound(sound?: Instance): undefined;
	/** Sets the listener used by `Sounds`. */
	SetListener(listenerType?: Enum.ListenerType, listener?: unknown): undefined;
}

interface SoundShimService extends Instance {
}

/** A particle emitter with the visual aesthetic of sparkles. */
interface Sparkles extends Instance {
	/** Determines whether sparkles are emit. */
	Enabled: boolean;
	/** Determines the color of the sparkle particles. */
	SparkleColor: Color3;
	TimeScale: number;
}

/**
 * An internal service that is responsible for the behavior of `SpawnLocations`. Its functionality is not accessible to developers.
 */
interface SpawnerService extends Instance {
}

interface StackFrame extends Instance {
}

interface StandalonePluginScripts extends Instance {
}

interface StartPageService extends Instance {
}

/**
 * If the game allows gear, StarterGear contains all of a player's appropriate gear. Whenever the player's character spawns, all of the contents of that player's StarterGear will get copied into the player's `Backpack`.
 */
interface StarterGear extends Instance {
}

/**
 * A service-level container whose contents are copied into each player's `Backpack` when the player spawns. It is generally used to hold `Tools`, but is sometimes used to hold `LocalScripts` to ensure that each player gets a copy.
 */
interface StarterPack extends Instance {
}

/**
 * A service which allows the defaults of properties in the `Player` object to be set.
 */
interface StarterPlayer extends Instance {
	/**
	 * Sets whether the character will automatically jump when hitting an obstacle on a mobile device.
	 */
	AutoJumpEnabled: boolean;
	/**
	 * The maximum distance the player's default camera is allowed to zoom out in studs.
	 */
	CameraMaxZoomDistance: number;
	/**
	 * The minimum distance in studs the player's default camera is allowed to zoom in.
	 */
	CameraMinZoomDistance: number;
	/** Changes the default camera's mode to either first or third person. */
	CameraMode: Enum.CameraMode;
	/**
	 * Determines the starting value of `Humanoid.BreakJointsOnDeath` for `Player.Character`.
	 */
	CharacterBreakJointsOnDeath: boolean;
	/** Determines the starting value of `Humanoid.JumpHeight` for `Player.Character`. */
	CharacterJumpHeight: number;
	/** Determines the starting value of `Humanoid.JumpPower` for `Player.Character`. */
	CharacterJumpPower: number;
	/**
	 * Determines the starting value of `Humanoid.MaxSlopeAngle` for `Player.Character`.
	 */
	CharacterMaxSlopeAngle: number;
	/**
	 * Determines the starting state of `Humanoid.UseJumpPower` for `Player.Character`.
	 */
	CharacterUseJumpPower: boolean;
	/** Determines the starting value of `Humanoid.WalkSpeed` for `Player.Character`. */
	CharacterWalkSpeed: number;
	ClassicDeath: boolean;
	/** Sets how the default camera handles objects between the camera and the player. */
	DevCameraOcclusionMode: Enum.DevCameraOcclusionMode;
	/** Lets you overwrite the player's camera mode on a computer. */
	DevComputerCameraMovementMode: Enum.DevComputerCameraMovementMode;
	/** Lets you overwrite the player's movement mode on a computer. */
	DevComputerMovementMode: Enum.DevComputerMovementMode;
	/** Lets you overwrite the player's camera mode on a touch-enabled device. */
	DevTouchCameraMovementMode: Enum.DevTouchCameraMovementMode;
	/** Lets you overwrite the player's movement mode on a touch-enabled device. */
	DevTouchMovementMode: Enum.DevTouchMovementMode;
	/** Determines if a player can toggle mouse lock by default. */
	EnableMouseLockOption: boolean;
	/**
	 * Sets the distance at which this player will see other `Humanoid` health bars. If set to 0, the health bars will not be displayed.
	 */
	HealthDisplayDistance: number;
	/** Whether or not the appearance of a player's character should be loaded. */
	LoadCharacterAppearance: boolean;
	LuaCharacterController: Enum.CharacterControlMode;
	/** Sets the distance at which this player will see other `Humanoid` names. */
	NameDisplayDistance: number;
	/** Determines if user-owned emotes are loaded when loading avatars. */
	UserEmotesEnabled: boolean;
}

/**
 * A container for objects to be copied to a Player's PlayerScripts when they join a game.
 */
interface StarterPlayerScripts extends Instance {
}

/** Stores instances to be parented to a player's character when it spawns. */
interface StarterCharacterScripts extends StarterPlayerScripts {
}

interface StartupMessageService extends Instance {
}

/** Performance metrics for a game. */
interface Stats extends Instance {
	/** A measurement of how many parts are currently in contact with one another. */
	ContactsCount: number;
	/**
	 * In a networked game, this describes roughly how many kilobytes of data are being received by the current instance, per second.
	 */
	DataReceiveKbps: number;
	/**
	 * In a networked game, this describes roughly how many kilobytes of data are being sent by the current instance, per second.
	 */
	DataSendKbps: number;
	/**
	 * A measurement of how long it takes for the engine to process all tasks required to render a frame.
	 */
	FrameTime: number;
	/**
	 * A measurement of the total amount of time it takes for the server to update its task scheduler jobs in seconds.
	 */
	HeartbeatTime: number;
	/**
	 * A measurement of the total amount of time it takes long it takes for Roblox to update all of its task scheduler jobs, in milliseconds.
	 * @deprecated Deprecated.
	 */
	HeartbeatTimeMs: number;
	/** A measurement of how many `Instance` are currently in memory. */
	InstanceCount: number;
	/**
	 * An indication of whether memory tracking is enabled. This is guaranteed to be unchanged until the next time the Client is started.
	 */
	MemoryTrackingEnabled: boolean;
	/**
	 * A measurement of how many physically simulated components are currently moving in the game world.
	 */
	MovingPrimitivesCount: number;
	/**
	 * In a networked game, this describes roughly how many kilobytes of physics data are being received by the current instance, per second.
	 */
	PhysicsReceiveKbps: number;
	/**
	 * In a networked game, this describes roughly how many kilobytes of physics data are being sent by the current instance, per second.
	 */
	PhysicsSendKbps: number;
	/**
	 * A measurement of how long it takes for the physics engine to update its current state.
	 */
	PhysicsStepTime: number;
	/**
	 * A measurement of how long it takes for the physics engine to update its current state, in milliseconds. If this value is high, then it means the game instance is under stress from the physics simulations taking place.
	 * @deprecated Deprecated.
	 */
	PhysicsStepTimeMs: number;
	/**
	 * A measurement of how many physically simulated components currently exist in the game world.
	 */
	PrimitivesCount: number;
	/**
	 * A measurement of how long it takes for the CPU to process all of its rendering tasks for a frame.
	 */
	RenderCPUFrameTime: number;
	/**
	 * A measurement of how long it takes for the GPU to process all of its tasks required to render a frame.
	 */
	RenderGPUFrameTime: number;
	/** A measurement of the number of draw calls made by the game's current scene. */
	SceneDrawcallCount: number;
	/** A measurement of the number of triangles rendered by the game's current scene. */
	SceneTriangleCount: number;
	/**
	 * A measurement of the number of draw calls being made for shadows by the game's current scene.
	 */
	ShadowsDrawcallCount: number;
	/**
	 * A measurement of the number of triangles rendered as shadows in the game's current scene.
	 */
	ShadowsTriangleCount: number;
	/**
	 * A measurement of the number of 2D draw calls made for UI elements in the game's current scene.
	 */
	UI2DDrawcallCount: number;
	/**
	 * A measurement of the number of triangles that are being rendered for 2D UI elements in the game's current scene.
	 */
	UI2DTriangleCount: number;
	/**
	 * A measurement of the number of 3D draw calls made for UI elements in the game's current scene.
	 */
	UI3DDrawcallCount: number;
	/**
	 * A measurement of the number of triangles being rendered for 3D UI elements in the game's current scene.
	 */
	UI3DTriangleCount: number;
	GetHarmonyQualityLevel(): number;
	GetMemoryCategoryNames(): unknown;
	/**
	 * Returns the number of megabytes that are being consumed by all available categories, or an empty array if `MemoryTrackingEnabled` is `false`.
	 */
	GetMemoryUsageMbAllCategories(): unknown;
	/**
	 * Returns the number of megabytes that are being consumed in the specified `Enum.DeveloperMemoryTag` category, or `0` if `MemoryTrackingEnabled` is `false`.
	 */
	GetMemoryUsageMbForTag(tag?: Enum.DeveloperMemoryTag): number;
	/**
	 * Returns the total amount of memory being consumed by the current game session, in megabytes.
	 */
	GetTotalMemoryUsageMb(): number;
	ResetHarmonyMemoryTarget(): undefined;
	SetHarmonyMemoryTarget(targetMB?: number): undefined;
}

/** A single performance metric. */
interface StatsItem extends Instance {
	/** Returns the StatsItem's value. */
	GetValue(): number;
	/** Returns the StatsItem's value as a formatted string. */
	GetValueString(): string;
}

/** Measures the runtime average of a **double** value. */
interface RunningAverageItemDouble extends StatsItem {
}

/** Measures the runtime average of an **integer** value. */
interface RunningAverageItemInt extends StatsItem {
}

/** Measures the runtime average of a time interval value. */
interface RunningAverageTimeIntervalItem extends StatsItem {
}

/** Measures a total-count-over-time interval. */
interface TotalCountTimeIntervalItem extends StatsItem {
}

interface StopWatchReporter extends Instance {
}

interface Studio extends Instance {
	ActionOnStopSync: Enum.ActionOnStopSync;
	["Active Color"]: Color3;
	["Active Hover Over Color"]: Color3;
	/**
	 * If set to true, Roblox Studio will attempt to transfer script changes that were made during a Play Solo session to the opened place.
	 */
	["Always Save Script Changes"]: boolean;
	/**
	 * If set to true, the hover selection box that is shown when mousing over selectable objects in the `Workspace` will flash between `Hover Over Color` and `Select Color` based on the `Hover Animate Speed`.
	 */
	["Animate Hover Over"]: boolean;
	["Auto Clean Empty Line"]: boolean;
	["Auto Closing Brackets"]: boolean;
	["Auto Closing Quotes"]: boolean;
	["Auto Delete Closing Brackets and Quotes"]: boolean;
	["Auto Indent Rule"]: Enum.AutoIndentRule;
	["Auto-Recovery Enabled"]: boolean;
	["Auto-Recovery Interval (Minutes)"]: number;
	/** Specifies the background color of Roblox Studio's script editor. */
	["Background Color"]: Color3;
	/** Sets the scrolling mode of the `Advanced Objects` tab in Roblox Studio. */
	["Basic Objects Display Mode"]: Enum.ListDisplayMode;
	["Bool Color"]: Color3;
	["Bracket Color"]: Color3;
	/** Sets the color of built-in functions and keywords in the script editor. */
	["Built-in Function Color"]: Color3;
	/**
	 * Sets how many studs the camera will move forward or backwards when using the mouse wheel.
	 */
	["Camera Mouse Wheel Speed"]: number;
	/**
	 * Sets the speed in studs/sec that the camera moves while holding down Shift with the movement keys.
	 */
	["Camera Shift Speed"]: number;
	/**
	 * Sets the speed in studs/sec that the camera moves when movement keys are pressed.
	 */
	["Camera Speed"]: number;
	["Camera Speed Adjust Binding"]: Enum.CameraSpeedAdjustBinding;
	["Camera Zoom to Mouse Position"]: boolean;
	/**
	 * If set to true, the output will be automatically cleared when game sessions are switched.
	 */
	["Clear Output On Start"]: boolean;
	CommandBarLocalState: boolean;
	/** Specifies the color of comments in Roblox Studio's script editor. */
	["Comment Color"]: Color3;
	["Current Line Highlight Color"]: Color3;
	["Debugger Current Line Color"]: Color3;
	["Debugger Error Line Color"]: Color3;
	/**
	 * If set to true, deprecated objects will be shown in the Advanced Objects window, as well as the Object Browser.
	 */
	DeprecatedObjectsShown: boolean;
	/**
	 * When set to true, the script editor and command bar will show an autocomplete menu while writing.
	 */
	["Enable Autocomplete"]: boolean;
	["Enable CoreScript Debugger"]: boolean;
	["Enable Http Sandboxing"]: boolean;
	["Enable Internal Beta Features"]: boolean;
	["Enable Internal Features"]: boolean;
	["Enable Temporary Tabs"]: boolean;
	["Enable Temporary Tabs In Explorer"]: boolean;
	/**
	 * Specifies the color of the wavy underline shown when malformed code is detected in the script editor.
	 */
	["Error Color"]: Color3;
	/**
	 * Sets the highlight color of matches in the script editor's Find Selection operation (Ctrl+F).
	 */
	["Find Selection Background Color"]: Color3;
	/** Specifies the font used in the script editor. */
	Font: QFont;
	["Format On Paste"]: boolean;
	["Format On Type"]: boolean;
	["Function Name Color"]: Color3;
	["Highlight Current Line"]: boolean;
	["Highlight Occurances"]: boolean;
	HintColor: Color3;
	/**
	 * Specifies how frequently the hover animation flashes when the mouse is hovering over a selectable object in the `Workspace`.
	 */
	["Hover Animate Speed"]: Enum.HoverAnimateSpeed;
	/** Specifies the color that the hover selection box uses. */
	["Hover Over Color"]: Color3;
	["Indent Using Spaces"]: boolean;
	InformationColor: Color3;
	/** Sets the text color of built-in Luau keywords. */
	["Keyword Color"]: Color3;
	/**
	 * Sets the thickness of the `Model.PrimaryPart` selection adornee. This value is constrained between 0 and 0.05.
	 */
	["Line Thickness"]: number;
	readonly LocalAssetsFolder: QDir;
	/** Specifies whether or not the Lua Debugger feature is enabled. */
	LuaDebuggerEnabled: boolean;
	["Luau Keyword Color"]: Color3;
	/** Sets the highlight color of double-clicked variables in the script editor. */
	["Matching Word Background Color"]: Color3;
	/** The maximum number of lines that can be displayed in the output. */
	["Maximum Output Lines"]: number;
	["Menu Item Background Color"]: Color3;
	["Method Color"]: Color3;
	/** Specifies the color of numbers in Roblox Studio's script editor. */
	["Number Color"]: Color3;
	/**
	 * If set to true, audio being played will only be heard if the game window is being focused on.
	 */
	["Only Play Audio from Window in Focus"]: boolean;
	/** Sets the text color of operator characters in the script editor. */
	["Operator Color"]: Color3;
	/** Specifies the font used by the output. */
	["Output Font"]: QFont;
	/** Sets the layout mode of the output. */
	["Output Layout Mode"]: Enum.OutputLayoutMode;
	/**
	 * Sets the highest permission level that APIs have to have in order to be shown in the Object Browser. See `Enum.PermissionLevelShown` for more info.
	 */
	PermissionLevelShown: Enum.PermissionLevelShown;
	PluginDebuggingEnabled: boolean;
	/** The directory where local plugins are stored. */
	PluginsDir: QDir;
	["Primary Text Color"]: Color3;
	["Property Color"]: Color3;
	/**
	 * When set to true, Roblox Studio shortcuts will take priority over inputs being captured in the game window.
	 */
	["Respect Studio shortcuts when game has focus"]: boolean;
	["Ruler Color"]: Color3;
	Rulers: string;
	RuntimeUndoBehavior: Enum.RuntimeUndoBehavior;
	/** The time (in seconds) a script can wait to be resumed before timing out. */
	ScriptTimeoutLength: number;
	["Script Editor Color Preset"]: Enum.StudioScriptEditorColorPresets;
	["Script Editor Scrollbar Background Color"]: Color3;
	["Script Editor Scrollbar Handle Color"]: Color3;
	["Scroll Past Last Line"]: boolean;
	["Secondary Text Color"]: Color3;
	/** The color of the selection box used with object selections in the `Workspace`. */
	["Select Color"]: Color3;
	/** Sets the color of the `Model.PrimaryPart` selection box. */
	["Select/Hover Color"]: Color3;
	["Selected Menu Item Background Color"]: Color3;
	["Selected Text Color"]: Color3;
	/** Sets the background color of selected text in the script editor. */
	["Selection Background Color"]: Color3;
	/** Sets the text color of selected text in the script editor. */
	["Selection Color"]: Color3;
	["Set Pivot of Imported Parts"]: boolean;
	/**
	 * If set to true, the `CoreGui` will be visible in the Explorer while the game is running.
	 */
	["Show Core GUI in Explorer while Playing"]: boolean;
	/** If set to true, basic diagnostic information is shown in the bottom right. */
	["Show Diagnostics Bar"]: boolean;
	["Show FileSyncService"]: boolean;
	["Show Hidden Objects in Explorer"]: boolean;
	/**
	 * If set to true, hovering over an object in the `Workspace` will show a selection box.
	 */
	["Show Hover Over"]: boolean;
	/**
	 * When set to true, the navigation mesh used by the `PathfindingService` will be visualized.
	 */
	["Show Navigation Mesh"]: boolean;
	/**
	 * When set to true, the `PluginGuiService` will be shown in Roblox Studio's explorer.
	 */
	["Show Plugin GUI Service in Explorer"]: boolean;
	["Show Whitespace"]: boolean;
	["Show plus button on hover in Explorer"]: boolean;
	["Skip Closing Brackets and Quotes"]: boolean;
	/** Specifies the color of strings in the script editor. */
	["String Color"]: Color3;
	[""TODO" Color"]: Color3;
	/** Specifies how many spaces are used to represent a tab in the script editor. */
	["Tab Width"]: number;
	/** Specifies the color of normal text in the script editor. */
	["Text Color"]: Color3;
	/** If set to true, text in the script editor will be wrapped. */
	["Text Wrapping"]: boolean;
	/** Used to get/set current `theme` used by Studio. */
	Theme: Instance;
	/**
	 * Specifies the color of the wavy underline shown when the script analyzer picks up a problem that should be addressed in the script editor.
	 */
	["Warning Color"]: Color3;
	["Whitespace Color"]: Color3;
	[""function" Color"]: Color3;
	[""local" Color"]: Color3;
	[""nil" Color"]: Color3;
	[""self" Color"]: Color3;
	/** Returns a list of `themes` available in Studio. */
	GetAvailableThemes(): unknown;
	/** Event called when Studio's `theme` changes. */
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

/**
 * Provides access to configuration of Roblox Studio and allows importing files from the user's file system.
 */
interface StudioService extends Instance {
	/** Reflects the `LuaSourceContainer` currently being edited (if any). */
	ActiveScript: Instance;
	DraggerSolveConstraints: boolean;
	/** @deprecated Deprecated. */
	DrawConstraintsOnTop: boolean;
	/**
	 * Determines the distance in studs by which Studio's drag and move tools move objects each tick.
	 */
	GridSize: number;
	/**
	 * Determines the degrees by which Studio's rotation tool will rotate selected objects each tick.
	 */
	RotateIncrement: number;
	ShowConstraintDetails: boolean;
	/** The locale currently in-use by Studio, e.g. `en_US`. */
	StudioLocaleId: string;
	/**
	 * Determines whether Studio tools will use local space of an object or global space.
	 */
	UseLocalSpace: boolean;
	/** Provides a dictionary that allows the display of a class' Explorer window icon. */
	GetClassIcon(className?: string): unknown;
	/** Returns the Studio user's userId if they're logged in, otherwise returns 0. */
	GetUserId(): number;
	GizmoRaycast(origin: Vector3, direction: Vector3, raycastParams?: RaycastParams): RaycastResult?;
	/**
	 * Prompts the current Studio user to select one file to add as a `File`.
	 * @deprecated Deprecated.
	 */
	PromptImportFile(fileTypeFilter?: unknown): Instance;
	/** Prompts the current Studio user to select one file to add as a `File`. */
	PromptImportFileAsync(fileTypeFilter?: unknown): Instance;
	/**
	 * Prompts the current Studio user to select files to add as `Files`.
	 * @deprecated Deprecated.
	 */
	PromptImportFiles(fileTypeFilter?: unknown): Instance[];
	/** Prompts the current Studio user to select files to add as `Files`. */
	PromptImportFilesAsync(fileTypeFilter?: unknown): Instance[];
}

/** Service allowing plugins to automate and customize Test and Run mode testing. */
interface StudioTestService extends Instance {
	EndTest(value?: unknown): undefined;
	GetTestArgs(): unknown;
	ExecutePlayModeAsync(args?: unknown): unknown;
	ExecuteRunModeAsync(args?: unknown): unknown;
}

interface StudioTheme extends Instance {
	/** Returns the color corresponding to the arguments provided. */
	GetColor(styleguideitem?: Enum.StudioStyleGuideColor, modifier?: Enum.StudioStyleGuideModifier): Color3;
}

interface StudioUserService extends Instance {
}

interface StudioWidgetsService extends Instance {
}

/** The base class for `StyleSheet` and `StyleRule`. */
interface StyleBase extends Instance {
	/** Returns an array of associated `StyleRules`. */
	GetStyleRules(): Instance[];
	/** Inserts a new `StyleRule` into the array of rules. */
	InsertStyleRule(rule?: StyleRule, priority?: unknown): undefined;
	/**
	 * Similar to `InsertStyleRule()` but lets you declare and set multiple `StyleRules` at once.
	 */
	SetStyleRules(rules?: Instance[]): undefined;
	/**
	 * Fires when one or more `StyleRules` is explicitly changed on the connected `StyleSheet` or `StyleRule`.
	 */
	readonly StyleRulesChanged: RBXScriptSignal<() => void>;
}

/**
 * Defines style properties which override properties on the instances affected by the `Selector` property.
 */
interface StyleRule extends StyleBase {
	/**
	 * A number that determines how properties of the `StyleRule` apply relative to the same properties in other `StyleRules`. Higher priority values take precedence over lower.
	 */
	Priority: number;
	/** A string specifying which instances the `StyleRule` should affect. */
	Selector: string;
	/** A read-only string that displays errors from the `Selector` property. */
	SelectorError: string;
	/**
	 * Returns a dictionary of key-value pairs describing the properties of the `StyleRule`.
	 */
	GetProperties(): unknown;
	/** Returns the value of a specific property in the `StyleRule`. */
	GetProperty(name?: string): unknown;
	GetPropertyTransitions(): unknown;
	/** Lets you declare and set multiple properties of the `StyleRule` at once. */
	SetProperties(styleProperties?: unknown): undefined;
	SetProperty(name?: string, value?: unknown): undefined;
	SetPropertyTransitions(properties?: unknown): undefined;
}

/**
 * Aggregates `StyleRules` and can be linked to `DataModel` trees to apply style properties to instances.
 */
interface StyleSheet extends StyleBase {
	/**
	 * Returns an array of other `StyleSheets` from which the `StyleSheet` is deriving `StyleRules` and token definitions.
	 */
	GetDerives(): Instance[];
	/**
	 * Sets the `StyleSheet` to derive `StyleRules` and token definitions from one or more other `StyleSheets`.
	 */
	SetDerives(derives?: Instance[]): undefined;
}

/**
 * When parented to a `StyleSheet`, references another `StyleSheet` from which the parent inherits `StyleRules` and token definitions.
 */
interface StyleDerive extends Instance {
	/**
	 * A number that determines how style properties inherited through this `StyleDerive` apply relative to the same properties inherited through other `StyleDerives`.
	 */
	Priority: number;
	/**
	 * The `StyleSheet` from which the parent `StyleSheet` inherits `StyleRules` and token definitions.
	 */
	StyleSheet: StyleSheet;
}

/**
 * Links a `StyleSheet` to the instance tree whose root is the parent of the `StyleLink`.
 */
interface StyleLink extends Instance {
	/**
	 * The `StyleSheet` to link to the parent such that the parent's descendants are styled accordingly.
	 */
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

/**
 * An object that allows developers to override the appearance of a MeshPart with advanced graphics options.
 */
interface SurfaceAppearance extends Instance {
	/** Determines how the alpha channel of the `SurfaceAppearance.ColorMap` is used. */
	AlphaMode: Enum.AlphaMode;
	/**
	 * Applies a tint to your existing colormap. Set directly with color picker or programmatically with `Color3`.
	 */
	Color: Color3;
	/** Determines the color and opacity of the surface. */
	ColorMap: ContentId;
	/** Determines the emissivity across the surface. */
	EmissiveMaskContent: Content;
	/** Determines the strength of emissive contribution. */
	EmissiveStrength: number;
	/** Determines the tinting color for emissive contribution. */
	EmissiveTint: Color3;
	/** Determines which parts of the surface are metal or non-metal. */
	MetalnessMap: ContentId;
	/**
	 * Modifies the lighting of the surface by adding bumps, dents, cracks, and curves.
	 */
	NormalMap: ContentId;
	/** Determines the apparent roughness across the surface. */
	RoughnessMap: ContentId;
}

interface SystemThemeService extends Instance {
}

/** Collection of settings for the _Task Scheduler_ feature. */
interface TaskScheduler extends Instance {
	/** The average time divided by the average interval of the duty cycle. */
	SchedulerDutyCycle: number;
	/** The current average rate of the task scheduler. */
	SchedulerRate: number;
	/** The specified thread pooling configuration for the task scheduler. */
	ThreadPoolConfig: Enum.ThreadPoolConfig;
	/** The current size of the thread pool. */
	ThreadPoolSize: number;
}

/**
 * The `Team` class represents a faction in a Roblox place. The only valid parent for a Team is in the `Teams` service.
 */
interface Team extends Instance {
	/**
	 * This property determines whether `Players` will be automatically placed onto the `Team` when joining. If multiple teams have this property set to true, Roblox will attempt to even the teams out when `Players` are added.
	 */
	AutoAssignable: boolean;
	/**
	 * Deprecated and no longer functional. Historically set whether or not `Player` character models on a team would be colored to `Team.TeamColor`.
	 * @deprecated Deprecated.
	 */
	AutoColorCharacters: boolean;
	/**
	 * This property can be used to store an integer value associated with the team. This property offers no additional functionality and is not used by any game services.
	 * @deprecated Deprecated.
	 */
	Score: number;
	/**
	 * This property sets the color of the `Team`. Determines the `Player.TeamColor` property of players who are a member of the team. Also determines the color displayed on the player list and above player's heads.
	 */
	TeamColor: BrickColor;
	/**
	 * Returns a list of `Players` who are assigned to the `Team`. A `Player` is considered assigned if their `Player.Team` property is equal to the `Team` and `Player.Neutral` is false.
	 */
	GetPlayers(): Instance[];
	/**
	 * Fires whenever a `Player` is assigned to the `Team`. A player is considered assigned if their `Player.Team` property is equal to the `Team` and `Player.Neutral` is false.
	 */
	readonly PlayerAdded: RBXScriptSignal<(player: Player) => void>;
	/**
	 * Fires whenever a `Player` is removed from a `Team`. This can be due to the `Player` leaving the game, `Player.Neutral` being set to true or the `Player` joining a different team.
	 */
	readonly PlayerRemoved: RBXScriptSignal<(player: Player) => void>;
}

interface TeamCreateData extends Instance {
}

interface TeamCreatePublishService extends Instance {
}

interface TeamCreateService extends Instance {
}

/**
 * The Teams service holds a game's `Team` objects. `Team` objects must be parented to the Teams service.
 */
interface Teams extends Instance {
	/**
	 * Returns a table containing the game's `Team` objects. Will only return `Team` objects that are parented to the `Teams` service.
	 */
	GetTeams(): Instance[];
	/**
	 * Evens the number of people on each team. This function does not work correctly and should not be used.
	 * @deprecated Deprecated.
	 */
	RebalanceTeams(): undefined;
}

interface TelemetryService extends Instance {
}

/** The return structure of the `TeleportAsync` function call. */
interface TeleportAsyncResult extends Instance {
	/**
	 * The private server ID of the reserved server that the players are being teleported to.
	 */
	PrivateServerId: string;
	/**
	 * The access code of the reserved server that the players are being teleported to.
	 */
	ReservedServerAccessCode: string;
}

/** Optional input arguments to the `TeleportService:TeleportAsync()` function. */
interface TeleportOptions extends Instance {
	/**
	 * The reserved server access code that indicates the reserved server that the teleport should be to.
	 */
	ReservedServerAccessCode: string;
	/** The `DataModel.JobId` of the server instance to teleport to. */
	ServerInstanceId: string;
	/**
	 * A flag to indicate if a reserved server should be allocated and the players should then be teleported to this allocation.
	 */
	ShouldReserveServer: boolean;
	/**
	 * Returns the teleport data stored in the `TeleportOptions` instance by `TeleportOptions:SetTeleportData()`.
	 */
	GetTeleportData(): unknown;
	/** Setter function for data to be passed to the destination place. */
	SetTeleportData(teleportData?: unknown): undefined;
}

/**
 * Enables transporting `Players` between places and servers. For more information on how to teleport players between servers, see [Teleport between places](../../../projects/teleport.md).
 */
interface TeleportService extends Instance {
	/**
	 * No longer functional.
	 * @deprecated Deprecated.
	 */
	CustomizedTeleportUI: boolean;
	/**
	 * Returns the _customLoadingScreen_ the `LocalPlayer` arrived into the place with.
	 */
	GetArrivingTeleportGui(): Instance;
	/**
	 * Returns the _teleportData_ the `Players.LocalPlayer` arrived into the place with.
	 */
	GetLocalPlayerTeleportData(): unknown;
	/**
	 * Retrieves a teleport setting saved using `TeleportService:SetTeleportSetting()` using the given key.
	 */
	GetTeleportSetting(setting?: string): unknown;
	/**
	 * Sets the custom `teleport GUI` that will be shown to the local user during teleportation, prior to the teleport being invoked.
	 */
	SetTeleportGui(gui?: Instance): undefined;
	/**
	 * Stores a value under a given key that persists across all teleportations in the same game.
	 */
	SetTeleportSetting(setting?: string, value?: unknown): undefined;
	/** Teleports a `Player` to the place associated with the given `placeId`. */
	Teleport(placeId?: number, player?: Instance, teleportData?: unknown, customLoadingScreen?: Instance): undefined;
	/**
	 * Teleports a `Player` to the server instance associated with the given _placeId_ and _instanceId_.
	 */
	TeleportToPlaceInstance(placeId?: number, instanceId?: string, player?: Instance, spawnName?: string, teleportData?: unknown, customLoadingScreen?: Instance): undefined;
	/**
	 * Teleport a group of `Players` to a reserved server created using `TeleportService:ReserveServerAsync()`.
	 */
	TeleportToPrivateServer(placeId?: number, reservedServerAccessCode?: string, players?: Instance[], spawnName?: string, teleportData?: unknown, customLoadingScreen?: Instance): undefined;
	/**
	 * A variant of `TeleportService:Teleport()` that causes the `Player` to spawn at a `SpawnLocation` of the given name at the destination place.
	 */
	TeleportToSpawnByName(placeId?: number, spawnName?: string, player?: Instance, teleportData?: unknown, customLoadingScreen?: Instance): undefined;
	/**
	 * Returns the `PlaceId` and `JobId` of the server the user with the given `UserId` is in provided it is in the same game as the current place.
	 */
	GetPlayerPlaceInstanceAsync(userId?: number): unknown;
	/**
	 * Prompts a `Player` with information about the specified experience. The player can choose to teleport to the target experience through the prompt.
	 */
	PromptExperienceDetailsAsync(player?: Player, universeId?: number): Enum.PromptExperienceDetailsResult;
	/**
	 * Returns an access code that can be used to teleport players to a reserved server, along with the `DataModel.PrivateServerId` for it.
	 * @deprecated Deprecated.
	 */
	ReserveServer(placeId?: number): unknown;
	/**
	 * Returns an access code that can be used to teleport players to a reserved server, along with the `DataModel.PrivateServerId` for it.
	 */
	ReserveServerAsync(placeId?: number): unknown;
	/**
	 * The all-encompassing method to teleport a player or group of players from one server to another.
	 */
	TeleportAsync(placeId?: number, players?: Instance[], teleportOptions?: Instance): Instance;
	/**
	 * Teleports a group of `Players` to the same server of the place with the given `PlaceId`, returning the `JobId` of the server instance they were teleported to.
	 */
	TeleportPartyAsync(placeId?: number, players?: Instance[], teleportData?: unknown, customLoadingScreen?: Instance): string;
	/** Fires when the `LocalPlayer` enters the place following a teleport. */
	readonly LocalPlayerArrivedFromTeleport: RBXScriptSignal<(loadingGui: Instance, dataTable: unknown) => void>;
	/**
	 * Fires when a teleport fails to start, leaving the player in their current server.
	 */
	readonly TeleportInitFailed: RBXScriptSignal<(player: Instance, teleportResult: Enum.TeleportResult, errorMessage: string, placeId: number, teleportOptions: Instance) => void>;
}

interface TemporaryCageMeshProvider extends Instance {
}

interface TemporaryScriptService extends Instance {
}

/** Determines appearance of a certain terrain face direction. */
interface TerrainDetail extends Instance {
	/** Determines the color of the surface. */
	ColorMap: ContentId;
	/** Determines the color of the surface. Only supports asset URIs as textures. */
	ColorMapContent: Content;
	/** Determines the emissivity across the surface. */
	EmissiveMaskContent: Content;
	/** Determines the strength of emissive contribution. */
	EmissiveStrength: number;
	/** Determines the tinting color for emissive contribution. */
	EmissiveTint: Color3;
	/** The face this TerrainDetail overrides. */
	Face: Enum.TerrainFace;
	/** Determines texture tiling method. */
	MaterialPattern: Enum.MaterialPattern;
	/** Determines which parts of the surface are metal and are non-metal. */
	MetalnessMap: ContentId;
	/**
	 * Determines which parts of the surface are metal and are non-metal. Only supports asset URIs as textures.
	 */
	MetalnessMapContent: Content;
	/**
	 * Modifies the lighting of the surface by adding bumps, dents, cracks, and curves without adding more polygons.
	 */
	NormalMap: ContentId;
	/**
	 * Modifies the lighting of the surface by adding bumps, dents, cracks, and curves without adding more polygons. Only supports asset URIs as textures.
	 */
	NormalMapContent: Content;
	/** Determines the apparent roughness across the surface. */
	RoughnessMap: ContentId;
	/**
	 * Determines the apparent roughness across the surface. Only supports asset URIs as textures.
	 */
	RoughnessMapContent: Content;
	/** Determines the scale of textures. */
	StudsPerTile: number;
}

interface TerrainRegion extends Instance {
	/**
	 * The state of this property shows whether or not this `TerrainRegion` contains _smooth terrain_.
	 * @deprecated Deprecated.
	 */
	IsSmooth: boolean;
	/** The size of this TerrainRegion in cells. */
	SizeInCells: Vector3;
	/**
	 * Transforms the TerrainRegion so it can be used with smooth terrain.
	 * @deprecated Deprecated.
	 */
	ConvertToSmooth(): undefined;
}

/**
 * A service used by Roblox to run controlled tests of the engine. It is available for developers to use, to a limited degree.
 */
interface TestService extends Instance {
	/**
	 * If set to `true`, the game will start running when the service's `TestService:RunAsync()` method is called.
	 */
	AutoRuns: boolean;
	/** A description of the test being executed. */
	Description: string;
	/** Measures how many errors have been recorded in the test session. */
	ErrorCount: number;
	/**
	 * When set to `true`, `TestService` will be executed when using the **Run** action in Roblox Studio.
	 */
	ExecuteWithStudioRun: boolean;
	/**
	 * Sets whether or not the physics engine should be throttled to 30 FPS while the test is being ran.
	 * @deprecated Deprecated.
	 */
	Is30FpsThrottleEnabled: boolean;
	/**
	 * Sets whether or not the physics environment should be throttled while running this test.
	 */
	IsPhysicsEnvironmentalThrottled: boolean;
	/**
	 * Sets whether or not physics objects will be allowed to fall asleep while the test simulation is running.
	 */
	IsSleepAllowed: boolean;
	/** The number of players expected in this test, if any. */
	NumberOfPlayers: number;
	/**
	 * Sets a specific amount of additional latency experienced by players during the test session.
	 */
	SimulateSecondsLag: number;
	/** Measures how many test calls have been recorded in the test session. */
	TestCount: number;
	/**
	 * Sets whether the test should be throttled to simulate time according to real world time or as fast as possible.
	 */
	ThrottlePhysicsToRealtime: boolean;
	/** The maximum amount of time that tests are allowed to run for. */
	Timeout: number;
	/** Measures how many warning calls have been recorded in the test session. */
	WarnCount: number;
	/** Prints result of a condition to the output. */
	Check(condition?: boolean, description?: string, source?: Instance, line?: number): undefined;
	/** Prints `Test checkpoint:` followed by a string to the output in blue text. */
	Checkpoint(text?: string, source?: Instance, line?: number): undefined;
	/** Prints `Testing Done` to the output in blue text. */
	Done(): undefined;
	/** Prints a red error message to the output, prefixed by `TestService: `. */
	Error(description?: string, source?: Instance, line?: number): undefined;
	/** Indicates a fatal error in a `TestService` run. */
	Fail(description?: string, source?: Instance, line?: number): undefined;
	/** Prints `TestService:` followed by a string to the output in blue text. */
	Message(text?: string, source?: Instance, line?: number): undefined;
	/** Prints whether a condition is true along with a description string. */
	Require(condition?: boolean, description?: string, source?: Instance, line?: number): undefined;
	ScopeTime(): unknown;
	StartTestSession(): undefined;
	StopTestSession(): undefined;
	TakeSnapshot(snapshotname?: string, source?: Instance): undefined;
	/** Prints if a condition is `true`, otherwise prints a warning. */
	Warn(condition?: boolean, description?: string, source?: Instance, line?: number): undefined;
	getTestSessionProviderStats(providerName: string): unknown;
	isFeatureEnabled(name?: string): boolean;
	/**
	 * Runs scripts which are parented to `TestService`.
	 * @deprecated Deprecated.
	 */
	Run(): undefined;
	/** Runs scripts which are parented to `TestService`. */
	RunAsync(): undefined;
	/** Fires when the server should collect a conditional test result. */
	readonly ServerCollectConditionalResult: RBXScriptSignal<(condition: boolean, text: string, script: Instance, line: number) => void>;
	/** Fires when the server should collect a test result. */
	readonly ServerCollectResult: RBXScriptSignal<(text: string, script: Instance, line: number) => void>;
}

interface TextBoxService extends Instance {
}

/** Represents a text chat channel. */
interface TextChannel extends Instance {
	/**
	 * The `TextChannel` will only deliver messages to users that can send direct messages to the `DirectChatRequester`.
	 */
	DirectChatRequester: Player;
	/** Displays a system message to the user. */
	DisplaySystemMessage(systemMessage?: string, metadata?: string): TextChatMessage;
	/**
	 * Sets the `DirectChatRequester` for the `TextChannel`. The `TextChannel` will only deliver messages to users that can send direct messages to the `DirectChatRequester`.
	 */
	SetDirectChatRequester(requester?: Player): undefined;
	/** Adds a `TextSource` to the `TextChannel` given userId of a `Player`. */
	AddUserAsync(userId?: number): unknown;
	/** Sends a `TextChatMessage` to the server. */
	SendAsync(message?: string, metadata?: string): TextChatMessage;
	/**
	 * Fires when `TextChannel:DisplaySystemMessage()` is invoked on the client, or when the client receives a valid `TextChannel:SendAsync()` response from the server.
	 */
	readonly MessageReceived: RBXScriptSignal<(incomingMessage: TextChatMessage) => void>;
	/** Called when `TextChannel` is receiving an incoming message. */
	OnIncomingMessage?: (message?: TextChatMessage) => unknown;
	/**
	 * Called for each client when `TextChannel` is receiving an incoming message to determine whether or not it should be delivered to that client.
	 */
	ShouldDeliverCallback?: (message?: TextChatMessage, textSource?: TextSource) => unknown;
}

/** Represents a text chat command. */
interface TextChatCommand extends Instance {
	AutocompleteVisible: boolean;
	/** Determines whether the `TextChatCommand` is enabled. */
	Enabled: boolean;
	/** A primary alias used to trigger the `TextChatCommand`. */
	PrimaryAlias: string;
	/** A secondary alias used to trigger the `TextChatCommand`. */
	SecondaryAlias: string;
	/** An event that developers can bind to execute commands. */
	readonly Triggered: RBXScriptSignal<(originTextSource: TextSource, unfilteredText: string) => void>;
}

/** The parental class of all text chat configurations. */
interface TextChatConfigurations extends Instance {
}

/** Allows for customization of text chat bubbles through `TextChatService`. */
interface BubbleChatConfiguration extends TextChatConfigurations {
	/** Body part or `Attachment` that bubbles will attach to. */
	AdorneeName: string;
	/** Background color of bubbles. */
	BackgroundColor3: Color3;
	/**
	 * Determines the background transparency of the default bubble chat as a number between 0 and 1.
	 */
	BackgroundTransparency: number;
	/** Time before a bubble fades out, in seconds. */
	BubbleDuration: number;
	/** Vertical space between stacked bubbles, in pixels. */
	BubblesSpacing: number;
	/** Whether text chat bubbles are enabled. */
	Enabled: boolean;
	/** `Font` of the bubble text. */
	FontFace: Font;
	/** Offset of bubbles from their adornee, in studs. */
	LocalPlayerStudsOffset: Vector3;
	/** Maximum number of text chat bubbles shown per user. */
	MaxBubbles: number;
	/** Maximum distance from the camera that bubbles are shown. */
	MaxDistance: number;
	/**
	 * Distance from the camera when bubbles turn into a single bubble with an ellipsis to indicate chatter.
	 */
	MinimizeDistance: number;
	/** Determines if the tail at the bottom of the text chat bubbles is visible. */
	TailVisible: boolean;
	/** Color of bubble text. */
	TextColor3: Color3;
	/** Size of bubble text. */
	TextSize: number;
	/** Extra space between bubbles and their adornee, in studs. */
	VerticalStudsOffset: number;
}

/** Configures properties of the optional channel tabs in the default chat window. */
interface ChannelTabsConfiguration extends TextChatConfigurations {
	/** Actual screen position of the channel tab bar, in pixels. */
	AbsolutePosition: Vector2;
	/** Actual screen size of the channel tab bar, in pixels. */
	AbsoluteSize: Vector2;
	/** Background color of the channel tabs. */
	BackgroundColor3: Color3;
	/** Background transparency of the channel tabs. */
	BackgroundTransparency: number;
	/** Whether to show the channel tabs. */
	Enabled: boolean;
	/** Font used to render text in the channel tabs. */
	FontFace: Font;
	/** Background color of a channel tab when hovering over it. */
	HoverBackgroundColor3: Color3;
	/** Color of text in a selected tab. */
	SelectedTabTextColor3: Color3;
	/** Color of text in an unselected tab. */
	TextColor3: Color3;
	/** Size of the text in channel tabs. */
	TextSize: number;
	/** Color of the text stroke for text in channel tabs. */
	TextStrokeColor3: Color3;
	/** Transparency of the text stroke for text in channel tabs. */
	TextStrokeTransparency: number;
}

/** Configures properties of the default chat input bar. */
interface ChatInputBarConfiguration extends TextChatConfigurations {
	/** Actual screen position of the default chat input bar in pixels. */
	AbsolutePosition: Vector2;
	/** Actual screen size of the default chat input bar in pixels. */
	AbsoluteSize: Vector2;
	/** Whether to enable autocomplete for the chat input bar. */
	AutocompleteEnabled: boolean;
	/** Background color of the default chat input bar. */
	BackgroundColor3: Color3;
	/** Background transparency of the default chat input bar. */
	BackgroundTransparency: number;
	/** Whether to show the default chat input bar. */
	Enabled: boolean;
	/** Font used to render text in the default chat input bar. */
	FontFace: Font;
	/** Whether the default chat input bar is focused or not. */
	IsFocused: boolean;
	/**
	 * Additional key users can press to trigger focusing on the default chat input bar.
	 */
	KeyboardKeyCode: Enum.KeyCode;
	/** Color of the text of the placeholder text in the default chat input bar. */
	PlaceholderColor3: Color3;
	/** A reference to the target `TextChannel`. */
	TargetTextChannel: TextChannel;
	/**
	 * Reference to a designated `TextBox` instance that sends messages on behalf of the user.
	 */
	TextBox: TextBox;
	/** Color of the text in default chat input bar. */
	TextColor3: Color3;
	/** Size of the text in default chat input bar. */
	TextSize: number;
	/** Color of the text stroke for text in default chat input bar. */
	TextStrokeColor3: Color3;
	/** Transparency of the text stroke for text in default chat input bar. */
	TextStrokeTransparency: number;
}

/** Configures properties of the default chat window. */
interface ChatWindowConfiguration extends TextChatConfigurations {
	/** Actual screen position of the default chat window, in pixels. */
	AbsolutePosition: Vector2;
	/** Actual screen size of the default chat window, in pixels. */
	AbsoluteSize: Vector2;
	/** Background color of the default chat window. */
	BackgroundColor3: Color3;
	/** Background transparency of the default chat window. */
	BackgroundTransparency: number;
	/** Whether to show the default chat window. */
	Enabled: boolean;
	/** Font used to render text in the default chat window. */
	FontFace: Font;
	/** Factor by which the height of the default chat window should be scaled. */
	HeightScale: number;
	/** Horizontal alignment of the chat window. */
	HorizontalAlignment: Enum.HorizontalAlignment;
	/** Color of the text in default chat window. */
	TextColor3: Color3;
	/** Size of the text in default chat window. */
	TextSize: number;
	/** Color of the text stroke for text in default chat window. */
	TextStrokeColor3: Color3;
	/** Transparency of the text stroke for text in default chat window. */
	TextStrokeTransparency: number;
	/** Vertical alignment of the chat window. */
	VerticalAlignment: Enum.VerticalAlignment;
	/** Factor by which the width of the default chat window should be scaled. */
	WidthScale: number;
	/**
	 * Creates a new `ChatWindowMessageProperties` instance that can be used to customize the appearance of messages in the chat window.
	 */
	DeriveNewMessageProperties(): ChatWindowMessageProperties;
}

/** A data object representing a text chat message. */
interface TextChatMessage extends Instance {
	BubbleChatMessageProperties: BubbleChatMessageProperties;
	ChatWindowMessageProperties: ChatWindowMessageProperties;
	/** A unique identifier for the `TextChatMessage`. */
	MessageId: string;
	/**
	 * A general purpose field for storing miscellaneous data about the `TextChatMessage`.
	 */
	Metadata: string;
	/** A prefix to add to a user's message. */
	PrefixText: string;
	/** Indicates the status of the `TextChatMessage`. */
	Status: Enum.TextChatMessageStatus;
	/** The filtered text message for the user. */
	Text: string;
	/** A reference to the origin `TextChannel`. */
	TextChannel: TextChannel;
	/** A reference to the origin `TextSource`. */
	TextSource: TextSource;
	/** A timestamp of when the message was originally sent. */
	Timestamp: DateTime;
	/** Translated and filtered text message. */
	Translation: string;
}

/**
 * Overrides `TextChatMessage` properties when returned by callbacks defined in `TextChatService.OnIncomingMessage` or `TextChannel.OnIncomingMessage`.
 */
interface TextChatMessageProperties extends Instance {
	/** The `TextChatMessage.PrefixText` to override. */
	PrefixText: string;
	/** The `TextChatMessage.Text` to override. */
	Text: string;
	/** The `TextChatMessage.Translation` to override. */
	Translation: string;
}

interface BubbleChatMessageProperties extends TextChatMessageProperties {
	/** Background color of bubbles. */
	BackgroundColor3: Color3;
	/** Background transparency of bubbles. */
	BackgroundTransparency: number;
	/** Font of the bubble text. */
	FontFace: Font;
	TailVisible: boolean;
	/** Color of bubble text. */
	TextColor3: Color3;
	/** Size of bubble text. */
	TextSize: number;
}

interface ChatWindowMessageProperties extends TextChatMessageProperties {
	/** Font used to render text in the chat window. */
	FontFace: Font;
	/** Determines the properties of the `PrefixText` preceding the chat message. */
	PrefixTextProperties: ChatWindowMessageProperties;
	/** Color of the text in the chat window. */
	TextColor3: Color3;
	/** Size of the text in the chat window. */
	TextSize: number;
	/** Stroke color applied to text in the chat window. */
	TextStrokeColor3: Color3;
	/** Transparency of the stroke applied to text in the chat window. */
	TextStrokeTransparency: number;
}

/** A service handling in-experience text chat. */
interface TextChatService extends Instance {
	/** Determines whether a user has chat translation enabled. */
	readonly ChatTranslationEnabled: boolean;
	/**
	 * Determines whether to fully enable `TextChatService` or revert to the legacy chat system.
	 */
	readonly ChatVersion: Enum.ChatVersion;
	/** Determines whether `TextChatService` should create default `TextChatCommands`. */
	CreateDefaultCommands: boolean;
	/** Determines whether `TextChatService` should create default `TextChannels`. */
	CreateDefaultTextChannels: boolean;
	/** Displays a chat bubble above the provided part or player character. */
	DisplayBubble(partOrCharacter?: Instance, message?: string): undefined;
	/** Determines whether a user has permission to chat in experiences. */
	CanUserChatAsync(userId?: number): boolean;
	/** Determines whether or not two users would receive messages between each other. */
	CanUsersChatAsync(userIdFrom?: number, userIdTo?: number): boolean;
	/**
	 * Determines whether a user has permission to chat directly with other users in experiences based on factors such as their parental control settings.
	 */
	CanUsersDirectChatAsync(requesterUserId?: number, userIds?: unknown): unknown;
	/**
	 * Returns chat group IDs that indicate which players can synchronously text chat together.
	 */
	GetChatGroupsAsync(players?: Instance[]): unknown;
	/** Fires when `TextChatService:DisplayBubble()` is called. */
	readonly BubbleDisplayed: RBXScriptSignal<(partOrCharacter: Instance, textChatMessage: TextChatMessage) => void>;
	/**
	 * Fires when `TextChannel:DisplaySystemMessage()` is invoked on the client, or when the client receives a valid `TextChannel:SendAsync()` response from the server.
	 */
	readonly MessageReceived: RBXScriptSignal<(textChatMessage: TextChatMessage) => void>;
	/** Fires when `TextChannel:SendAsync()` is called by the sending client. */
	readonly SendingMessage: RBXScriptSignal<(textChatMessage: TextChatMessage) => void>;
	/** Called when a bubble chat is about to be displayed. */
	OnBubbleAdded?: (message?: TextChatMessage, adornee?: Instance) => unknown;
	/**
	 * Called when a new message is about to be displayed in the chat window. This can only be implemented on the client.
	 */
	OnChatWindowAdded?: (message?: TextChatMessage) => unknown;
	/** Called when `TextChatService` is receiving an incoming message. */
	OnIncomingMessage?: (message?: TextChatMessage) => unknown;
}

interface TextFilterResult extends Instance {
	/**
	 * Returns the text in a properly filtered manner for the specified `Player.UserId`.
	 * @deprecated Deprecated.
	 */
	GetChatForUserAsync(toUserId?: number): string;
	/** Returns the text in a properly filtered manner for all users. */
	GetNonChatStringForBroadcastAsync(): string;
	/**
	 * Returns the text in a properly filtered manner for the specified `Player.UserId` based on age and other details.
	 */
	GetNonChatStringForUserAsync(toUserId?: number): string;
}

interface TextFilterTranslatedResult extends Instance {
	SourceLanguage: string;
	SourceText: TextFilterResult;
	GetTranslationForLocale(locale?: string): TextFilterResult;
	GetTranslations(): unknown;
}

/** Gives access to a large language model for text generation. */
interface TextGenerator extends Instance {
	/**
	 * Sets a fixed seed for the random number generator, allowing reproducible responses in cases where the same input parameters are used across multiple requests.
	 */
	Seed: number;
	/**
	 * Provides context to the model about its role, tone, or behavior during conversation.
	 */
	SystemPrompt: string;
	/** Controls the "creativity" or randomness of the model's responses. */
	Temperature: number;
	/**
	 * Helps the AI model narrow or expand the range of possible words to sample from while generating the next token.
	 */
	TopP: number;
	/** Returns text generated by an LLM based on the provided system and user prompts. */
	GenerateTextAsync(request?: unknown): unknown;
}

/** Service internally responsible for handling the display of text. */
interface TextService extends Instance {
	/**
	 * Computes the `Vector2` dimensions (in pixels) that will be taken up with text when using the specified formatting parameters and size constraints.
	 */
	GetTextSize(string?: string, fontSize?: number, font?: Enum.Font, frameSize?: Vector2): Vector2;
	/** Filters and translates a string. */
	FilterAndTranslateStringAsync(stringToFilter?: string, fromUserId?: number, targetLocales?: unknown, textContext?: Enum.TextFilterContext): TextFilterTranslatedResult;
	/**
	 * Filters a string being received from a user and returns a `TextFilterResult` which can be used to distribute the correctly filtered text accordingly.
	 */
	FilterStringAsync(stringToFilter?: string, fromUserId?: number, textContext?: Enum.TextFilterContext): TextFilterResult;
	/** Returns a table containing the name and faces of a font family. */
	GetFamilyInfoAsync(assetId?: ContentId): unknown;
	/**
	 * Computes the `Vector2` dimensions (in pixels) that will be taken up with text when using a `GetTextBoundsParams` object.
	 */
	GetTextBoundsAsync(params?: GetTextBoundsParams): Vector2;
	/**
	 * Returns the offset used to up-scale text based on the current `GuiService.PreferredTextSize` setting.
	 */
	GetTextSizeOffsetAsync(fontSize?: number, font?: Font): number;
}

/** Represents a speaker in a `TextChannel`. */
interface TextSource extends Instance {
	/** Determines whether the user can send messages to the `TextChannel`. */
	CanSend: boolean;
	/** UserId of the user represented by the `TextSource`. */
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

/**
 * An internal service responsible for scheduling timed events. It is used by the `Debris` class. Its functionality can not be accessed by developers.
 */
interface TimerService extends Instance {
}

interface ToastNotificationService extends Instance {
}

/** An internal service responsible for touch inputs on mobile devices. */
interface TouchInputService extends Instance {
}

/**
 * An internal object used by networking and replication code to transmit `BasePart.Touched` and `BasePart.TouchEnded` events.
 */
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

/** Used to create a trail effect between two attachments. */
interface Trail extends Instance {
	/**
	 * Along with `Attachment1`, determines where the trail will start drawing its segments.
	 */
	Attachment0: Attachment;
	/**
	 * Along with `Attachment0`, determines where the trail will start drawing its segments.
	 */
	Attachment1: Attachment;
	/** Scales the light emitted from the trail when `LightInfluence` is less than 1. */
	Brightness: number;
	/** The color of the trail throughout its lifetime. */
	Color: ColorSequence;
	/** Determines whether the trail will be drawn or not. */
	Enabled: boolean;
	/**
	 * Determines whether the trail will always face the camera, regardless of its orientation.
	 */
	FaceCamera: boolean;
	/** Determines how long each segment in a trail will last, in seconds. */
	Lifetime: number;
	/**
	 * Determines to what degree the colors of the trail are blended with the colors behind it.
	 */
	LightEmission: number;
	/**
	 * Determines the degree to which the trail is influenced by the environment's lighting.
	 */
	LightInfluence: number;
	/** Sets the maximum length of the trail. */
	MaxLength: number;
	/** Sets the minimum length of the trail. */
	MinLength: number;
	/** The content ID of the texture to be displayed on the trail. */
	Texture: ContentId;
	/** Sets the length of the trail's texture, dependent on `TextureMode`. */
	TextureLength: number;
	/**
	 * Determines the manner in which the `Texture` scales, repeats, and moves along with the trail's attachments.
	 */
	TextureMode: Enum.TextureMode;
	/** Sets the transparency of the trail's segments over its `Lifetime`. */
	Transparency: NumberSequence;
	/** Scales the width of the trail over the course of its lifetime. */
	WidthScale: NumberSequence;
	/** Clears the segments of the trail. */
	Clear(): undefined;
}

/**
 * The role of a Translator is to manufacture/return strings localized for the viewing player.
 */
interface Translator extends Instance {
	/** The locale of translated strings. */
	LocaleId: string;
	/**
	 * Returns the localized text string in a `LocalizationTable` based on its `Translator` locale, by key.
	 */
	FormatByKey(key?: string, args?: unknown): string;
	/**
	 * Returns the localized text string in a `LocalizationTable` based on its `Translator` locale, by source lookup.
	 */
	Translate(context?: Instance, text?: string): string;
}

interface TutorialService extends Instance {
}

/**
 * Abstract base class for in-between interpolation handlers. `Tween` inherits from `TweenBase`.
 */
interface TweenBase extends Instance {
	/** Read-only property that shows the current state for the `Tween` animation. */
	PlaybackState: Enum.PlaybackState;
	/**
	 * Halts playback and resets the tween variables. If you then call `TweenBase:Play()`, the properties of the tween resume interpolating towards their destination, but take the full length of the animation to do so.
	 */
	Cancel(): undefined;
	/**
	 * Halts playback of the tween. Doesn't reset its progress variables, meaning that if you call `TweenBase:Play()`, the tween resumes playback from the moment it was paused.
	 */
	Pause(): undefined;
	/**
	 * Starts playback of a tween. Note that if playback has already started, calling `Play()` has no effect unless the tween has finished or is stopped (either by `TweenBase:Cancel()` or `TweenBase:Pause()`).
	 */
	Play(): undefined;
	/**
	 * Fires when the tween finishes playing or when stopped with `TweenBase:Cancel()`.
	 */
	readonly Completed: RBXScriptSignal<(playbackState: Enum.PlaybackState) => void>;
}

/** The `Tween` object controls the playback of an interpolation. */
interface Tween extends TweenBase {
	/**
	 * Read-only property that points to the `Instance` whose properties are being interpolated by the tween.
	 */
	Instance: Instance;
	/**
	 * Read-only property that includes information on how the interpolation of the `Tween` is to be carried out.
	 */
	TweenInfo: TweenInfo;
}

/**
 * Used to create `Tweens` which interpolate, or tween, the properties of instances.
 */
interface TweenService extends Instance {
	/**
	 * Creates a new `Tween` given the object whose properties are to be tweened, a `TweenInfo`, and a dictionary of goal property values.
	 */
	Create(instance?: Instance, tweenInfo?: TweenInfo, propertyTable?: unknown): Tween;
	/** Calculates a new alpha given an `Enum.EasingStyle` and `Enum.EasingDirection`. */
	GetValue(alpha?: number, easingStyle?: Enum.EasingStyle, easingDirection?: Enum.EasingDirection): number;
	/**
	 * Smoothly interpolates a value towards a target, simulating a critically damped spring.
	 */
	SmoothDamp(current?: unknown, target?: unknown, velocity?: unknown, smoothTime?: number, maxSpeed?: unknown, dt?: unknown): unknown;
}

interface UGCAvatarService extends Instance {
}

interface UGCValidationService extends Instance {
}

/** `UIBase` is the base class for UI layout and constraint classes. */
interface UIBase extends Instance {
}

/** A base class for UI constraint and layout classes. */
interface UIComponent extends UIBase {
}

/** The base class for UI constraint classes. */
interface UIConstraint extends UIComponent {
}

/** Ensures the parent UI element maintains a particular aspect ratio. */
interface UIAspectRatioConstraint extends UIConstraint {
	/** Determines the width-to-height ratio to maintain. */
	AspectRatio: number;
	/** Determines how the maximum size of the object is limited. */
	AspectType: Enum.AspectType;
	/** Determines the axis to use when setting the new size of the object. */
	DominantAxis: Enum.DominantAxis;
}

/**
 * Ensures a `GuiObject` does not become larger or smaller than the constraint's maximum size or minimum size.
 */
interface UISizeConstraint extends UIConstraint {
	/** The largest size, in pixels, the parent object is allowed to be. */
	MaxSize: Vector2;
	/** The smallest size, in pixels, the object is allowed to be. */
	MinSize: Vector2;
}

/**
 * Ensures that the size of text rendered by certain `GuiObject` classes lies within the range described by `MaxTextSize` and `MinTextSize`.
 */
interface UITextSizeConstraint extends UIConstraint {
	/** The largest size in pixels the font is allowed to be. */
	MaxTextSize: number;
	/** The smallest size in pixels the font is allowed to be. */
	MinTextSize: number;
}

/** UI modifier which applies deformation to corners of its parent `GuiObject`. */
interface UICorner extends UIComponent {
	/** Determines the radius of the component. */
	CornerRadius: UDim;
}

/**
 * Instance which facilitates and encourages interaction with UI elements in an experience.
 */
interface UIDragDetector extends UIComponent {
	/**
	 * Sets the cursor icon to display when the mouse is activated over the parent of this `UIDragDetector`.
	 */
	ActivatedCursorIcon: ContentId;
	/**
	 * Sets the cursor icon to display when the mouse is activated over the parent of this `UIDragDetector`. Only supports asset URIs
	 */
	ActivatedCursorIconContent: Content;
	/**
	 * Determines bounding behavior of the dragged UI object when the detector's `BoundingUI` is set.
	 */
	BoundingBehavior: Enum.UIDragDetectorBoundingBehavior;
	/**
	 * Instance whose bounding area defines the drag boundaries for the parent `GuiObject`.
	 */
	BoundingUI: GuiBase2d;
	/**
	 * Sets the cursor icon to display when the mouse is hovered over the parent of this `UIDragDetector`.
	 */
	CursorIcon: ContentId;
	/**
	 * Sets the cursor icon to display when the mouse is hovered over the parent of this `UIDragDetector`. Only asset URIs are supported.
	 */
	CursorIconContent: Content;
	/**
	 * The drag axis for the `UIDragDetector` instance when `DragStyle` is set to `Enum.UIDragDetectorDragStyle.TranslateLine`.
	 */
	DragAxis: Vector2;
	/**
	 * Sets the paradigm which defines the relativity of inputs/outputs from a custom drag function.
	 */
	DragRelativity: Enum.UIDragDetectorDragRelativity;
	/** The rotation performed by the current drag. */
	DragRotation: number;
	/**
	 * Sets the paradigm which defines the space of inputs/outputs from a custom drag function.
	 */
	DragSpace: Enum.UIDragDetectorDragSpace;
	/** The paradigm used to generate proposed motion. */
	DragStyle: Enum.UIDragDetectorDragStyle;
	/** The translation performed by the current drag expressed in a `UDim2` value. */
	DragUDim2: UDim2;
	/** Whether the `UIDragDetector` responds to user input. */
	Enabled: boolean;
	/**
	 * Along with `MinDragAngle`, impedes the detector's attempts to generate rotational motion.
	 */
	MaxDragAngle: number;
	/**
	 * Along with `MinDragTranslation`, impedes the detector's attempts to generate linear/planar motion.
	 */
	MaxDragTranslation: UDim2;
	/**
	 * Along with `MaxDragAngle`, impedes the detector's attempts to generate rotational motion.
	 */
	MinDragAngle: number;
	/**
	 * Along with `MaxDragTranslation`, impedes the detector's attempts to generate linear/planar motion.
	 */
	MinDragTranslation: UDim2;
	/**
	 * A `GuiObject` instance whose local space and absolute center position is the reference space and origin for the detector.
	 */
	ReferenceUIInstance: GuiObject;
	/** The paradigm used to define the response to proposed motion. */
	ResponseStyle: Enum.UIDragDetectorResponseStyle;
	/** Maximum drag speed for translation. */
	SelectionModeDragSpeed: UDim2;
	/** Maximum angle per second the `UIDragDetector` can rotate at. */
	SelectionModeRotateSpeed: number;
	/**
	 * `Enum.UIDragSpeedAxisMapping` value that determines the **X**/**Y** dimension dragging speeds.
	 */
	UIDragSpeedAxisMapping: Enum.UIDragSpeedAxisMapping;
	/** Adds a function to modify or constrain proposed motion. */
	AddConstraintFunction(priority?: number, _function?: Function): RBXScriptConnection;
	/** Returns the reference `UDim2` position of the current drag's reference origin. */
	GetReferencePosition(): UDim2;
	/** Returns the reference rotation of the current drag's reference element. */
	GetReferenceRotation(): number;
	/**
	 * Passes a function to be used if and only if `DragStyle` is set to `Enum.UIDragDetectorDragStyle.Scriptable`.
	 */
	SetDragStyleFunction(_function?: Function): undefined;
	/**
	 * Fires when a user continues dragging the UI element after `DragStart` has been initiated.
	 */
	readonly DragContinue: RBXScriptSignal<(inputPosition: Vector2) => void>;
	/** Fires when a user stops dragging the UI element. */
	readonly DragEnd: RBXScriptSignal<(inputPosition: Vector2) => void>;
	/** Fires when a user starts dragging the UI element. */
	readonly DragStart: RBXScriptSignal<(inputPosition: Vector2) => void>;
}

/** Defines flex behavior for a `GuiObject` within a `UIListLayout`. */
interface UIFlexItem extends UIComponent {
	/**
	 * How the parent `GuiObject` grows or shrinks with available space in the flex layout container.
	 */
	FlexMode: Enum.UIFlexMode;
	/**
	 * Determines the amount the parent `GuiObject` grows relative to other items in the line. Applies only if `FlexMode` is set to `Enum.UIFlexMode.Custom`.
	 */
	GrowRatio: number;
	/** Cross-axis alignment of the specific parent `GuiObject` within the flex line. */
	ItemLineAlignment: Enum.ItemLineAlignment;
	/**
	 * Determines the amount the parent `GuiObject` shrinks relative to other items in the line. Applies only if `FlexMode` is set to `Enum.UIFlexMode.Custom`.
	 */
	ShrinkRatio: number;
}

/**
 * Applies a color and transparency gradient to the UI elements rendered by the parent `GuiObject`.
 */
interface UIGradient extends UIComponent {
	/**
	 * Determines the color blended with the parent GuiObject along the length of the gradient.
	 */
	Color: ColorSequence;
	/** Whether the gradient is enabled or not. */
	Enabled: boolean;
	/**
	 * Determines the scalar translation of the gradient from the center of the parent GuiObject.
	 */
	Offset: Vector2;
	/**
	 * Determines the clockwise rotation in degrees of the gradient starting from left to right.
	 */
	Rotation: number;
	/**
	 * Determines how much the parent GuiObject can be seen through along the length of the gradient.
	 */
	Transparency: NumberSequence;
}

/** The base class for UI layout classes. */
interface UILayout extends UIComponent {
}

/** The base class for grid style UI layouts. */
interface UIGridStyleLayout extends UILayout {
	/** The absolute size of space being taken up by the grid layout. */
	AbsoluteContentSize: Vector2;
	/** Determines the axis in which UI objects are laid out. */
	FillDirection: Enum.FillDirection;
	/** Determines the horizontal alignment of UI elements within the parent element. */
	HorizontalAlignment: Enum.HorizontalAlignment;
	/** Determines the order in which child UI objects are placed in a layout. */
	SortOrder: Enum.SortOrder;
	/** Determines the vertical alignment of UI elements within the parent element. */
	VerticalAlignment: Enum.VerticalAlignment;
	/**
	 * Force re-layout of sibling UI elements.
	 * @deprecated Deprecated.
	 */
	ApplyLayout(): undefined;
	/**
	 * Sets the function used to determine the order of elements when SortOrder is set to Custom.
	 * @deprecated Deprecated.
	 */
	SetCustomSortFunction(_function?: Function): undefined;
}

/**
 * Positions sibling UI elements by filling rows using the space of the parent UI element.
 */
interface UIGridLayout extends UIGridStyleLayout {
	/** The number of elements in the grid. */
	AbsoluteCellCount: Vector2;
	/** The absolute size of each element in the grid. */
	AbsoluteCellSize: Vector2;
	/** Determines how much space there is between elements in the grid. */
	CellPadding: UDim2;
	/** Determines the size of each element in the grid. */
	CellSize: UDim2;
	/**
	 * Determines the maximum number of cells that may be used in a row or column before the next one is started.
	 */
	FillDirectionMaxCells: number;
	/** Determines from which corner the grid starts laying out UI elements. */
	StartCorner: Enum.StartCorner;
}

/**
 * Positions sibling UI elements in rows or columns within the parent UI container.
 */
interface UIListLayout extends UIGridStyleLayout {
	/** Controls how to distribute extra horizontal space. */
	HorizontalFlex: Enum.UIFlexAlignment;
	/**
	 * In a flex layout, defines the **cross-directional** alignment of siblings within a line.
	 */
	ItemLineAlignment: Enum.ItemLineAlignment;
	/** Amount of free space between each element. */
	Padding: UDim;
	/** Controls how to distribute extra vertical space. */
	VerticalFlex: Enum.UIFlexAlignment;
	/** Controls whether siblings within the parent container wrap. */
	Wraps: boolean;
}

interface UIPageLayout extends UIGridStyleLayout {
	/** Whether or not to animate transitions between pages. */
	Animated: boolean;
	/** Whether or not the page layout wraps around at the ends. */
	Circular: boolean;
	/**
	 * The page that is either currently being displayed or is the target of the current animation.
	 */
	CurrentPage: GuiObject;
	/** The easing direction to use when performing an animation. */
	EasingDirection: Enum.EasingDirection;
	/** The easing style to use when performing an animation. */
	EasingStyle: Enum.EasingStyle;
	/**
	 * Controls the overrides of `NextSelection{Up, Down, Left, Right}`. Defaults to true.
	 */
	GamepadInputEnabled: boolean;
	/** Determines the amount that pages are separated from each other by. */
	Padding: UDim;
	/**
	 * Controls the use of scroll wheel, in case that it is intended for something else. Defaults to true.
	 */
	ScrollWheelInputEnabled: boolean;
	/**
	 * Controls touch scrolling, in case this is a non-interactive layout. Defaults to true.
	 */
	TouchInputEnabled: boolean;
	/** The length of the animation. */
	TweenTime: number;
	/**
	 * If the `page` is in the UIPageLayout, then it sets `UIPageLayout.CurrentPage` to it and animates to it. If the circular layout is enabled, it will take the shortest path to this page.
	 */
	JumpTo(page?: Instance): undefined;
	/**
	 * If the index is `>= 0` and less than the size of the layout, this method acts like `UIPageLayout:JumpTo()`. If it's out of bounds and circular is set, it will animate the full distance between the in-bounds index of `UIPageLayout.CurrentPage` and the new index.
	 */
	JumpToIndex(index?: number): undefined;
	/**
	 * Sets `UIPageLayout.CurrentPage` to the page after the current page and animates to it, or does nothing if there isn't a next page.
	 */
	Next(): undefined;
	/**
	 * Sets `UIPageLayout.CurrentPage` to the page before the current page and animates to it, or does nothing if there isn't a previous page.
	 */
	Previous(): undefined;
	/** Fires when a page comes into view, and is going to be rendered. */
	readonly PageEnter: RBXScriptSignal<(page: Instance) => void>;
	/** Fires when a page leaves view, and will not be rendered. */
	readonly PageLeave: RBXScriptSignal<(page: Instance) => void>;
	/**
	 * Fires when an animation to `UIPageLayout.CurrentPage` is completed without being canceled, and the view stops scrolling.
	 */
	readonly Stopped: RBXScriptSignal<(currentPage: Instance) => void>;
}

/**
 * Lays out sibling UI elements and their child UI elements as rows/columns and cells in a table.
 */
interface UITableLayout extends UIGridStyleLayout {
	/**
	 * Determines whether cells are sized such that they occupy the horizontal space of the parent UI element.
	 */
	FillEmptySpaceColumns: boolean;
	/**
	 * Determines whether cells are sized such that they occupy the vertical space of the parent UI element.
	 */
	FillEmptySpaceRows: boolean;
	/** Determines whether sibling UI elements are treated as rows or columns. */
	MajorAxis: Enum.TableMajorAxis;
	/** Determines the empty space between cells. */
	Padding: UDim2;
}

/** Applies padding to the borders of the parent `GuiObject`. */
interface UIPadding extends UIComponent {
	/** Padding to apply on the bottom side, relative to the parent's normal size. */
	PaddingBottom: UDim;
	/** Padding to apply on the left side, relative to the parent's normal size. */
	PaddingLeft: UDim;
	/** Padding to apply on the right side, relative to the parent's normal size. */
	PaddingRight: UDim;
	/** Padding to apply on the top side, relative to the parent's normal size. */
	PaddingTop: UDim;
}

/**
 * An object that acts as a multiplier for the size of the parent UI element's scale.
 */
interface UIScale extends UIComponent {
	/** Determines the multiplier to apply to the parent UI element's size. */
	Scale: number;
}

/** Applies an outline to text or a UI border. */
interface UIStroke extends UIComponent {
	/**
	 * Determines whether to apply the stroke to the object's border instead of the text itself.
	 */
	ApplyStrokeMode: Enum.ApplyStrokeMode;
	/**
	 * Specifies an additional offset to the stroke's position, relative to the parent's minimum height or width.
	 */
	BorderOffset: UDim;
	/** Determines the stroke's position on its parent's border. */
	BorderStrokePosition: Enum.BorderStrokePosition;
	/** Determines the stroke color. */
	Color: Color3;
	/** Determines whether the stroke in visible. */
	Enabled: boolean;
	/** Determines how corners are interpreted. */
	LineJoinMode: Enum.LineJoinMode;
	/**
	 * Determines whether the stroke's `Thickness` will be measured in pixels or be relative to the parent.
	 */
	StrokeSizingMode: Enum.StrokeSizingMode;
	/** Determines the stroke's thickness. */
	Thickness: number;
	/**
	 * Sets the stroke opacity independently of the parent object's `BackgroundTransparency` or `TextTransparency`.
	 */
	Transparency: number;
	/**
	 * Determines the order in which the stroke renders relative to sibling `UIStroke` instances.
	 */
	ZIndex: number;
}

interface UIDragDetectorService extends Instance {
}

interface UniqueIdLookupService extends Instance {
	GetOrCreateUniqueIdRemoteCommand(instance?: Instance): string;
}

interface UnvalidatedAssetService extends Instance {
}

/**
 * The UserGameSettings is a singleton class found inside of the `UserSettings` singleton. It holds various persistent settings relating to how the user wants to control their camera, and their character.
 */
interface UserGameSettings extends Instance {
	/** The camera movement mode currently in-use by the client on desktop. */
	ComputerCameraMovementMode: Enum.ComputerCameraMovementMode;
	/** The type of controls being used by the client on desktop. */
	ComputerMovementMode: Enum.ComputerMovementMode;
	/** Toggles whether or not the client can use the Mouse Lock Switch mode. */
	ControlMode: Enum.ControlMode;
	/** Describes how sensitive the camera is when using a gamepad. */
	GamepadCameraSensitivity: number;
	/**
	 * A float between 0 and 4 representing the sensitivity of the client's camera sensitivity.
	 */
	MouseSensitivity: number;
	RCCProfilerRecordFrameRate: number;
	RCCProfilerRecordTimeFrame: number;
	/** Controls how the client's character is rotated. */
	RotationType: Enum.RotationType;
	/** The graphics quality level set by the client. */
	SavedQualityLevel: Enum.SavedQualitySetting;
	/** The camera type in-use by the client while on a mobile device. */
	TouchCameraMovementMode: Enum.TouchCameraMovementMode;
	/** The type of controls being used by the client on a mobile device. */
	TouchMovementMode: Enum.TouchMovementMode;
	readonly VRSmoothRotationEnabled: boolean;
	readonly VignetteEnabled: boolean;
	/** Returns the camera's Y-invert value. */
	GetCameraYInvertValue(): number;
	/** Checks if onboarding has been completed. */
	GetOnboardingCompleted(onboardingId?: string): boolean;
	/** Returns true if the user's Roblox window is in full screen mode. */
	InFullScreen(): boolean;
	/** Returns true if the client's game session is in Roblox Studio. */
	InStudioMode(): boolean;
	/** If called, Roblox toggles the menu option to invert the user's camera y axis. */
	SetCameraYInvertVisible(): undefined;
	/**
	 * If called, Roblox toggles the menu option to control the camera sensitivity with gamepads.
	 */
	SetGamepadCameraSensitivityVisible(): undefined;
	/** Sets onboarding as completed. */
	SetOnboardingCompleted(onboardingId?: string): undefined;
	/** Fires if the user's full screen mode is changed. */
	readonly FullscreenChanged: RBXScriptSignal<(isFullscreen: boolean) => void>;
	/**
	 * Fired when the user's client switches between Studio mode and in-game mode. This gets fired periodically in Roblox Studio when a session starts.
	 */
	readonly StudioModeChanged: RBXScriptSignal<(isStudioMode: boolean) => void>;
}

/**
 * `UserInputService` is primarily used to detect the input types available on a user's device, as well as detect input events.
 */
interface UserInputService extends Instance {
	/** Describes whether the user's device has an accelerometer. */
	AccelerometerEnabled: boolean;
	/** Describes whether the user's device has an available gamepad. */
	GamepadEnabled: boolean;
	/** Describes whether the user's device has a gyroscope. */
	GyroscopeEnabled: boolean;
	/** Describes whether the user's device has a keyboard available. */
	KeyboardEnabled: boolean;
	/**
	 * Toggles whether Roblox's mobile controls are hidden on mobile devices.
	 * @deprecated Deprecated.
	 */
	ModalEnabled: boolean;
	/** Determines whether the user's mouse can be moved freely or is locked. */
	MouseBehavior: Enum.MouseBehavior;
	/** Scales the delta (change) output of the user's `Mouse`. */
	MouseDeltaSensitivity: number;
	/** Describes whether the user's device has a mouse available. */
	MouseEnabled: boolean;
	/** The content ID of the image for the user's mouse icon. */
	MouseIcon: ContentId;
	/**
	 * The content ID of the image for the user's mouse icon. Only supports asset URIs.
	 */
	MouseIconContent: Content;
	/** Determines whether the mouse icon is visible. */
	MouseIconEnabled: boolean;
	/** Determines the position of the on-screen keyboard. */
	OnScreenKeyboardPosition: Vector2;
	/** Determines the size of the on-screen keyboard. */
	OnScreenKeyboardSize: Vector2;
	/**
	 * Describes whether an on-screen keyboard is currently visible on the user's screen.
	 */
	OnScreenKeyboardVisible: boolean;
	/**
	 * Queries the primary input type a player is using, based on anticipated user behavior.
	 */
	PreferredInput: Enum.PreferredInput;
	/** Describes whether the user's device has a touch screen available. */
	TouchEnabled: boolean;
	/**
	 * Describes the orientation and position of a user's head, if they are actively using a virtual reality headset.
	 * @deprecated Deprecated.
	 */
	UserHeadCFrame: CFrame;
	/** Indicates whether the user is using a virtual reality headset. */
	VREnabled: boolean;
	/**
	 * Returns whether the given `Enum.UserInputType` gamepad supports a button corresponding with the given `Enum.KeyCode`.
	 */
	GamepadSupports(gamepadNum?: Enum.UserInputType, gamepadKeyCode?: Enum.KeyCode): boolean;
	/** Returns an array of `Enum.UserInputType` gamepads currently connected. */
	GetConnectedGamepads(): unknown;
	/** Returns an `InputObject` that describes the device's current acceleration. */
	GetDeviceAcceleration(): InputObject;
	/** Returns an `InputObject` describing the device's current gravity vector. */
	GetDeviceGravity(): InputObject;
	/**
	 * Returns an `InputObject` and a `CFrame` describing the device's current rotation vector.
	 */
	GetDeviceRotation(): unknown;
	/** Returns the `TextBox` the client is currently focused on. */
	GetFocusedTextBox(): TextBox;
	/** Returns whether a gamepad with the given `Enum.UserInputType` is connected. */
	GetGamepadConnected(gamepadNum?: Enum.UserInputType): boolean;
	/**
	 * Returns an array of `InputObjects` for all available inputs on the given gamepad, representing each input's last input state.
	 */
	GetGamepadState(gamepadNum?: Enum.UserInputType): Instance[];
	/** Returns an image for the requested `Enum.KeyCode`. */
	GetImageForKeyCode(keyCode?: Enum.KeyCode): ContentId;
	/**
	 * Returns an array of `InputObjects` associated with the `keys` currently being pressed down.
	 */
	GetKeysPressed(): Instance[];
	/** Returns the `Enum.UserInputType` associated with the user's most recent input. */
	GetLastInputType(): Enum.UserInputType;
	/**
	 * Returns an array of `InputObjects` associated with the mouse buttons currently being held down.
	 */
	GetMouseButtonsPressed(): Instance[];
	/**
	 * Returns the change, in pixels, of the position of the player's `Mouse` in the last rendered frame. Only works if the mouse is locked.
	 */
	GetMouseDelta(): Vector2;
	/**
	 * Returns the current screen location of the player's `Mouse` relative to the top-left corner of the screen.
	 */
	GetMouseLocation(): Vector2;
	/**
	 * Returns an array of gamepads connected and enabled for `GuiObject` navigation in descending order of priority.
	 */
	GetNavigationGamepads(): unknown;
	/**
	 * Returns a string representing a key the user should press in order to input a given `Enum.KeyCode`.
	 */
	GetStringForKeyCode(keyCode?: Enum.KeyCode): string;
	/**
	 * Returns an array of `KeyCodes` that the gamepad associated with the given `Enum.UserInputType` supports.
	 */
	GetSupportedGamepadKeyCodes(gamepadNum?: Enum.UserInputType): unknown;
	/**
	 * Returns a `CFrame` describing the position and orientation of a specified virtual reality device.
	 * @deprecated Deprecated.
	 */
	GetUserCFrame(type?: Enum.UserCFrame): CFrame;
	/** Determines whether a particular button is pressed on a gamepad. */
	IsGamepadButtonDown(gamepadNum?: Enum.UserInputType, gamepadKeyCode?: Enum.KeyCode): boolean;
	/** Returns whether the given `key` is currently held down. */
	IsKeyDown(keyCode?: Enum.KeyCode): boolean;
	/** Returns whether the given mouse button is currently held down. */
	IsMouseButtonPressed(mouseButton?: Enum.UserInputType): boolean;
	/**
	 * Returns `true` if the specified gamepad is allowed to control navigation and selection `GuiObjects`.
	 */
	IsNavigationGamepad(gamepadEnum?: Enum.UserInputType): boolean;
	/**
	 * Recenters the `CFrame` of the VR headset to the current orientation of the headset worn by the user.
	 */
	RecenterUserHeadCFrame(): undefined;
	/** Sets whether or not the specified gamepad can move the `GuiObject` navigator. */
	SetNavigationGamepad(gamepadEnum?: Enum.UserInputType, enabled?: boolean): undefined;
	/** Fires when a user moves a device that has an accelerometer. */
	readonly DeviceAccelerationChanged: RBXScriptSignal<(acceleration: InputObject) => void>;
	/**
	 * Fires when the force of gravity changes on a device that has an enabled accelerometer.
	 */
	readonly DeviceGravityChanged: RBXScriptSignal<(gravity: InputObject) => void>;
	/** Fires when a user rotates a device that has a gyroscope. */
	readonly DeviceRotationChanged: RBXScriptSignal<(rotation: InputObject, cframe: CFrame) => void>;
	/** Fires when a gamepad is connected to the client. */
	readonly GamepadConnected: RBXScriptSignal<(gamepadNum: Enum.UserInputType) => void>;
	/** Fires when a gamepad is disconnected from the client. */
	readonly GamepadDisconnected: RBXScriptSignal<(gamepadNum: Enum.UserInputType) => void>;
	/**
	 * Fires when a user begins interacting with an input device such as a mouse or gamepad.
	 */
	readonly InputBegan: RBXScriptSignal<(input: InputObject, gameProcessedEvent: boolean) => void>;
	/**
	 * Fires when a user changes how they're interacting with an input device such as a mouse or gamepad.
	 */
	readonly InputChanged: RBXScriptSignal<(input: InputObject, gameProcessedEvent: boolean) => void>;
	/**
	 * Fires when a user stops interacting with an input device such as a mouse or gamepad.
	 */
	readonly InputEnded: RBXScriptSignal<(input: InputObject, gameProcessedEvent: boolean) => void>;
	/** Fires whenever the client makes a request for their character to jump. */
	readonly JumpRequest: RBXScriptSignal<() => void>;
	/** Fires whenever the client's `Enum.UserInputType` is changed. */
	readonly LastInputTypeChanged: RBXScriptSignal<(lastInputType: Enum.UserInputType) => void>;
	/** Fires when the user performs a specific pointer action. */
	readonly PointerAction: RBXScriptSignal<(wheel: number, pan: Vector2, pinch: number, gameProcessedEvent: boolean) => void>;
	/** Fires when the client loses focus on a `TextBox`. */
	readonly TextBoxFocusReleased: RBXScriptSignal<(textboxReleased: TextBox) => void>;
	/** Fires when the client focuses on a `TextBox`. */
	readonly TextBoxFocused: RBXScriptSignal<(textboxFocused: TextBox) => void>;
	/** Fires when the user drags on the screen of a `TouchEnabled` device. */
	readonly TouchDrag: RBXScriptSignal<(dragDirection: Enum.SwipeDirection, numberOfTouches: number, gameProcessedEvent: boolean) => void>;
	/**
	 * Fires when a user releases their finger from the screen of a `TouchEnabled` device.
	 */
	readonly TouchEnded: RBXScriptSignal<(touch: InputObject, gameProcessedEvent: boolean) => void>;
	/**
	 * Fires when a user holds at least one finger for a short amount of time on the screen of a `TouchEnabled` device.
	 */
	readonly TouchLongPress: RBXScriptSignal<(touchPositions: unknown, state: Enum.UserInputState, gameProcessedEvent: boolean) => void>;
	/** Fires when a user moves their finger on the screen of a `TouchEnabled` device. */
	readonly TouchMoved: RBXScriptSignal<(touch: InputObject, gameProcessedEvent: boolean) => void>;
	/**
	 * Fires when the user drags at least one finger on the screen of a `TouchEnabled` device.
	 */
	readonly TouchPan: RBXScriptSignal<(touchPositions: unknown, totalTranslation: Vector2, velocity: Vector2, state: Enum.UserInputState, gameProcessedEvent: boolean) => void>;
	/**
	 * Fires when a user performs a pinch gesture on the screen of a `TouchEnabled` device.
	 */
	readonly TouchPinch: RBXScriptSignal<(touchPositions: unknown, scale: number, velocity: number, state: Enum.UserInputState, gameProcessedEvent: boolean) => void>;
	/** Fires when a user rotates two fingers on the screen of a `TouchEnabled` device. */
	readonly TouchRotate: RBXScriptSignal<(touchPositions: unknown, rotation: number, velocity: number, state: Enum.UserInputState, gameProcessedEvent: boolean) => void>;
	/** Fires when a user places their finger on the screen of a `TouchEnabled` device. */
	readonly TouchStarted: RBXScriptSignal<(touch: InputObject, gameProcessedEvent: boolean) => void>;
	/**
	 * Fires on a `TouchEnabled` device when a user places their finger(s) down on the screen, pans across the screen, and lifts their finger(s) off with a certain speed of movement.
	 */
	readonly TouchSwipe: RBXScriptSignal<(swipeDirection: Enum.SwipeDirection, numberOfTouches: number, gameProcessedEvent: boolean) => void>;
	/** Fires when a user taps their finger on the screen of a `TouchEnabled` device. */
	readonly TouchTap: RBXScriptSignal<(touchPositions: unknown, gameProcessedEvent: boolean) => void>;
	/**
	 * Fires when a user taps their finger on the screen of a `TouchEnabled` device and the tap location is in the 3D world.
	 */
	readonly TouchTapInWorld: RBXScriptSignal<(position: Vector2, processedByUI: boolean) => void>;
	/**
	 * Fires when the `CFrame` of a specified Virtual Reality device changes.
	 * @deprecated Deprecated.
	 */
	readonly UserCFrameChanged: RBXScriptSignal<(type: Enum.UserCFrame, value: CFrame) => void>;
	/** Fires when the window of the Roblox client loses focus on the user's screen. */
	readonly WindowFocusReleased: RBXScriptSignal<() => void>;
	/** Fires when the window of the Roblox client gains focus on the user's screen. */
	readonly WindowFocused: RBXScriptSignal<() => void>;
}

/** A service that handles queries regarding users on the Roblox platform. */
interface UserService extends Instance {
	/** Returns an array of user information including user name and display name. */
	GetUserInfosByUserIdsAsync(userIds?: unknown): unknown;
}

/**
 * Service responsible for handling interactions between Roblox and Virtual Reality (VR).
 */
interface VRService extends Instance {
	/** Automatically adjusts scaling in VR to align the player with their avatar. */
	AutomaticScaling: Enum.VRScaling;
	/**
	 * When true, a VR player will be able to animate their hands and head using their controllers and headset.
	 */
	AvatarGestures: boolean;
	ControllerModels: Enum.VRControllerModelMode;
	/**
	 * When true, a VR player's view will fade to black when their head collides with an object.
	 */
	FadeOutViewOnCollision: boolean;
	/** Describes what `Enum.UserCFrame` is responsible for input in VR. */
	GuiInputUserCFrame: Enum.UserCFrame;
	LaserPointer: Enum.VRLaserPointerMode;
	ThirdPersonFollowCamEnabled: boolean;
	/** Describes whether the user is using a virtual reality device. */
	VREnabled: boolean;
	/** Returns the VRTouchpadMode indicating the mode of a specified VRTouchpad. */
	GetTouchpadMode(pad?: Enum.VRTouchpad): Enum.VRTouchpadMode;
	/**
	 * Returns a CFrame describing the position &amp; orientation of a specified virtual reality device as an offset from a point in real world space.
	 */
	GetUserCFrame(type?: Enum.UserCFrame): CFrame;
	/** Returns true if the specified `Enum.UserCFrame` is available to be listened to. */
	GetUserCFrameEnabled(type?: Enum.UserCFrame): boolean;
	/**
	 * Re-centers the `CFrame` to the current location of the VR headset being worn by the user.
	 */
	RecenterUserHeadCFrame(): undefined;
	/**
	 * Requests navigation to the specified `CFrame` using the specified `Enum.UserCFrame` as the origin for the visualizer parabola.
	 */
	RequestNavigation(cframe?: CFrame, inputUserCFrame?: Enum.UserCFrame): undefined;
	/**
	 * Sets the mode of the specified `Enum.VRTouchpad` to the specified `Enum.VRTouchpadMode`.
	 */
	SetTouchpadMode(pad?: Enum.VRTouchpad, mode?: Enum.VRTouchpadMode): undefined;
	/** Fired when navigation is requested from `VRService`. */
	readonly NavigationRequested: RBXScriptSignal<(cframe: CFrame, inputUserCFrame: Enum.UserCFrame) => void>;
	/** Fires if the `Enum.VRTouchpadMode` of a `Enum.VRTouchpad` is changed. */
	readonly TouchpadModeChanged: RBXScriptSignal<(pad: Enum.VRTouchpad, mode: Enum.VRTouchpadMode) => void>;
	/** Fires when a `Enum.UserCFrame` is changed. */
	readonly UserCFrameChanged: RBXScriptSignal<(type: Enum.UserCFrame, value: CFrame) => void>;
	/** Fires when a `Enum.UserCFrame` is enabled or disabled. */
	readonly UserCFrameEnabled: RBXScriptSignal<(type: Enum.UserCFrame, enabled: boolean) => void>;
}

interface VRStatusService extends Instance {
}

/** Base class of all "value instance" objects. */
interface ValueBase extends Instance {
}

/** An internal type of `StringValue` object, that stores a `BinaryString` value. */
interface BinaryStringValue extends ValueBase {
	/** Fires if the BinaryStringValue's value is changed. */
	readonly Changed: RBXScriptSignal<(value: string) => void>;
}

/** A container object for a single boolean value. */
interface BoolValue extends ValueBase {
	/** Used to hold a boolean value. */
	Value: boolean;
	/** Fires whenever the `BoolValue.Value` is changed. */
	readonly Changed: RBXScriptSignal<(value: boolean) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: boolean) => void>;
}

/** A container object for a single BrickColor value. */
interface BrickColorValue extends ValueBase {
	/** Used to hold a `BrickColor` value. */
	Value: BrickColor;
	/** Fired whenever the `BrickColorValue.Value` of the BrickColorValue is changed. */
	readonly Changed: RBXScriptSignal<(value: BrickColor) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: BrickColor) => void>;
}

/** A container object for a single CFrame value. */
interface CFrameValue extends ValueBase {
	/** Used to hold a `CFrame` value. */
	Value: CFrame;
	/** Fired whenever the `CFrameValue.Value` of the CFrameValue is changed. */
	readonly Changed: RBXScriptSignal<(value: CFrame) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: CFrame) => void>;
}

/** A container object for a single Color3 value. */
interface Color3Value extends ValueBase {
	/** The stored `Color3`. */
	Value: Color3;
	/** Fired whenever the `Color3Value.Value` is changed. */
	readonly Changed: RBXScriptSignal<(value: Color3) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: Color3) => void>;
}

/**
 * An instance which is used to create a number value which can never be less than the MinValue or more than the MaxValue.
 * @deprecated This class is deprecated.
 */
interface DoubleConstrainedValue extends ValueBase {
	/** The highest number that the `DoubleConstrainedValue.Value` property can be. */
	MaxValue: number;
	/** The lowest number that the `DoubleConstrainedValue.Value` property can be. */
	MinValue: number;
	/**
	 * Used to hold a number value between `DoubleConstrainedValue.MinValue` and `DoubleConstrainedValue.MaxValue`.
	 */
	Value: number;
	/**
	 * Fired whenever the `DoubleConstrainedValue.Value` of the `DoubleConstrainedValue` is changed.
	 */
	readonly Changed: RBXScriptSignal<(value: number) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: number) => void>;
}

/**
 * An IntConstrainedValue is used to store a value which can never be less than MinValue and can never be more than MaxValue.
 * @deprecated This class is deprecated.
 */
interface IntConstrainedValue extends ValueBase {
	/** The highest number that the `IntConstrainedValue.Value` property can be. */
	MaxValue: number;
	/** The lowest number that the `IntConstrainedValue.Value` property can be. */
	MinValue: number;
	/**
	 * Used to hold an integer value between `IntConstrainedValue.MinValue` and `IntConstrainedValue.MaxValue`.
	 */
	Value: number;
	/** Fired whenever the Value of the IntConstrainedValue is changed. */
	readonly Changed: RBXScriptSignal<(value: number) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: number) => void>;
}

/** A container object for a single integer. */
interface IntValue extends ValueBase {
	/** Used to hold an integer. */
	Value: number;
	/** Fires whenever the `IntValue.Value` is changed. */
	readonly Changed: RBXScriptSignal<(value: number) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: number) => void>;
}

/** A container object for a single double-precision floating point number. */
interface NumberValue extends ValueBase {
	/** Used to hold a double value. */
	Value: number;
	/** Fires whenever the `NumberValue.Value` is changed. */
	readonly Changed: RBXScriptSignal<(value: number) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: number) => void>;
}

/** A container object for a reference to another instance. */
interface ObjectValue extends ValueBase {
	/** Holds a reference to an instance. */
	Value: Instance;
	/** Fires whenever the `ObjectValue.Value` is changed. */
	readonly Changed: RBXScriptSignal<(value: Instance) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: Instance) => void>;
}

/** A container object for a single Ray. */
interface RayValue extends ValueBase {
	/** The stored Ray. */
	Value: Ray;
	/** Fired when `RayValue.Value` is changed. */
	readonly Changed: RBXScriptSignal<(value: Ray) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: Ray) => void>;
}

/** A container object for a single string. */
interface StringValue extends ValueBase {
	/** The stored string. */
	Value: string;
	/** Fires whenever `StringValue.Value` is changed. */
	readonly Changed: RBXScriptSignal<(value: string) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: string) => void>;
}

/** A container object for a single Vector3 value. */
interface Vector3Value extends ValueBase {
	/** The stored `Vector3`. */
	Value: Vector3;
	/** Fired whenever `Vector3Value.Value` is changed. */
	readonly Changed: RBXScriptSignal<(value: Vector3) => void>;
	/** @deprecated Deprecated. */
	readonly changed: RBXScriptSignal<(value: Vector3) => void>;
}

/**
 * A sorted list of time-value pairs that define a curve. Used to animate a any type of value.
 */
interface ValueCurve extends Instance {
	/** Number of keys in the value curve. */
	Length: number;
	/** Read-only value indicating the type held in this curve. */
	ValueType: string;
	/** Returns a copy of a key at a given index. */
	GetKeyAtIndex(index?: number): ValueCurveKey;
	/** Returns the index of the last and first key of a period of time. */
	GetKeyIndicesAtTime(time?: number): unknown;
	/**
	 * Returns a copy of all the keys in the ValueCurve as a Luau array of `ValueCurveKeys`.
	 */
	GetKeys(): unknown;
	/** Samples the value curve at a given time passed as argument. */
	GetValueAtTime(time?: number): unknown;
	/**
	 * Adds the key passed as an argument to this curve. If a key at the same time is found, it will be replaced.
	 */
	InsertKey(key?: ValueCurveKey): unknown;
	/**
	 * Creates a key for the given value and inserts it at the given time. If a key at the same time is found, it will be replaced.
	 */
	InsertKeyValue(time?: number, value?: unknown, keyInterpolationMode?: Enum.KeyInterpolationMode): unknown;
	/** Removes a given number of keys starting from a given index. */
	RemoveKeyAtIndex(startingIndex?: number, count?: number): number;
	/** Resets this curve's keys using the `ValueCurveKey` array passed as an argument. */
	SetKeys(keys?: unknown): number;
}

/** Represents a 3D vector curve, grouping three `FloatCurve` instances. */
interface Vector3Curve extends Instance {
	/** Returns the three `FloatCurves` (X, Y, Z) at the passed time argument. */
	GetValueAtTime(time?: number): unknown;
	/**
	 * Returns the `FloatCurve` controlling the X channel (the first child instance of type `FloatCurve` named `X`).
	 */
	X(): FloatCurve;
	/**
	 * Returns the `FloatCurve` controlling the Y channel (the first child instance of type `FloatCurve` named `Y`).
	 */
	Y(): FloatCurve;
	/**
	 * Returns the `FloatCurve` controlling the Z channel (the first child instance of type `FloatCurve` named `Z`).
	 */
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

/** Used to play video assets. */
interface VideoPlayer extends Instance {
	/** Indicates when the `VideoContent` has loaded and is ready to play. */
	IsLoaded: boolean;
	/** Denotes whether this `VideoPlayer` is currently playing. */
	IsPlaying: boolean;
	/** Controls whether this `VideoPlayer` loops. */
	Looping: boolean;
	/** Controls the speed at which the video is played. */
	PlaybackSpeed: number;
	/** Gets the original source resolution of the `VideoContent` file. */
	Resolution: Vector2;
	/** Indicates the length of the `VideoContent` in seconds. */
	TimeLength: number;
	/** Indicates the progress in seconds of the `VideoContent`. */
	TimePosition: number;
	/** The asset to be loaded into the `VideoPlayer`. */
	VideoContent: Content;
	/** Controls how loudly the audio track will be played. */
	Volume: number;
	/** Returns an array of `Wires` that are connected to the specified pin. */
	GetConnectedWires(pin?: string): Instance[];
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.TargetName` to connect to this instance via its `Wire.TargetInstance` property.
	 */
	GetInputPins(): unknown;
	/**
	 * Gets the list of pins that `Wire` can use in `Wire.SourceName` to connect to this instance via its `Wire.SourceInstance` property.
	 */
	GetOutputPins(): unknown;
	/** Pauses the `VideoPlayer` wherever its `TimePosition` is. */
	Pause(): undefined;
	/** Plays the `VideoPlayer` from wherever its `TimePosition` is. */
	Play(): undefined;
	/** Unloads the `VideoPlayer.VideoContent` to save resources. */
	Unload(): undefined;
	/** Loads the `VideoContent` before it is played. */
	LoadAsync(): Enum.AssetFetchStatus;
	/** Fires when the `VideoContent` has completed playback and stopped. */
	readonly DidEnd: RBXScriptSignal<() => void>;
	/** Fires when the `VideoContent` loops. */
	readonly DidLoop: RBXScriptSignal<() => void>;
	readonly PlayFailed: RBXScriptSignal<(error: Enum.AssetFetchStatus) => void>;
	/**
	 * Fires when another instance is connected to or disconnected from the `VideoPlayer` via a `Wire`.
	 */
	readonly WiringChanged: RBXScriptSignal<(connected: boolean, pin: string, wire: Wire, instance: Instance) => void>;
}

interface VideoScreenCaptureService extends Instance {
}

/** An internal service that offers no functionality to developers. */
interface VideoService extends Instance {
	/** Creates a `VideoSampler` that samples frames from the provided video content. */
	CreateVideoSamplerAsync(content?: Content, options?: unknown): VideoSampler;
}

/** An internal service that offers no functionality to developers. */
interface VirtualInputManager extends Instance {
}

/**
 * VirtualUser is a service that allows you to record the inputs of a user, and then play it back to a limited extent.
 */
interface VirtualUser extends Instance {
}

interface VisibilityCheckDispatcher extends Instance {
}

/**
 * The Visit service is a backend service used by Roblox. Its functions are not accessible to developers in any form.
 */
interface Visit extends Instance {
}

interface VisualizationMode extends Instance {
}

interface VisualizationModeCategory extends Instance {
}

interface VisualizationModeService extends Instance {
}

interface VoiceChatInternal extends Instance {
	/** @deprecated Deprecated. */
	GetAudioProcessingSettings(): unknown;
	/** @deprecated Deprecated. */
	GetMicDevices(): unknown;
	/** @deprecated Deprecated. */
	GetParticipants(): unknown;
	/** @deprecated Deprecated. */
	GetSpeakerDevices(): unknown;
	/** @deprecated Deprecated. */
	GetVoiceChatApiVersion(): number;
	/** @deprecated Deprecated. */
	GetVoiceChatAvailable(): number;
	/** @deprecated Deprecated. */
	IsPublishPaused(): boolean;
	/** @deprecated Deprecated. */
	IsSubscribePaused(userId: number): boolean;
	/** @deprecated Deprecated. */
	JoinByGroupId(groupId: string, isMicMuted?: boolean): boolean;
	/** @deprecated Deprecated. */
	JoinByGroupIdToken(groupId: string, isMicMuted: boolean, isRetry?: boolean): boolean;
	/** @deprecated Deprecated. */
	Leave(): undefined;
	/** @deprecated Deprecated. */
	PublishPause(paused: boolean): boolean;
	/** @deprecated Deprecated. */
	SetMicDevice(micDeviceName: string, micDeviceGuid: string): undefined;
	/** @deprecated Deprecated. */
	SetSpeakerDevice(speakerDeviceName: string, speakerDeviceGuid: string): undefined;
	/** @deprecated Deprecated. */
	SubscribePause(userId: number, paused: boolean): boolean;
	/** @deprecated Deprecated. */
	SubscribePauseAll(paused: boolean): boolean;
	IsVoiceEnabledForUserIdAsync(userId: number): boolean;
	/** @deprecated Deprecated. */
	readonly StateChanged: RBXScriptSignal<(old: Enum.VoiceChatState, _new: Enum.VoiceChatState) => void>;
}

/** **VoiceChatService** is responsible for voice chat's high-level functionality. */
interface VoiceChatService extends Instance {
	/**
	 * Determines which distance attenuation curve the default voice chat setup uses when `AudioDeviceInput` and `AudioEmitter` objects are generated.
	 */
	DefaultDistanceAttenuation: Enum.VoiceChatDistanceAttenuationType;
	/**
	 * Controls whether each voice-eligible player can be heard as though they were speaking through their character.
	 */
	EnableDefaultVoice: boolean;
	/**
	 * Controls whether voice chat is represented and controlled by `AudioDeviceInput` objects.
	 */
	UseAudioApi: Enum.AudioApiRollout;
	/** Returns chat group IDs that indicate which players can voice chat together. */
	GetChatGroupsAsync(players?: Instance[]): unknown;
	/** Returns whether or not the given user has voice enabled. */
	IsVoiceEnabledForUserIdAsync(userId?: number): boolean;
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

/**
 * Connects two `BaseParts` together such that their relative position and orientation remain the same.
 */
interface WeldConstraint extends Instance {
	/** Indicates if the WeldConstraint is currently active in the world. */
	Active: boolean;
	/** Toggles the constraint on and off. */
	Enabled: boolean;
	/** The first part connected by the constraint. */
	Part0: BasePart;
	/** The second part connected by the constraint. */
	Part1: BasePart;
}

/**
 * Connects one or more `Instances` to form a processing graph of their streams. At the moment, only audio streams are supported, but this may expand in the future.
 */
interface Wire extends Instance {
	/** Denotes whether the `Wire` is carrying a stream of data. */
	Connected: boolean;
	/** The `Instance` producing a stream to be carried over the wire. */
	SourceInstance: Instance;
	/** The name of the pin on `SourceInstance` that is producing a stream. */
	SourceName: string;
	/** The `Instance` to receive a stream from `SourceInstance`. */
	TargetInstance: Instance;
	/** The name of the pin on `TargetInstance` that is receiving a stream. */
	TargetName: string;
}

interface WrapDeformMeshProvider extends Instance {
}

/**
 * `WrapTextureTransfer` allows a parent `Decal` to be wrapped around its parent `MeshPart` based on the cage of its `WrapTarget`.
 */
interface WrapTextureTransfer extends Instance {
	/** An optional reference mesh used for pruning and validating the target cage. */
	ReferenceCageMeshContent: Content;
	/** Determines the maximum bound of the UV space to include in the transfer. */
	UVMaxBound: Vector2;
	/** Determines the minimum bound of the UV space to include in the transfer. */
	UVMinBound: Vector2;
}

interface MLSession extends Object {
	ForwardAsync(data?: unknown): unknown;
}

interface TerrainIterateOperation extends Object {
	CommitBlock(block?: unknown): RBXScriptSignal;
	readonly Ready: RBXScriptSignal<(block: unknown) => void>;
}

interface TerrainModifyOperation extends Object {
	CommitBlock(block?: unknown): RBXScriptSignal;
	readonly Ready: RBXScriptSignal<(block: unknown) => void>;
}

interface TerrainReadOperation extends Object {
	readonly Ready: RBXScriptSignal<(block: unknown) => void>;
}

interface TerrainWriteOperation extends Object {
	CommitBlock(block?: unknown): RBXScriptSignal;
	GetBlock(): unknown;
}

/** An object for sampling frames from video content. */
interface VideoSampler extends Object {
	/** The length of the `VideoContent` in seconds. */
	TimeLength: number;
	/** The asset loaded into the `VideoSampler`. */
	VideoContent: Content;
	/** Gets image frames at the specified timestamps. */
	GetSamplesAtTimesAsync(times?: unknown): unknown;
}

interface VoxelBuffer extends Object {
}

/** Maintains a streaming connection. */
interface WebStreamClient extends Object {
	/** The current `Enum.WebStreamClientState` of the client. */
	ConnectionState: Enum.WebStreamClientState;
	/** Closes the client, aborting the ongoing request. */
	Close(): undefined;
	/** Enqueues data to be transmitted to the server over the streaming connection. */
	Send(data?: string): undefined;
	readonly Closed: RBXScriptSignal<() => void>;
	/**
	 * Fires if an error is received while establishing the connection or during the connection lifetime.
	 */
	readonly Error: RBXScriptSignal<(responseStatusCode: number, errorMessage: string) => void>;
	/** Fires each time a message is received from the server. */
	readonly MessageReceived: RBXScriptSignal<(message: string) => void>;
	/**
	 * Fires when the a connection is successfully established between the client and server, allowing for events to begin streaming.
	 */
	readonly Opened: RBXScriptSignal<(responseStatusCode: number, headers: string) => void>;
}

interface CreatableInstances {
	AccessoryDescription: AccessoryDescription;
	Accoutrement: Accoutrement;
	Accessory: Accessory;
	AdPortal: AdPortal;
	AdvancedDragger: AdvancedDragger;
	Animation: Animation;
	AnimationGraphDefinition: AnimationGraphDefinition;
	CurveAnimation: CurveAnimation;
	KeyframeSequence: KeyframeSequence;
	AnimationController: AnimationController;
	AnimationNodeDefinition: AnimationNodeDefinition;
	AnimationRigData: AnimationRigData;
	Animator: Animator;
	Annotation: Annotation;
	WorkspaceAnnotation: WorkspaceAnnotation;
	Atmosphere: Atmosphere;
	Attachment: Attachment;
	Bone: Bone;
	AudioAnalyzer: AudioAnalyzer;
	AudioChannelMixer: AudioChannelMixer;
	AudioChannelSplitter: AudioChannelSplitter;
	AudioChorus: AudioChorus;
	AudioCompressor: AudioCompressor;
	AudioDeviceInput: AudioDeviceInput;
	AudioDeviceOutput: AudioDeviceOutput;
	AudioDistortion: AudioDistortion;
	AudioEcho: AudioEcho;
	AudioEmitter: AudioEmitter;
	AudioEqualizer: AudioEqualizer;
	AudioFader: AudioFader;
	AudioFilter: AudioFilter;
	AudioFlanger: AudioFlanger;
	AudioGate: AudioGate;
	AudioLimiter: AudioLimiter;
	AudioListener: AudioListener;
	AudioPitchShifter: AudioPitchShifter;
	AudioPlayer: AudioPlayer;
	AudioRecorder: AudioRecorder;
	AudioReverb: AudioReverb;
	AudioSearchParams: AudioSearchParams;
	AudioSpeechToText: AudioSpeechToText;
	AudioTextToSpeech: AudioTextToSpeech;
	AudioTremolo: AudioTremolo;
	AvatarAccessoryRules: AvatarAccessoryRules;
	AvatarAnimationRules: AvatarAnimationRules;
	AvatarBodyRules: AvatarBodyRules;
	AvatarClothingRules: AvatarClothingRules;
	AvatarCollisionRules: AvatarCollisionRules;
	AvatarRules: AvatarRules;
	Backpack: Backpack;
	RemoteEvent: RemoteEvent;
	UnreliableRemoteEvent: UnreliableRemoteEvent;
	WrapDeformer: WrapDeformer;
	WrapLayer: WrapLayer;
	WrapTarget: WrapTarget;
	Beam: Beam;
	BindableEvent: BindableEvent;
	BindableFunction: BindableFunction;
	BodyPartDescription: BodyPartDescription;
	Breakpoint: Breakpoint;
	BodyColors: BodyColors;
	CharacterMesh: CharacterMesh;
	Pants: Pants;
	Shirt: Shirt;
	ShirtGraphic: ShirtGraphic;
	ClickDetector: ClickDetector;
	DragDetector: DragDetector;
	Clouds: Clouds;
	CompositeValueCurve: CompositeValueCurve;
	Configuration: Configuration;
	AlignOrientation: AlignOrientation;
	AlignPosition: AlignPosition;
	AngularVelocity: AngularVelocity;
	AnimationConstraint: AnimationConstraint;
	BallSocketConstraint: BallSocketConstraint;
	HingeConstraint: HingeConstraint;
	LineForce: LineForce;
	LinearVelocity: LinearVelocity;
	PlaneConstraint: PlaneConstraint;
	RigidConstraint: RigidConstraint;
	RodConstraint: RodConstraint;
	RopeConstraint: RopeConstraint;
	CylindricalConstraint: CylindricalConstraint;
	PrismaticConstraint: PrismaticConstraint;
	SpringConstraint: SpringConstraint;
	Torque: Torque;
	TorsionSpringConstraint: TorsionSpringConstraint;
	UniversalConstraint: UniversalConstraint;
	VectorForce: VectorForce;
	HumanoidController: HumanoidController;
	SkateboardController: SkateboardController;
	VehicleController: VehicleController;
	AirController: AirController;
	ClimbController: ClimbController;
	GroundController: GroundController;
	SwimController: SwimController;
	ControllerManager: ControllerManager;
	CustomLog: CustomLog;
	BlockMesh: BlockMesh;
	FileMesh: FileMesh;
	SpecialMesh: SpecialMesh;
	DataStoreGetOptions: DataStoreGetOptions;
	DataStoreIncrementOptions: DataStoreIncrementOptions;
	DataStoreOptions: DataStoreOptions;
	DataStoreSetOptions: DataStoreSetOptions;
	DebuggerWatch: DebuggerWatch;
	Dialog: Dialog;
	DialogChoice: DialogChoice;
	Dragger: Dragger;
	EulerRotationCurve: EulerRotationCurve;
	ExperienceInviteOptions: ExperienceInviteOptions;
	ExplorerFilter: ExplorerFilter;
	Explosion: Explosion;
	FaceControls: FaceControls;
	Decal: Decal;
	Texture: Texture;
	Fire: Fire;
	FloatCurve: FloatCurve;
	Folder: Folder;
	ForceField: ForceField;
	GetTextBoundsParams: GetTextBoundsParams;
	CanvasGroup: CanvasGroup;
	Frame: Frame;
	ImageButton: ImageButton;
	TextButton: TextButton;
	ImageLabel: ImageLabel;
	TextLabel: TextLabel;
	RelativeGui: RelativeGui;
	ScrollingFrame: ScrollingFrame;
	TextBox: TextBox;
	VideoDisplay: VideoDisplay;
	VideoFrame: VideoFrame;
	ViewportFrame: ViewportFrame;
	BillboardGui: BillboardGui;
	ScreenGui: ScreenGui;
	AdGui: AdGui;
	SurfaceGui: SurfaceGui;
	SelectionBox: SelectionBox;
	BoxHandleAdornment: BoxHandleAdornment;
	ConeHandleAdornment: ConeHandleAdornment;
	CylinderHandleAdornment: CylinderHandleAdornment;
	ImageHandleAdornment: ImageHandleAdornment;
	LineHandleAdornment: LineHandleAdornment;
	PyramidHandleAdornment: PyramidHandleAdornment;
	SphereHandleAdornment: SphereHandleAdornment;
	WireframeHandleAdornment: WireframeHandleAdornment;
	ParabolaAdornment: ParabolaAdornment;
	SelectionSphere: SelectionSphere;
	ArcHandles: ArcHandles;
	Handles: Handles;
	SurfaceSelection: SurfaceSelection;
	Path2D: Path2D;
	HandRigDescription: HandRigDescription;
	HapticEffect: HapticEffect;
	HiddenSurfaceRemovalAsset: HiddenSurfaceRemovalAsset;
	Highlight: Highlight;
	Humanoid: Humanoid;
	HumanoidDescription: HumanoidDescription;
	HumanoidRigDescription: HumanoidRigDescription;
	IKControl: IKControl;
	InputAction: InputAction;
	InputBinding: InputBinding;
	InputContext: InputContext;
	Motor: Motor;
	Motor6D: Motor6D;
	VelocityMotor: VelocityMotor;
	Weld: Weld;
	Keyframe: Keyframe;
	KeyframeMarker: KeyframeMarker;
	PointLight: PointLight;
	SpotLight: SpotLight;
	SurfaceLight: SurfaceLight;
	LocalizationTable: LocalizationTable;
	Script: Script;
	LocalScript: LocalScript;
	ModuleScript: ModuleScript;
	MakeupDescription: MakeupDescription;
	MarkerCurve: MarkerCurve;
	MaterialVariant: MaterialVariant;
	NoCollisionConstraint: NoCollisionConstraint;
	Noise: Noise;
	OperationGraph: OperationGraph;
	CornerWedgePart: CornerWedgePart;
	Part: Part;
	Seat: Seat;
	SpawnLocation: SpawnLocation;
	WedgePart: WedgePart;
	MeshPart: MeshPart;
	PartOperation: PartOperation;
	IntersectOperation: IntersectOperation;
	NegateOperation: NegateOperation;
	UnionOperation: UnionOperation;
	TrussPart: TrussPart;
	VehicleSeat: VehicleSeat;
	Camera: Camera;
	Model: Model;
	Actor: Actor;
	Tool: Tool;
	WorldModel: WorldModel;
	PartOperationAsset: PartOperationAsset;
	ParticleEmitter: ParticleEmitter;
	PathfindingLink: PathfindingLink;
	PathfindingModifier: PathfindingModifier;
	Player: Player;
	PluginAction: PluginAction;
	PluginCapabilities: PluginCapabilities;
	NumberPose: NumberPose;
	Pose: Pose;
	BloomEffect: BloomEffect;
	BlurEffect: BlurEffect;
	ColorCorrectionEffect: ColorCorrectionEffect;
	ColorGradingEffect: ColorGradingEffect;
	DepthOfFieldEffect: DepthOfFieldEffect;
	SunRaysEffect: SunRaysEffect;
	ProximityPrompt: ProximityPrompt;
	RTAnimationTracker: RTAnimationTracker;
	ReflectionMetadata: ReflectionMetadata;
	ReflectionMetadataCallbacks: ReflectionMetadataCallbacks;
	ReflectionMetadataClasses: ReflectionMetadataClasses;
	ReflectionMetadataEnums: ReflectionMetadataEnums;
	ReflectionMetadataEvents: ReflectionMetadataEvents;
	ReflectionMetadataFunctions: ReflectionMetadataFunctions;
	ReflectionMetadataClass: ReflectionMetadataClass;
	ReflectionMetadataEnum: ReflectionMetadataEnum;
	ReflectionMetadataEnumItem: ReflectionMetadataEnumItem;
	ReflectionMetadataMember: ReflectionMetadataMember;
	ReflectionMetadataProperties: ReflectionMetadataProperties;
	ReflectionMetadataYieldFunctions: ReflectionMetadataYieldFunctions;
	RemoteFunction: RemoteFunction;
	RenderingTest: RenderingTest;
	RotationCurve: RotationCurve;
	AtmosphereSensor: AtmosphereSensor;
	BuoyancySensor: BuoyancySensor;
	ControllerPartSensor: ControllerPartSensor;
	FluidForceSensor: FluidForceSensor;
	Sky: Sky;
	Smoke: Smoke;
	Sound: Sound;
	ChorusSoundEffect: ChorusSoundEffect;
	CompressorSoundEffect: CompressorSoundEffect;
	DistortionSoundEffect: DistortionSoundEffect;
	EchoSoundEffect: EchoSoundEffect;
	EqualizerSoundEffect: EqualizerSoundEffect;
	FlangeSoundEffect: FlangeSoundEffect;
	PitchShiftSoundEffect: PitchShiftSoundEffect;
	ReverbSoundEffect: ReverbSoundEffect;
	TremoloSoundEffect: TremoloSoundEffect;
	SoundGroup: SoundGroup;
	Sparkles: Sparkles;
	StandalonePluginScripts: StandalonePluginScripts;
	StarterGear: StarterGear;
	StudioAttachment: StudioAttachment;
	StudioCallout: StudioCallout;
	StyleRule: StyleRule;
	StyleSheet: StyleSheet;
	StyleDerive: StyleDerive;
	StyleLink: StyleLink;
	StyleQuery: StyleQuery;
	SurfaceAppearance: SurfaceAppearance;
	Team: Team;
	TeleportOptions: TeleportOptions;
	TerrainDetail: TerrainDetail;
	TerrainRegion: TerrainRegion;
	TextChannel: TextChannel;
	TextChatCommand: TextChatCommand;
	TextChatMessageProperties: TextChatMessageProperties;
	BubbleChatMessageProperties: BubbleChatMessageProperties;
	TextGenerator: TextGenerator;
	TrackerStreamAnimation: TrackerStreamAnimation;
	Trail: Trail;
	Tween: Tween;
	UIAspectRatioConstraint: UIAspectRatioConstraint;
	UISizeConstraint: UISizeConstraint;
	UITextSizeConstraint: UITextSizeConstraint;
	UICorner: UICorner;
	UIDragDetector: UIDragDetector;
	UIFlexItem: UIFlexItem;
	UIGradient: UIGradient;
	UIGridLayout: UIGridLayout;
	UIListLayout: UIListLayout;
	UIPageLayout: UIPageLayout;
	UITableLayout: UITableLayout;
	UIPadding: UIPadding;
	UIScale: UIScale;
	UIStroke: UIStroke;
	BinaryStringValue: BinaryStringValue;
	BoolValue: BoolValue;
	BrickColorValue: BrickColorValue;
	CFrameValue: CFrameValue;
	Color3Value: Color3Value;
	IntValue: IntValue;
	NumberValue: NumberValue;
	ObjectValue: ObjectValue;
	RayValue: RayValue;
	StringValue: StringValue;
	Vector3Value: Vector3Value;
	ValueCurve: ValueCurve;
	Vector3Curve: Vector3Curve;
	VideoDeviceInput: VideoDeviceInput;
	VideoPlayer: VideoPlayer;
	VisualizationMode: VisualizationMode;
	VisualizationModeCategory: VisualizationModeCategory;
	WeldConstraint: WeldConstraint;
	Wire: Wire;
	WrapTextureTransfer: WrapTextureTransfer;
}

declare const Instance: {
	/** Creates a new Instance of the given class. */
	new <T extends keyof CreatableInstances>(className: T, parent?: Instance): CreatableInstances[T];
	/** Returns a copy of an existing Instance (like Clone but ignores Archivable). */
	fromExisting(existingInstance: Instance): Instance;
};

interface CheckableServices {
	AccountService: AccountService;
	AchievementService: AchievementService;
	ActivityHistoryEventService: ActivityHistoryEventService;
	AdService: AdService;
	AnalyticsService: AnalyticsService;
	AnimationClipProvider: AnimationClipProvider;
	AnimationFromVideoCreatorService: AnimationFromVideoCreatorService;
	AnimationFromVideoCreatorStudioService: AnimationFromVideoCreatorStudioService;
	AnnotationsService: AnnotationsService;
	AppLifecycleObserverService: AppLifecycleObserverService;
	AppRatingPromptService: AppRatingPromptService;
	AppUpdateService: AppUpdateService;
	AssetCounterService: AssetCounterService;
	AssetDeliveryProxy: AssetDeliveryProxy;
	AssetImportService: AssetImportService;
	AssetManagerService: AssetManagerService;
	AssetQualityService: AssetQualityService;
	AssetService: AssetService;
	AudioFocusService: AudioFocusService;
	AvatarChatService: AvatarChatService;
	AvatarCreationService: AvatarCreationService;
	AvatarEditorService: AvatarEditorService;
	AvatarImportService: AvatarImportService;
	AvatarSettings: AvatarSettings;
	BadgeService: BadgeService;
	CoreGui: CoreGui;
	StarterGui: StarterGui;
	BrowserService: BrowserService;
	BugReporterService: BugReporterService;
	BulkImportService: BulkImportService;
	CacheableContentProvider: CacheableContentProvider;
	HSRDataContentProvider: HSRDataContentProvider;
	MeshContentProvider: MeshContentProvider;
	SlimContentProvider: SlimContentProvider;
	SolidModelContentProvider: SolidModelContentProvider;
	CalloutService: CalloutService;
	CaptureService: CaptureService;
	ChangeHistoryService: ChangeHistoryService;
	ChangeHistoryStreamingService: ChangeHistoryStreamingService;
	Chat: Chat;
	CloudCRUDService: CloudCRUDService;
	ClusterPacketCache: ClusterPacketCache;
	CollaboratorsService: CollaboratorsService;
	CollectionService: CollectionService;
	CommerceService: CommerceService;
	ConfigService: ConfigService;
	ConfigureServerService: ConfigureServerService;
	ConnectivityService: ConnectivityService;
	ContentProvider: ContentProvider;
	ContextActionService: ContextActionService;
	ControllerService: ControllerService;
	ConversationalAIAcceptanceService: ConversationalAIAcceptanceService;
	CookiesService: CookiesService;
	CoreGuiConfiguration: CoreGuiConfiguration;
	CorePackages: CorePackages;
	CoreScriptDebuggingManagerHelper: CoreScriptDebuggingManagerHelper;
	CoreScriptSyncService: CoreScriptSyncService;
	CreationDBService: CreationDBService;
	CreatorStoreService: CreatorStoreService;
	CrossDMScriptChangeListener: CrossDMScriptChangeListener;
	DataModelPatchService: DataModelPatchService;
	DataStoreService: DataStoreService;
	Debris: Debris;
	DebugSettings: DebugSettings;
	DebuggablePluginWatcher: DebuggablePluginWatcher;
	DebuggerConnectionManager: DebuggerConnectionManager;
	DebuggerManager: DebuggerManager;
	DebuggerUIService: DebuggerUIService;
	DeviceIdService: DeviceIdService;
	DraftsService: DraftsService;
	DraggerService: DraggerService;
	EditableService: EditableService;
	EncodingService: EncodingService;
	EventIngestService: EventIngestService;
	ExampleV2Service: ExampleV2Service;
	ExperienceAuthService: ExperienceAuthService;
	ExperienceNotificationService: ExperienceNotificationService;
	ExperienceService: ExperienceService;
	ExperienceStateCaptureService: ExperienceStateCaptureService;
	ExperienceStateRecordingService: ExperienceStateRecordingService;
	ExplorerServiceVisibilityService: ExplorerServiceVisibilityService;
	FaceAnimatorService: FaceAnimatorService;
	FacialAgeEstimationService: FacialAgeEstimationService;
	FacialAnimationRecordingService: FacialAnimationRecordingService;
	FacialAnimationStreamingServiceV2: FacialAnimationStreamingServiceV2;
	FeatureRestrictionManager: FeatureRestrictionManager;
	FileManagerService: FileManagerService;
	FlagStandService: FlagStandService;
	FlyweightService: FlyweightService;
	CSGDictionaryService: CSGDictionaryService;
	NonReplicatedCSGDictionaryService: NonReplicatedCSGDictionaryService;
	FriendService: FriendService;
	GamePassService: GamePassService;
	GameSettings: GameSettings;
	GamepadService: GamepadService;
	GenerationService: GenerationService;
	GenericChallengeService: GenericChallengeService;
	Geometry: Geometry;
	GeometryService: GeometryService;
	GroupService: GroupService;
	GuiService: GuiService;
	GuidRegistryService: GuidRegistryService;
	HapticService: HapticService;
	HarmonyService: HarmonyService;
	HeapProfilerService: HeapProfilerService;
	HeatmapService: HeatmapService;
	HeightmapImporterService: HeightmapImporterService;
	Hopper: Hopper;
	HttpRbxApiService: HttpRbxApiService;
	HttpService: HttpService;
	ILegacyStudioBridge: ILegacyStudioBridge;
	LegacyStudioBridge: LegacyStudioBridge;
	IXPService: IXPService;
	IncrementalPatchBuilder: IncrementalPatchBuilder;
	InsertService: InsertService;
	InstanceExtensionsService: InstanceExtensionsService;
	InstanceFileSyncService: InstanceFileSyncService;
	JointsService: JointsService;
	KeyboardService: KeyboardService;
	KeyframeSequenceProvider: KeyframeSequenceProvider;
	LSPFileSyncService: LSPFileSyncService;
	LanguageService: LanguageService;
	Lighting: Lighting;
	LinkingService: LinkingService;
	LiveScriptingService: LiveScriptingService;
	LiveSyncService: LiveSyncService;
	LocalStorageService: LocalStorageService;
	AppStorageService: AppStorageService;
	UserStorageService: UserStorageService;
	LocalizationService: LocalizationService;
	LodDataService: LodDataService;
	LogReporterService: LogReporterService;
	LogService: LogService;
	LoginService: LoginService;
	LuaSettings: LuaSettings;
	LuaWebService: LuaWebService;
	LuauScriptAnalyzerService: LuauScriptAnalyzerService;
	MLModelDeliveryService: MLModelDeliveryService;
	MLService: MLService;
	MarketplaceService: MarketplaceService;
	MatchmakingService: MatchmakingService;
	MaterialGenerationService: MaterialGenerationService;
	MaterialService: MaterialService;
	MemStorageService: MemStorageService;
	MemoryStoreService: MemoryStoreService;
	MessageBusService: MessageBusService;
	MessagingService: MessagingService;
	MetaBreakpointManager: MetaBreakpointManager;
	MicroProfilerService: MicroProfilerService;
	ModerationService: ModerationService;
	MouseService: MouseService;
	NetworkClient: NetworkClient;
	NetworkServer: NetworkServer;
	NetworkSettings: NetworkSettings;
	NotificationService: NotificationService;
	OmniRecommendationsService: OmniRecommendationsService;
	OpenCloudService: OpenCloudService;
	Workspace: Workspace;
	PackageService: PackageService;
	PackageUIService: PackageUIService;
	PartyEmulatorService: PartyEmulatorService;
	PatchBundlerFileWatch: PatchBundlerFileWatch;
	PathfindingService: PathfindingService;
	PerformanceControlService: PerformanceControlService;
	PermissionsService: PermissionsService;
	PhysicsService: PhysicsService;
	PhysicsSettings: PhysicsSettings;
	PlaceAssetIdsService: PlaceAssetIdsService;
	PlaceStatsService: PlaceStatsService;
	PlacesService: PlacesService;
	PlatformCloudStorageService: PlatformCloudStorageService;
	PlatformFriendsService: PlatformFriendsService;
	PlatformLibraries: PlatformLibraries;
	PlayerDataService: PlayerDataService;
	PlayerEmulatorService: PlayerEmulatorService;
	PlayerHydrationService: PlayerHydrationService;
	PlayerViewService: PlayerViewService;
	Players: Players;
	PluginDebugService: PluginDebugService;
	PluginGuiService: PluginGuiService;
	PluginManagementService: PluginManagementService;
	PluginPolicyService: PluginPolicyService;
	PointsService: PointsService;
	PolicyService: PolicyService;
	ProcessInstancePhysicsService: ProcessInstancePhysicsService;
	ProximityPromptService: ProximityPromptService;
	PublishService: PublishService;
	RbxAnalyticsService: RbxAnalyticsService;
	RecommendationService: RecommendationService;
	ReflectionService: ReflectionService;
	RemoteCommandService: RemoteCommandService;
	RemoteCursorService: RemoteCursorService;
	RemoteDebuggerServer: RemoteDebuggerServer;
	RenderSettings: RenderSettings;
	ReplicatedFirst: ReplicatedFirst;
	ReplicatedStorage: ReplicatedStorage;
	RibbonNotificationService: RibbonNotificationService;
	RobloxPluginGuiService: RobloxPluginGuiService;
	RobloxReplicatedStorage: RobloxReplicatedStorage;
	RobloxServerStorage: RobloxServerStorage;
	RolloutValidationService: RolloutValidationService;
	RomarkRbxAnalyticsService: RomarkRbxAnalyticsService;
	RomarkService: RomarkService;
	RtMessagingService: RtMessagingService;
	RunService: RunService;
	RuntimeContentService: RuntimeContentService;
	RuntimeScriptService: RuntimeScriptService;
	SafetyService: SafetyService;
	ScriptChangeService: ScriptChangeService;
	ScriptCloneWatcher: ScriptCloneWatcher;
	ScriptCloneWatcherHelper: ScriptCloneWatcherHelper;
	ScriptCommitService: ScriptCommitService;
	ScriptContext: ScriptContext;
	ScriptEditorService: ScriptEditorService;
	ScriptProfilerService: ScriptProfilerService;
	ScriptRegistrationService: ScriptRegistrationService;
	ScriptService: ScriptService;
	Selection: Selection;
	SelectionHighlightManager: SelectionHighlightManager;
	SerializationService: SerializationService;
	ServerScriptService: ServerScriptService;
	ServerStorage: ServerStorage;
	ServiceVisibilityService: ServiceVisibilityService;
	SessionCheckService: SessionCheckService;
	SessionService: SessionService;
	SharedTableRegistry: SharedTableRegistry;
	SlimAnimationReplicationService: SlimAnimationReplicationService;
	SlimReplicationService: SlimReplicationService;
	SlimService: SlimService;
	SmoothVoxelsUpgraderService: SmoothVoxelsUpgraderService;
	SnippetService: SnippetService;
	SocialService: SocialService;
	SoundService: SoundService;
	SoundShimService: SoundShimService;
	SpawnerService: SpawnerService;
	StartPageService: StartPageService;
	StarterPack: StarterPack;
	StarterPlayer: StarterPlayer;
	StartupMessageService: StartupMessageService;
	Stats: Stats;
	StopWatchReporter: StopWatchReporter;
	Studio: Studio;
	StudioAssetService: StudioAssetService;
	StudioCameraService: StudioCameraService;
	StudioData: StudioData;
	StudioDeviceEmulatorService: StudioDeviceEmulatorService;
	StudioPublishService: StudioPublishService;
	StudioScriptDebugEventListener: StudioScriptDebugEventListener;
	StudioSdkService: StudioSdkService;
	StudioService: StudioService;
	StudioTestService: StudioTestService;
	StudioUserService: StudioUserService;
	StudioWidgetsService: StudioWidgetsService;
	StylingService: StylingService;
	SystemThemeService: SystemThemeService;
	TaskScheduler: TaskScheduler;
	TeamCreateData: TeamCreateData;
	TeamCreatePublishService: TeamCreatePublishService;
	TeamCreateService: TeamCreateService;
	Teams: Teams;
	TelemetryService: TelemetryService;
	TeleportService: TeleportService;
	TemporaryCageMeshProvider: TemporaryCageMeshProvider;
	TemporaryScriptService: TemporaryScriptService;
	TestService: TestService;
	TextBoxService: TextBoxService;
	TextChatService: TextChatService;
	TextService: TextService;
	TextureGenerationService: TextureGenerationService;
	ThirdPartyUserService: ThirdPartyUserService;
	TimerService: TimerService;
	ToastNotificationService: ToastNotificationService;
	TouchInputService: TouchInputService;
	TraceRouteService: TraceRouteService;
	TracerService: TracerService;
	TutorialService: TutorialService;
	TweenService: TweenService;
	UGCAvatarService: UGCAvatarService;
	UGCValidationService: UGCValidationService;
	UIDragDetectorService: UIDragDetectorService;
	UniqueIdLookupService: UniqueIdLookupService;
	UnvalidatedAssetService: UnvalidatedAssetService;
	UserGameSettings: UserGameSettings;
	UserInputService: UserInputService;
	UserService: UserService;
	VRService: VRService;
	VRStatusService: VRStatusService;
	VersionControlService: VersionControlService;
	VideoCaptureService: VideoCaptureService;
	VideoScreenCaptureService: VideoScreenCaptureService;
	VideoService: VideoService;
	VirtualInputManager: VirtualInputManager;
	VirtualUser: VirtualUser;
	VisibilityCheckDispatcher: VisibilityCheckDispatcher;
	Visit: Visit;
	VisualizationModeService: VisualizationModeService;
	VoiceChatInternal: VoiceChatInternal;
	VoiceChatService: VoiceChatService;
	WebSocketService: WebSocketService;
	WebViewService: WebViewService;
	WrapDeformMeshProvider: WrapDeformMeshProvider;
}

interface ServiceProvider {
	/** Returns the service with the requested class name, creating it if it does not exist. */
	GetService<T extends keyof CheckableServices>(className: T): CheckableServices[T];
}

interface CheckableInstances {
	Object: Object;
	AnimationNode: AnimationNode;
	Capture: Capture;
	ScreenshotCapture: ScreenshotCapture;
	VideoCapture: VideoCapture;
	ConfigSnapshot: ConfigSnapshot;
	EditableImage: EditableImage;
	EditableMesh: EditableMesh;
	ExecutedRemoteCommand: ExecutedRemoteCommand;
	Instance: Instance;
	AccessoryDescription: AccessoryDescription;
	AccountService: AccountService;
	Accoutrement: Accoutrement;
	Accessory: Accessory;
	Hat: Hat;
	AchievementService: AchievementService;
	ActivityHistoryEventService: ActivityHistoryEventService;
	AdPortal: AdPortal;
	AdService: AdService;
	AdvancedDragger: AdvancedDragger;
	AnalyticsService: AnalyticsService;
	Animation: Animation;
	AnimationClip: AnimationClip;
	AnimationGraphDefinition: AnimationGraphDefinition;
	CurveAnimation: CurveAnimation;
	KeyframeSequence: KeyframeSequence;
	AnimationClipProvider: AnimationClipProvider;
	AnimationController: AnimationController;
	AnimationFromVideoCreatorService: AnimationFromVideoCreatorService;
	AnimationFromVideoCreatorStudioService: AnimationFromVideoCreatorStudioService;
	AnimationNodeDefinition: AnimationNodeDefinition;
	AnimationRigData: AnimationRigData;
	AnimationStreamTrack: AnimationStreamTrack;
	AnimationTrack: AnimationTrack;
	Animator: Animator;
	Annotation: Annotation;
	WorkspaceAnnotation: WorkspaceAnnotation;
	AnnotationsService: AnnotationsService;
	AppLifecycleObserverService: AppLifecycleObserverService;
	AppRatingPromptService: AppRatingPromptService;
	AppUpdateService: AppUpdateService;
	AssetCounterService: AssetCounterService;
	AssetDeliveryProxy: AssetDeliveryProxy;
	AssetImportService: AssetImportService;
	AssetManagerService: AssetManagerService;
	AssetPatchSettings: AssetPatchSettings;
	AssetQualityService: AssetQualityService;
	AssetService: AssetService;
	Atmosphere: Atmosphere;
	Attachment: Attachment;
	Bone: Bone;
	AudioAnalyzer: AudioAnalyzer;
	AudioChannelMixer: AudioChannelMixer;
	AudioChannelSplitter: AudioChannelSplitter;
	AudioChorus: AudioChorus;
	AudioCompressor: AudioCompressor;
	AudioDeviceInput: AudioDeviceInput;
	AudioDeviceOutput: AudioDeviceOutput;
	AudioDistortion: AudioDistortion;
	AudioEcho: AudioEcho;
	AudioEmitter: AudioEmitter;
	AudioEqualizer: AudioEqualizer;
	AudioFader: AudioFader;
	AudioFilter: AudioFilter;
	AudioFlanger: AudioFlanger;
	AudioFocusService: AudioFocusService;
	AudioGate: AudioGate;
	AudioLimiter: AudioLimiter;
	AudioListener: AudioListener;
	AudioPitchShifter: AudioPitchShifter;
	AudioPlayer: AudioPlayer;
	AudioRecorder: AudioRecorder;
	AudioReverb: AudioReverb;
	AudioSearchParams: AudioSearchParams;
	AudioSpeechToText: AudioSpeechToText;
	AudioTextToSpeech: AudioTextToSpeech;
	AudioTremolo: AudioTremolo;
	AuroraScriptObject: AuroraScriptObject;
	AvatarAccessoryRules: AvatarAccessoryRules;
	AvatarAnimationRules: AvatarAnimationRules;
	AvatarBodyRules: AvatarBodyRules;
	AvatarChatService: AvatarChatService;
	AvatarClothingRules: AvatarClothingRules;
	AvatarCollisionRules: AvatarCollisionRules;
	AvatarCreationService: AvatarCreationService;
	AvatarEditorService: AvatarEditorService;
	AvatarImportService: AvatarImportService;
	AvatarRules: AvatarRules;
	AvatarSettings: AvatarSettings;
	Backpack: Backpack;
	BadgeService: BadgeService;
	BaseCoreGuiConfiguration: BaseCoreGuiConfiguration;
	CapturesViewConfiguration: CapturesViewConfiguration;
	PlayerListConfiguration: PlayerListConfiguration;
	SelfViewConfiguration: SelfViewConfiguration;
	BaseImportData: BaseImportData;
	AnimationImportData: AnimationImportData;
	FacsImportData: FacsImportData;
	GroupImportData: GroupImportData;
	JointImportData: JointImportData;
	MaterialImportData: MaterialImportData;
	MeshImportData: MeshImportData;
	RootImportData: RootImportData;
	BasePlayerGui: BasePlayerGui;
	CoreGui: CoreGui;
	PlayerGui: PlayerGui;
	StarterGui: StarterGui;
	BaseRemoteEvent: BaseRemoteEvent;
	RemoteEvent: RemoteEvent;
	UnreliableRemoteEvent: UnreliableRemoteEvent;
	BaseWrap: BaseWrap;
	WrapDeformer: WrapDeformer;
	WrapLayer: WrapLayer;
	WrapTarget: WrapTarget;
	Beam: Beam;
	BindableEvent: BindableEvent;
	BindableFunction: BindableFunction;
	BodyMover: BodyMover;
	BodyAngularVelocity: BodyAngularVelocity;
	BodyForce: BodyForce;
	BodyGyro: BodyGyro;
	BodyPosition: BodyPosition;
	BodyThrust: BodyThrust;
	BodyVelocity: BodyVelocity;
	RocketPropulsion: RocketPropulsion;
	BodyPartDescription: BodyPartDescription;
	Breakpoint: Breakpoint;
	BrowserService: BrowserService;
	BugReporterService: BugReporterService;
	BulkImportService: BulkImportService;
	CacheableContentProvider: CacheableContentProvider;
	HSRDataContentProvider: HSRDataContentProvider;
	MeshContentProvider: MeshContentProvider;
	SlimContentProvider: SlimContentProvider;
	SolidModelContentProvider: SolidModelContentProvider;
	CalloutService: CalloutService;
	CaptureService: CaptureService;
	ChangeHistoryService: ChangeHistoryService;
	ChangeHistoryStreamingService: ChangeHistoryStreamingService;
	CharacterAppearance: CharacterAppearance;
	BodyColors: BodyColors;
	CharacterMesh: CharacterMesh;
	Clothing: Clothing;
	Pants: Pants;
	Shirt: Shirt;
	ShirtGraphic: ShirtGraphic;
	Skin: Skin;
	Chat: Chat;
	ClickDetector: ClickDetector;
	DragDetector: DragDetector;
	CloudCRUDService: CloudCRUDService;
	Clouds: Clouds;
	ClusterPacketCache: ClusterPacketCache;
	Collaborator: Collaborator;
	CollaboratorsService: CollaboratorsService;
	CollectionService: CollectionService;
	CommerceService: CommerceService;
	CompositeValueCurve: CompositeValueCurve;
	ConfigService: ConfigService;
	Configuration: Configuration;
	ConfigureServerService: ConfigureServerService;
	ConnectivityService: ConnectivityService;
	Constraint: Constraint;
	AlignOrientation: AlignOrientation;
	AlignPosition: AlignPosition;
	AngularVelocity: AngularVelocity;
	AnimationConstraint: AnimationConstraint;
	BallSocketConstraint: BallSocketConstraint;
	HingeConstraint: HingeConstraint;
	LineForce: LineForce;
	LinearVelocity: LinearVelocity;
	PlaneConstraint: PlaneConstraint;
	Plane: Plane;
	RigidConstraint: RigidConstraint;
	RodConstraint: RodConstraint;
	RopeConstraint: RopeConstraint;
	SlidingBallConstraint: SlidingBallConstraint;
	CylindricalConstraint: CylindricalConstraint;
	PrismaticConstraint: PrismaticConstraint;
	SpringConstraint: SpringConstraint;
	Torque: Torque;
	TorsionSpringConstraint: TorsionSpringConstraint;
	UniversalConstraint: UniversalConstraint;
	VectorForce: VectorForce;
	ContentProvider: ContentProvider;
	ContextActionService: ContextActionService;
	Controller: Controller;
	HumanoidController: HumanoidController;
	SkateboardController: SkateboardController;
	VehicleController: VehicleController;
	ControllerBase: ControllerBase;
	AirController: AirController;
	ClimbController: ClimbController;
	GroundController: GroundController;
	SwimController: SwimController;
	ControllerManager: ControllerManager;
	ControllerService: ControllerService;
	ConversationalAIAcceptanceService: ConversationalAIAcceptanceService;
	CookiesService: CookiesService;
	CoreGuiConfiguration: CoreGuiConfiguration;
	CorePackages: CorePackages;
	CoreScriptDebuggingManagerHelper: CoreScriptDebuggingManagerHelper;
	CoreScriptSyncService: CoreScriptSyncService;
	CreationDBService: CreationDBService;
	CreatorStoreService: CreatorStoreService;
	CrossDMScriptChangeListener: CrossDMScriptChangeListener;
	CustomEvent: CustomEvent;
	CustomEventReceiver: CustomEventReceiver;
	CustomLog: CustomLog;
	DataModelMesh: DataModelMesh;
	BevelMesh: BevelMesh;
	BlockMesh: BlockMesh;
	CylinderMesh: CylinderMesh;
	FileMesh: FileMesh;
	SpecialMesh: SpecialMesh;
	DataModelPatchService: DataModelPatchService;
	DataModelSession: DataModelSession;
	DataStoreGetOptions: DataStoreGetOptions;
	DataStoreIncrementOptions: DataStoreIncrementOptions;
	DataStoreInfo: DataStoreInfo;
	DataStoreKey: DataStoreKey;
	DataStoreKeyInfo: DataStoreKeyInfo;
	DataStoreObjectVersionInfo: DataStoreObjectVersionInfo;
	DataStoreOptions: DataStoreOptions;
	DataStoreService: DataStoreService;
	DataStoreSetOptions: DataStoreSetOptions;
	Debris: Debris;
	DebugSettings: DebugSettings;
	DebuggablePluginWatcher: DebuggablePluginWatcher;
	DebuggerBreakpoint: DebuggerBreakpoint;
	DebuggerConnection: DebuggerConnection;
	LocalDebuggerConnection: LocalDebuggerConnection;
	DebuggerConnectionManager: DebuggerConnectionManager;
	DebuggerLuaResponse: DebuggerLuaResponse;
	DebuggerManager: DebuggerManager;
	DebuggerUIService: DebuggerUIService;
	DebuggerVariable: DebuggerVariable;
	DebuggerWatch: DebuggerWatch;
	DeviceIdService: DeviceIdService;
	Dialog: Dialog;
	DialogChoice: DialogChoice;
	DraftsService: DraftsService;
	Dragger: Dragger;
	DraggerService: DraggerService;
	EditableService: EditableService;
	EncodingService: EncodingService;
	EulerRotationCurve: EulerRotationCurve;
	EventIngestService: EventIngestService;
	ExampleV2Service: ExampleV2Service;
	ExperienceAuthService: ExperienceAuthService;
	ExperienceInviteOptions: ExperienceInviteOptions;
	ExperienceNotificationService: ExperienceNotificationService;
	ExperienceService: ExperienceService;
	ExperienceStateCaptureService: ExperienceStateCaptureService;
	ExperienceStateRecordingService: ExperienceStateRecordingService;
	ExplorerFilter: ExplorerFilter;
	ExplorerFilterAutocompleter: ExplorerFilterAutocompleter;
	ExplorerServiceVisibilityService: ExplorerServiceVisibilityService;
	Explosion: Explosion;
	FaceAnimatorService: FaceAnimatorService;
	FaceControls: FaceControls;
	FaceInstance: FaceInstance;
	Decal: Decal;
	Texture: Texture;
	FacialAgeEstimationService: FacialAgeEstimationService;
	FacialAnimationRecordingService: FacialAnimationRecordingService;
	FacialAnimationStreamingServiceStats: FacialAnimationStreamingServiceStats;
	FacialAnimationStreamingServiceV2: FacialAnimationStreamingServiceV2;
	FacialAnimationStreamingSubsessionStats: FacialAnimationStreamingSubsessionStats;
	Feature: Feature;
	Hole: Hole;
	MotorFeature: MotorFeature;
	FeatureRestrictionManager: FeatureRestrictionManager;
	File: File;
	FileManagerService: FileManagerService;
	Fire: Fire;
	FlagStandService: FlagStandService;
	FloatCurve: FloatCurve;
	FlyweightService: FlyweightService;
	CSGDictionaryService: CSGDictionaryService;
	NonReplicatedCSGDictionaryService: NonReplicatedCSGDictionaryService;
	Folder: Folder;
	ForceField: ForceField;
	FriendService: FriendService;
	FunctionalTest: FunctionalTest;
	GamePassService: GamePassService;
	GameSettings: GameSettings;
	GamepadService: GamepadService;
	GenerationService: GenerationService;
	GenericChallengeService: GenericChallengeService;
	Geometry: Geometry;
	GeometryService: GeometryService;
	GetTextBoundsParams: GetTextBoundsParams;
	GlobalDataStore: GlobalDataStore;
	DataStore: DataStore;
	OrderedDataStore: OrderedDataStore;
	GroupService: GroupService;
	GuiBase: GuiBase;
	GuiBase2d: GuiBase2d;
	GuiObject: GuiObject;
	CanvasGroup: CanvasGroup;
	Frame: Frame;
	GuiButton: GuiButton;
	ImageButton: ImageButton;
	TextButton: TextButton;
	GuiLabel: GuiLabel;
	ImageLabel: ImageLabel;
	TextLabel: TextLabel;
	RelativeGui: RelativeGui;
	ScrollingFrame: ScrollingFrame;
	TextBox: TextBox;
	VideoDisplay: VideoDisplay;
	VideoFrame: VideoFrame;
	ViewportFrame: ViewportFrame;
	LayerCollector: LayerCollector;
	BillboardGui: BillboardGui;
	PluginGui: PluginGui;
	DockWidgetPluginGui: DockWidgetPluginGui;
	QWidgetPluginGui: QWidgetPluginGui;
	ScreenGui: ScreenGui;
	GuiMain: GuiMain;
	SurfaceGuiBase: SurfaceGuiBase;
	AdGui: AdGui;
	SurfaceGui: SurfaceGui;
	GuiBase3d: GuiBase3d;
	FloorWire: FloorWire;
	InstanceAdornment: InstanceAdornment;
	SelectionBox: SelectionBox;
	PVAdornment: PVAdornment;
	HandleAdornment: HandleAdornment;
	BoxHandleAdornment: BoxHandleAdornment;
	ConeHandleAdornment: ConeHandleAdornment;
	CylinderHandleAdornment: CylinderHandleAdornment;
	ImageHandleAdornment: ImageHandleAdornment;
	LineHandleAdornment: LineHandleAdornment;
	PyramidHandleAdornment: PyramidHandleAdornment;
	SphereHandleAdornment: SphereHandleAdornment;
	WireframeHandleAdornment: WireframeHandleAdornment;
	ParabolaAdornment: ParabolaAdornment;
	SelectionSphere: SelectionSphere;
	PartAdornment: PartAdornment;
	HandlesBase: HandlesBase;
	ArcHandles: ArcHandles;
	Handles: Handles;
	SurfaceSelection: SurfaceSelection;
	SelectionLasso: SelectionLasso;
	SelectionPartLasso: SelectionPartLasso;
	SelectionPointLasso: SelectionPointLasso;
	Path2D: Path2D;
	GuiService: GuiService;
	GuidRegistryService: GuidRegistryService;
	HandRigDescription: HandRigDescription;
	HapticEffect: HapticEffect;
	HapticService: HapticService;
	HarmonyService: HarmonyService;
	HeapProfilerService: HeapProfilerService;
	HeatmapService: HeatmapService;
	HeightmapImporterService: HeightmapImporterService;
	HiddenSurfaceRemovalAsset: HiddenSurfaceRemovalAsset;
	Highlight: Highlight;
	Hopper: Hopper;
	HttpRbxApiService: HttpRbxApiService;
	HttpRequest: HttpRequest;
	HttpService: HttpService;
	Humanoid: Humanoid;
	HumanoidDescription: HumanoidDescription;
	HumanoidRigDescription: HumanoidRigDescription;
	IKControl: IKControl;
	ILegacyStudioBridge: ILegacyStudioBridge;
	LegacyStudioBridge: LegacyStudioBridge;
	IXPService: IXPService;
	ImportSession: ImportSession;
	AssetImportSession: AssetImportSession;
	IncrementalPatchBuilder: IncrementalPatchBuilder;
	InputAction: InputAction;
	InputBinding: InputBinding;
	InputContext: InputContext;
	InputObject: InputObject;
	InsertService: InsertService;
	InstanceExtensionsService: InstanceExtensionsService;
	InstanceFileSyncService: InstanceFileSyncService;
	JointInstance: JointInstance;
	DynamicRotate: DynamicRotate;
	RotateP: RotateP;
	RotateV: RotateV;
	Glue: Glue;
	ManualSurfaceJointInstance: ManualSurfaceJointInstance;
	ManualGlue: ManualGlue;
	ManualWeld: ManualWeld;
	Motor: Motor;
	Motor6D: Motor6D;
	Rotate: Rotate;
	Snap: Snap;
	VelocityMotor: VelocityMotor;
	Weld: Weld;
	JointsService: JointsService;
	KeyboardService: KeyboardService;
	Keyframe: Keyframe;
	KeyframeMarker: KeyframeMarker;
	KeyframeSequenceProvider: KeyframeSequenceProvider;
	LSPFileSyncService: LSPFileSyncService;
	LanguageService: LanguageService;
	Light: Light;
	PointLight: PointLight;
	SpotLight: SpotLight;
	SurfaceLight: SurfaceLight;
	Lighting: Lighting;
	LinkingService: LinkingService;
	LiveScriptingService: LiveScriptingService;
	LiveSyncService: LiveSyncService;
	LocalStorageService: LocalStorageService;
	AppStorageService: AppStorageService;
	UserStorageService: UserStorageService;
	LocalizationService: LocalizationService;
	LocalizationTable: LocalizationTable;
	CloudLocalizationTable: CloudLocalizationTable;
	LodDataEntity: LodDataEntity;
	LodDataService: LodDataService;
	LogReporterService: LogReporterService;
	LogService: LogService;
	LoginService: LoginService;
	LuaSettings: LuaSettings;
	LuaSourceContainer: LuaSourceContainer;
	BaseScript: BaseScript;
	CoreScript: CoreScript;
	Script: Script;
	LocalScript: LocalScript;
	ModuleScript: ModuleScript;
	LuaWebService: LuaWebService;
	LuauScriptAnalyzerService: LuauScriptAnalyzerService;
	MLModelDeliveryService: MLModelDeliveryService;
	MLService: MLService;
	MakeupDescription: MakeupDescription;
	MarkerCurve: MarkerCurve;
	MarketplaceService: MarketplaceService;
	MatchmakingService: MatchmakingService;
	MaterialGenerationService: MaterialGenerationService;
	MaterialService: MaterialService;
	MaterialVariant: MaterialVariant;
	MemStorageConnection: MemStorageConnection;
	MemStorageService: MemStorageService;
	MemoryStoreHashMap: MemoryStoreHashMap;
	MemoryStoreQueue: MemoryStoreQueue;
	MemoryStoreService: MemoryStoreService;
	MemoryStoreSortedMap: MemoryStoreSortedMap;
	Message: Message;
	Hint: Hint;
	MessageBusConnection: MessageBusConnection;
	MessageBusService: MessageBusService;
	MessagingService: MessagingService;
	MetaBreakpoint: MetaBreakpoint;
	MetaBreakpointContext: MetaBreakpointContext;
	MetaBreakpointManager: MetaBreakpointManager;
	MicroProfilerService: MicroProfilerService;
	ModerationService: ModerationService;
	Mouse: Mouse;
	PlayerMouse: PlayerMouse;
	PluginMouse: PluginMouse;
	MouseService: MouseService;
	MultipleDocumentInterfaceInstance: MultipleDocumentInterfaceInstance;
	NetworkMarker: NetworkMarker;
	NetworkPeer: NetworkPeer;
	NetworkClient: NetworkClient;
	NetworkServer: NetworkServer;
	NetworkReplicator: NetworkReplicator;
	ClientReplicator: ClientReplicator;
	ServerReplicator: ServerReplicator;
	NetworkSettings: NetworkSettings;
	NoCollisionConstraint: NoCollisionConstraint;
	Noise: Noise;
	NotificationService: NotificationService;
	OmniRecommendationsService: OmniRecommendationsService;
	OpenCloudApiV1: OpenCloudApiV1;
	OpenCloudService: OpenCloudService;
	OperationGraph: OperationGraph;
	PVInstance: PVInstance;
	BasePart: BasePart;
	CornerWedgePart: CornerWedgePart;
	FormFactorPart: FormFactorPart;
	Part: Part;
	FlagStand: FlagStand;
	Platform: Platform;
	Seat: Seat;
	SkateboardPlatform: SkateboardPlatform;
	SpawnLocation: SpawnLocation;
	WedgePart: WedgePart;
	Terrain: Terrain;
	TriangleMeshPart: TriangleMeshPart;
	MeshPart: MeshPart;
	PartOperation: PartOperation;
	IntersectOperation: IntersectOperation;
	NegateOperation: NegateOperation;
	UnionOperation: UnionOperation;
	TrussPart: TrussPart;
	VehicleSeat: VehicleSeat;
	Camera: Camera;
	Model: Model;
	Actor: Actor;
	BackpackItem: BackpackItem;
	HopperBin: HopperBin;
	Tool: Tool;
	Flag: Flag;
	Status: Status;
	WorldRoot: WorldRoot;
	Workspace: Workspace;
	WorldModel: WorldModel;
	PackageLink: PackageLink;
	PackageService: PackageService;
	PackageUIService: PackageUIService;
	Pages: Pages;
	AudioPages: AudioPages;
	BanHistoryPages: BanHistoryPages;
	CapturesPages: CapturesPages;
	CatalogPages: CatalogPages;
	DataStoreKeyPages: DataStoreKeyPages;
	DataStoreListingPages: DataStoreListingPages;
	DataStorePages: DataStorePages;
	DataStoreVersionPages: DataStoreVersionPages;
	FriendPages: FriendPages;
	InventoryPages: InventoryPages;
	EmotesPages: EmotesPages;
	MemoryStoreHashMapPages: MemoryStoreHashMapPages;
	OutfitPages: OutfitPages;
	RecommendationPages: RecommendationPages;
	StandardPages: StandardPages;
	PartOperationAsset: PartOperationAsset;
	ParticleEmitter: ParticleEmitter;
	PartyEmulatorService: PartyEmulatorService;
	PatchBundlerFileWatch: PatchBundlerFileWatch;
	PatchMapping: PatchMapping;
	Path: Path;
	PathfindingLink: PathfindingLink;
	PathfindingModifier: PathfindingModifier;
	PathfindingService: PathfindingService;
	PausedState: PausedState;
	PausedStateBreakpoint: PausedStateBreakpoint;
	PausedStateException: PausedStateException;
	PerformanceControlService: PerformanceControlService;
	PermissionsService: PermissionsService;
	PhysicsService: PhysicsService;
	PhysicsSettings: PhysicsSettings;
	PlaceAssetIdsService: PlaceAssetIdsService;
	PlaceStatsService: PlaceStatsService;
	PlacesService: PlacesService;
	PlatformCloudStorageService: PlatformCloudStorageService;
	PlatformFriendsService: PlatformFriendsService;
	PlatformLibraries: PlatformLibraries;
	Player: Player;
	PlayerData: PlayerData;
	PlayerDataRecord: PlayerDataRecord;
	PlayerDataRecordConfig: PlayerDataRecordConfig;
	PlayerDataService: PlayerDataService;
	PlayerEmulatorService: PlayerEmulatorService;
	PlayerHydrationService: PlayerHydrationService;
	PlayerScripts: PlayerScripts;
	PlayerViewService: PlayerViewService;
	Players: Players;
	Plugin: Plugin;
	PluginAction: PluginAction;
	PluginCapabilities: PluginCapabilities;
	PluginDebugService: PluginDebugService;
	PluginDragEvent: PluginDragEvent;
	PluginGuiService: PluginGuiService;
	PluginManagementService: PluginManagementService;
	PluginManager: PluginManager;
	PluginManagerInterface: PluginManagerInterface;
	PluginMenu: PluginMenu;
	PluginPolicyService: PluginPolicyService;
	PluginToolbar: PluginToolbar;
	PluginToolbarButton: PluginToolbarButton;
	PointsService: PointsService;
	PolicyService: PolicyService;
	PoseBase: PoseBase;
	NumberPose: NumberPose;
	Pose: Pose;
	PostEffect: PostEffect;
	BloomEffect: BloomEffect;
	BlurEffect: BlurEffect;
	ColorCorrectionEffect: ColorCorrectionEffect;
	ColorGradingEffect: ColorGradingEffect;
	DepthOfFieldEffect: DepthOfFieldEffect;
	SunRaysEffect: SunRaysEffect;
	ProcessInstancePhysicsService: ProcessInstancePhysicsService;
	ProximityPrompt: ProximityPrompt;
	ProximityPromptService: ProximityPromptService;
	PublishService: PublishService;
	RTAnimationTracker: RTAnimationTracker;
	RbxAnalyticsService: RbxAnalyticsService;
	RecommendationService: RecommendationService;
	ReflectionMetadata: ReflectionMetadata;
	ReflectionMetadataCallbacks: ReflectionMetadataCallbacks;
	ReflectionMetadataClasses: ReflectionMetadataClasses;
	ReflectionMetadataEnums: ReflectionMetadataEnums;
	ReflectionMetadataEvents: ReflectionMetadataEvents;
	ReflectionMetadataFunctions: ReflectionMetadataFunctions;
	ReflectionMetadataItem: ReflectionMetadataItem;
	ReflectionMetadataClass: ReflectionMetadataClass;
	ReflectionMetadataEnum: ReflectionMetadataEnum;
	ReflectionMetadataEnumItem: ReflectionMetadataEnumItem;
	ReflectionMetadataMember: ReflectionMetadataMember;
	ReflectionMetadataProperties: ReflectionMetadataProperties;
	ReflectionMetadataYieldFunctions: ReflectionMetadataYieldFunctions;
	ReflectionService: ReflectionService;
	RemoteCommandService: RemoteCommandService;
	RemoteCursorService: RemoteCursorService;
	RemoteDebuggerServer: RemoteDebuggerServer;
	RemoteFunction: RemoteFunction;
	RenderSettings: RenderSettings;
	RenderingTest: RenderingTest;
	ReplicatedFirst: ReplicatedFirst;
	ReplicatedStorage: ReplicatedStorage;
	RibbonNotificationService: RibbonNotificationService;
	RobloxPluginGuiService: RobloxPluginGuiService;
	RobloxReplicatedStorage: RobloxReplicatedStorage;
	RobloxSerializableInstance: RobloxSerializableInstance;
	RobloxServerStorage: RobloxServerStorage;
	RolloutValidation: RolloutValidation;
	RolloutValidationService: RolloutValidationService;
	RomarkRbxAnalyticsService: RomarkRbxAnalyticsService;
	RomarkService: RomarkService;
	RotationCurve: RotationCurve;
	RtMessagingService: RtMessagingService;
	RunService: RunService;
	RuntimeContentService: RuntimeContentService;
	RuntimeScriptService: RuntimeScriptService;
	SafetyService: SafetyService;
	ScreenshotHud: ScreenshotHud;
	ScriptBuilder: ScriptBuilder;
	SyncScriptBuilder: SyncScriptBuilder;
	ScriptChangeService: ScriptChangeService;
	ScriptCloneWatcher: ScriptCloneWatcher;
	ScriptCloneWatcherHelper: ScriptCloneWatcherHelper;
	ScriptCommitService: ScriptCommitService;
	ScriptContext: ScriptContext;
	ScriptDebugger: ScriptDebugger;
	ScriptDocument: ScriptDocument;
	ScriptEditorService: ScriptEditorService;
	ScriptProfilerService: ScriptProfilerService;
	ScriptRegistrationService: ScriptRegistrationService;
	ScriptRuntime: ScriptRuntime;
	ScriptService: ScriptService;
	Selection: Selection;
	SelectionHighlightManager: SelectionHighlightManager;
	SensorBase: SensorBase;
	AtmosphereSensor: AtmosphereSensor;
	BuoyancySensor: BuoyancySensor;
	ControllerSensor: ControllerSensor;
	ControllerPartSensor: ControllerPartSensor;
	FluidForceSensor: FluidForceSensor;
	SerializationService: SerializationService;
	ServerScriptService: ServerScriptService;
	ServerStorage: ServerStorage;
	ServiceProvider: ServiceProvider;
	DataModel: DataModel;
	GenericSettings: GenericSettings;
	GlobalSettings: GlobalSettings;
	UserSettings: UserSettings;
	ServiceVisibilityService: ServiceVisibilityService;
	SessionCheckService: SessionCheckService;
	SessionService: SessionService;
	SharedTableRegistry: SharedTableRegistry;
	Sky: Sky;
	SlimAnimationDataEntity: SlimAnimationDataEntity;
	SlimAnimationReplicationService: SlimAnimationReplicationService;
	SlimReplicationService: SlimReplicationService;
	SlimService: SlimService;
	Smoke: Smoke;
	SmoothVoxelsUpgraderService: SmoothVoxelsUpgraderService;
	SnippetService: SnippetService;
	SocialService: SocialService;
	Sound: Sound;
	SoundEffect: SoundEffect;
	ChorusSoundEffect: ChorusSoundEffect;
	CompressorSoundEffect: CompressorSoundEffect;
	CustomSoundEffect: CustomSoundEffect;
	AssetSoundEffect: AssetSoundEffect;
	ChannelSelectorSoundEffect: ChannelSelectorSoundEffect;
	DistortionSoundEffect: DistortionSoundEffect;
	EchoSoundEffect: EchoSoundEffect;
	EqualizerSoundEffect: EqualizerSoundEffect;
	FlangeSoundEffect: FlangeSoundEffect;
	PitchShiftSoundEffect: PitchShiftSoundEffect;
	ReverbSoundEffect: ReverbSoundEffect;
	TremoloSoundEffect: TremoloSoundEffect;
	SoundGroup: SoundGroup;
	SoundService: SoundService;
	SoundShimService: SoundShimService;
	Sparkles: Sparkles;
	SpawnerService: SpawnerService;
	StackFrame: StackFrame;
	StandalonePluginScripts: StandalonePluginScripts;
	StartPageService: StartPageService;
	StarterGear: StarterGear;
	StarterPack: StarterPack;
	StarterPlayer: StarterPlayer;
	StarterPlayerScripts: StarterPlayerScripts;
	StarterCharacterScripts: StarterCharacterScripts;
	StartupMessageService: StartupMessageService;
	Stats: Stats;
	StatsItem: StatsItem;
	RunningAverageItemDouble: RunningAverageItemDouble;
	RunningAverageItemInt: RunningAverageItemInt;
	RunningAverageTimeIntervalItem: RunningAverageTimeIntervalItem;
	TotalCountTimeIntervalItem: TotalCountTimeIntervalItem;
	StopWatchReporter: StopWatchReporter;
	Studio: Studio;
	StudioAssetService: StudioAssetService;
	StudioAttachment: StudioAttachment;
	StudioCallout: StudioCallout;
	StudioCameraService: StudioCameraService;
	StudioData: StudioData;
	StudioDeviceEmulatorService: StudioDeviceEmulatorService;
	StudioObjectBase: StudioObjectBase;
	StudioWidget: StudioWidget;
	StudioPublishService: StudioPublishService;
	StudioScriptDebugEventListener: StudioScriptDebugEventListener;
	StudioSdkService: StudioSdkService;
	StudioService: StudioService;
	StudioTestService: StudioTestService;
	StudioTheme: StudioTheme;
	StudioUserService: StudioUserService;
	StudioWidgetsService: StudioWidgetsService;
	StyleBase: StyleBase;
	StyleRule: StyleRule;
	StyleSheet: StyleSheet;
	StyleDerive: StyleDerive;
	StyleLink: StyleLink;
	StyleQuery: StyleQuery;
	StylingService: StylingService;
	SurfaceAppearance: SurfaceAppearance;
	SystemThemeService: SystemThemeService;
	TaskScheduler: TaskScheduler;
	Team: Team;
	TeamCreateData: TeamCreateData;
	TeamCreatePublishService: TeamCreatePublishService;
	TeamCreateService: TeamCreateService;
	Teams: Teams;
	TelemetryService: TelemetryService;
	TeleportAsyncResult: TeleportAsyncResult;
	TeleportOptions: TeleportOptions;
	TeleportService: TeleportService;
	TemporaryCageMeshProvider: TemporaryCageMeshProvider;
	TemporaryScriptService: TemporaryScriptService;
	TerrainDetail: TerrainDetail;
	TerrainRegion: TerrainRegion;
	TestService: TestService;
	TextBoxService: TextBoxService;
	TextChannel: TextChannel;
	TextChatCommand: TextChatCommand;
	TextChatConfigurations: TextChatConfigurations;
	BubbleChatConfiguration: BubbleChatConfiguration;
	ChannelTabsConfiguration: ChannelTabsConfiguration;
	ChatInputBarConfiguration: ChatInputBarConfiguration;
	ChatWindowConfiguration: ChatWindowConfiguration;
	TextChatMessage: TextChatMessage;
	TextChatMessageProperties: TextChatMessageProperties;
	BubbleChatMessageProperties: BubbleChatMessageProperties;
	ChatWindowMessageProperties: ChatWindowMessageProperties;
	TextChatService: TextChatService;
	TextFilterResult: TextFilterResult;
	TextFilterTranslatedResult: TextFilterTranslatedResult;
	TextGenerator: TextGenerator;
	TextService: TextService;
	TextSource: TextSource;
	TextureGenerationPartGroup: TextureGenerationPartGroup;
	TextureGenerationService: TextureGenerationService;
	TextureGenerationUnwrappingRequest: TextureGenerationUnwrappingRequest;
	ThirdPartyUserService: ThirdPartyUserService;
	ThreadState: ThreadState;
	TimerService: TimerService;
	ToastNotificationService: ToastNotificationService;
	TouchInputService: TouchInputService;
	TouchTransmitter: TouchTransmitter;
	TraceRouteService: TraceRouteService;
	TracerService: TracerService;
	TrackerLodController: TrackerLodController;
	TrackerStreamAnimation: TrackerStreamAnimation;
	Trail: Trail;
	Translator: Translator;
	TutorialService: TutorialService;
	TweenBase: TweenBase;
	Tween: Tween;
	TweenService: TweenService;
	UGCAvatarService: UGCAvatarService;
	UGCValidationService: UGCValidationService;
	UIBase: UIBase;
	UIComponent: UIComponent;
	UIConstraint: UIConstraint;
	UIAspectRatioConstraint: UIAspectRatioConstraint;
	UISizeConstraint: UISizeConstraint;
	UITextSizeConstraint: UITextSizeConstraint;
	UICorner: UICorner;
	UIDragDetector: UIDragDetector;
	UIFlexItem: UIFlexItem;
	UIGradient: UIGradient;
	UILayout: UILayout;
	UIGridStyleLayout: UIGridStyleLayout;
	UIGridLayout: UIGridLayout;
	UIListLayout: UIListLayout;
	UIPageLayout: UIPageLayout;
	UITableLayout: UITableLayout;
	UIPadding: UIPadding;
	UIScale: UIScale;
	UIStroke: UIStroke;
	UIDragDetectorService: UIDragDetectorService;
	UniqueIdLookupService: UniqueIdLookupService;
	UnvalidatedAssetService: UnvalidatedAssetService;
	UserGameSettings: UserGameSettings;
	UserInputService: UserInputService;
	UserService: UserService;
	VRService: VRService;
	VRStatusService: VRStatusService;
	ValueBase: ValueBase;
	BinaryStringValue: BinaryStringValue;
	BoolValue: BoolValue;
	BrickColorValue: BrickColorValue;
	CFrameValue: CFrameValue;
	Color3Value: Color3Value;
	DoubleConstrainedValue: DoubleConstrainedValue;
	IntConstrainedValue: IntConstrainedValue;
	IntValue: IntValue;
	NumberValue: NumberValue;
	ObjectValue: ObjectValue;
	RayValue: RayValue;
	StringValue: StringValue;
	Vector3Value: Vector3Value;
	ValueCurve: ValueCurve;
	Vector3Curve: Vector3Curve;
	VersionControlService: VersionControlService;
	VideoCaptureService: VideoCaptureService;
	VideoDeviceInput: VideoDeviceInput;
	VideoPlayer: VideoPlayer;
	VideoScreenCaptureService: VideoScreenCaptureService;
	VideoService: VideoService;
	VirtualInputManager: VirtualInputManager;
	VirtualUser: VirtualUser;
	VisibilityCheckDispatcher: VisibilityCheckDispatcher;
	Visit: Visit;
	VisualizationMode: VisualizationMode;
	VisualizationModeCategory: VisualizationModeCategory;
	VisualizationModeService: VisualizationModeService;
	VoiceChatInternal: VoiceChatInternal;
	VoiceChatService: VoiceChatService;
	WebSocketClient: WebSocketClient;
	WebSocketService: WebSocketService;
	WebViewService: WebViewService;
	WeldConstraint: WeldConstraint;
	Wire: Wire;
	WrapDeformMeshProvider: WrapDeformMeshProvider;
	WrapTextureTransfer: WrapTextureTransfer;
	MLSession: MLSession;
	TerrainIterateOperation: TerrainIterateOperation;
	TerrainModifyOperation: TerrainModifyOperation;
	TerrainReadOperation: TerrainReadOperation;
	TerrainWriteOperation: TerrainWriteOperation;
	VideoSampler: VideoSampler;
	VoxelBuffer: VoxelBuffer;
	WebStreamClient: WebStreamClient;
}

interface Object {
	/** Returns true if this object's class matches or inherits from the given class. */
	IsA<T extends keyof CheckableInstances>(className: T): this is CheckableInstances[T];
}

interface Instance {
	FindFirstChildOfClass<T extends keyof CheckableInstances>(className: T): CheckableInstances[T] | undefined;
	FindFirstChildWhichIsA<T extends keyof CheckableInstances>(className: T, recursive?: boolean): CheckableInstances[T] | undefined;
	FindFirstAncestorOfClass<T extends keyof CheckableInstances>(className: T): CheckableInstances[T] | undefined;
	FindFirstAncestorWhichIsA<T extends keyof CheckableInstances>(className: T): CheckableInstances[T] | undefined;
}

// Auto-generated from Roblox creator-docs YAML — do not edit manually
// Run `bun run generate` to regenerate

/**
 * The `Axes` data type is for the `ArcHandles` class to control which rotation axes are currently enabled.
 */
interface Axes {
	/** Whether the X axis is enabled. */
	readonly X: boolean;
	/** Whether the Y axis is enabled. */
	readonly Y: boolean;
	/** Whether the Z axis is enabled. */
	readonly Z: boolean;
	/** Whether the top face is included. */
	readonly Top: boolean;
	/** Whether the bottom face is included. */
	readonly Bottom: boolean;
	/** Whether the left face is included. */
	readonly Left: boolean;
	/** Whether the right face is included. */
	readonly Right: boolean;
	/** Whether the back face is included. */
	readonly Back: boolean;
	/** Whether the front face is included. */
	readonly Front: boolean;
}

declare const Axes: {
	/**
	 * Creates a new Axes using list of axes and/or faces. NormalIds (faces) are converted to the corresponding axes.
	 */
	new (axes?: unknown): Axes;
};

/** A data type that provides a predefined list of named colors. */
interface BrickColor {
	/** The unique number that identifies the `BrickColor`. */
	readonly Number: number;
	/** The red component of the `BrickColor` (between 0 and 1). */
	readonly r: number;
	/** The green component of the `BrickColor` (between 0 and 1). */
	readonly g: number;
	/** The blue component of the `BrickColor` (between 0 and 1). */
	readonly b: number;
	/** The name associated with the `BrickColor`. */
	readonly Name: string;
	/** The `Color3` associated with the `BrickColor`. */
	readonly Color: Color3;
}

declare const BrickColor: {
	/** Constructs a `BrickColor` from its numerical index. */
	new (val?: number): BrickColor;
	/**
	 * Constructs the closest `BrickColor` that can be matched to the specified RGB components, each between 0 and 1.
	 */
	new (r?: number, g?: number, b?: number): BrickColor;
	/** Constructs a `BrickColor` from its name. */
	new (name?: string): BrickColor;
	/**
	 * Constructs the closest `BrickColor` that can be matched to the specified `Color3`.
	 */
	new (color?: Color3): BrickColor;
	/** Constructs a `BrickColor` from its palette index. */
	palette(paletteValue?: number): BrickColor;
	/** Returns a random `BrickColor`. */
	random(): BrickColor;
	/** Returns the "White" `BrickColor`. */
	White(): BrickColor;
	/** Returns the "Medium stone grey" `BrickColor`. */
	Gray(): BrickColor;
	/** Returns the "Dark stone grey" `BrickColor`. */
	DarkGray(): BrickColor;
	/** Returns the "Black" `BrickColor`. */
	Black(): BrickColor;
	/** Returns the "Bright red" `BrickColor`. */
	Red(): BrickColor;
	/** Returns the "Bright yellow" `BrickColor`. */
	Yellow(): BrickColor;
	/** Returns the "Dark green" `BrickColor`. */
	Green(): BrickColor;
	/** Returns the "Bright blue" `BrickColor`. */
	Blue(): BrickColor;
};

/**
 * Stores parameters used in catalog searches via `AvatarEditorService:SearchCatalogAsync()`.
 */
interface CatalogSearchParams {
	/** The keyword to search for catalog results with. */
	readonly SearchKeyword: string;
	/** The minimum item price to search for. */
	readonly MinPrice: number;
	/** The maximum item price to search for. */
	readonly MaxPrice: number;
	/** The order in which to sort the results. */
	readonly SortType: Enum.CatalogSortType;
	/** The time period to use to aggregate the sort results. */
	readonly SortAggregation: Enum.CatalogSortAggregation;
	/** The category to filter the search by. */
	readonly CategoryFilter: Enum.CatalogCategoryFilter;
	/** The sales type filter the search by. */
	readonly SalesTypeFilter: Enum.SalesTypeFilter;
	/** An array containing `Enum.BundleType` values to filter the search by. */
	readonly BundleTypes: any[];
	/** An array containing `Enum.AvatarAssetType` values to filter the search by. */
	readonly AssetTypes: any[];
	/** Whether off sale items should be included in the results. */
	readonly IncludeOffSale: boolean;
	/** Search for items with the given creator name. */
	readonly CreatorName: string;
	/** Search for items created by the given creator type. */
	readonly CreatorType: Enum.CreatorTypeFilter;
	/** Search for items created by the given creator ID. */
	readonly CreatorId: number;
	/**
	 * Specifies the number of items to return. Accepts `10`, `28`, `30`, `60`, and `120`. Defaults to `30`.
	 */
	readonly Limit: number;
}

/** A data type that represents both a 3D position and orientation. */
interface CFrame {
	/** The 3D position of the `CFrame`. */
	readonly Position: Vector3;
	/** A copy of the `CFrame` with no translation. */
	readonly Rotation: CFrame;
	/** The **X** coordinate of the position. */
	readonly X: number;
	/** The **Y** coordinate of the position. */
	readonly Y: number;
	/** The **Z** coordinate of the position. */
	readonly Z: number;
	/**
	 * The forward-direction component of the `CFrame` object's orientation, equivalent to the negated form of `ZVector`.
	 */
	readonly LookVector: Vector3;
	/** The right-direction component of the `CFrame` object's orientation. */
	readonly RightVector: Vector3;
	/** The up-direction component of the `CFrame` object's orientation. */
	readonly UpVector: Vector3;
	/** Equivalent to `RightVector`. */
	readonly XVector: Vector3;
	/** Equivalent to `UpVector`. */
	readonly YVector: Vector3;
	/**
	 * The Z component of the `CFrame` object's orientation. Equivalent to the third column of the rotation matrix.
	 */
	readonly ZVector: Vector3;
	/** Returns the inverse of the `CFrame`. */
	Inverse(): CFrame;
	/**
	 * Returns a `CFrame` interpolated between itself and `goal` by the fraction `alpha`.
	 */
	Lerp(goal?: CFrame, alpha?: number): CFrame;
	/** Returns an orthonormalized copy of the `CFrame`. */
	Orthonormalize(): CFrame;
	/**
	 * Receives one or more `CFrame` objects and returns them transformed from object to world space.
	 */
	ToWorldSpace(_param?: any[]): any[];
	/**
	 * Receives one or more `CFrame` objects and returns them transformed from world to object space.
	 */
	ToObjectSpace(_param?: any[]): any[];
	/**
	 * Receives one or more `Vector3` objects and returns them transformed from object to world space.
	 */
	PointToWorldSpace(_param?: any[]): any[];
	/**
	 * Receives one or more `Vector3` objects and returns them transformed from world to object space.
	 */
	PointToObjectSpace(_param?: any[]): any[];
	/**
	 * Receives one or more `Vector3` objects and returns them rotated from object to world space.
	 */
	VectorToWorldSpace(_param?: any[]): any[];
	/**
	 * Receives one or more `Vector3` objects and returns them rotated from world to object space.
	 */
	VectorToObjectSpace(_param?: any[]): any[];
	/**
	 * Returns the values `x`, `y`, `z`, `R00`, `R01`, `R02`, `R10`, `R11`, `R12`, `R20`, `R21`, and `R22`, where `x` `y` `z` represent the position of the `CFrame` and `R00`‑`R22` represent its 3&times;3 rotation matrix.
	 */
	GetComponents(): unknown;
	/**
	 * Returns approximate angles that could be used to generate the `CFrame` using the optional `Enum.RotationOrder`.
	 */
	ToEulerAngles(order?: Enum.RotationOrder): LuaTuple<[number, number, number]>;
	/**
	 * Returns approximate angles that could be used to generate the `CFrame` using `Enum.RotationOrder.XYZ`.
	 */
	ToEulerAnglesXYZ(): LuaTuple<[number, number, number]>;
	/**
	 * Returns approximate angles that could be used to generate the `CFrame` using `Enum.RotationOrder.YXZ`.
	 */
	ToEulerAnglesYXZ(): LuaTuple<[number, number, number]>;
	/** Equivalent to `CFrame:ToEulerAnglesYXZ()`. */
	ToOrientation(): LuaTuple<[number, number, number]>;
	/**
	 * Returns a tuple containing a unit `Vector3` axis and a rotation angle in radians.
	 */
	ToAxisAngle(): LuaTuple<[Vector3, number]>;
	/** Equivalent to `CFrame:GetComponents()`. */
	components(): unknown;
	/**
	 * Returns `true` if the other `CFrame` is sufficiently close to this `CFrame` in both position and rotation.
	 */
	FuzzyEq(other?: CFrame, epsilon?: number): boolean;
	/**
	 * Returns the angle, in radians, between the orientation of one `CFrame` and another.
	 */
	AngleBetween(other?: CFrame): number;
}

declare const CFrame: {
	/** Returns a blank identity `CFrame`. */
	new (): CFrame;
	/**
	 * Returns a `CFrame` with no rotation with the position of the provided `Vector3`.
	 */
	new (pos?: Vector3): CFrame;
	/**
	 * Returns a `CFrame` with the position of the first `Vector3` and an orientation pointed toward the second.
	 */
	new (pos?: Vector3, lookAt?: Vector3): CFrame;
	/**
	 * Returns a `CFrame` with a position comprised of the provided `x`, `y`, and `z` components.
	 */
	new (x?: number, y?: number, z?: number): CFrame;
	/**
	 * Returns a `CFrame` from position (`x`, `y`, `z`) and quaternion (`qX`, `qY`, `qZ`, `qW`).
	 */
	new (x?: number, y?: number, z?: number, qX?: number, qY?: number, qZ?: number, qW?: number): CFrame;
	/**
	 * Returns a `CFrame` from position (`x`, `y`, `z`) with an orientation specified by the rotation matrix.
	 */
	new (x?: number, y?: number, z?: number, R00?: number, R01?: number, R02?: number, R10?: number, R11?: number, R12?: number, R20?: number, R21?: number, R22?: number): CFrame;
	/**
	 * Returns a `CFrame` with the position of the first `Vector3` and an orientation pointed toward the second.
	 */
	lookAt(at?: Vector3, lookAt?: Vector3, up?: Vector3): CFrame;
	/**
	 * Returns a `CFrame` with the position of the first `Vector3` and an orientation directed along the second.
	 */
	lookAlong(at?: Vector3, direction?: Vector3, up?: Vector3): CFrame;
	/**
	 * Returns a `CFrame` representing the orientation needed to rotate from the first `Vector3` to the second, with the position set to zero.
	 */
	fromRotationBetweenVectors(from?: Vector3, to?: Vector3): CFrame;
	/**
	 * Returns a rotated `CFrame` from angles `rx`, `ry`, and `rz` in radians. Rotations are applied in the optional `Enum.RotationOrder` with a default of `XYZ`.
	 */
	fromEulerAngles(rx?: number, ry?: number, rz?: number, order?: Enum.RotationOrder): CFrame;
	/**
	 * Returns a rotated `CFrame` from angles `rx`, `ry`, and `rz` in radians using `Enum.RotationOrder.XYZ`.
	 */
	fromEulerAnglesXYZ(rx?: number, ry?: number, rz?: number): CFrame;
	/**
	 * Returns a rotated `CFrame` from angles `rx`, `ry`, and `rz` in radians using `Enum.RotationOrder.YXZ`.
	 */
	fromEulerAnglesYXZ(rx?: number, ry?: number, rz?: number): CFrame;
	/** Equivalent to `fromEulerAnglesXYZ()`. */
	Angles(rx?: number, ry?: number, rz?: number): CFrame;
	/** Equivalent to `fromEulerAnglesYXZ()`. */
	fromOrientation(rx?: number, ry?: number, rz?: number): CFrame;
	/** Returns a rotated `CFrame` from a unit `Vector3` and a rotation in radians. */
	fromAxisAngle(v?: Vector3, r?: number): CFrame;
	/** Returns a `CFrame` from a translation and the columns of a rotation matrix. */
	fromMatrix(pos?: Vector3, vX?: Vector3, vY?: Vector3, vZ?: Vector3): CFrame;
	/** An identity `CFrame` with no translation or rotation. */
	readonly identity: CFrame;
};

/** A color value comprised of red, green, and blue components. */
interface Color3 {
	/** The red value of the color. */
	readonly R: number;
	/** The green value of the color. */
	readonly G: number;
	/** The blue value of the color. */
	readonly B: number;
	/** Returns a `Color3` interpolated between two colors. */
	Lerp(color?: Color3, alpha?: number): Color3;
	/** Returns the hue, saturation, and value of a `Color3`. */
	ToHSV(): LuaTuple<[number, number, number]>;
	/** Returns the hex code of a `Color3`. */
	ToHex(): string;
}

declare const Color3: {
	/** Returns a `Color3` with the given red, green, and blue values. */
	new (red?: number, green?: number, blue?: number): Color3;
	/** Returns a `Color3` from given components within the range of 0 to 255. */
	fromRGB(red?: number, green?: number, blue?: number): Color3;
	/** Returns a `Color3` from the given hue, saturation, and value components. */
	fromHSV(hue?: number, saturation?: number, value?: number): Color3;
	/** Returns a `Color3` from a given hex value. */
	fromHex(hex?: string): Color3;
	/**
	 * Returns the hue, saturation, and value of a `Color3`.
	 * @deprecated This function is functionally equivalent to `Color3:ToHSV()`.
	 */
	toHSV(color?: Color3): LuaTuple<[number, number, number]>;
};

/** A gradient of color values comprised of `ColorSequenceKeypoints`. */
interface ColorSequence {
	/** An array of `ColorSequenceKeypoint` values in ascending order. */
	readonly Keypoints: any[];
}

declare const ColorSequence: {
	/** Returns a new `ColorSequence` that is entirely the specified color. */
	new (c?: Color3): ColorSequence;
	/**
	 * Returns a new `ColorSequence` with `c0` as the start value and `c1` as the end value.
	 */
	new (c0?: Color3, c1?: Color3): ColorSequence;
	/** Returns a new `ColorSequence` from an array of `ColorSequenceKeypoints`. */
	new (keypoints?: any[]): ColorSequence;
};

/** A color and time value that represents a keypoint in a `ColorSequence`. */
interface ColorSequenceKeypoint {
	/** The relative time at which the keypoint is located. */
	readonly Time: number;
	/** The Color3 value of the keypoint. */
	readonly Value: Color3;
}

declare const ColorSequenceKeypoint: {
	/** Returns a ColorSequenceKeypoint from the given time and color. */
	new (time?: number, color?: Color3): ColorSequenceKeypoint;
};

/**
 * Represents a reference to asset content stored externally or as an object within the place.
 */
interface Content {
	/** The source type of the contained value. */
	readonly SourceType: Enum.ContentSourceType;
	/** A URI `string` if `Content.SourceType` is `Uri`, otherwise `nil`. */
	readonly Uri: string;
	/**
	 * A reference to a non-`nil` `Object` if `Content.SourceType` is `Object`, otherwise `nil`.
	 */
	readonly Object: Instance;
	/**
	 * A reference to a non-`nil` `Opaque` content if `Content.SourceType` is `Opaque`, otherwise `nil`.
	 */
	readonly Opaque: unknown;
}

declare const Content: {
	/**
	 * Returns a new `Content` with an [asset URI](../../../projects/assets/index.md#asset-uris) `string` value referencing content external to the place.
	 */
	fromUri(uri?: string): Content;
	/** Returns a new `Content` with a strong reference to an `Object`. */
	fromObject(object?: Instance): Content;
	/** An empty `Content` value with `Content.SourceType` of `None`. */
	readonly none: string;
};

/** A data type that represents a moment in time. */
interface DateTime {
	/**
	 * The number of **seconds** between January 1st, 1970 at 00:00 UTC (the Unix epoch).
	 */
	readonly UnixTimestamp: number;
	/**
	 * The number of **milliseconds** between January 1st, 1970 at 00:00 UTC (the Unix epoch).
	 */
	readonly UnixTimestampMillis: number;
	/** Returns the components of the `DateTime` in UTC. */
	ToUniversalTime(): Record<string, any>;
	/** Returns the components of the `DateTime` in local time. */
	ToLocalTime(): Record<string, any>;
	/** Returns the `DateTime` as an ISO 8601 date-time string. */
	ToIsoDate(): string;
	/** Returns the DateTime's value in UTC formatted into a string. */
	FormatUniversalTime(format?: string, locale?: string): string;
	/** Returns the `DateTime` object's value in local time formatted into a string. */
	FormatLocalTime(format?: string, locale?: string): string;
}

declare const DateTime: {
	/** Returns a `DateTime` representing the current moment in time. */
	now(): DateTime;
	/** Returns a `DateTime` representing the given Unix timestamp. */
	fromUnixTimestamp(unixTimestamp?: number): DateTime;
	/** Returns a `DateTime` representing the given Unix timestamp in milliseconds. */
	fromUnixTimestampMillis(unixTimestampMillis?: number): DateTime;
	/** Returns a new `DateTime` using the given units from a UTC time. */
	fromUniversalTime(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): DateTime;
	/** Returns a new `DateTime` using the given units from a local time. */
	fromLocalTime(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): DateTime;
	/** Returns a `DateTime` from an ISO 8601 date-time string (in UTC). */
	fromIsoDate(isoDate?: string): DateTime;
};

/** Describes details for a `DockWidgetPluginGui`. */
interface DockWidgetPluginGuiInfo {
	/**
	 * The enabled state of the `PluginGui` if it does not have a saved state from a previous session.
	 */
	readonly InitialEnabled: boolean;
	/** If true, will override any saved enabled state with the `InitialEnabled` value. */
	readonly InitialEnabledShouldOverrideRestore: boolean;
	/** The initial pixel width of the PluginGui when floating. */
	readonly FloatingXSize: number;
	/** The initial pixel height of the PluginGui when floating. */
	readonly FloatingYSize: number;
	/** The minimum pixel width of the PluginGui. */
	readonly MinWidth: number;
	/** The minimum pixel height of the PluginGui. */
	readonly MinHeight: number;
}

declare const DockWidgetPluginGuiInfo: {
	/** Returns a new DockWidgetPluginGuiInfo object. */
	new (InitialDockState?: Enum.InitialDockState, InitialEnabled?: boolean, InitialEnabledShouldOverrideRestore?: boolean, FloatingXSize?: number, FloatingYSize?: number, MinWidth?: number, MinHeight?: number): DockWidgetPluginGuiInfo;
};

/** A data type containing six booleans, each representing a face of a `BasePart`. */
interface Faces {
	/** Whether the top face is included. */
	readonly Top: boolean;
	/** Whether the bottom face is included. */
	readonly Bottom: boolean;
	/** Whether the left face is included. */
	readonly Left: boolean;
	/** Whether the right face is included. */
	readonly Right: boolean;
	/** Whether the back face is included. */
	readonly Back: boolean;
	/** Whether the front face is included. */
	readonly Front: boolean;
}

declare const Faces: {
	/**
	 * Returns a Faces with the corresponding face of each passed `Enum.NormalId` as `true`.
	 */
	new (_param?: unknown): Faces;
};

/** A time-value pair used with `FloatCurve` instances. */
interface FloatCurveKey {
	/** The key interpolation mode for the segment started by this `FloatCurveKey`. */
	readonly Interpolation: Enum.KeyInterpolationMode;
	/** The time position of this `FloatCurveKey`. */
	readonly Time: number;
	/** The value of this `FloatCurveKey`. */
	readonly Value: number;
	/** The tangent to the right of this `FloatCurveKey`. */
	readonly RightTangent: number;
	/** The tangent to the left of this `FloatCurveKey`. */
	readonly LeftTangent: number;
}

declare const FloatCurveKey: {
	/** Returns a new `FloatCurveKey` from the given time and value. */
	new (time?: number, value?: number, Interpolation?: Enum.KeyInterpolationMode): FloatCurveKey;
};

/** Describes the font used to render text. */
interface Font {
	/** The asset ID for the font family. */
	readonly Family: string;
	/** How thick the text is. */
	readonly Weight: Enum.FontWeight;
	/** Whether the font is italic. */
	readonly Style: Enum.FontStyle;
	/** Whether the font is bold. */
	readonly Bold: boolean;
}

declare const Font: {
	/** Creates a new `Font`. */
	new (family?: string, weight?: Enum.FontWeight, style?: Enum.FontStyle): Font;
	/** Creates a `Font` from an `Enum.Font` value. */
	fromEnum(font?: Enum.Font): Font;
	/** Creates a `Font` from a name like `FredokaOne`. */
	fromName(name?: string, weight?: Enum.FontWeight, style?: Enum.FontStyle): Font;
	/** Creates a `Font` from a numerical asset ID. */
	fromId(id?: number, weight?: Enum.FontWeight, style?: Enum.FontStyle): Font;
};

/** Represents a range of numbers. */
interface NumberRange {
	/** The minimum value of the `NumberRange`. */
	readonly Min: number;
	/** The maximum value of the `NumberRange`. */
	readonly Max: number;
}

declare const NumberRange: {
	/** Returns a new `NumberRange` with the minimum and maximum set to the `value`. */
	new (value?: number): NumberRange;
	/** Returns a new `NumberRange` with the provided `minimum` and `maximum`. */
	new (minimum?: number, maximum?: number): NumberRange;
};

/** A series of floats across a period of time. */
interface NumberSequence {
	/** An array of `NumberSequenceKeypoint` values in ascending order. */
	readonly Keypoints: any[];
}

declare const NumberSequence: {
	/**
	 * Returns a `NumberSequence` with the start and end values set to the provided `n`.
	 */
	new (n?: number): NumberSequence;
	/**
	 * Returns a `NumberSequence` of two keypoints with `n0` as the start value and `n1` as the end value.
	 */
	new (n0?: number, n1?: number): NumberSequence;
	/** Returns a `NumberSequence` from an array of `NumberSequenceKeypoints`. */
	new (Keypoints?: any[]): NumberSequence;
};

/**
 * Represents keypoint within a `NumberSequence` with a particular time, value, and envelope size.
 */
interface NumberSequenceKeypoint {
	/** The amount of variance allowed from the value. */
	readonly Envelope: number;
	/** The relative time at which the keypoint is positioned. */
	readonly Time: number;
	/** The base value of the keypoint. */
	readonly Value: number;
}

declare const NumberSequenceKeypoint: {
	/** Returns a keypoint with the specified time and value. */
	new (time?: number, value?: number): NumberSequenceKeypoint;
	/** Returns a keypoint with the specified time, value, and envelope. */
	new (time?: number, value?: number, envelope?: number): NumberSequenceKeypoint;
};

/** Stores parameters used in boundary-querying functions. */
interface OverlapParams {
	/** An array of objects whose descendants is used in filtering candidates. */
	readonly FilterDescendantsInstances: any[];
	/** Determines how the `OverlapParams.FilterDescendantsInstances` list is used. */
	readonly FilterType: Enum.RaycastFilterType;
	/** The maximum amount of parts to be returned by the query. */
	readonly MaxParts: number;
	/** The collision group used for the operation. */
	readonly CollisionGroup: string;
	/** Slightly increases the volume of the boundary-querying operation. */
	readonly Tolerance: number;
	/**
	 * Determines whether the boundary-querying operation considers a part's `BasePart.CanCollide` property value over its `BasePart.CanQuery` value.
	 */
	readonly RespectCanCollide: boolean;
	/**
	 * When enabled, the query will ignore all part collision properties and perform a brute-force check on every part.
	 */
	readonly BruteForceAllSlow: boolean;
	/** Adds the instances provided to `FilterDescendantsInstances`. */
	AddToFilter(instances?: Instance | Array): void;
}

declare const OverlapParams: {
	/** Returns a blank `OverlapParams` object. */
	new (): OverlapParams;
};

/** Stores the info for a single control point used with the `Path2D` instance. */
interface Path2DControlPoint {
	/** The position of the `Path2DControlPoint`. */
	readonly Position: UDim2;
	/** The left tangent of the `Path2DControlPoint`. */
	readonly LeftTangent: UDim2;
	/** The right tangent of the `Path2DControlPoint`. */
	readonly RightTangent: UDim2;
}

declare const Path2DControlPoint: {
	/** Returns an empty `Path2DControlPoint`. */
	new (): Path2DControlPoint;
	/** Returns a `Path2DControlPoint` with only the position set. */
	new (Position?: UDim2): Path2DControlPoint;
	/**
	 * Returns a `Path2DControlPoint` with the position, left tangent, and right tangent set.
	 */
	new (Position?: UDim2, _param?: UDim2, _param2?: UDim2): Path2DControlPoint;
};

/** A description of the steps required to reach the next waypoint in a path. */
interface PathWaypoint {
	/** The action to perform at this waypoint. */
	readonly Action: Enum.PathWaypointAction;
	/** The 3D position of this waypoint. */
	readonly Position: Vector3;
	/** The name of the navigation area that generates this waypoint. */
	readonly Label: string;
}

declare const PathWaypoint: {
	/**
	 * Returns a `PathWaypoint` object from the given `Vector3` position, `Enum.PathWaypointAction` action, and optional string label.
	 */
	new (position?: Vector3, action?: Enum.PathWaypointAction, label?: string): PathWaypoint;
};

/** Describes properties that affect the physical behavior of a `BasePart`. */
interface PhysicalProperties {
	/**
	 * A value between `0` and `1` denoting how absorbent the material is to `AudioEmitters`.
	 */
	readonly AcousticAbsorption: number;
	/** The mass per unit volume of the part. */
	readonly Density: number;
	/** The deceleration of the part when rubbing against another part. */
	readonly Friction: number;
	/** The amount of energy retained when colliding with another part. */
	readonly Elasticity: number;
	/**
	 * The importance of the part's `Friction` property when calculating the friction with the colliding part.
	 */
	readonly FrictionWeight: number;
	/**
	 * The importance of the part's `Elasticity` property when calculating the elasticity with the colliding part.
	 */
	readonly ElasticityWeight: number;
}

declare const PhysicalProperties: {
	/**
	 * Returns a `PhysicalProperties` with the default properties for the given material.
	 */
	new (material?: Enum.Material): PhysicalProperties;
	/**
	 * Returns a `PhysicalProperties` with the specified density, friction, and elasticity.
	 */
	new (density?: number, friction?: number, elasticity?: number): PhysicalProperties;
	/**
	 * Creates a `PhysicalProperties` container with the specified density, friction, elasticity, weight of friction, and weight of elasticity.
	 */
	new (density?: number, friction?: number, elasticity?: number, frictionWeight?: number, elasticityWeight?: number): PhysicalProperties;
	/**
	 * Creates a `PhysicalProperties` container with the specified density, friction, elasticity, weight of friction, weight of elasticity, and acoustic absorption.
	 */
	new (density?: number, friction?: number, elasticity?: number, frictionWeight?: number, elasticityWeight?: number, acousticAbsorption?: number): PhysicalProperties;
};

/** Generates pseudorandom numbers and directions. */
interface Random {
	/** Returns a pseudorandom integer uniformly distributed over `[min, max]`. */
	NextInteger(min?: number, max?: number): number;
	/** Returns a pseudorandom number uniformly distributed over `[0, 1]`. */
	NextNumber(): number;
	/** Returns a pseudorandom number uniformly distributed over `[min, max]`. */
	NextNumber(min?: number, max?: number): number;
	/** Uniformly shuffles a table in-place. */
	Shuffle(tb?: Record<string, any>): void;
	/** Returns a unit vector with a pseudorandom direction. */
	NextUnitVector(): Vector3;
	/** Returns a new Random object with the same state as the original. */
	Clone(): Random;
}

declare const Random: {
	/** Returns a new pseudorandom generator using an optional seed. */
	new (seed?: number): Random;
};

/**
 * Represents a line with a starting point that casts infinitely in a specific direction.
 */
interface Ray {
	/** The `Ray` with a normalized direction (the direction has a magnitude of `1`). */
	readonly Unit: Ray;
	/** The position of the origin. */
	readonly Origin: Vector3;
	/** The direction vector of the `Ray`. */
	readonly Direction: Vector3;
	/**
	 * Returns a `Vector3` projected onto the ray so that it is within the `Ray` line of sight.
	 */
	ClosestPoint(point?: Vector3): Vector3;
	/**
	 * Returns the distance between the given point and the closest point on the `Ray`.
	 */
	Distance(point?: Vector3): number;
}

declare const Ray: {
	/** Returns a `Ray` with the given `Origin` and `Direction`. */
	new (Origin?: Vector3, Direction?: Vector3): Ray;
};

/** A container for parameters used in raycasting operations. */
interface RaycastParams {
	/**
	 * An array of objects whose descendants are used in filtering raycasting candidates.
	 */
	readonly FilterDescendantsInstances: any[];
	/** Determines how the `FilterDescendantsInstances` array is used. */
	readonly FilterType: Enum.RaycastFilterType;
	/**
	 * Determines whether the water material is considered when raycasting against `Terrain`.
	 */
	readonly IgnoreWater: boolean;
	/** The collision group used for the operation. */
	readonly CollisionGroup: string;
	/**
	 * Determines whether the raycast operation considers a part's `CanCollide` property value over its `CanQuery` value.
	 */
	readonly RespectCanCollide: boolean;
	/**
	 * When enabled, the query will ignore all part collision properties and perform a brute-force check on every part.
	 */
	readonly BruteForceAllSlow: boolean;
	/** Adds the instances provided to `FilterDescendantsInstances`. */
	AddToFilter(instances?: Instance | Array): void;
}

declare const RaycastParams: {
	/** Returns a blank `RaycastParams`. */
	new (): RaycastParams;
};

/** Stores results from a raycast operation. */
interface RaycastResult {
	/** The distance between the ray origin and the intersection point. */
	readonly Distance: number;
	/** The `BasePart` or `Terrain` cell that the ray intersected. */
	readonly Instance: BasePart;
	/** The `Enum.Material` at the intersection point. */
	readonly Material: Enum.Material;
	/** The world space point at which the intersection occurred. */
	readonly Position: Vector3;
	/** The normal vector of the intersected face. */
	readonly Normal: Vector3;
}

/** A value that represents a two-dimensional rectangle. */
interface Rect {
	/** The width of the **Rect**. */
	readonly Width: number;
	/** The height of the **Rect**. */
	readonly Height: number;
	/** The coordinates of the top-left corner. */
	readonly Min: Vector2;
	/** The coordinates of the bottom-right corner. */
	readonly Max: Vector2;
}

declare const Rect: {
	/** Returns a new **Rect** with zero `Vector2` positions. */
	new (): Rect;
	/** Returns a new **Rect** from the given `Vector2` positions. */
	new (min?: Vector2, max?: Vector2): Rect;
	/**
	 * Returns a new **Rect** using the first and last two arguments as coordinates for corners.
	 */
	new (minX?: number, minY?: number, maxX?: number, maxY?: number): Rect;
};

/** Describes a rectangular volume in 3D space. */
interface Region3 {
	/** The center location and rotation of the `Region3`. */
	readonly CFrame: CFrame;
	/** The 3D size of the `Region3`. */
	readonly Size: Vector3;
	/** Expands the `Region3` to fit a grid based on the provided resolution. */
	ExpandToGrid(resolution?: number): Region3;
}

declare const Region3: {
	/** Returns a new `Region3` using the provided vectors as boundaries. */
	new (min?: Vector3, max?: Vector3): Region3;
};

/**
 * Represents a Region3 stored as two boundaries as opposed to position and size components.
 */
interface Region3int16 {
	/** The lower bound of the `Region3int16`. */
	readonly Min: Vector3int16;
	/** The upper bound of the `Region3int16`. */
	readonly Max: Vector3int16;
}

declare const Region3int16: {
	/** Returns a new Region3int16 from the provided boundaries. */
	new (min?: Vector3int16, max?: Vector3int16): Region3int16;
};

/** A time-value pair used with `RotationCurve` instances. */
interface RotationCurveKey {
	/** The key interpolation mode for the segment started by this `RotationCurveKey`. */
	readonly Interpolation: Enum.KeyInterpolationMode;
	/** The time position of this `RotationCurveKey`. */
	readonly Time: number;
	/** The `CFrame` value of this `RotationCurveKey`. */
	readonly Value: CFrame;
	/** The tangent to the right of this `RotationCurveKey`. */
	readonly RightTangent: number;
	/** The tangent to the left of this `RotationCurveKey`. */
	readonly LeftTangent: number;
}

declare const RotationCurveKey: {
	/** Returns a new `RotationCurveKey` at a given time with a given `CFrame`. */
	new (time?: number, cframe?: CFrame, Interpolation?: Enum.KeyInterpolationMode): RotationCurveKey;
};

/** Stores secret non-printable content. */
interface Secret {
	/** Prepends a string to the secret content. */
	AddPrefix(prefix?: string): Secret;
	/** Appends a string to the secret content. */
	AddSuffix(suffix?: string): Secret;
}

/** Provides sharable, table-like storage for key/value pairs. */
interface SharedTable {
}

declare const SharedTable: {
	/** Returns a new, empty `SharedTable`. */
	new (): SharedTable;
	/**
	 * Returns a new `SharedTable` containing elements equivalent to those in the provided Luau table.
	 */
	new (t?: Record<string, any>): SharedTable;
	/** Removes all of the elements from the `SharedTable`. */
	clear(st?: SharedTable): void;
	/** Creates and returns a clone of the provided `SharedTable`. */
	clone(st?: SharedTable, deep?: boolean): SharedTable;
	/** Creates and returns a frozen (read-only) clone of the provided `SharedTable`. */
	cloneAndFreeze(st?: SharedTable, deep?: boolean): SharedTable;
	/** Adds `delta` to the value with the provided key and returns the original value. */
	increment(st?: SharedTable, key?: string | number, delta?: number): number;
	/** Returns `true` if the `SharedTable` is frozen (read-only). */
	isFrozen(st?: SharedTable): boolean;
	/** Returns the number of elements stored in the `SharedTable`. */
	size(st?: SharedTable): number;
	/** Updates the value with the provided key via the provided update function. */
	update(st?: SharedTable, key?: string | number, f?: (...args: any[]) => any): void;
};

/** Stores parameters for `Tweens`. */
interface TweenInfo {
	/** The direction in which the tween executes. */
	readonly EasingDirection: Enum.EasingDirection;
	/** Duration of the tween, in seconds. */
	readonly Time: number;
	/** Time of delay until the tween begins, in seconds. */
	readonly DelayTime: number;
	/** Number of times the tween repeats. */
	readonly RepeatCount: number;
	/** The style in which the tween executes. */
	readonly EasingStyle: Enum.EasingStyle;
	/**
	 * Whether or not the tween interpolates in reverse tween once the initial tween completes.
	 */
	readonly Reverses: boolean;
}

declare const TweenInfo: {
	/** Creates a new `TweenInfo` from the provided parameters. */
	new (time?: number, easingStyle?: Enum.EasingStyle, easingDirection?: Enum.EasingDirection, repeatCount?: number, reverses?: boolean, delayTime?: number): TweenInfo;
};

/**
 * Represents a one-dimensional value with two components, a relative scale and an absolute offset.
 */
interface UDim {
	/** The relative scale component of the `UDim`. */
	readonly Scale: number;
	/** The absolute offset component of the `UDim`. */
	readonly Offset: number;
}

declare const UDim: {
	/** Returns a `UDim` from the given components. */
	new (Scale?: number, Offset?: number): UDim;
};

/**
 * Represents a two-dimensional value where each dimension is composed of a relative scale and an absolute offset.
 */
interface UDim2 {
	/** The **X** dimension scale and offset of the `UDim2`. */
	readonly X: UDim;
	/** The **Y** dimension scale and offset of the `UDim2`. */
	readonly Y: UDim;
	/** The **X** dimension scale and offset of the `UDim2`. */
	readonly Width: UDim;
	/** The **Y** dimension scale and offset of the `UDim2`. */
	readonly Height: UDim;
	/** Returns a `UDim2` interpolated linearly between the value and the given goal. */
	Lerp(goal?: UDim2, alpha?: number): UDim2;
}

declare const UDim2: {
	/**
	 * Returns a new `UDim2` with the coordinates of two zero `UDim` components representing each axis.
	 */
	new (): UDim2;
	/**
	 * Returns a new `UDim2` given the coordinates of the two `UDim` components representing each axis.
	 */
	new (xScale?: number, xOffset?: number, yScale?: number, yOffset?: number): UDim2;
	/**
	 * Returns a new `UDim2` from the given `UDim` objects representing the **X** and **Y** dimensions, respectively.
	 */
	new (x?: UDim, y?: UDim): UDim2;
	/** Returns a new `UDim2` with the given scale components and no offsets. */
	fromScale(xScale?: number, yScale?: number): UDim2;
	/** Returns a new `UDim2` with the given offset components and no scaling. */
	fromOffset(xOffset?: number, yOffset?: number): UDim2;
};

/** A time-value pair used with `ValueCurve` instances. */
interface ValueCurveKey {
	/** The key interpolation mode for the segment started by this `ValueCurveKey`. */
	readonly Interpolation: Enum.KeyInterpolationMode;
	/** The time position of this `ValueCurveKey`. */
	readonly Time: number;
	/** The value of this `ValueCurveKey`. */
	readonly Value: any;
	/** The tangent to the right of this `ValueCurveKey`. */
	readonly RightTangent: number;
	/** The tangent to the left of this `ValueCurveKey`. */
	readonly LeftTangent: number;
}

declare const ValueCurveKey: {
	/** Returns a new `ValueCurveKey` from the given time and value. */
	new (time?: number, value?: any, Interpolation?: Enum.KeyInterpolationMode): ValueCurveKey;
};

/** Represents a 2D value with direction and magnitude. */
interface Vector2 {
	/** The x-coordinate of the `Vector2`. */
	readonly X: number;
	/** The y-coordinate of the `Vector2`. */
	readonly Y: number;
	/** The length of the `Vector2`. */
	readonly Magnitude: number;
	/** A normalized copy of the `Vector2`. */
	readonly Unit: Vector2;
	/** Returns the cross product of the two vectors. */
	Cross(other?: Vector2): number;
	/** Returns a new vector from the absolute values of the original's components. */
	Abs(): Vector2;
	/** Returns a new vector from the ceiling of the original's components. */
	Ceil(): Vector2;
	/** Returns a new vector from the floor of the original's components. */
	Floor(): Vector2;
	/** Returns a new vector from the sign (-1, 0, or 1) of the original's components. */
	Sign(): Vector2;
	/** Returns the angle in radians between the two vectors. */
	Angle(other?: Vector2, isSigned?: boolean): number;
	/** Returns a scalar dot product of the two vectors. */
	Dot(v?: Vector2): number;
	/**
	 * Returns a `Vector2` linearly interpolated between this `Vector2` and the given goal by the given alpha.
	 */
	Lerp(v?: Vector2, alpha?: number): Vector2;
	/**
	 * Returns a `Vector2` with each component as the highest among the respective components of the provided `Vector2` objects.
	 */
	Max(_param?: unknown): Vector2;
	/**
	 * Returns a `Vector2` with each component as the lowest among the respective components of the provided `Vector2` objects.
	 */
	Min(_param?: unknown): Vector2;
	/**
	 * Returns `true` if the X and Y components of the other `Vector2` are within epsilon units of each corresponding component of this `Vector2`.
	 */
	FuzzyEq(other?: Vector2, epsilon?: number): boolean;
}

declare const Vector2: {
	/** Returns a `Vector2` from the given x and y components. */
	new (x?: number, y?: number): Vector2;
	/** A `Vector2` with a magnitude of zero. */
	readonly zero: Vector2;
	/** A `Vector2` with a value of 1 on every axis. */
	readonly one: Vector2;
	/** A `Vector2` with a value of 1 on the X axis. */
	readonly xAxis: Vector2;
	/** A `Vector2` with a value of 1 on the Y axis. */
	readonly yAxis: Vector2;
};

/** Represents a Vector2 with signed 16-bit integers for components. */
interface Vector2int16 {
	/** The x-coordinate of the `Vector2int16`. */
	readonly X: number;
	/** The y-coordinate of the `Vector2int16`. */
	readonly Y: number;
}

declare const Vector2int16: {
	/** Returns a `Vector2int16` from the given x and y components. */
	new (x?: number, y?: number): Vector2int16;
};

/** Represents a 3D value with a direction and magnitude. */
interface Vector3 {
	/** The **X** coordinate of the `Vector3`. */
	readonly X: number;
	/** The **Y** coordinate of the `Vector3`. */
	readonly Y: number;
	/** The **Z** coordinate of the `Vector3`. */
	readonly Z: number;
	/** The length of the `Vector3`. */
	readonly Magnitude: number;
	/**
	 * A normalized copy of the `Vector3` - one that has the same direction as the original but a magnitude of `1`.
	 */
	readonly Unit: Vector3;
	/** Returns a new vector from the absolute values of the original's components. */
	Abs(): Vector3;
	/** Returns a new vector from the ceiling of the original's components. */
	Ceil(): Vector3;
	/** Returns a new vector from the floor of the original's components. */
	Floor(): Vector3;
	/** Returns a new vector from the sign (-1, 0, or 1) of the original's components. */
	Sign(): Vector3;
	/** Returns the cross product of the two vectors. */
	Cross(other?: Vector3): Vector3;
	/**
	 * Returns the angle in radians between the two vectors. If you provide an axis, it determines the sign of the angle.
	 */
	Angle(other?: Vector3, axis?: Vector3): number;
	/** Returns a scalar dot product of the two vectors. */
	Dot(other?: Vector3): number;
	/**
	 * Returns `true` if the difference between the squared magnitude of the two vectors is within `epsilon`. `epsilon` is scaled relative to the magnitude, rather than an absolute epsilon.
	 */
	FuzzyEq(other?: Vector3, epsilon?: number): boolean;
	/**
	 * Returns a `Vector3` linearly interpolated between this `Vector3` and the given goal by the given alpha.
	 */
	Lerp(goal?: Vector3, alpha?: number): Vector3;
	/**
	 * Returns a `Vector3` with each component as the highest among the respective components of both provided `Vector3` objects.
	 */
	Max(vector?: Vector3): Vector3;
	/**
	 * Returns a `Vector3` with each component as the lowest among the respective components of both provided `Vector3` objects.
	 */
	Min(vector?: Vector3): Vector3;
}

declare const Vector3: {
	/** Returns a new `Vector3` from the given `x`, `y`, and `z` components. */
	new (x?: number, y?: number, z?: number): Vector3;
	/** Returns a new `Vector3` in the given direction. */
	FromNormalId(normal?: Enum.NormalId): Vector3;
	/** Returns a new `Vector3` for the given axis. */
	FromAxis(axis?: Enum.Axis): Vector3;
	/** A `Vector3` with a magnitude of `0`. */
	readonly zero: Vector3;
	/** A `Vector3` with a value of `1` on every axis. */
	readonly one: Vector3;
	/** A `Vector3` with a value of `1` on the **X** axis. */
	readonly xAxis: Vector3;
	/** A `Vector3` with a value of `1` on the **Y** axis. */
	readonly yAxis: Vector3;
	/** A `Vector3` with a value of `1` on the **Z** axis. */
	readonly zAxis: Vector3;
};

/** A Vector3 with signed 16-bit integers for components. */
interface Vector3int16 {
	/** The x-coordinate of the `Vector3int16`. */
	readonly X: number;
	/** The y-coordinate of the `Vector3int16`. */
	readonly Y: number;
	/** The z-coordinate of the `Vector3int16`. */
	readonly Z: number;
}

declare const Vector3int16: {
	/** Returns a new `Vector3int16` from the given x, y, and z components. */
	new (x?: number, y?: number, z?: number): Vector3int16;
};

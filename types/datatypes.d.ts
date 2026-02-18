// Auto-generated from Roblox creator-docs YAML — do not edit manually
// Run `bun run generate` to regenerate

interface Axes {
	readonly X: boolean;
	readonly Y: boolean;
	readonly Z: boolean;
	readonly Top: boolean;
	readonly Bottom: boolean;
	readonly Left: boolean;
	readonly Right: boolean;
	readonly Back: boolean;
	readonly Front: boolean;
}

declare const Axes: {
	new (axes: unknown): Axes;
};

interface BrickColor {
	readonly Number: number;
	readonly r: number;
	readonly g: number;
	readonly b: number;
	readonly Name: string;
	readonly Color: Color3;
}

declare const BrickColor: {
	new (val: number): BrickColor;
	new (r: number, g: number, b: number): BrickColor;
	new (name: string): BrickColor;
	new (color: Color3): BrickColor;
	palette(paletteValue: number): BrickColor;
	random(): BrickColor;
	White(): BrickColor;
	Gray(): BrickColor;
	DarkGray(): BrickColor;
	Black(): BrickColor;
	Red(): BrickColor;
	Yellow(): BrickColor;
	Green(): BrickColor;
	Blue(): BrickColor;
};

interface CatalogSearchParams {
	readonly SearchKeyword: string;
	readonly MinPrice: number;
	readonly MaxPrice: number;
	readonly SortType: Enum.CatalogSortType;
	readonly SortAggregation: Enum.CatalogSortAggregation;
	readonly CategoryFilter: Enum.CatalogCategoryFilter;
	readonly SalesTypeFilter: Enum.SalesTypeFilter;
	readonly BundleTypes: any[];
	readonly AssetTypes: any[];
	readonly IncludeOffSale: boolean;
	readonly CreatorName: string;
	readonly CreatorType: Enum.CreatorTypeFilter;
	readonly CreatorId: number;
	readonly Limit: number;
}

interface CFrame {
	readonly Position: Vector3;
	readonly Rotation: CFrame;
	readonly X: number;
	readonly Y: number;
	readonly Z: number;
	readonly LookVector: Vector3;
	readonly RightVector: Vector3;
	readonly UpVector: Vector3;
	readonly XVector: Vector3;
	readonly YVector: Vector3;
	readonly ZVector: Vector3;
	Inverse(): CFrame;
	Lerp(goal: CFrame, alpha: number): CFrame;
	Orthonormalize(): CFrame;
	ToWorldSpace(_param: any[]): any[];
	ToObjectSpace(_param: any[]): any[];
	PointToWorldSpace(_param: any[]): any[];
	PointToObjectSpace(_param: any[]): any[];
	VectorToWorldSpace(_param: any[]): any[];
	VectorToObjectSpace(_param: any[]): any[];
	GetComponents(): unknown;
	ToEulerAngles(order?: Enum.RotationOrder): LuaTuple<[number, number, number]>;
	ToEulerAnglesXYZ(): LuaTuple<[number, number, number]>;
	ToEulerAnglesYXZ(): LuaTuple<[number, number, number]>;
	ToOrientation(): LuaTuple<[number, number, number]>;
	ToAxisAngle(): LuaTuple<[Vector3, number]>;
	components(): unknown;
	FuzzyEq(other: CFrame, epsilon?: number): boolean;
	AngleBetween(other: CFrame): number;
}

declare const CFrame: {
	new (): CFrame;
	new (pos: Vector3): CFrame;
	new (pos: Vector3, lookAt: Vector3): CFrame;
	new (x: number, y: number, z: number): CFrame;
	new (x: number, y: number, z: number, qX: number, qY: number, qZ: number, qW: number): CFrame;
	new (x: number, y: number, z: number, R00: number, R01: number, R02: number, R10: number, R11: number, R12: number, R20: number, R21: number, R22: number): CFrame;
	lookAt(at: Vector3, lookAt: Vector3, up?: Vector3): CFrame;
	lookAlong(at: Vector3, direction: Vector3, up?: Vector3): CFrame;
	fromRotationBetweenVectors(from: Vector3, to: Vector3): CFrame;
	fromEulerAngles(rx: number, ry: number, rz: number, order?: Enum.RotationOrder): CFrame;
	fromEulerAnglesXYZ(rx: number, ry: number, rz: number): CFrame;
	fromEulerAnglesYXZ(rx: number, ry: number, rz: number): CFrame;
	Angles(rx: number, ry: number, rz: number): CFrame;
	fromOrientation(rx: number, ry: number, rz: number): CFrame;
	fromAxisAngle(v: Vector3, r: number): CFrame;
	fromMatrix(pos: Vector3, vX: Vector3, vY: Vector3, vZ: Vector3): CFrame;
	readonly identity: CFrame;
};

interface Color3 {
	readonly R: number;
	readonly G: number;
	readonly B: number;
	Lerp(color: Color3, alpha: number): Color3;
	ToHSV(): LuaTuple<[number, number, number]>;
	ToHex(): string;
}

declare const Color3: {
	new (red?: number, green?: number, blue?: number): Color3;
	fromRGB(red?: number, green?: number, blue?: number): Color3;
	fromHSV(hue: number, saturation: number, value: number): Color3;
	fromHex(hex: string): Color3;
	/** @deprecated */
	toHSV(color: Color3): LuaTuple<[number, number, number]>;
};

interface ColorSequence {
	readonly Keypoints: any[];
}

declare const ColorSequence: {
	new (c: Color3): ColorSequence;
	new (c0: Color3, c1: Color3): ColorSequence;
	new (keypoints: any[]): ColorSequence;
};

interface ColorSequenceKeypoint {
	readonly Time: number;
	readonly Value: Color3;
}

declare const ColorSequenceKeypoint: {
	new (time: number, color: Color3): ColorSequenceKeypoint;
};

interface Content {
	readonly SourceType: Enum.ContentSourceType;
	readonly Uri: string;
	readonly Object: Instance;
	readonly Opaque: unknown;
}

declare const Content: {
	fromUri(uri: string): Content;
	fromObject(object: Instance): Content;
	readonly none: string;
};

interface DateTime {
	readonly UnixTimestamp: number;
	readonly UnixTimestampMillis: number;
	ToUniversalTime(): Record<string, any>;
	ToLocalTime(): Record<string, any>;
	ToIsoDate(): string;
	FormatUniversalTime(format: string, locale: string): string;
	FormatLocalTime(format: string, locale: string): string;
}

declare const DateTime: {
	now(): DateTime;
	fromUnixTimestamp(unixTimestamp: number): DateTime;
	fromUnixTimestampMillis(unixTimestampMillis: number): DateTime;
	fromUniversalTime(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): DateTime;
	fromLocalTime(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): DateTime;
	fromIsoDate(isoDate: string): DateTime;
};

interface DockWidgetPluginGuiInfo {
	readonly InitialEnabled: boolean;
	readonly InitialEnabledShouldOverrideRestore: boolean;
	readonly FloatingXSize: number;
	readonly FloatingYSize: number;
	readonly MinWidth: number;
	readonly MinHeight: number;
}

declare const DockWidgetPluginGuiInfo: {
	new (InitialDockState?: Enum.InitialDockState, InitialEnabled?: boolean, InitialEnabledShouldOverrideRestore?: boolean, FloatingXSize?: number, FloatingYSize?: number, MinWidth?: number, MinHeight?: number): DockWidgetPluginGuiInfo;
};

interface Faces {
	readonly Top: boolean;
	readonly Bottom: boolean;
	readonly Left: boolean;
	readonly Right: boolean;
	readonly Back: boolean;
	readonly Front: boolean;
}

declare const Faces: {
	new (_param: unknown): Faces;
};

interface FloatCurveKey {
	readonly Interpolation: Enum.KeyInterpolationMode;
	readonly Time: number;
	readonly Value: number;
	readonly RightTangent: number;
	readonly LeftTangent: number;
}

declare const FloatCurveKey: {
	new (time: number, value: number, Interpolation: Enum.KeyInterpolationMode): FloatCurveKey;
};

interface Font {
	readonly Family: string;
	readonly Weight: Enum.FontWeight;
	readonly Style: Enum.FontStyle;
	readonly Bold: boolean;
}

declare const Font: {
	new (family: string, weight?: Enum.FontWeight, style?: Enum.FontStyle): Font;
	fromEnum(font: Enum.Font): Font;
	fromName(name: string, weight?: Enum.FontWeight, style?: Enum.FontStyle): Font;
	fromId(id: number, weight?: Enum.FontWeight, style?: Enum.FontStyle): Font;
};

interface NumberRange {
	readonly Min: number;
	readonly Max: number;
}

declare const NumberRange: {
	new (value: number): NumberRange;
	new (minimum: number, maximum: number): NumberRange;
};

interface NumberSequence {
	readonly Keypoints: any[];
}

declare const NumberSequence: {
	new (n: number): NumberSequence;
	new (n0: number, n1: number): NumberSequence;
	new (Keypoints: any[]): NumberSequence;
};

interface NumberSequenceKeypoint {
	readonly Envelope: number;
	readonly Time: number;
	readonly Value: number;
}

declare const NumberSequenceKeypoint: {
	new (time: number, value: number): NumberSequenceKeypoint;
	new (time: number, value: number, envelope: number): NumberSequenceKeypoint;
};

interface OverlapParams {
	readonly FilterDescendantsInstances: any[];
	readonly FilterType: Enum.RaycastFilterType;
	readonly MaxParts: number;
	readonly CollisionGroup: string;
	readonly Tolerance: number;
	readonly RespectCanCollide: boolean;
	readonly BruteForceAllSlow: boolean;
	AddToFilter(instances: Instance | Array): void;
}

declare const OverlapParams: {
	new (): OverlapParams;
};

interface Path2DControlPoint {
	readonly Position: UDim2;
	readonly LeftTangent: UDim2;
	readonly RightTangent: UDim2;
}

declare const Path2DControlPoint: {
	new (): Path2DControlPoint;
	new (Position: UDim2): Path2DControlPoint;
	new (Position: UDim2, _param: UDim2, _param2: UDim2): Path2DControlPoint;
};

interface PathWaypoint {
	readonly Action: Enum.PathWaypointAction;
	readonly Position: Vector3;
	readonly Label: string;
}

declare const PathWaypoint: {
	new (position?: Vector3, action?: Enum.PathWaypointAction, label?: string): PathWaypoint;
};

interface PhysicalProperties {
	readonly AcousticAbsorption: number;
	readonly Density: number;
	readonly Friction: number;
	readonly Elasticity: number;
	readonly FrictionWeight: number;
	readonly ElasticityWeight: number;
}

declare const PhysicalProperties: {
	new (material: Enum.Material): PhysicalProperties;
	new (density: number, friction: number, elasticity: number): PhysicalProperties;
	new (density: number, friction: number, elasticity: number, frictionWeight: number, elasticityWeight: number): PhysicalProperties;
	new (density: number, friction: number, elasticity: number, frictionWeight: number, elasticityWeight: number, acousticAbsorption: number): PhysicalProperties;
};

interface Random {
	NextInteger(min: number, max: number): number;
	NextNumber(): number;
	NextNumber(min: number, max: number): number;
	Shuffle(tb: Record<string, any>): void;
	NextUnitVector(): Vector3;
	Clone(): Random;
}

declare const Random: {
	new (seed: number): Random;
};

interface Ray {
	readonly Unit: Ray;
	readonly Origin: Vector3;
	readonly Direction: Vector3;
	ClosestPoint(point: Vector3): Vector3;
	Distance(point: Vector3): number;
}

declare const Ray: {
	new (Origin: Vector3, Direction: Vector3): Ray;
};

interface RaycastParams {
	readonly FilterDescendantsInstances: any[];
	readonly FilterType: Enum.RaycastFilterType;
	readonly IgnoreWater: boolean;
	readonly CollisionGroup: string;
	readonly RespectCanCollide: boolean;
	readonly BruteForceAllSlow: boolean;
	AddToFilter(instances: Instance | Array): void;
}

declare const RaycastParams: {
	new (): RaycastParams;
};

interface RaycastResult {
	readonly Distance: number;
	readonly Instance: BasePart;
	readonly Material: Enum.Material;
	readonly Position: Vector3;
	readonly Normal: Vector3;
}

interface Rect {
	readonly Width: number;
	readonly Height: number;
	readonly Min: Vector2;
	readonly Max: Vector2;
}

declare const Rect: {
	new (): Rect;
	new (min: Vector2, max: Vector2): Rect;
	new (minX: number, minY: number, maxX: number, maxY: number): Rect;
};

interface Region3 {
	readonly CFrame: CFrame;
	readonly Size: Vector3;
	ExpandToGrid(resolution: number): Region3;
}

declare const Region3: {
	new (min: Vector3, max: Vector3): Region3;
};

interface Region3int16 {
	readonly Min: Vector3int16;
	readonly Max: Vector3int16;
}

declare const Region3int16: {
	new (min: Vector3int16, max: Vector3int16): Region3int16;
};

interface RotationCurveKey {
	readonly Interpolation: Enum.KeyInterpolationMode;
	readonly Time: number;
	readonly Value: CFrame;
	readonly RightTangent: number;
	readonly LeftTangent: number;
}

declare const RotationCurveKey: {
	new (time: number, cframe: CFrame, Interpolation: Enum.KeyInterpolationMode): RotationCurveKey;
};

interface Secret {
	AddPrefix(prefix: string): Secret;
	AddSuffix(suffix: string): Secret;
}

interface SharedTable {
}

declare const SharedTable: {
	new (): SharedTable;
	new (t: Record<string, any>): SharedTable;
	clear(st: SharedTable): void;
	clone(st: SharedTable, deep?: boolean): SharedTable;
	cloneAndFreeze(st: SharedTable, deep?: boolean): SharedTable;
	increment(st: SharedTable, key: string | number, delta: number): number;
	isFrozen(st: SharedTable): boolean;
	size(st: SharedTable): number;
	update(st: SharedTable, key: string | number, f: (...args: any[]) => any): void;
};

interface TweenInfo {
	readonly EasingDirection: Enum.EasingDirection;
	readonly Time: number;
	readonly DelayTime: number;
	readonly RepeatCount: number;
	readonly EasingStyle: Enum.EasingStyle;
	readonly Reverses: boolean;
}

declare const TweenInfo: {
	new (time?: number, easingStyle?: Enum.EasingStyle, easingDirection?: Enum.EasingDirection, repeatCount?: number, reverses?: boolean, delayTime?: number): TweenInfo;
};

interface UDim {
	readonly Scale: number;
	readonly Offset: number;
}

declare const UDim: {
	new (Scale: number, Offset: number): UDim;
};

interface UDim2 {
	readonly X: UDim;
	readonly Y: UDim;
	readonly Width: UDim;
	readonly Height: UDim;
	Lerp(goal: UDim2, alpha: number): UDim2;
}

declare const UDim2: {
	new (): UDim2;
	new (xScale?: number, xOffset?: number, yScale?: number, yOffset?: number): UDim2;
	new (x: UDim, y: UDim): UDim2;
	fromScale(xScale?: number, yScale?: number): UDim2;
	fromOffset(xOffset?: number, yOffset?: number): UDim2;
};

interface ValueCurveKey {
	readonly Interpolation: Enum.KeyInterpolationMode;
	readonly Time: number;
	readonly Value: any;
	readonly RightTangent: number;
	readonly LeftTangent: number;
}

declare const ValueCurveKey: {
	new (time: number, value: any, Interpolation: Enum.KeyInterpolationMode): ValueCurveKey;
};

interface Vector2 {
	readonly X: number;
	readonly Y: number;
	readonly Magnitude: number;
	readonly Unit: Vector2;
	Cross(other: Vector2): number;
	Abs(): Vector2;
	Ceil(): Vector2;
	Floor(): Vector2;
	Sign(): Vector2;
	Angle(other: Vector2, isSigned?: boolean): number;
	Dot(v: Vector2): number;
	Lerp(v: Vector2, alpha: number): Vector2;
	Max(_param: unknown): Vector2;
	Min(_param: unknown): Vector2;
	FuzzyEq(other: Vector2, epsilon?: number): boolean;
}

declare const Vector2: {
	new (x: number, y: number): Vector2;
	readonly zero: Vector2;
	readonly one: Vector2;
	readonly xAxis: Vector2;
	readonly yAxis: Vector2;
};

interface Vector2int16 {
	readonly X: number;
	readonly Y: number;
}

declare const Vector2int16: {
	new (x: number, y: number): Vector2int16;
};

interface Vector3 {
	readonly X: number;
	readonly Y: number;
	readonly Z: number;
	readonly Magnitude: number;
	readonly Unit: Vector3;
	Abs(): Vector3;
	Ceil(): Vector3;
	Floor(): Vector3;
	Sign(): Vector3;
	Cross(other: Vector3): Vector3;
	Angle(other: Vector3, axis?: Vector3): number;
	Dot(other: Vector3): number;
	FuzzyEq(other: Vector3, epsilon?: number): boolean;
	Lerp(goal: Vector3, alpha: number): Vector3;
	Max(vector: Vector3): Vector3;
	Min(vector: Vector3): Vector3;
}

declare const Vector3: {
	new (x?: number, y?: number, z?: number): Vector3;
	FromNormalId(normal: Enum.NormalId): Vector3;
	FromAxis(axis: Enum.Axis): Vector3;
	readonly zero: Vector3;
	readonly one: Vector3;
	readonly xAxis: Vector3;
	readonly yAxis: Vector3;
	readonly zAxis: Vector3;
};

interface Vector3int16 {
	readonly X: number;
	readonly Y: number;
	readonly Z: number;
}

declare const Vector3int16: {
	new (x: number, y: number, z: number): Vector3int16;
};

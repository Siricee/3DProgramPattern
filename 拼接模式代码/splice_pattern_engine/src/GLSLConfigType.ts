export enum attributeBuffer {
    Vertex = 0,
    Normal = 1,
    TexCoord = 2,
    Index = 3,
    Instance_model_matrix = 4
}

export type attributeName = string

export type attributeType = "vec2" | "vec3" | "vec4";

export type uniformName = string;

export type uniformField =
    "mMatrix"
    | "vMatrix"
    | "pMatrix"
    | "color"
    | "map";

export type uniformType = "mat4" | "float3" | "float" | "sampler2D";

export type uniformFrom = "basicMaterial" | "model" | "camera";

export type glslNameForBuildGLSLChunk = "defineMaxDirectionLightCount"
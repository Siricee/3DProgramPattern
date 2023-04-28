import { shaderLibs, shaderMapDataName, shaderMapDataValue, condition, shaders, attributeName, attributeBuffer, attributeType, uniformName, uniformField, uniformType, uniformFrom, shaderName, glslName } from "./type/GLSLConfigType.gen";
import { glslChunk } from "../../chunk_converter/src/ChunkType.gen"

export function parseConfig(
    shadersJson: JSON, shaderLibsJson: JSON
): [shaders, shaderLibs]

type isNameValidForStaticBranch = (name: string) => boolean

type getShaderChunkFromStaticBranch = (name: shaderMapDataName, value: shaderMapDataValue) => string

type isPassForDynamicBranch = (condition: condition) => boolean

type addAttributeSendConfig<SendConfig> = (sendDataArr: Array<SendConfig>, [name, attributeBuffer, type]: [attributeName, attributeBuffer, attributeType]) => Array<SendConfig>

type addUniformSendConfig<SendConfig> = (sendDataArr: Array<SendConfig>, [name, field, type, from]: [uniformName, uniformField, uniformType, uniformFrom]) => Array<SendConfig>

type generateAttributeType = (attributeType: attributeType) => string

type generateUniformType = (uniformType: uniformType) => string

type buildGLSLChunk = (glslName: glslName) => glslChunk

type vsGLSL = string

type fsGLSL = string

export function buildGLSL(
    [
        [[isNameValidForStaticBranch, getShaderChunkFromStaticBranch],
            isPassForDynamicBranch],
        [
            generateAttributeType,
            generateUniformType,
            buildGLSLChunkInVS,
            buildGLSLChunkInFS
        ]
    ]: [
            [
                [isNameValidForStaticBranch, getShaderChunkFromStaticBranch],
                isPassForDynamicBranch],
            [
                generateAttributeType,
                generateUniformType,
                buildGLSLChunk,
                buildGLSLChunk
            ]
        ],
    shaders: shaders,
    shaderLibs: shaderLibs,
    chunk: Record<glslName, glslChunk>,
    shaderName: shaderName,
    precision: "highp" | "mediump" | "lowp"
): [
        shaderLibs,
        [vsGLSL, fsGLSL]
    ]


export type sendConfig<AttributeSendConfig, UniformSendConfig> = [
    Array<AttributeSendConfig>,
    Array<UniformSendConfig>
]

export function getSendConfig<AttributeSendConfig, UniformSendConfig>(
    [
        addAttributeSendConfig,
        addUniformSendConfig
    ]: [
            addAttributeSendConfig<AttributeSendConfig>,
            addUniformSendConfig<UniformSendConfig>
        ],
    shaderLib: shaderLibs
): sendConfig<AttributeSendConfig, UniformSendConfig>
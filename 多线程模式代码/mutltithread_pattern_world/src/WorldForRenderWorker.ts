import { state } from "./WorldStateType"
import { createState as createPipelineManagerState, init as initPipelineManager } from "pipeline_manager"
import { runPipeline, setPipelineManagerState, unsafeGetPipelineManagerState } from "./World"
import { createState as createTransformManagerState } from "multithread_pattern_ecs/src/manager/transform_component/ManagetForWorker"
import { createState as createBasicMateiralManagerState } from "multithread_pattern_ecs/src/manager/basicMaterial_component/ManagerForWorker"

export let createStateForWorker = (): state => {
    return {
        ecsData:
        {
            gameObjectManagerState: null,
            transformComponentManagerState: null,
            basicMaterialComponentManagerState: null
        },
        pipelineState: createPipelineManagerState(),
    }
}

export let createDataOrientedComponentStates = (
    state: state,
    transformComponentCount, basicMaterialComponentCount, transformComponentBuffer, basicMaterialComponentBuffer
): state => {
    return {
        ...state,
        ecsData:
        {
            ...state.ecsData,
            transformComponentManagerState: createTransformManagerState(transformComponentCount, transformComponentBuffer),
            basicMaterialComponentManagerState: createBasicMateiralManagerState(basicMaterialComponentCount, basicMaterialComponentBuffer)
        }
    }
}

export let init = (state: state): Promise<state> => {
    state = initPipelineManager(state, [
        unsafeGetPipelineManagerState, setPipelineManagerState
    ])

    return runPipeline(state, "init")
}

export let render = (state: state): Promise<state> => {
    return runPipeline(state, "render")
}
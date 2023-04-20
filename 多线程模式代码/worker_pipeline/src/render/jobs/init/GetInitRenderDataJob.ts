import { state as worldState } from "mutltithread_pattern_world/src/WorldStateType"
import { service as mostService } from "most/src/MostService"
import { getState, setState } from "../Utils"
import { exec as execType } from "pipeline_manager/src/type/PipelineType"
import { states } from "worker_pipeline_state_type/src/render/StateType"
import { createGetMainWorkerDataStream } from "../../../CreateWorkerDataStreamUtils"

export let exec: execType<worldState> = (worldState, { getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<worldState, states>(worldState)

    let offscreenCanvas: OffscreenCanvas
    let renderDataBuffer: SharedArrayBuffer
    let transformComponentCount: number, basicMaterialComponentCount: number
    let transformComponentBuffer: SharedArrayBuffer, basicMaterialComponentBuffer: SharedArrayBuffer

    return createGetMainWorkerDataStream(
        mostService,
        (event: MessageEvent) => {
            offscreenCanvas = event.data.canvas
            renderDataBuffer = event.data.renderDataBuffer
            transformComponentCount = event.data.transformComponentCount
            basicMaterialComponentCount = event.data.basicMaterialComponentCount
            transformComponentBuffer = event.data.transformComponentBuffer
            basicMaterialComponentBuffer = event.data.basicMaterialComponentBuffer
        },
        "SEND_INIT_RENDER_DATA",
        self as any as Worker
    ).map(() => {
        console.log("get init render data job exec on render worker")

        return setStatesFunc<worldState, states>(
            worldState,
            setState(states, {
                ...getState(states),
                canvas: offscreenCanvas,
                renderDataBuffer: renderDataBuffer,
                transformComponentCount: transformComponentCount,
                basicMaterialComponentCount: basicMaterialComponentCount,
                transformComponentBuffer: transformComponentBuffer,
                basicMaterialComponentBuffer: basicMaterialComponentBuffer
            })
        )
    })
}
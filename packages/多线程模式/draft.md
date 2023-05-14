开最多8个worker线程:
主线程、渲染线程、碰撞线程、物理线程
加载模型线程(for load big model)？

SharedArrayBuffer

refer to:
https://50linesofco.de/post/2017-02-06-javascript-in-parallel-web-workers-transferables-and-sharedarraybuffer


story_improve:
结合管道模式



use pipeline pattern from begin!

given real code can run:
Typescript
WebGL


performance test:
fps
timeline


Transform+BasicMaterial Component


remove Camera related, Geometry Components


1.update + render in no worker


render 3000 triangles


ECS:
no system, use pipeline instead


2.move render to render worker


    TODO explain why use render data buffer:
    share gameObjects,components from main worker to render worker
        share buffer to render worker, then create typeArray in render worker instead of send typeArray!

    otherwise, should post them which cost more time


    edit ECS: add ManagerForWorker
    add createState


    add WorldForWorker



need sync

is_set_state


explain:
defer one frame in render worker
    render last frame


explain:
RenderWorkerMain->_frame:
    no loop, exec one frame when get  "SEND_BEGIN_LOOP" from main worker->SendBeginLoopJob instead!


explain:
open Cross Origin 
    by webpack.config.devserver:
        headers: {
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Opener-Policy": "same-origin"
        },

result:
give two parallel timeline:
    parallel: 
        render worker begin render before main worker exec UpdateTransformJob->batchUpdate
can very correction by log


more disscuss:

defer init material?
    shader index

defer dispose?


handle texture:
send image by transferFromImageBitmap


<!-- 4.open more workers by pipeline + json when loop -->
<!-- e.g. collide/physic worker -->

3.move ComputePhysicsJob to physics worker

timeline:
can very correction by log



explain:
defer one frame in physics worker:
    now compute job exec after update transform job
    compute last frame


TODO explain why use physics data buffer:
share buffer to physics worker, then create typeArray in physics worker


explain:
because physics worker not need data from main worker, so no need Send Physics Data in main worker and Get Physics Data in physics worker



performance test:
before
after






# 引入故事，提出问题

- 引入故事
    - 描述故事

    - 给出代码

    - 给出UML

- 提出问题



# 主问题：给出直接的解决方案

- 请给出直接的解决方案?
    - 概述解决方案
    - 给出UML
    - 给出代码
    - 结合UML图，描述如何具体地解决问题


# 主问题：分析存在的问题

- 请分析存在的问题?
- 提出改进方向？


# 主问题：给出可能的改进方案

- 请给出可能的改进方案?
    - 概述解决方案

    - 给出UML ？
    - 给出代码
    - 结合UML图，描述如何具体地解决问题


# 主问题：分析存在的问题

- 请分析存在的问题?
- 提出改进方向？



# 主问题：给出使用模式的改进方案

- 请给出使用模式的改进方案?
    - 概述解决方案
    - 遵循哪些设计原则
    - 给出UML
    - 给出代码
    - 结合UML图，描述如何具体地解决问题

# 主问题：提出模式


- 设计意图？
- 定义
    - 一句话定义
    - 描述定义？
    - 通用UML
    - 分析角色
    - 角色之间的关系
    - 角色的抽象代码
log

    - 遵循的设计原则在UML中的体现


- 应用
    - 优点？
    - 缺点？
    - 使用场景
    - 描述场景？
    - 实现该场景需要修改模式的哪些角色？
    - 使用模式有什么好处？
    - 注意事项？

- 扩展
    - 如何扩展、推广、发散？

加载模型线程:
    ecs buffer->set copied gameObject, components data in load worker?

- 结合其它模式
    - 结合哪些模式？
结合管道模式



结合ECS模式



结合积木模式

    - 使用场景是什么？
    - UML如何变化？
    - 代码如何变化？


# 主问题：最佳实践

- 结合具体项目实践经验，如何应用模式来改进项目？
    - 哪些场景不需要使用模式
    - 哪些场景需要使用模式？
    - 给出具体的实践案例


# 主问题：推荐更多资料

- 推荐更多资料？

[JavaScript in parallel](https://50linesofco.de/post/2017-02-06-javascript-in-parallel-web-workers-transferables-and-sharedarraybuffer)
[WebGL Off the Main Thread](https://hacks.mozilla.org/2016/01/webgl-off-the-main-thread/)
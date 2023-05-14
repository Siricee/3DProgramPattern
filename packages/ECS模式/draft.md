create DO
ArrayBuffer

GameObject * Components



System
no state


only logic


    batch do:
    update, dispose




GameObject:id
Component:index


Component provide:
state
create state
get/set functions
batch logic of the component:
    batch dispose
    update


System provide:
<!-- batch logic
    update transforms -->

<!-- dispose component
    batch dispose components -->

    compose multiple components




<!-- Hero = GameObject + PositionComponent + VelocityComponent + FlyComponent + InstanceComponent -->


TODO remove dispose


1.a big module:Hero

<!-- HeroWorld -->
<!-- LogicWorld
    update all
RenderWorld
    drawOneByOne
    drawInstances -->

<!-- Abstract World:
<!-- update -->
tick -->

World



NormalHero
update
    update position
move

draw instance


SuperHero
update
    update position
move
fly

draw one by one


2.component pattern

Hero = GameObject + PositionComponent + VelocityComponent + FlyComponent + InstanceComponent

id




FlyComponent
<!-- -flySpeed -->
maxVelocity

fly
    need get and update other two components
dispose


Abstract World:
<!-- update -->
tick


Abstract Component:
id
<!-- update -->
dispose
<!-- render -->



forEach




NormalHero = no FlyComponent
SuperHero = with FlyComponent


3. ECS pattern

Entity
id

Component
index

GameObject Manager
batch operate GameObject

Component Manager
has batch data of the kind of Component

batch operate single kind of Component


System
no data
batch operate multiple kinds of Component



<!-- Hero = GameObject + PositionComponent + VelocityComponent + FlyComponent -->

GameObject
id






GameObjectManager
all component maps

batch operate all gameObjects, components


Abstract Component
index


ComponentManager
<!-- state -->
arrayBuffer
gameObjectMap

create state
get/set value

batch logic of the component:
    batch dispose
    <!-- update -->

<!-- batchDispose -->




System->Manager


MoveSystem:P,V

FlySystem:P,V,W


RenderXxxSystem: gameObjects

RenderOneByOneSystem:all without InstanceComponent
RenderInstancesSystem:all



# 引入故事，提出问题

- 引入故事
    - 描述故事
    - 给出代码

    - 给出UML

- 提出问题



# 主问题：给出直接的解决方案

- 请给出直接的解决方案?
    - 概述解决方案
    Add SuperHero
    - 给出UML
    - 给出代码
    - 结合UML图，描述如何具体地解决问题


# 主问题：分析存在的问题

- 请分析存在的问题?
- 提出改进方向？

duplicate code:
update
move


# 主问题：给出可能的改进方案

- 请给出可能的改进方案?
    - 概述解决方案
    组件化


    - 给出UML ？
    - 给出代码
    - 结合UML图，描述如何具体地解决问题


# 主问题：分析存在的问题

- 请分析存在的问题?
数据分散，性能不行

<!-- 有空的update函数 -->

如果一个函数需要同时更新两个组件的数据，那么该函数不知道是应该放在哪个函数中？

- 提出改进方向？


# 主问题：给出使用模式的改进方案

- 请给出使用模式的改进方案?
    - 概述解决方案

    Data Oriented


TODO 讨论：
where to put add/getComponent for gameObject logic?
ComponentManager? yes
GameObjectManager?


    - 遵循哪些设计原则
    - 给出UML
    VelocityComponentManager, FlyComponentManager与PositionComponentManager类似（但是没有batchUpdate函数），故省略它们的数据和函数


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



- 结合其它模式
    - 结合哪些模式？
结合管道模式
    System use Pipeline
        each job is a system


结合积木模式

    - 使用场景是什么？
    - UML如何变化？
    - 代码如何变化？


# 主问题：最佳实践

- 结合具体项目实践经验，如何应用模式来改进项目？
    - 哪些场景不需要使用模式
    - 哪些场景需要使用模式？
    - 给出具体的实践案例


<!-- reallocate gameObject Maps
reallocate geometry vertices -->


# 主问题：推荐更多资料

- 推荐更多资料？


组件化：

[组件模式](https://gpp.tkchu.me/component.html)
[Component based game engine design](https://stackoverflow.com/questions/1901251/component-based-game-engine-design/3495647#3495647)
[Understanding Component-Entity-Systems](https://www.gamedev.net/tutorials/_/technical/game-programming/understanding-component-entity-systems-r3013/)
[组件化开发在游戏开发当中的思考和汇总](https://www.cnblogs.com/flashbird/p/4420426.html)

Data Oriented:

[Building a Data-Oriented Entity System (part 1)](http://bitsquid.blogspot.com/2014/08/building-data-oriented-entity-system.html)
[数据局部性](https://gpp.tkchu.me/data-locality.html)
[Adventures in data-oriented design – Part 1: Mesh data](https://blog.molecular-matters.com/2011/11/03/adventures-in-data-oriented-design-part-1-mesh-data-3/)
[Data-Oriented Design](https://www.dataorienteddesign.com/dodmain/dodmain.html)
[Developing a Data-Oriented Game Engine (Part 1)](http://danielsefton.com/2016/05/developing-a-data-oriented-game-engine-part-1/)


ECS:

[《《守望先锋》架构设计和网络同步》](https://www.lfzxb.top/ow-gdc-gameplay-architecture-and-netcode/)

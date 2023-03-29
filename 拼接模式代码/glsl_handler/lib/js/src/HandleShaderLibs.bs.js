'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_array = require("rescript/lib/js/js_array.js");
var Log$Commonlib = require("commonlib/lib/js/src/log/Log.bs.js");
var ArraySt$Commonlib = require("commonlib/lib/js/src/structure/ArraySt.bs.js");
var Exception$Commonlib = require("commonlib/lib/js/src/structure/Exception.bs.js");
var JsonUtils$Glsl_handler = require("./utils/JsonUtils.bs.js");
var ArrayUtils$Glsl_handler = require("./utils/ArrayUtils.bs.js");

function _findFirstShaderLibExn(shaderLibName, shaderLibs) {
  return ArrayUtils$Glsl_handler.findFirstExn(shaderLibs, (function (item) {
                return item.name === shaderLibName;
              }));
}

function _getShaderLibsByGroup(resultShaderLibs, groups, name, shaderLibs) {
  var __x = ArrayUtils$Glsl_handler.findFirstExn(groups, (function (item) {
          return item.name === name;
        })).value;
  return Js_array.concat(Js_array.map((function (name) {
                    return _findFirstShaderLibExn(name, shaderLibs);
                  }), __x), resultShaderLibs);
}

function _getShaderLibsByStaticBranch(resultShaderLibs, param, name, param$1) {
  var staticBranchs = param$1[0];
  if (Curry._1(param[0], name)) {
    var match = ArrayUtils$Glsl_handler.findFirstExn(staticBranchs, (function (item) {
            return item.name === name;
          }));
    return ArraySt$Commonlib.push(resultShaderLibs, _findFirstShaderLibExn(Curry._2(param[1], name, match.value), param$1[1]));
  }
  Log$Commonlib.debug((function (param) {
          return Log$Commonlib.buildDebugJsonMessage("staticBranchs", staticBranchs, param);
        }), true);
  return Exception$Commonlib.throwErr(Exception$Commonlib.buildErr(Log$Commonlib.buildFatalMessage("_getShaderLibsByStaticBranch", "unknown name:" + name, "", "", "")));
}

function _getShaderLibsByBynamicBranch(resultShaderLibs, isPass, name, param) {
  var dynamicBranchData = ArrayUtils$Glsl_handler.findFirstExn(param[0], (function (item) {
          return item.name === name;
        }));
  var dynamicBranchShaderLibNameOption = Curry._1(isPass, dynamicBranchData.condition) ? dynamicBranchData.pass : dynamicBranchData.fail;
  if (JsonUtils$Glsl_handler.isJsonSerializedValueNone(dynamicBranchShaderLibNameOption)) {
    return resultShaderLibs;
  } else {
    return ArraySt$Commonlib.push(resultShaderLibs, _findFirstShaderLibExn(JsonUtils$Glsl_handler.getJsonSerializedValueExn(dynamicBranchShaderLibNameOption), param[1]));
  }
}

function _getShaderLibsByType(resultShaderLibs, param, param$1, param$2) {
  var shaderLibs = param$2[0];
  var name = param$1[2];
  var type_ = param$1[0];
  var match = param[0];
  switch (type_) {
    case "dynamic_branch" :
        return _getShaderLibsByBynamicBranch(resultShaderLibs, param[1], name, [
                    param$2[2],
                    shaderLibs
                  ]);
    case "group" :
        return _getShaderLibsByGroup(resultShaderLibs, param$1[1], name, shaderLibs);
    case "static_branch" :
        return _getShaderLibsByStaticBranch(resultShaderLibs, [
                    match[0],
                    match[1]
                  ], name, [
                    param$2[1],
                    shaderLibs
                  ]);
    default:
      Log$Commonlib.debug((function (param) {
              return Log$Commonlib.buildDebugJsonMessage("shaderLibs", shaderLibs, param);
            }), true);
      return Exception$Commonlib.throwErr(Exception$Commonlib.buildErr(Log$Commonlib.buildFatalMessage("_getShaderLibsByType", "unknown type_:" + type_, "", "", "")));
  }
}

function getShaderLibsOfShader(param, shaders, shaderName, param$1, shaderLibs) {
  var groups = param$1.groups;
  var dynamicBranchs = param$1.dynamicBranchs;
  var staticBranchs = param$1.staticBranchs;
  var isPassForDynamicBranch = param[1];
  var match = param[0];
  var getShaderLibFromStaticBranch = match[1];
  var isNameValidForStaticBranch = match[0];
  var shader = ArrayUtils$Glsl_handler.findFirstExn(shaders, (function (param) {
          return param.name === shaderName;
        }));
  return ArraySt$Commonlib.reduceOneParam(shader.shaderLibs, (function (resultShaderLibs, param) {
                var name = param.name;
                var type_ = param.type_;
                if (JsonUtils$Glsl_handler.isJsonSerializedValueNone(type_)) {
                  return ArraySt$Commonlib.push(resultShaderLibs, _findFirstShaderLibExn(name, shaderLibs));
                } else {
                  return _getShaderLibsByType(resultShaderLibs, [
                              [
                                isNameValidForStaticBranch,
                                getShaderLibFromStaticBranch
                              ],
                              isPassForDynamicBranch
                            ], [
                              JsonUtils$Glsl_handler.getJsonSerializedValueExn(type_),
                              groups,
                              name
                            ], [
                              shaderLibs,
                              staticBranchs,
                              dynamicBranchs
                            ]);
                }
              }), []);
}

exports._findFirstShaderLibExn = _findFirstShaderLibExn;
exports._getShaderLibsByGroup = _getShaderLibsByGroup;
exports._getShaderLibsByStaticBranch = _getShaderLibsByStaticBranch;
exports._getShaderLibsByBynamicBranch = _getShaderLibsByBynamicBranch;
exports._getShaderLibsByType = _getShaderLibsByType;
exports.getShaderLibsOfShader = getShaderLibsOfShader;
/* No side effect */

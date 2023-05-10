

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Belt_Option from "../../../../../../node_modules/rescript/lib/es6/belt_Option.js";
import * as Caml_option from "../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Result$Commonlib from "./Result.bs.js";
import * as Js_null_undefined from "../../../../../../node_modules/rescript/lib/es6/js_null_undefined.js";

function unsafeGet(prim) {
  return prim;
}

var _getExn = ((nullableData) => {
  if (nullableData !== undefined) {
    return nullableData;
  }

  throw new Error("Not_found")
});

var getExn = _getExn;

function buildFailResult(param) {
  return Result$Commonlib.failWith("data not exist in option data");
}

function get(optionData) {
  if (optionData !== undefined) {
    return Result$Commonlib.succeed(Caml_option.valFromOption(optionData));
  } else {
    return Result$Commonlib.failWith("data not exist in option data");
  }
}

function fromNullable(optionData) {
  if (optionData == null) {
    return ;
  } else {
    return Caml_option.some(optionData);
  }
}

var toNullable = Js_null_undefined.from_opt;

function forEachResult(optionData, func) {
  if (optionData !== undefined) {
    return Curry._1(func, Caml_option.valFromOption(optionData));
  } else {
    return Result$Commonlib.succeed(undefined);
  }
}

function sequenceResultM(optionData) {
  if (optionData !== undefined) {
    return Result$Commonlib.mapSuccess(optionData, (function (value) {
                  return Caml_option.some(value);
                }));
  } else {
    return Result$Commonlib.succeed(undefined);
  }
}

function open_(optionOptionData) {
  if (optionOptionData !== undefined) {
    return Caml_option.valFromOption(optionOptionData);
  }
  
}

var getWithDefault = Belt_Option.getWithDefault;

var isSome = Belt_Option.isSome;

var map = Belt_Option.map;

var bind = Belt_Option.flatMap;

export {
  unsafeGet ,
  _getExn ,
  getExn ,
  buildFailResult ,
  get ,
  getWithDefault ,
  isSome ,
  map ,
  bind ,
  fromNullable ,
  toNullable ,
  forEachResult ,
  sequenceResultM ,
  open_ ,
}
/* No side effect */

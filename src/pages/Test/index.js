import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
/* 
    1.AutoSizer
    2.localeCompare  
    3.findIndex find some includes filter every map forEach  
     for...in... for...of...
    4. Object.keys() Object.values()
*/


//  function Index(){

//  }

export default class Index extends Component {
    componentDidMount() {
        /* 
            演示localeCompare的用法
        */
        // 返回 -1 小於
        console.log("'a'.localeCompare('c'):" + 'a'.localeCompare('c'));

        // 返回1  大於
        console.log("'check'.localeCompare('against'):" + 'check'.localeCompare('against'));
        // 等於 返回 0 
        console.log("'a'.localeCompare('a'):" + 'a'.localeCompare('a'))

        /* findIndex 的例子  
        findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。
        */
        const array1 = [5, 12, 8, 130, 44];

        const isLargeNumber = (element) => element > 13;
        const isLargeestNumber = (element) => element > 1000;

        console.log("滿足findIndex條件：" + array1.findIndex(isLargeNumber));
        console.log("滿足findIndex條件：" + array1.findIndex(isLargeestNumber));
        // expected output: 3
        /* 
          find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
        */
        const array2 = [{ num: 10, name: "thomas" }, { num: 20, name: "lily" }];

        const found = array2.find(element => element.num > 15);

        console.log("find object.num more than 20:" + found);
        // expected output: 12
        /* 
        some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
        */
        function isBiggerThan10(element, index, array) {
            return element > 10;
        }
        console.log("some method:");
        console.log([2, 5, 8, 1, 4].some(isBiggerThan10));  // false
        console.log([12, 5, 8, 1, 4].some(isBiggerThan10)); // true
        /* 
          includes() 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。
        */
        var str = 'To be, or not to be, that is the question.';
        console.log("includes:");
        console.log(str.includes('To be'));       // true
        console.log(str.includes('question'));    // true
        console.log(str.includes('nonexistent')); // false
        /* 
        filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
        */
        const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

        const result = words.filter(word => word.length > 6);

        console.log("filter method:" + result);
        // expected output: Array ["exuberant", "destruction", "present"]
        /* 
            every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）。
            every() 方法使用指定函数检测数组中的所有元素：
            如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
            如果所有元素都满足条件，则返回 true。
            注意： every() 不会对空数组进行检测。

            注意： every() 不会改变原始数组。

        */
        var ages = [32, 33, 16, 40];

        function checkAdult(age) {
            return age >= 18;
        }
        console.log("every:" + ages.every(checkAdult));
        /* 
        for...in语句以任意顺序遍历一个对象的除Symbol以外的可枚举属性。
        
        */
        var triangle = { a: 1, b: 2, c: 3 };

        function ColoredTriangle() {
            this.color = 'red';
        }

        ColoredTriangle.prototype = triangle;

        var obj = new ColoredTriangle();

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                console.log(`obj.${prop} = ${obj[prop]}`);
            }
        }
        for (var prop in triangle) {
            console.log(prop);
        }
        /* 
            for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
        */
        const array10 = ['a', 'b', 'c'];
        for (const element of array10) {
            console.log(element);
        }
        /* 
            Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。
        */
        // simple array
        var arr = ['a', 'b', 'c'];
        console.log(Object.keys(arr)); // console: ['0', '1', '2']

        // array like object
        var obj = { 0: 'a', 1: 'b', 2: 'c' };
        console.log(Object.keys(obj)); // console: ['0', '1', '2']

        // array like object with random key ordering
        var anObj = { 100: 'a', 2: 'b', 7: 'c' };
        console.log(Object.keys(anObj)); // console: ['2', '7', '100']

        // getFoo is a property which isn't enumerable
        var myObj = Object.create({}, {
            getFoo: {
                value: function () { return this.foo; }
            }
        });
        myObj.foo = 1;
        console.log(Object.keys(myObj)); // console: ['foo']


        /* Object.values()返回一个数组，其元素是在对象上找到的可枚举属性值。属性的顺序与通过手动循环对象的属性值所给出的顺序相同。 */
        // var obj = { foo: 'bar', baz: 42 };
        // console.log(Object.values(obj)); // ['bar', 42]

        // // array like object
        // var obj = { 0: 'a', 1: 'b', 2: 'c' };
        // console.log(Object.values(obj)); // ['a', 'b', 'c']

        // // array like object with random key ordering
        // // when we use numeric keys, the value returned in a numerical order according to the keys
        // var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
        // console.log(Object.values(an_obj)); // ['b', 'c', 'a']

        // // getFoo is property which isn't enumerable
        // var my_obj = Object.create({}, { getFoo: { value: function () { return this.foo; } } });
        // my_obj.foo = 'bar';
        // console.log(Object.values(my_obj)); // ['bar']

        // // non-object argument will be coerced to an object
        // console.log(Object.values('foo')); // ['f', 'o', 'o']
    }
    render() {
        return React.createElement("div", {}, "我是文本");
        // return <div>我是文本</div>
    }
}

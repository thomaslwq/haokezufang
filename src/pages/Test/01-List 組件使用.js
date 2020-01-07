import React, { Component } from 'react';
import { List } from 'react-virtualized';
/* 
    1.AutoSizer
    2.localeCompare  
    3.findIndex find some includes filter every map forEach  
     for...in... for...of...
    4. Object.keys() Object.values()
*/



// List data as an array of strings
const list = [
    'Brian Vaughn',
    "阿毛阿狗"
];
function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
}) {
    return (
        <div key={key} style={style}>
            {key}:{list[index]}
        </div>
    );
}

export default class index extends Component {
    render() {
        return (
            <div>
                <List
                    width={300}
                    height={300}
                    rowCount={list.length}
                    rowHeight={20}
                    rowRenderer={rowRenderer}
                />
            </div>
        )
    }
}

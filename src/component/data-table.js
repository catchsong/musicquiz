import React, { Component } from 'react';
class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.index}
                </td>
                <td>
                    {this.props.obj.ans}
                </td>
                <td>
                    {this.props.obj.hint}
                </td>
            </tr>
        );
    }
}
export default DataTable;
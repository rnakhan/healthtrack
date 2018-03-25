import React, { Component } from 'react';
import TextField from 'material-ui/TextField'

export default class NumberInput extends Component {

    state = { errorText: null };

    render() {
        const { style, value, label } = this.props;
        return (
            <TextField
                style={style}
                value={value}
                onChange={this.update}
                floatingLabelText={label}
                errorText={this.state.errorText}
                type='number'
            />
        );
    }

    // Invoke only when we have a number or an empty space (caused by back button)
    update = (e) => {
        if (!isNaN(e.target.value) || e.target.value === '') {
            this.props.updateFunction(e);
            if (this.state.errorText) this.setState({ errorText: null});
        }
        else {
            this.setState({ errorText: 'Only numbers are allowed'});
        }
    }
}
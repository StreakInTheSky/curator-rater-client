import React from 'react';

import './input.css'


export default class Input extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }

    render() {
        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <div className="form-error">{this.props.meta.error}</div>;
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = (
                <div className="form-warning">{this.props.meta.warning}</div>
            );
        }

        return (
            <div className="form-input">
                {this.props.label ? <label className={this.props.labelClass} htmlFor={this.props.input.name}>
                    {this.props.label}
                </label> : null}
                <input
                    {...this.props.input}
                    className={this.props.className}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                    value={this.props.input.value}
                />
                {error}
                {warning}
          </div>
        );
    }
}

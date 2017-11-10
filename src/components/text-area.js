import React from 'react';

export default class TextArea extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.textarea.focus();
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
                <label htmlFor={this.props.input.name}>
                    {this.props.label}
                </label>
                <textarea
                    {...this.props.input}
                    id={this.props.input.name}
                    ref={textarea => (this.textarea = textarea)}
                    value={this.props.input.value}
                />
                {error}
                {warning}
            </div>
        );
    }
}

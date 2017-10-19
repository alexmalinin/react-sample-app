import React, {Component} from 'react';
import RichTextEditor from 'react-rte';
import RenderTextArea from './RenderTextArea';
import { Field } from 'redux-form';
import { Button } from 'semantic-ui-react';
import StyledUploader from '../../../styleComponents/forms/StyledUploader';

class RenderMarkdown extends Component {

    state = {
        value: RichTextEditor.createEmptyValue()
    };

    render() {
        let { name } = this.props;
        window.value = this.state.value.toString('html');

        const toolbarConfig = {
            // Optionally specify the groups to display (displayed in the order listed).

            display: ['TEXT','INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS',],

            INLINE_STYLE_BUTTONS: [
                {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
                {label: 'Italic', style: 'ITALIC'},
            ],
            BLOCK_TYPE_BUTTONS: [
                {label: 'UL', style: 'unordered-list-item'},
                {label: 'OL', style: 'ordered-list-item'}
            ]
        };

        return (
            <div>
                <div ref={this.EditorTool}>
                    <RichTextEditor
                        value={this.state.value}
                        onChange={this.onChange}
                        toolbarConfig={toolbarConfig}
                    />
                </div>
                    {/*<div ref={this.Trigger}>*/}
                        {/*<Field name={name} component={RenderTextArea} text={this.state.value.toString('html')}/>*/}
                    {/*</div>*/}
            </div>
        )
    }

    // Trigger = ref => {
    //     this.TextAreaClick = ref;
    // };

    EditorTool = ref => {
        if (!ref) return
        let { title } = this.props;
        let text = document.createElement("div");
        let buttons = ref.querySelectorAll('div')[2];
        text.className = 'EditorTitle';
        text.innerText = title;
        let Toolbar = buttons.parentNode;
        Toolbar.insertBefore(text, buttons);
    };

    onChange = (value) => {
        // console.log();
        // window.text = this.TextAreaClick;
        // this.TextAreaClick.querySelectorAll('textarea')[0].focus();
        this.setState({value});
    };
}

export default RenderMarkdown;
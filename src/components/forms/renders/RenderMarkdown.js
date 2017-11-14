import React, {Component} from 'react';
import RichTextEditor from 'react-rte';
import { StyledMarkdown } from '../../../styleComponents/StyledMarkdown';

class RenderMarkdown extends Component {

    state = {
        value: RichTextEditor.createEmptyValue()
    };

    render() {

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
            <StyledMarkdown>
                <div ref={this.EditorTool}>
                    <RichTextEditor
                        value={this.state.value}
                        onChange={this.onChange}
                        toolbarConfig={toolbarConfig}
                    />
                </div>
            </StyledMarkdown>
        )
    }

    EditorTool = ref => {
        if (!ref) return;
        let { title } = this.props;
        let text = document.createElement('div');
        let buttons = ref.querySelectorAll('div')[2];
        let main = ref.querySelectorAll('div')[0];
        let toolbar = ref.querySelectorAll('div')[1];
        main.classList.add('RichTextEditor');
        toolbar.classList.add('EditorToolbar');
        toolbar.childNodes[0].classList.add('button-group');
        toolbar.childNodes[1].classList.add('button-group');
        text.className = 'EditorTitle';
        text.innerText = title;
        let Toolbar = buttons.parentNode;
        Toolbar.insertBefore(text, buttons);
    };

    onChange = (value) => {
        this.setState({value});
    };
}

export default RenderMarkdown;

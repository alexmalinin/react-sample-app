import React, { Component } from 'react';
import { connect } from 'react-redux';
import StyledHeader from '../../styleComponents/layout/StyledHeader';
import Logotype from './Logotype'
import { ContainerLarge } from '../../styleComponents/layout/Container';
import { Icon } from 'semantic-ui-react';
import Navbar from './Navbar';
import StyledMobileButton from '../../styleComponents/layout/StyledMobileButton';
import { toggleSidebar } from "../../actions/actions";

class Header extends Component {

    render() {
        return (

            <StyledHeader className='header-intro'>
                    <div className='top-header'>
                        <ContainerLarge>
                            <Logotype/>
                            <StyledMobileButton onClick={ this.toggleVisibility }>
                                <Icon name='content' />
                            </StyledMobileButton>
                        </ContainerLarge>
                    </div>
                    <div className='bot-header'>
                        <ContainerLarge>
                            <Navbar/>
                        </ContainerLarge>
                    </div>
            </StyledHeader>
        )
    }

    toggleVisibility = () => {
        this.props.toggleSidebar();
    }
}

export default connect(null, { toggleSidebar })(Header);

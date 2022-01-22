import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@material-ui/core';

// project imports
import config from './../../../config';
import Logo1 from "../../../assets/images/Dharamsinh_Desai_University_logo.png"
import Logo from './../../../ui-component/Logo';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {
    return (
        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
            {/* <Logo /> */}
            <img style={{ width: "60%", height: "5%", marginLeft: "30%", marginTop: "-11%", marginBottom: "-25%" }}
                src={Logo1}
                alt='Dharamsinh Desai University logo'
                loading="lazy"
            />

        </ButtonBase>
    );
};

export default LogoSection;

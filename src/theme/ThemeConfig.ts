import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

const { darkAlgorithm } = theme;

const appTheme: ThemeConfig = {
  token : {
    fontFamily: 'DeathNote',
    fontSize: 20,
    fontSizeHeading1: 24,
  },
  algorithm: darkAlgorithm,
  components:{
    
    Card:{
      headerFontSize : 24
    },
    
    List:{
      fontSize : 30,
      descriptionFontSize : 25,
    },
    Slider:{
      fontSize:24
    }
  }

}

export default appTheme;
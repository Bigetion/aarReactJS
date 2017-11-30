import { injectGlobal } from 'styled-components';
import '!!style-loader!css-loader!./assets/font-awesome/css/font-awesome.css';
import '!!style-loader!css-loader!./assets/bootstrap/css/bootstrap.css';
import '!!style-loader!css-loader!./assets/css/main.css';
import '!!style-loader!css-loader!./assets/css/skin.css';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  .react-grid-Main{
height: 100%;
}

.react-grid-Container{
height: 100%;
}

.ant-menu-item .anticon + span, .ant-menu-submenu-title .anticon + span{
  overflow:initial;
}

.ant-layout-header{
  background: #ffffff;
  margin-bottom: 5px;
}

.ant-layout {
  background: none;
}

.ant-layout-header {
  padding: 0 10px;
}

ant-layout-content {
  background: none !important;
}
`;

/*
 *
 * MainPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import * as actions from '../actions';
import mainPageSelector from '../selectors';
import messages from '../messages';

export class MainPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.moduleList = [];
    this.renderModule = this.renderModule.bind(this);
  }

  componentWillMount() {
    this.props.onSearch({});
  }

  renderController(controllerList) {
    let controllers = [];
    controllerList.forEach((controller, index) => {
      controllers.push((
        <div className="media p-l-5" key={index}>
          <div className="media-body">Controller_{controller}</div>
        </div>
      ))
    });
    return controllers;
  }

  renderModule(moduleList) {
    let modules = [];
    for (let module in moduleList) {
      modules.push((
        <div className="col-md-4" key={module}>
          <div className="box box-warning">
            <div className="box-header with-border">
              <h3 className="box-title">Module : {module}</h3>
            </div>
            <div className="box-body">
              {this.renderController(moduleList[module])}
            </div>
          </div>
        </div>
      ))
    }
    return modules;
  }

  render() {
    if (this.props.onSearchSuccess) {
      this.moduleList = this.props.onSearchSuccess;
    }
    const meta = (
      <Helmet
        title="Main Page"
        meta={[
          { name: 'description', content: 'Description of Main Page' },
        ]}
      />
    );

    const pageHeader = (
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header ng-scope">Modules</h1>
        </div>
        {this.renderModule(this.moduleList)}
      </div>
    )

    return (
      <div>
        {meta}
        {pageHeader}
      </div>
    );
  }
}

MainPage.propTypes = {
  onSearch: PropTypes.func,
  onSearchSuccess: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  onSearchSuccess: mainPageSelector('searchSuccess'),
});

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (val) => dispatch(actions.search(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

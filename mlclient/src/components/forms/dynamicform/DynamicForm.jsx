import React, { Component } from 'react';
import { run, ruleRunner } from '../formvalidation/ruleRunner';
import { required, isString, minLength, maxLength, isCellnumber, isCurrency, isNumber, emailFormat, isSDP, isDRP } from '../formvalidation/rules';
import TextView from '../formcontrols/TextView.jsx';
import SelectView from '../formcontrols/SelectView.jsx';
import TextAreaView from '../formcontrols/TextAreaView.jsx';
import RadioView from '../formcontrols/RadioView.jsx';
import CheckboxView from '../formcontrols/CheckboxView.jsx';
import SingleDatePickerView from '../formcontrols/SingleDatePickerView.jsx';
import DateRangePickerView from '../formcontrols/DateRangePickerView.jsx';
import FileView from '../formcontrols/FileView.jsx';

class DynamicForm extends Component {
    constructor(props) {
        super(props);
        // console.log("Constructor DynamicForm :",this.props);
        var model = {};
        if (this.props.exclude !== undefined) {
            model = this.newModel();
        } else {
            model = this.props.model;
        }
        this.state = {
            validationErrors: {},
            fieldValidations: [],
            fields: this.props.valueData === undefined ? {} : this.props.valueData,
            stage: 'Initial',
            model: model
        };

        //get the field(s) validations;
        this.state.model.map((row, idx) => {
            /* row = each formControl , idx=index */
            //   console.log("key :",row,row.label," - validations : ",row.fieldValidations);
            if (row.fieldValidations) {
                let validations = [];
                for (var key in row.fieldValidations) { /* key = validations like required,minLength */
                    switch (key) {
                        case 'required': {
                            if (row.fieldValidations[key] === true) {
                                validations.push(required); // push "required function"
                            }
                            break;
                        }
                        case 'minLength': {
                            validations.push(minLength(row.fieldValidations[key])); // push "minLength function"
                            break;
                        }
                        case 'maxLength': {
                            validations.push(maxLength(row.fieldValidations[key]));
                            break;
                        }
                        case 'isCellnumber': {
                            validations.push(isCellnumber);
                            break;
                        }

                        case 'isDRP': {
                            if (row.fieldValidations[key] === true) {
                                validations.push(isDRP);
                            }
                            break;
                        }

                        case 'isSDP': {
                            if (row.fieldValidations[key] === true) {
                                validations.push(isSDP);
                            }
                            break;
                        }
                        case 'isString': {
                            validations.push(isString);
                            break;
                        }
                        case 'isNumber': {
                            validations.push(isNumber);
                            break;
                        }
                        case 'emailFormat': {
                            validations.push(emailFormat);
                            break;
                        }
                        case 'isCurrency': {
                            validations.push(isCurrency);
                            break;
                        }
                        default:
                            break;
                    } // end of switch

                }

                this.state.fieldValidations.push(ruleRunner(row.key, row.label, validations)); // (field, name, validations)



            } // end of for loop
            return '';
        }) // end of Props Iterator
    } // end of constructor

    /**  exclude some form controls for edit purpose */
    excludeFormControls = key => {
        var isExclude;
        // console.log('exclude(params) :', key, type);
        this.props.exclude.map((m, indx) => {
            if (m.key === key) {
                // console.log('exclude :', m);
                isExclude = m.key;
            }
            return isExclude;
        });
        return isExclude;
    };

    /** get new model after exclude some form controls */
    newModel = () => {
        let model;
        model = this.props.model.filter(item => {
            // remove item from array
            if (this.props.exclude !== undefined) {
                return item.key !== this.excludeFormControls(item.key);
            } else {
                return item.key;
            }
        });
        return model;
    };

    /* checking this control has error or not */
    checkControls = key => {
        if (
            this.state.fields[key] !== undefined && this.state.validationErrors[key] !== undefined
        ) {
            return true;
        } else {
            return false;
        }
    };

    /* get the error text for that field */
    errorFor = key => {
        // console.log("error for field :", key)
        if (this.checkControls(key)) {
            // console.log("error : ", this.state.validationErrors[key] )
            return this.state.validationErrors[key] || ''; // error text
        } else {
            return '';
        }
    };

    /* get the entered value for this field */
    getValue = name => {
        // console.log('getValueFor :', name);
        if (this.state.fields[name] !== undefined) {
            // console.log('getValue', this.state.fields[name]);
            return this.state.fields[name];
        } else {
            return '';
        }
    };

    onChange = (e, key) => {
        // console.log(`key : ${key}  - e:`,e);
        let localFields = { ...this.state.fields };         // for Create intial fileds are like  {}
        // console.log('localFields(onChange()) :', { ...this.state.fields });  // before select
        localFields[key] = e.target.value;
        // console.log('localFields(onChange()) :', localFields);   // after select
        // time to setState the fields
        this.setState({ fields: localFields, stage: 'Incomplete' }, () => {
            // console.log('this.state.fields@onChangeCheck :', this.state.fields);
            // call back function
            this.setState(
                {
                    validationErrors: run(this.state.fields, this.state.fieldValidations)
                },
                () => {
                    // console.log(`newState onChange() :${JSON.stringify(this.state)}`) // print new state
                    if (Object.keys(this.state.validationErrors).length === 0) {
                        this.setState({ stage: 'Complete' }, () => {
                            this.props.reload();
                        });
                    } else {
                        this.setState({ stage: 'Incomplete' }, () => {
                            this.props.reload();
                        });
                    }
                }
            ); // validation check
        });
    }; // end of onChange()

    // send file to parent so that parent will get the content in base64 string
    file = (file) => {
        this.props.file(file);
    }


    /*********************when you click the submit button **************************** */
    /* make sure all validations are pass */
    checkValidations = () => {
        var validationErrors = run(this.state.fields, this.state.fieldValidations);
        if (Object.keys(validationErrors).length === 0) {
            // console.log("no errors")
            return true;
        } else {
            // console.log(" errors ")
            return false;
        }
    };

    /* get the form fields values   */
    getData = () => {
        return this.state.fields;
    };

    /************************************************************************* */





    /* render dynamic form that generated from given input form controls */
    renderForm = () => {
        let model = this.state.model;

        // model.map(m => console.log('new model :', m));
        let { groups, columns } = this.props;

        //step 1:
        let rows = [...Array(Math.ceil(model.length / groups))]; // calculate the number of rows, given  items per row
        // console.log(`columns :${groups} - No of Rows :${ Math.ceil(model.length / groups)}`)

        //step 2:
        let modelRows = rows.map((row, idx) => {
            return model.slice(idx * groups, idx * groups + groups); // The result is an array of arrays (rows of items).
        });

        const content = modelRows.map((row, idx) => {
            return (
                <div className="form-row" key={idx}>
                    {
                        row.map((m, idx) => {
                            let { key, type, label, header, maxLength, opts, options } = m;
                            //m.value = this.state.fields[key];
                            let input;
                            var valData = this.getValue(key);

                            /* step 1 :  */
                            if (type === 'text' || 'email' || 'password' || 'number') {
                                input = (
                                    <TextView
                                        _key={key}
                                        label={label}
                                        value={valData}
                                        type={type}
                                        small={'Looks good!'}
                                        stage={this.state.stage}
                                        errorFor={this.errorFor}
                                        onChange={this.onChange}
                                        maxLength={maxLength}
                                        options={options}
                                    />
                                );
                            }

                            /* step 7 :  */
                            if (type === 'file') {
                                input = (
                                    <FileView
                                        _key={key}
                                        label={label}
                                        value={valData}
                                        type={type}
                                        small={'Looks good!'}
                                        stage={this.state.stage}
                                        errorFor={this.errorFor}
                                        onChange={this.onChange}
                                        options={options}
                                        file={this.file}
                                    />
                                );
                            }

                            /* step 2 : */
                            if (type === 'select') {
                                input = (
                                    <SelectView
                                        _key={key}
                                        label={label}
                                        value={valData}
                                        header={header}
                                        small={'Looks good!'}
                                        stage={this.state.stage}
                                        errorFor={this.errorFor}
                                        onChange={this.onChange}
                                        opts={opts}
                                        options={options}
                                    />
                                );
                            }
                            /* step 3 :  */
                            if (type === 'textarea') {
                                input = (
                                    <TextAreaView
                                        _key={key}
                                        value={valData}
                                        label={label}
                                        type={type}
                                        maxLength={maxLength}
                                        small={'Looks good!'}
                                        stage={this.state.stage}
                                        errorFor={this.errorFor}
                                        onChange={this.onChange}
                                        options={options}
                                    />
                                );
                            }
                            /* step 4 :  */

                            if (type === 'radio') {
                                // console.log("radio :",options);
                                input = (
                                    <RadioView
                                        _key={key}
                                        value={valData}
                                        options={options}
                                        opts={opts}
                                        errorFor={this.errorFor}
                                        onChange={this.onChange}
                                        reload={this.props.reload}
                                    />
                                );
                            }

                            if (type === 'checkbox') {
                                // console.log('checkbox :', valData);
                                input = (
                                    <CheckboxView
                                        _key={key}
                                        value={valData}
                                        options={options}
                                        opts={opts}
                                        errorFor={this.errorFor}
                                        onChange={this.onChange}
                                    />
                                );
                            }
                            /* step 5 :  */

                            if (type === 'SingleDatePicker') {
                                input = (
                                    <SingleDatePickerView
                                        _key={key}
                                        value={valData}
                                        label={label}
                                        small={'Looks good!'}
                                        stage={this.state.stage}
                                        errorFor={this.errorFor}
                                        onChange={this.onChange}
                                        options={options}
                                    />
                                );
                            }
                            /* step 6 :  */
                            if (type === 'DateRangePicker') {
                                input = (
                                    <DateRangePickerView
                                        _key={key}
                                        value={valData}
                                        label={label}
                                        small={'Looks good!'}
                                        stage={this.state.stage}
                                        errorFor={this.errorFor}
                                        onChange={this.onChange}
                                        options={options}
                                    />
                                );
                            }

                            /* step 7 :  */
                            /* step 8 :  add your new control here */

                            return (
                                <div key={idx} className={'form-group ' + columns}>
                                    <label key={'l' + key} htmlFor={key} style={{ color: "#0187b4" }} > {m.label} <code>{m.ind}</code> {m.cln} </label>
                                    {input}
                                </div>
                            );
                        })// end row map

                    }
                    {/* <div><hr /></div> */}
                </div>

            )
        })
        return <div>{content}</div>;
    } // end of renderForm

    render() {
        return <div>{this.renderForm()}</div>;
    }

}

export default DynamicForm;
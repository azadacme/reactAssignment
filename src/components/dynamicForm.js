import React, { useState } from "react";
import "./dynamicForm.css";

const formData = {
    "form": {
        "formName": "Product Information",
        "fields":[ 
            {
                "id" : "productName",
                "name": "title",
                "label": "Product Name",
                "required": true,
            },
            {
                "id" : "productDeadline",
                "name": "endDate",
                "label": "Deadline",
                "required": false
            },
            {
                "id" : "productApproval",
                "name": "isApprovalNeeded",
                "label": "Ask For Approval",
                "required": false
            }
        ]
    }
}
// TODO: Need to add custom form validation
export default function DynamicForm() {
    const [formFields, setFormFields] = useState([])

    const addNewProduct = () => {
        setFormFields([...formFields, {title: '', endDate: '', isApprovalNeeded: false}])
    }

    const removeProduct = (index) => {
        const productList = [...formFields];
        productList.splice(index, 1);
        setFormFields(productList);
    }

    const onFormChange = (e) => {
        if (e.target.name) {
            let productList = [...formFields];
            productList[e.target.dataset.id][e.target.name] = e.target.name === 'isApprovalNeeded' ? e.target.checked : e.target.value;
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        //TODO: Need to show alert if no form data
        console.log("Product Details: ", formFields);
    }
    return (
        <div className="container form-div">
            <form onSubmit={onFormSubmit} onChange={onFormChange}>
                <h1>{formData.form.formName}</h1>
                <div>              
                    <table className="table">
                        <thead>
                            <tr>
                                {
                                    formData.form.fields.map((field, index) => {
                                        return (
                                            <th key={index}>{field.label}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                formFields.map((row, idx) => {
                                    let projectNameId = `projectName-${idx}`, deadlineId = `deadline-${idx}`, approvalId = `approval-${idx}`;
                                    return (
                                        <tr key={idx}>
                                            <td>
                                                <input id={projectNameId} type="textbox" name="title" required={true} data-id={idx} className="formControl" />
                                            </td>
                                            <td>
                                                <input id={deadlineId} type="date" name="endDate" required={false} data-id={idx} className="formControl" />
                                            </td> 
                                            <td>
                                                <input id={approvalId} type="checkbox" name="isApprovalNeeded" required={false} data-id={idx} className="formControl" />
                                            </td> 
                                            <td>
                                                <button tyep="button" onClick={() => removeProduct(idx)} className="formRemoveBtn"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                            </td>
                                        </tr>
                                    )
                                
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <button type="button" onClick={() => addNewProduct()} className="formBtn"><i className="fa fa-plus-circle" aria-hidden="true"></i>Add Product</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="formFooter">
                    <button type="submit" className="formBtn">Submit</button>
                </div>
            </form>
        </div>
    )
}
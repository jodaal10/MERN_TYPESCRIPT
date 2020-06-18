import React, { useState, ChangeEvent, Fragment, useEffect } from 'react'
import { Category } from '../../types/category';
import { ThunkDispatch } from 'redux-thunk';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import { getCategories, createCategory } from '../../actions/category';
import Spinner from '../layout/Spinner';
var DataTable = require('react-data-components').DataTable;

interface PropsFromState {
    categories: Category[],
    loading: boolean
}

interface propsFromDispatch {
    setAlert: (msg: any) => any;
    getCategories: () => any;
    createCategory: (category: Category) => any;
}

type CategoryProps = PropsFromState & propsFromDispatch;

const CategoryComponent: React.FC<CategoryProps> = ({createCategory,getCategories,setAlert,categories,loading}) => {

    useEffect(() => {
        getCategories();
      }, [getCategories]);

    var columns = [
    { title: 'Name', prop: 'categoryName'  },
    { title: 'City', prop: 'type' },
    ];
      
    const [formData, setFromData] = useState<Category>({
        categoryName:'',
        type: '',
        typeName: '',
        id: 0
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setFromData({...formData, [e.target.name]: e.target.value});
    } 
    function handleChangeSelect(e: ChangeEvent<HTMLSelectElement>){
        setFromData({...formData, [e.target.name]: e.target.value});
    } 

    async function handleSubmit (
        e: React.FormEvent<HTMLFormElement>
      ): Promise<void> {
        e.preventDefault();
        if (formData.type === "0" || formData.type === "" ) {
            let msg: any = { message: 'Field type is required', alertType: 'danger'};
            setAlert(msg);
        }
        let category: Category = formData
        createCategory(category);
    };

    return (
        loading? <Spinner/>:
        <Fragment>
            <h1 className="large text-title">Categories</h1>
            <p className="lead"><i className="fas fa-user"></i> Manage your categories</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" 
                           placeholder="Category Name" 
                           name="categoryName"
                           onChange = {handleChange}
                           required />
                </div>
                <div className="form-group">
                    <select name="type" id="type" onChange = {handleChangeSelect} required>
                        <option value="0">Select a type</option>
                        <option value="1">Programming Language</option>
                        <option value="2">Softskill</option>
                        <option value="3">Framework</option>
                        <option value="4">Library</option>
                        <option value="5">DevOps</option>
                        <option value="6">Testing</option>
                        <option value="7">Security</option>
                        <option value="8">Version Control</option>
                        <option value="9">Platforms</option>
                        <option value="10">Other</option>
                    </select>
                </div>
                <input type="submit" className="btnn btn-primarys" value="Create" />
            </form>

            <DataTable
                keys="id"
                columns={columns}
                initialData={categories}
                initialPageLength={5}
                initialSortBy={{ prop: 'categoryName', order: 'descending' }}
                />
        </Fragment>
    )
}

const mapStateToProps = ({ category }: ApplicationState) => ({
    categories: category.categories,
    loading: category.loading
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): propsFromDispatch => {
    return {
      setAlert: (item) => {
         dispatch(setAlert(item));
      },
      getCategories: () => {
        dispatch(getCategories());
     },
     createCategory: (category) => {
        dispatch(createCategory(category));
     }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryComponent);
/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { withRouter } from 'next/router'
import { withTranslation } from 'next-i18next';
import Link from "next/link";
//STORES , COMPONETS AND FROMS 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
} from '@mui/x-data-grid';
//INITIALISE
class PageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { field: 'username', hideable: false, headerName: this.props.t('models.user.username', { ns: 'common' }), flex: 0.5, minWidth: 100, headerClassName: "bg-slate-100 py-3.5 pl-4 pr-3 text-left text-gray-900 sm:pl-6 lg:pl-8 capitalize text-lg  font-bold " },
                { field: 'phone', hideable: true, headerName: this.props.t('models.user.phone', { ns: 'common' }), type: "number", flex: 0.5, minWidth: 100, headerClassName: 'bg-slate-100 px-3 py-3.5 text-left text-gray-900 capitalize text-lg  font-bold' },
                { field: 'email', hideable: true, headerName: this.props.t('models.user.email', { ns: 'common' }), flex: 1, minWidth: 100, headerClassName: 'bg-slate-100 px-3 py-3.5 text-left text-gray-900 capitalize text-lg  font-bold' },
                {
                    field: "status", hideable: true, type:"boolean", headerName: this.props.t('models.log.status', { ns: 'common' }), flex: 0.3, minWidth: 50, headerClassName: 'bg-slate-100 px-3 py-3.5 text-left text-gray-900 capitalize text-lg  font-bold',
                    valueGetter : ({ value }) => {
                        return (value );
                    },
                },
                {
                    field: "role", headerName: this.props.t('models.user.role', { ns: 'common' }), flex: 0.3, minWidth: 50, headerClassName: 'bg-slate-100 px-3 py-3.5 text-left text-gray-900 capitalize text-lg  font-bold',
                    renderCell: ({ value }) => {
                        return (
                            <>
                                <span className='uppercase'>{value.name}</span>
                            </>
                        );
                    },
                  },
                {
                    field: 'created', hideable: true, headerName: this.props.t('models.user.created', { ns: 'common' }), type: "dateTime", flex: 0.4, minWidth: 100, headerClassName: 'bg-slate-100 px-3 py-3.5 text-left text-gray-900 capitalize text-lg  font-bold',
                    valueGetter: ({ value }) => value && new Date(value)
                },
                {
                    field: "options", disableExport: true, type: 'actions', headerName: this.props.t('tables.options', { ns: 'common' }), flex: 0.5, minWidth: 100, headerClassName: 'bg-slate-100 px-3 py-3.5 text-left text-gray-900 capitalize text-lg  font-bold',
                    renderCell: (params) => {
                        return (
                            <>
                                <Link key={params.row.id} href={"/admin/users/manage/" + params.row.id}>
                                    <a className="capitalize text-primary-600 hover:text-primary-900 text-capitalize">
                                        {this.props.t('forms.manage', { ns: 'common' })}
                                    </a>
                                </Link>
                                {/* <a  className="capitalize text-primary-600 hover:text-primary-900  ml-2">
                            {this.props.t('forms.delete', { ns: 'common' })}
                          </a> */}
                            </>
                        );
                    },
                }
            ],
        };
    }
    componentDidMount() {
    }
    //Functions

    //Render
    render() {
        const theme = createTheme(
            {
                palette: {
                    primary: { main: '#ea580c' },
                },
            },
        );
        return (
            <React.Fragment>
                <ThemeProvider theme={theme} >
                        <DataGrid
                            components={{
                                Toolbar: () => {
                                    return (
                                        <GridToolbarContainer>
                                            <GridToolbarColumnsButton />
                                            <GridToolbarFilterButton />
                                            <GridToolbarExport csvOptions={{
                                                fileName: this.props.t('pages.users', { ns: 'common' })
                                            }}
                                                printOptions={{
                                                    disableToolbarButton: true
                                                }} />
                                        </GridToolbarContainer>
                                    )
                                },
                            }}
                            density="compact"
                            initialState={{
                                pagination: {
                                    pageSize: 25,
                                },
                                columns: {
                                    columnVisibilityModel: {
                                        username: true,
                                        phone:false,
                                        email:true,
                                        status:true,
                                        created:false
                                    }
                                }
                            }}
                            rowsPerPageOptions={[25, 50, 100, 500]}
                            getRowId={(row) => row.id}
                            columns={this.state.columns}
                            rows={this.props.data}
                            localeText={{
                                toolbarColumns: this.props.t('tables.columns', { ns: 'common' }),
                                toolbarFilters: this.props.t('tables.filters', { ns: 'common' }),
                                toolbarExport: this.props.t('tables.export', { ns: 'common' }),
                            }}
                        />
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

const PageComponentWithRouter = withRouter(PageComponent);

const PageComponentWithTranslation = withTranslation(['users', 'common'])(PageComponentWithRouter)

export default PageComponentWithTranslation;

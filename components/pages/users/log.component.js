/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { withRouter } from 'next/router'
import { withTranslation } from 'next-i18next';
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
                {
                    field: 'action', hideable: false, headerName: this.props.t('models.log.action', { ns: 'common' }), flex: 0.5, minWidth: 100, headerClassName: "bg-slate-100 py-3.5 pl-4 pr-3 text-left text-gray-900 sm:pl-6 lg:pl-8 capitalize text-lg  font-bold ",
                    valueGetter: (params) => {
                        return  params.row.action;
                    },
                },
                {
                    field: 'entity', headerName: this.props.t('models.log.entity', { ns: 'common' }), flex: 1, minWidth: 100, headerClassName: "bg-slate-100 py-3.5 pl-4 pr-3 text-left text-gray-900 sm:pl-6 lg:pl-8 capitalize text-lg  font-bold ",
                    valueGetter: ({ value }) => {
                        return value.username + "(" + value.email + ")";
                    },
                },
                {
                    field: "status", hideable: false, headerName: this.props.t('models.log.status', { ns: 'common' }), flex: 0.3, minWidth: 50, headerClassName: 'bg-slate-100 px-3 py-3.5 text-left text-gray-900 capitalize text-lg  font-bold',
                    valueGetter: ({ value }) => {
                        return value == true ? this.props.t('status.success', { ns: 'common' }) : this.props.t('status.failed', { ns: 'common' });
                    },
                },
                {
                    field: 'created', hideable: false, headerName: this.props.t('models.log.created', { ns: 'common' }), type: "dateTime", flex: 0.4, minWidth: 100, headerClassName: 'bg-slate-100 px-3 py-3.5 text-left text-gray-900 capitalize text-lg  font-bold',
                    valueGetter: ({ value }) => value && new Date(value)
                },
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
                    <div style={{ height: '60vh', minHeight: '200px', width: '100%' }}>
                        <DataGrid
                            components={{
                                Toolbar: () => {
                                    return (
                                        <GridToolbarContainer>
                                            <GridToolbarColumnsButton />
                                            <GridToolbarFilterButton />
                                            <GridToolbarExport csvOptions={{
                                                fileName: this.props.t('pages.logs', { ns: 'common' })
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
                                        action: true,
                                        entity: false,
                                        status: true,
                                        created: true,
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
                    </div>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

const PageComponentWithRouter = withRouter(PageComponent);

const PageComponentWithTranslation = withTranslation(['users', 'common'])(PageComponentWithRouter)

export default PageComponentWithTranslation;

import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';


function Activity() {

    const [activityData, setActivityData] = useState([])
    const [tableData, setTableData] = useState([])



    


    const handleData = () => {

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/history?type=all&&page=1`).then(res => {
            setActivityData(res?.data?.data?.docs)
            console.log(res, "res")
          })

        let ArrayData = [];
            const ActivityTableData = activityData?.length > 0 && activityData?.map(e => {
                if (e?.item_id) {
                    ArrayData?.push({
                        "collection": `${e?.collection_id?.name}`,
                        "price": e?.price,
                        "author": e?.item_id?.name,
                        "event": e?.history_type,
                        "time": e?.created_date,
                        "transaction_hash": e.transaction_hash ? (<>  <a target="blank" href={`https://testnet.bscscan.com/tx/` + e.transaction_hash} >{e.transaction_hash}</a> </>) : "---"
                    })
                }
            })

            setTableData(ArrayData)

            console.log(ArrayData)

    }

    useEffect(() => {
        handleData()
    }, [activityData?.length > 0])

    const columns = [
        {
            dataField: 'collection',
            text: 'Collection',
            sort: true
        },
        {
            dataField: 'price',
            text: 'Price'
        },
        {
            dataField: 'author',
            text: 'Item'
        },
        {
            dataField: 'event',
            text: 'Event'
        },
        {
            dataField: 'transaction_hash',
            text: 'Transaction hash',
            style: {
                overflow: "hidden",
                textOverflow: "ellipsis",

            }

        },
        {
            dataField: 'time',
            text: 'Create Date',
            sort: true
        }
    ];

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        paginationSize: 5,
        disablePageTitle: true,
        hideSizePerPage: true
    });


  return (
    <div className='activity'>

        
        <div className="explore-items-2-wrapper">
                <div className="container-fluid">
                    <div className="g-4 g-xl-5" >
                       

                        <div className='col-lg-12'>
                            <div className="activity-wrapper">
                                <div className="container">
                                    {/* Activity Table */}
                                    <div className="activity-table">

                                    <div>
            <p className='text'>Activity</p>
        </div>
                                        
                                      
                                            <>
                                                <BootstrapTable
                                                    keyField="id"
                                                    data={tableData}
                                                    columns={columns}
                                                    pagination={pagination}
                                                    bootstrap4
                                                />

                                            </>
                                         
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    </div>
  )
}

export default Activity
import React from 'react'


export const Balance = ({ total = 0 }) => {


    const positivo = total.toString().startsWith('-');

    return (
        <div className='container balance  text-white'>
            <h2> MY BALANCE:</h2>

            <div className="insights">
                <div className=" container center text-center">
                    <div className="row sales">
                        <div className="col-12 col-md-6 center">
                            <div className="circle">
                                <p className={`${((positivo) ? 'text-danger' : 'ok')} total`} > {(total !== 0) ? total : 0} $ </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 smalll">
                            <small className="text-white">Last  moves balance</small>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    )
}

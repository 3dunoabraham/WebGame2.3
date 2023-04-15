

function Component ({ theArray, bools, config }:any) {
    return (
        <div  className='flex-col    w-100 bord-r-5    block noverflow border-lgrey  box-shadow-1-b' >
            {theArray.map((anObj:any)=>(
            <>
            <div key={anObj[config.idKey]}
                className=' w-100  block  border-lgrey-b flex pos-rel  '
            >
                {!!anObj[config.linkKey] &&  bools.includes("isRowLink") &&
                    <div className="top-0 left-0 h-100 w-100 pos-abs flex">
                        <a href={"https://"+anObj[config.linkKey]} target="_blank" rel="noopener noreferrer"
                        
                        className='opaci-chov-75 z-10  block   border-lgrey-b flex bg-b-40  opaci-10 flex-1'
                        ></a> 
                        {bools.includes("isActionable") &&
                            <div className=' invisible noclick'>
                                <a href={anObj[config.linkAlt]} className=" py-3 opaci-chov--50 tx-lg pb-3 px-2 block">...</a>
                            </div>
                        }
                    </div>
                }

                <div className=' border-lgrey-r flex-1 px-2 pos-rel pt-2'>
                    {!!anObj[config.mainKey] && <>
                        {anObj[config.mainKey]}
                    </>}
                    {!anObj[config.mainKey] && !bools.includes("isDetailed") &&  <>
                        -
                    </>}
                    {!anObj[config.mainKey] && bools.includes("isDetailed") && <>
                        <details>
                            <summary className='opaci-chov--50 opaci-75  tx-italic'>{config.mainAltText}</summary>
                            <div className="flex-col pa-2   ">
                            
                                {config.detailsArray && config.detailsArray.map((aDetail:any, index:number)=>{
                                    return (
                                        <div key={index} className="w-100">
                                            <div className={`   ${aDetail.class}`}>
                                                <span className="tx-sm">{aDetail.key}</span>:
                                                <div>{anObj[aDetail.key]}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </details>
                    </>}
                </div>
                
                <div className="flex ">
                    {config.childrenArray && config.childrenArray.map((aChildren:any, index:number)=>{
                        return (
                            <div key={index}  className={`flex-col px-2 border-lgrey-r  ${aChildren.class}`}>
                                {anObj[aChildren.key]}
                            </div>
                        )
                    })}
                </div>

                {bools.includes("isActionable") &&
                    <div className=' z-1'>
                        <a href={anObj[config.linkAlt]} target="_blank" rel="noopener noreferrer"
                            className="nodeco py-3 opaci-chov--50 tx-lg pb-3 px-2 block">...</a>
                    </div>
                }
            </div>
            </>
            ))}
        </div>
    )
}

export default Component

export default function Dropdown() {
  return (
    <div className="dropdown dropdown-left">
        <div tabIndex={0} role="button" className="btn m-1" style={{width: '200%'}}>FILTERS</div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-5" style={{width: '400%'}}>
            <li><a><div className="form-control" style={{width: '150%'}}>
                        <label className="cursor-pointer label">
                            <span className="label-text">Most expensive</span>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                        </label>
                        </div>
                </a></li>

            <li><a><div className="form-control" style={{width: '230px'}}>
                        <label className="cursor-pointer label">
                            <span className="label-text">Cheapest</span>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                        </label>
                        </div>
            </a></li>

            <li><a><div className="form-control" style={{width: '150%'}}>
                        <label className="cursor-pointer label">
                            <span className="label-text">Most Pretigious</span>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                        </label>
                        </div>
            </a></li>

            <li><a><div className="form-control" style={{width: '155%'}}>
                        <label className="cursor-pointer label">
                            <span className="label-text">Economic class</span>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                        </label>
                        </div>
            </a></li>

            <li><a><div className="form-control" style={{width: '150%'}}>
                        <label className="cursor-pointer label">
                            <span className="label-text">Cargo transport</span>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-info" />
                        </label>
                        </div>
            </a></li>
        </ul>
    </div>
  )
}

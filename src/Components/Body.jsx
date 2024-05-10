import BodyLeft from "./BodyLeft"
import BodyRight from "./BodyRight"

function Body() {
    return (
        <div className="grid grid-cols-3 rounded-xl overflow-hidden shadow-md">
            <div className="hidden lg:block">
                <BodyLeft />
            </div>
            <div className="col-span-3 lg:col-span-2">
                <BodyRight />
            </div>
        </div>
    )
}

export default Body
import BodyLeft from "./BodyLeft"
import BodyRight from "./BodyRight"

function Body() {
    return (
        <div className="grid grid-cols-3 bg-red-400 rounded-xl  overflow-hidden">
            <div className="hidden md:block">
                <BodyLeft />
            </div>
            <div className="col-span-3 md:col-span-2">
                <BodyRight />
            </div>
        </div>
    )
}

export default Body
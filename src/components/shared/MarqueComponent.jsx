import { ImageComponent } from "../index.js";

const MarqueComponent = ({
    ImageUrl,
    displayText,
    parentDivIteration = 2,
    childDivIteration = 3,
}) => {
    return (
        <div className="flex w-max animate-marquee">
            {[...Array(parentDivIteration)].map((_, parentIndex) => (
                <div
                    key={parentIndex}
                    className="flex shrink-0 items-center gap-8 pr-8"
                >
                    {[...Array(childDivIteration)].map((_, childIndex) => (
                        <div key={childIndex} className="flex shrink-0 items-center gap-8">
                            <span className="shrink-0 whitespace-nowrap">{displayText}</span>

                            <ImageComponent ImageSrc={ImageUrl} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MarqueComponent;

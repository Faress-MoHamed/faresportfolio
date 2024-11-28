import { MoonLoader } from "react-spinners";
import React, { FC } from "react";
const LoadingPage: FC = () => {
	return (
		<div className={`absolute left-0 top-0 w-full h-screen bg-black/20`}>
			<div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4">
				<MoonLoader color="#000000" />
			</div>
		</div>
	);
};
export default LoadingPage;

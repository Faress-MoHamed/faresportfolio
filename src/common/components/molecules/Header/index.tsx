interface HeaderProp {
	headLine1: string;
	headLine2: string;
	subHeadLine: string;
}

export default function Header({
	headLine1,
	headLine2,
	subHeadLine,
}: HeaderProp) {
	return (
		<div className="flex flex-col items-center justify-center space-y-4 text-center">
			<div className="space-y-2">
				<div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
					{headLine1}
				</div>
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
					{headLine2}
				</h2>
				<p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
					{subHeadLine}
				</p>
			</div>
		</div>
	);
}

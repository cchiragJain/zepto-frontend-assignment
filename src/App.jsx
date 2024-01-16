import { useRef, useState } from "react";
import Icons from "./Icons";
import { userList } from "./data/userList";

const App = () => {
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState([]);
	const [menuOpen, setMenuOpen] = useState(false);

	const inputRef = useRef(null);

	const filteredTags = userList.filter(
		(user) =>
			user.name
				?.toLocaleLowerCase()
				?.includes(query.toLocaleLowerCase()?.trim()) &&
			!selected.some((i) => i.id === user.id)
	);

	const isDisable =
		!query?.trim() ||
		selected.some(
			(item) =>
				item?.name?.toLocaleLowerCase()?.trim() ===
				query?.toLocaleLowerCase()?.trim()
		);

	return (
		<div className="bg-[#eef1f8] h-screen grid place-items-center ">
			<div className="relative w-96 h-96 text-sm">
				{selected?.length ? (
					<div className="bg-white w-96 relative text-xs flex flex-wrap gap-1 p-2 mb-2">
						{selected.map((user) => {
							return (
								<div
									key={user.id}
									className="rounded-full w-fit py-1.5 px-3 border border-gray-400 bg-gray-50 text-gray-500
                  flex items-center gap-2"
								>
									<img
										src={user.image}
										alt={user.name}
										className="h-4 w-4"
									/>
									<span>{user.name}</span>
									<div
										onMouseDown={(e) => e.preventDefault()}
										onClick={() =>
											setSelected(
												selected.filter(
													(i) => i.id !== user.id
												)
											)
										}
									>
										<Icons.Close />
									</div>
								</div>
							);
						})}
						<div className="w-full text-right">
							<span
								className="text-gray-400 cursor-pointer"
								onClick={() => {
									setSelected([]);
									inputRef.current?.focus();
								}}
							>
								Clear all
							</span>
						</div>
					</div>
				) : null}
				<div className="card flex items-center justify-between p-3 w-96 gap-2.5">
					<Icons.Search />
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value.trimStart())}
						placeholder="Pick Users"
						className="bg-transparent text-sm flex-1 caret-rose-600"
						onFocus={() => setMenuOpen(true)}
						onBlur={() => setMenuOpen(false)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !isDisable) {
								setSelected((prev) => [
									...prev,
									{ name: query, id: Date.now() },
								]);
								setQuery("");
								setMenuOpen(true);
							}
						}}
					/>
					<button
						className="text-sm disabled:text-gray-300 text-rose-500 disabled:cursor-not-allowed"
						disabled={isDisable}
						onClick={() => {
							if (isDisable) {
								return;
							}
							setSelected((prev) => [
								...prev,
								{ name: query, id: Date.now() },
							]);
							setQuery("");
							inputRef.current?.focus();
							setMenuOpen(true);
						}}
					>
						+ Add
					</button>
				</div>

				{/* Menu's */}
				{menuOpen ? (
					<div className="card absolute w-full max-h-52 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
						<ul className="w-full">
							{filteredTags?.length ? (
								filteredTags.map((user) => (
									<li
										key={user.id}
										className="p-2 cursor-pointer hover:bg-rose-50 hover:text-rose-500 rounded-md w-full flex justify-start items-center gap-6"
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => {
											setMenuOpen(true);
											setSelected((prev) => [
												...prev,
												user,
											]);
											setQuery("");
										}}
									>
										<img
											src={user.image}
											alt={user.name}
											className="h-4 w-4"
										/>
										<span>{user.name}</span>
										<div className="flex w-1/2 justify-end">
											<span>{user.email}</span>
										</div>
									</li>
								))
							) : (
								<li className="p-2 text-gray-500">
									No options available
								</li>
							)}
						</ul>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default App;

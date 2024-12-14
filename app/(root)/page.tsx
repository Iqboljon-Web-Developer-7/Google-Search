import SearchForm from "@/components/SearchForm";

interface searchResultsTypes {
  htmlTitle: string;
  link: string;
  htmlSnippet: string;
}

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;

  const res = await fetch(`${process.env.GOOGLE_SEARCH_API}&q=${query}`);

  const searchResults = await res.json();

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Welcome to Your&nbsp;
          <span className="text-[#EE2A69]">Search</span>&nbsp; Hub!
        </h1>
        <SearchForm query={query} />
      </section>
      <section
        className={`section_container ${searchResults.error && "hidden"}`}
      >
        <div className="flex items-center justify-between flex-col sm:flex-row gap-3">
          <p className="text-30-semibold text-slate-700 text-center leading-8">
            Search results for{" "}
            <span className="text-[#EE2A69]">&ldquo;{query}&ldquo;</span>
          </p>
          {!searchResults?.error && searchResults && (
            <p className="text-xl text-slate-500">
              Search time:{" "}
              {searchResults?.searchInformation?.formattedSearchTime}s
            </p>
          )}
        </div>
        <div className="mt-6 flex items-center justify-center flex-col gap-3">
          {!searchResults?.error &&
            searchResults &&
            searchResults?.items?.map(
              (item: searchResultsTypes, index: number) => (
                <div
                  key={index}
                  className="group duration-200 w-full p-4 bg-slate-200 hover:bg-slate-900 border border-gray-100 rounded-2xl shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href={item?.link} target="_blank">
                    <p
                      className="w-fit mb-2 text-xl sm:text-2xl line-clamp-1 font-bold text-gray-900 group-hover:text-[#EE2A69] dark:text-white"
                      dangerouslySetInnerHTML={{ __html: item?.htmlTitle }}
                    />
                    <p
                      className="text-sm text-gray-500 group-hover:text-slate-300 sm:text-base dark:text-gray-400 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item?.htmlSnippet }}
                    ></p>
                  </a>
                </div>
              )
            )}
        </div>
      </section>
    </>
  );
};

export default page;

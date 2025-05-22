export const Serch = ({ querySerch, onChengeInput }) => {
  return (
    <div className="panel-block">
      <p className="control has-icons-left has-icons-right">
        <input
          data-cy="SearchField"
          type="text"
          className="input"
          placeholder="Search"
          value={querySerch}
          onChange={event => {
            onChengeInput(event.target.value.trimStart());
          }}
        />

        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>

        <span className="icon is-right">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {querySerch && (
            <button
              data-cy="ClearButton"
              type="button"
              className="delete"
              onClick={() => {
                onChengeInput('');
              }}
            />
          )}
        </span>
      </p>
    </div>
  );
};

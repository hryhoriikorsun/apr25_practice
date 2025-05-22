import cn from 'classnames';

export const PanelUsersName = ({
  usersName,
  nameSelected,
  onClickChengeName,
}) => {
  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        className={cn({ 'is-active': nameSelected === 'All' })}
        onClick={() => {
          onClickChengeName('All');
        }}
      >
        All
      </a>

      {usersName.map(user => {
        return (
          <a
            key={user.id}
            data-cy="FilterUser"
            href="#/"
            className={cn({ 'is-active': nameSelected === user.name })}
            onClick={() => {
              onClickChengeName(user.name);
            }}
          >
            {user.name}
          </a>
        );
      })}
    </p>
  );
};

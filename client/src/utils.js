const utils = {}

utils.limitDescription = (description, letterlimit) => {
  return description?.length <= letterlimit
    ? description
    : `${description?.slice(0, letterlimit)}..`;
};

export default utils

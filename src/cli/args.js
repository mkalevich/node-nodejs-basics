const parseArgs = () => {
  const { stdout } = process;

  const args = process.argv.slice(2);
  const groupedArgs = args.reduce((groupedArguments, arg, index) => {
    const targetPrefix = "--";

    if (arg.startsWith(targetPrefix)) {
      const key = arg.replace(targetPrefix, "");
      const value = args[index + 1];

      groupedArguments.push(`${key} is ${value}`);
    }

    return groupedArguments;
  }, []);

  stdout.write(groupedArgs.join(", "));
};

parseArgs();

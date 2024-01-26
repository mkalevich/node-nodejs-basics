const parseEnv = () => {
  const { stdout } = process;

  for (const key in process.env) {
    const targetPrefix = "RSS_";

    if (key.startsWith(targetPrefix)) {
      const formattedString = `${key}=${process.env[key]}\n`;

      stdout.write(formattedString);
    }
  }
};

parseEnv();

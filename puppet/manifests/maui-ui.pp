include baseconfig

class { 'redis::install': }

redis::server { 'node': }

class { 'nodejs': }


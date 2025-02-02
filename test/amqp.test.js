const { describe, it } = require('mocha')
const { assert } = require('chai')

const Amqp = require('../src/amqp')
const AmqpQueue = require('../src/amqp-queue')
const AmqpExchange = require('../src/amqp-exchange')

describe('Amqp', () => {
  describe('defineQueue', () => {
    it('should return an AmqpQueue', () => {
      const amqp = new Amqp('amqp://root:root@localhost:5672')
      const queue = amqp.defineQueue('TestQueue', { queueName: 'test-queue' })
      assert.instanceOf(queue, AmqpQueue)
    })

    it('should register the queue inside connector', () => {
      const amqp = new Amqp('amqp://root:root@localhost:5672')
      const definedQueueName = 'TestQueue'
      const queue = amqp.defineQueue(definedQueueName, { queueName: 'test-queue' })

      assert.ok(amqp.queues[definedQueueName])
      assert.ok(amqp.queue(definedQueueName))
      assert.strictEqual(amqp.queues[definedQueueName], queue)
      assert.strictEqual(amqp.queue(definedQueueName), queue)
    })

    it('should respect queueName', () => {
      const amqp = new Amqp('amqp://root:root@localhost:5672')
      const queue = amqp.defineQueue('TestQueue', { queueName: 'test-queue' })
      assert.strictEqual(queue.name, 'test-queue')
    })

    it('should default to passed queue name', () => {
      const amqp = new Amqp('amqp://root:root@localhost:5672')
      const queue = amqp.defineQueue('test-queue')
      assert.strictEqual(queue.name, 'test-queue')
    })
  })

  describe('defineExchange', () => {
    it('should return an AmqpExchange', () => {
      const amqp = new Amqp('amqp://root:root@localhost:5672')
      const exchange = amqp.defineExchange('TestExchange', { exchangeName: 'test-exchange' })
      assert.instanceOf(exchange, AmqpExchange)
    })

    it('should register the exchange inside connector', () => {
      const amqp = new Amqp('amqp://root:root@localhost:5672')
      const definedExchangeName = 'TestExchange'
      const exchange = amqp.defineExchange(definedExchangeName, { exchangeName: 'test-exchange' })

      assert.ok(amqp.exchanges[definedExchangeName])
      assert.ok(amqp.exchange(definedExchangeName))
      assert.strictEqual(amqp.exchanges[definedExchangeName], exchange)
      assert.strictEqual(amqp.exchange(definedExchangeName), exchange)
    })

    it('should respect exchangeName', () => {
      const amqp = new Amqp('amqp://root:root@localhost:5672')
      const exchange = amqp.defineExchange('TestExchange', { exchangeName: 'test-exchange' })
      assert.strictEqual(exchange.name, 'test-exchange')
    })

    it('should default to passed exchange name', () => {
      const amqp = new Amqp('amqp://root:root@localhost:5672')
      const exchange = amqp.defineExchange('test-exchange')
      assert.strictEqual(exchange.name, 'test-exchange')
    })
  })
})
